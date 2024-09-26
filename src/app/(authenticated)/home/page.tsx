'use client'

import { Typography, Input, Card, Row, Col, Spin } from 'antd'
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')

  const { data: featuredProducts, isLoading: isFeaturedLoading } =
    Api.product.findMany.useQuery({
      where: { name: { contains: 'Featured' } },
      take: 4,
      include: { category: true },
    })

  const { data: categories, isLoading: isCategoriesLoading } =
    Api.category.findMany.useQuery({})

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchTerm)}`)
    } else {
      enqueueSnackbar('Please enter a search term', { variant: 'info' })
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/catalog?category=${categoryId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Electric Cable Products</Title>
      <Text>
        Discover our wide range of high-quality electric cables for all your
        needs.
      </Text>

      <Card style={{ marginTop: 24, marginBottom: 24 }}>
        <Input
          size="large"
          placeholder="Search for electric cables..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
        />
      </Card>

      <Title level={3}>Featured Products</Title>
      {isFeaturedLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {featuredProducts?.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || '/placeholder.png'}
                  />
                }
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <Card.Meta
                  title={product.name}
                  description={`Category: ${product.category?.name}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Title level={3} style={{ marginTop: 24 }}>
        Categories
      </Title>
      {isCategoriesLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {categories?.map(category => (
            <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
              <Card hoverable onClick={() => handleCategoryClick(category.id)}>
                <Card.Meta
                  avatar={<ThunderboltOutlined />}
                  title={category.name}
                  description={category.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
