'use client'

import { useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Space,
  Card,
  Divider,
} from 'antd'
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card')

  const { data: cart, isLoading: isCartLoading } = Api.order.findFirst.useQuery(
    {
      where: { userId: user?.id, status: 'cart' },
      include: { orderItems: { include: { product: true } } },
    },
  )

  const { mutateAsync: createOrder } = Api.order.create.useMutation()

  const handleFinish = async (values: any) => {
    try {
      const orderData = {
        ...values,
        userId: user?.id,
        status: 'pending',
        totalAmount: cart?.totalAmount,
        orderItems: {
          create: cart?.orderItems?.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      }

      await createOrder({ data: orderData })
      enqueueSnackbar('Order placed successfully!', { variant: 'success' })
      router.push('/orders')
    } catch (error) {
      enqueueSnackbar('Failed to place order. Please try again.', {
        variant: 'error',
      })
    }
  }

  if (isCartLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <ShoppingCartOutlined /> Checkout
        </Title>
        <Text>
          Please enter your shipping and billing information to complete your
          order.
        </Text>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Card title="Shipping Information">
            <Form.Item
              name="shippingAddress"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingCity"
              label="City"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shippingZipCode"
              label="Zip Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Card>

          <Card title="Billing Information">
            <Form.Item
              name="billingAddress"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="billingCity"
              label="City"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="billingZipCode"
              label="Zip Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Card>

          <Card title="Payment Method">
            <Form.Item name="paymentMethod" rules={[{ required: true }]}>
              <Select onChange={value => setPaymentMethod(value)}>
                <Option value="credit_card">Credit Card</Option>
                <Option value="paypal">PayPal</Option>
              </Select>
            </Form.Item>
            {paymentMethod === 'credit_card' && (
              <>
                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="cardExpiry"
                  label="Expiry Date"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="cardCVC"
                  label="CVC"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
          </Card>

          <Card title="Order Summary">
            {cart?.orderItems?.map(item => (
              <div key={item.id}>
                <Text>
                  {item.product?.name} x {item.quantity} - $
                  {parseFloat(item.price || '0').toFixed(2)}
                </Text>
              </div>
            ))}
            <Divider />
            <Text strong>
              Total: ${parseFloat(cart?.totalAmount || '0').toFixed(2)}
            </Text>
          </Card>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
            >
              Place Order
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
