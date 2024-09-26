'use client'

import { Prisma } from '@prisma/client'
import {
  Typography,
  Card,
  Image,
  Descriptions,
  Button,
  Space,
  Spin,
  InputNumber,
} from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
    include: {
      category: true,
      company: true,
      pricings: true,
      inventorys: true,
    },
  })

  const { mutateAsync: addToCart } = Api.orderItem.create.useMutation()

  const handleAddToCart = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to add items to cart', { variant: 'info' })
      return
    }

    try {
      await addToCart({
        data: {
          quantity,
          price: product?.pricings?.[0]?.price,
          product: { connect: { id: product?.id } },
          order: {
            connectOrCreate: {
              where: { id: 'temp-cart-id' },
              create: { status: 'CART', userId: user.id },
            },
          },
        },
      })
      enqueueSnackbar('Product added to cart', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add product to cart', { variant: 'error' })
    }
  }

  const handleRequestQuote = () => {
    router.push(`/request-quote?productId=${product?.id}`)
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Product Not Found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Details</Title>
      <Paragraph>
        View detailed information about this electric cable product.
      </Paragraph>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Image
            src={product.imageUrl || 'https://placeholder.com/400'}
            alt={product.name || 'Product image'}
            style={{ maxWidth: '400px', width: '100%' }}
          />

          <Descriptions title={product.name} bordered column={1}>
            <Descriptions.Item label="Description">
              {product.description}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {product.category?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Manufacturer">
              {product.company?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ${product.pricings?.[0]?.price?.toString() || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              {product.inventorys?.[0]?.quantity?.toString() || 'Out of stock'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {dayjs(product.dateUpdated).format('MMMM D, YYYY')}
            </Descriptions.Item>
          </Descriptions>

          <Space>
            <InputNumber
              min={1}
              max={product.inventorys?.[0]?.quantity || 1}
              value={quantity}
              onChange={value => setQuantity(value || 1)}
            />
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product.inventorys?.[0]?.quantity}
            >
              Add to Cart
            </Button>
            <Button icon={<DollarOutlined />} onClick={handleRequestQuote}>
              Request Quote
            </Button>
          </Space>
        </Space>
      </Card>
    </PageLayout>
  )
}
