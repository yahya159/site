'use client'

import { useState } from 'react'
import { Typography, Form, Input, InputNumber, Button, Space, Card } from 'antd'
import {
  PlusOutlined,
  MinusCircleOutlined,
  SendOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function RequestQuotePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const { mutateAsync: createOrder } = Api.order.create.useMutation()
  const { mutateAsync: createOrderItem } = Api.orderItem.create.useMutation()

  const onFinish = async (values: any) => {
    try {
      if (!user) {
        enqueueSnackbar('Please log in to submit a quote request', {
          variant: 'error',
        })
        return
      }

      const order = await createOrder({
        data: {
          userId: user.id,
          status: 'QUOTE_REQUESTED',
          totalAmount: '0', // This will be calculated later
        },
      })

      for (const item of values.items) {
        await createOrderItem({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: '0', // This will be set by the admin later
          },
        })
      }

      enqueueSnackbar('Quote request submitted successfully', {
        variant: 'success',
      })
      form.resetFields()
      router.push('/orders')
    } catch (error) {
      console.error('Error submitting quote request:', error)
      enqueueSnackbar('Failed to submit quote request. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>Request a Custom Quote</Title>
        <Paragraph>
          Submit your request for bulk orders or specialized products. We'll
          review your request and get back to you with a custom quote.
        </Paragraph>
        <Form
          form={form}
          name="quote_request"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'productId']}
                      rules={[
                        { required: true, message: 'Product ID is required' },
                      ]}
                    >
                      <Input placeholder="Product ID" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[
                        { required: true, message: 'Quantity is required' },
                      ]}
                    >
                      <InputNumber min={1} placeholder="Quantity" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Product
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item name="additionalDetails" label="Additional Details">
            <Input.TextArea
              rows={4}
              placeholder="Any special requirements or details about your order"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Submit Quote Request
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageLayout>
  )
}
