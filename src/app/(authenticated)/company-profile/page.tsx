'use client'

import { Prisma } from '@prisma/client'
import { Typography, Form, Input, Button, Space, Card, List } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CompanyProfilePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [companyInfo, setCompanyInfo] =
    useState<Prisma.CompanyGetPayload<{}>>(null)
  const [editMode, setEditMode] = useState(false)
  const [shippingAddresses, setShippingAddresses] = useState<string[]>([])
  const [newAddress, setNewAddress] = useState('')

  const {
    data: company,
    isLoading,
    refetch,
  } = Api.company.findFirst.useQuery({ where: { id: user?.id } })
  const { mutateAsync: updateCompany } = Api.company.update.useMutation()

  useEffect(() => {
    if (company) {
      setCompanyInfo(company)
      setShippingAddresses(company.description?.split('|') || [])
    }
  }, [company])

  const handleCompanyUpdate = async (values: any) => {
    try {
      await updateCompany({
        where: { id: user?.id },
        data: {
          name: values.name,
          description: shippingAddresses.join('|'),
          logoUrl: values.logoUrl,
        },
      })
      enqueueSnackbar('Company information updated successfully', {
        variant: 'success',
      })
      setEditMode(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update company information', {
        variant: 'error',
      })
    }
  }

  const handleAddAddress = () => {
    if (newAddress) {
      setShippingAddresses([...shippingAddresses, newAddress])
      setNewAddress('')
    }
  }

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = shippingAddresses.filter((_, i) => i !== index)
    setShippingAddresses(updatedAddresses)
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Company Profile</Title>
      <Paragraph>
        Manage your company's information and shipping addresses.
      </Paragraph>

      <Card style={{ marginBottom: 24 }}>
        <Form
          layout="vertical"
          initialValues={companyInfo}
          onFinish={handleCompanyUpdate}
          disabled={!editMode}
        >
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="logoUrl" label="Logo URL">
            <Input />
          </Form.Item>
          <Form.Item>
            {editMode ? (
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
              </Space>
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>

      <Card title="Shipping Addresses">
        <List
          dataSource={shippingAddresses}
          renderItem={(address, index) => (
            <List.Item
              actions={[
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveAddress(index)}
                >
                  Remove
                </Button>,
              ]}
            >
              {address}
            </List.Item>
          )}
        />
        <Space style={{ marginTop: 16 }}>
          <Input
            placeholder="Enter new address"
            value={newAddress}
            onChange={e => setNewAddress(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddAddress}
          >
            Add Address
          </Button>
        </Space>
      </Card>
    </PageLayout>
  )
}
