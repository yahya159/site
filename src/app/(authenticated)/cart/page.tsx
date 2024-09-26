'use client'

import { Prisma } from '@prisma/client'
import { Typography, Table, Button, InputNumber, Space, Row, Col } from 'antd'
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CartPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [cartItems, setCartItems] = useState<
    Prisma.OrderItemGetPayload<{ include: { product: true } }>[]
  >([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const {
    data: order,
    isLoading,
    refetch,
  } = Api.order.findFirst.useQuery({
    where: { userId: user?.id, status: 'CART' },
    include: { orderItems: { include: { product: true } } },
  })

  const { mutateAsync: updateOrderItem } = Api.orderItem.update.useMutation()
  const { mutateAsync: deleteOrderItem } = Api.orderItem.delete.useMutation()
  const { mutateAsync: updateOrder } = Api.order.update.useMutation()

  useEffect(() => {
    if (order) {
      setCartItems(order.orderItems || [])
      calculateTotal(order.orderItems || [])
    }
  }, [order])

  const calculateTotal = (
    items: Prisma.OrderItemGetPayload<{ include: { product: true } }>[],
  ) => {
    const total = items.reduce(
      (acc, item) => acc + Number(item.price) * (item.quantity || 0),
      0,
    )
    setTotalAmount(total)
  }

  const handleQuantityChange = async (id: string, quantity: number | null) => {
    if (quantity === null) return
    try {
      await updateOrderItem({ where: { id }, data: { quantity } })
      await refetch()
      enqueueSnackbar('Cart updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update cart', { variant: 'error' })
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteOrderItem({ where: { id } })
      await refetch()
      enqueueSnackbar('Item removed from cart', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to remove item', { variant: 'error' })
    }
  }

  const handleCheckout = async () => {
    try {
      await updateOrder({
        where: { id: order?.id },
        data: { status: 'PENDING', totalAmount: totalAmount.toString() },
      })
      router.push('/checkout')
    } catch (error) {
      enqueueSnackbar('Failed to proceed to checkout', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => `$${Number(price).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (
        text: string,
        record: Prisma.OrderItemGetPayload<{ include: { product: true } }>,
      ) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={value => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (
        text: string,
        record: Prisma.OrderItemGetPayload<{ include: { product: true } }>,
      ) => `$${(Number(record.price) * (record.quantity || 0)).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (
        text: string,
        record: Prisma.OrderItemGetPayload<{ include: { product: true } }>,
      ) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
          danger
        >
          Remove
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="center">
          <Col>
            <Title level={2}>
              <ShoppingCartOutlined /> Your Shopping Cart
            </Title>
            <Text>Review and modify your selections before checkout</Text>
          </Col>
        </Row>

        {isLoading ? (
          <Text>Loading cart...</Text>
        ) : cartItems.length > 0 ? (
          <>
            <Table
              dataSource={cartItems}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <Row justify="end">
              <Col>
                <Title level={3}>Total: ${totalAmount.toFixed(2)}</Title>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  icon={<ShoppingOutlined />}
                  onClick={handleCheckout}
                  size="large"
                >
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Text>Your cart is empty</Text>
        )}
      </Space>
    </PageLayout>
  )
}
