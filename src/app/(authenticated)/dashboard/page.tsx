'use client'

import { Typography, Card, Row, Col, List, Spin } from 'antd'
import {
  ShoppingOutlined,
  FileTextOutlined,
  HistoryOutlined,
  GiftOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: orders, isLoading: ordersLoading } =
    Api.order.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { orderDate: 'desc' },
      take: 5,
      include: { orderItems: { include: { product: true } } },
    })

  const { data: reviews, isLoading: reviewsLoading } =
    Api.review.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { product: true },
    })

  const { data: recommendations, isLoading: recommendationsLoading } =
    Api.product.findMany.useQuery({
      take: 4,
      orderBy: { dateCreated: 'desc' },
    })

  if (!user) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>
        Welcome back, {user.name}! Here's a summary of your recent activity.
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <ShoppingOutlined /> Recent Orders
              </>
            }
            loading={ordersLoading}
          >
            <List
              dataSource={orders}
              renderItem={order => (
                <List.Item>
                  <List.Item.Meta
                    title={`Order #${order.id}`}
                    description={`${dayjs(order.orderDate).format('MMMM D, YYYY')} - ${order.status}`}
                  />
                  <Text>${order.totalAmount}</Text>
                </List.Item>
              )}
              locale={{ emptyText: 'No recent orders' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <FileTextOutlined /> Recent Reviews
              </>
            }
            loading={reviewsLoading}
          >
            <List
              dataSource={reviews}
              renderItem={review => (
                <List.Item>
                  <List.Item.Meta
                    title={review.product?.name}
                    description={`Rating: ${review.rating}/5 - ${dayjs(review.createdAt).format('MMMM D, YYYY')}`}
                  />
                </List.Item>
              )}
              locale={{ emptyText: 'No recent reviews' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <>
            <GiftOutlined /> Recommended Products
          </>
        }
        style={{ marginTop: '24px' }}
        loading={recommendationsLoading}
      >
        <Row gutter={[16, 16]}>
          {recommendations?.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <Card.Meta
                  title={product.name}
                  description={`$${product.pricings?.[0]?.price || 'N/A'}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card
        title={
          <>
            <HistoryOutlined /> Account Activity
          </>
        }
        style={{ marginTop: '24px' }}
      >
        <Text>
          Last login: {dayjs(user.dateUpdated).format('MMMM D, YYYY HH:mm')}
        </Text>
      </Card>
    </PageLayout>
  )
}
