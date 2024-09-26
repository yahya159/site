'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import { Typography, Input, Select, Button, Table, Space, Card } from 'antd'
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  FilterOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductCatalogPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [products, setProducts] = useState<
    Prisma.ProductGetPayload<{
      include: { category: true; company: true; pricings: true }
    }>[]
  >([])
  const [filteredProducts, setFilteredProducts] = useState<
    Prisma.ProductGetPayload<{
      include: { category: true; company: true; pricings: true }
    }>[]
  >([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend')

  const { data: productsData, isLoading } = Api.product.findMany.useQuery({
    include: { category: true, company: true, pricings: true },
  })

  useEffect(() => {
    if (productsData) {
      setProducts(productsData)
      setFilteredProducts(productsData)
    }
  }, [productsData])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    filterProducts(value, filterType)
  }

  const handleFilterChange = (value: string) => {
    setFilterType(value)
    filterProducts(searchTerm, value)
  }

  const filterProducts = (search: string, filter: string) => {
    let filtered = products
    if (search) {
      filtered = filtered.filter(
        product =>
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase()),
      )
    }
    if (filter) {
      filtered = filtered.filter(product => product.category?.name === filter)
    }
    setFilteredProducts(filtered)
  }

  const handleSort = (field: string) => {
    const order =
      field === sortField && sortOrder === 'ascend' ? 'descend' : 'ascend'
    setSortField(field)
    setSortOrder(order)
    const sorted = [...filteredProducts].sort((a, b) => {
      if (field === 'price') {
        const priceA = a.pricings?.[0]?.price || '0'
        const priceB = b.pricings?.[0]?.price || '0'
        return order === 'ascend'
          ? priceA.localeCompare(priceB)
          : priceB.localeCompare(priceA)
      }
      const valueA = (a[field as keyof typeof a] || '').toString()
      const valueB = (b[field as keyof typeof b] || '').toString()
      return order === 'ascend'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    })
    setFilteredProducts(sorted)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text: string, record: any) => (
        <a onClick={() => router.push(`/products/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
    },
    {
      title: 'Price',
      dataIndex: ['pricings', '0', 'price'],
      key: 'price',
      sorter: true,
      render: (text: string) => `$${text}`,
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>Electric Cable Products Catalog</Title>
        <Paragraph>
          Browse our extensive collection of electric cable products. Use the
          filters and sorting options to find the perfect product for your
          needs.
        </Paragraph>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space>
            <Search
              placeholder="Search products"
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Select
              style={{ width: 200 }}
              placeholder="Filter by category"
              onChange={handleFilterChange}
            >
              <Option value="">All Categories</Option>
              {Array.from(new Set(products.map(p => p.category?.name))).map(
                category => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ),
              )}
            </Select>
            <Button
              icon={
                sortOrder === 'ascend' ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              }
              onClick={() => handleSort(sortField)}
            >
              Sort by {sortField}
            </Button>
          </Space>

          <Table
            columns={columns}
            dataSource={filteredProducts}
            loading={isLoading}
            rowKey="id"
            onChange={(pagination, filters, sorter: any) => {
              if (sorter.field) {
                handleSort(sorter.field)
              }
            }}
          />
        </Space>
      </Card>
    </PageLayout>
  )
}
