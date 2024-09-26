'use client'

import { Typography, Table, Button, Space, Tag } from 'antd'
import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function OrderHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: orders,
    isLoading,
    refetch,
  } = Api.order.findMany.useQuery({
    where: { userId: user?.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { orderDate: 'desc' },
  })

  const { mutateAsync: createOrder } = Api.order.create.useMutation()

  const handleReorder = async (orderId: string) => {
    try {
      const orderToReorder = orders?.find(order => order.id === orderId)
      if (!orderToReorder) return

      const newOrderData = {
        userId: user?.id,
        status: 'pending',
        totalAmount: orderToReorder.totalAmount,
        orderItems: {
          create: orderToReorder.orderItems?.map(item => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.productId,
          })),
        },
      }

      await createOrder({ data: newOrderData })
      enqueueSnackbar('Order successfully placed!', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to place the order. Please try again.', {
        variant: 'error',
      })
    }
  }

  const columns = [
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: string) => `$${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'blue'}>
          {status === 'completed' ? (
            <CheckCircleOutlined />
          ) : (
            <ClockCircleOutlined />
          )}{' '}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<ShoppingCartOutlined />}
            onClick={() => handleReorder(record.id)}
          >
            Reorder
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Order History</Title>
      <Text>
        View your past orders, check their status, and quickly reorder items.
      </Text>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        expandable={{
          expandedRowRender: record => (
            <Table
              dataSource={record.orderItems}
              columns={[
                {
                  title: 'Product',
                  dataIndex: ['product', 'name'],
                  key: 'productName',
                },
                {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price: string) => `$${parseFloat(price).toFixed(2)}`,
                },
              ]}
              pagination={false}
              rowKey="id"
            />
          ),
        }}
      />
    </PageLayout>
  )
}
