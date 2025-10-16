import React, { useState } from 'react';
import { Card, Descriptions, Avatar, Button, Form, Input, message, Typography, Tag } from 'antd';
import { UserOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../utils/constants';

const { Title } = Typography;

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getRoleColor = (role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return 'red';
      case USER_ROLES.MANAGER:
        return 'blue';
      default:
        return 'green';
    }
  };

  const handleEdit = () => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email
    });
    setEditing(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      message.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          My Profile
        </Title>
      </div>

      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div style={{ flex: 1 }}>
            <Title level={3} style={{ marginTop: 0, marginBottom: '8px' }}>
              {user?.name}
            </Title>
            <Tag color={getRoleColor(user?.role)} style={{ marginBottom: '8px' }}>
              {user?.role?.toUpperCase()}
            </Tag>
            <p style={{ color: '#8c8c8c', marginBottom: 0 }}>
              {user?.email}
            </p>
          </div>
          {/* {!editing && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )} */}
        </div>

        {!editing ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={getRoleColor(user?.role)}>
                {user?.role?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="User ID">{user?.id}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Please enter your name' },
                { min: 2, message: 'Name must be at least 2 characters' }
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter your email" disabled />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Save Changes
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Account Information</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Account Status">
            <Tag color="green">Active</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Member Since">
            {new Date().toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {new Date().toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;