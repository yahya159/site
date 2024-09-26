'use client'

import { Typography, Space, Card, Button, Form, Input, List } from 'antd'
import {
  QuestionCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SupportPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [chatVisible, setChatVisible] = useState(false)

  const { data: faqs, isLoading: faqsLoading } = Api.faq.findMany.useQuery({})
  const { mutateAsync: createTicket } = Api.supportTicket.create.useMutation()

  const handleSubmitTicket = async (values: {
    title: string
    description: string
  }) => {
    try {
      await createTicket({
        data: {
          title: values.title,
          description: values.description,
          userId: user?.id,
          status: 'OPEN',
        },
      })
      enqueueSnackbar('Support ticket submitted successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to submit support ticket', { variant: 'error' })
    }
  }

  const handleStartChat = () => {
    setChatVisible(true)
    enqueueSnackbar(
      'Live chat initiated. A support agent will be with you shortly.',
      { variant: 'info' },
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Support Center</Title>
        <Paragraph>
          Welcome to our Support Center. Here you can find answers to common
          questions, submit a support ticket, or start a live chat with our
          customer support team.
        </Paragraph>

        <Card
          title={
            <>
              <QuestionCircleOutlined /> FAQs
            </>
          }
        >
          <List
            loading={faqsLoading}
            dataSource={faqs}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  title={item.question}
                  description={item.answer}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card
          title={
            <>
              <FileTextOutlined /> Submit a Support Ticket
            </>
          }
        >
          <Form onFinish={handleSubmitTicket} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a title for your ticket',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please describe your issue' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Ticket
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card
          title={
            <>
              <MessageOutlined /> Live Chat
            </>
          }
        >
          {chatVisible ? (
            <Paragraph>Chat window would be implemented here.</Paragraph>
          ) : (
            <Button onClick={handleStartChat}>Start Live Chat</Button>
          )}
        </Card>
      </Space>
    </PageLayout>
  )
}
