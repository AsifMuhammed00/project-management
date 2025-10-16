import React, { useState, useCallback } from 'react';
import { Card, Input, Button, Space, message, Modal, Descriptions, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { useDebounce } from '../../hooks/useDebounce';
import { USER_ROLES } from '../../utils/constants';

const { Search } = Input;

const UserList = ({ users, loading, onRefresh, onCreateUser, onUpdateUser, onDeleteUser, currentUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const debouncedSearch = useDebounce(searchText, 300);

  const filteredUsers = useCallback(() => {
    if (!debouncedSearch) return users;
    
    return users.filter(user =>
      user.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.role?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [users, debouncedSearch]);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (selectedUser) {
        await onUpdateUser(selectedUser.id, values);
        message.success('User updated successfully');
      } else {
        await onCreateUser(values);
        message.success('User created successfully');
      }
      setIsModalVisible(false);
      onRefresh();
    } catch (error) {
      message.error(error.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDeleteUser(id);
      message.success('User deleted successfully');
      onRefresh();
    } catch (error) {
      message.error(error.message || 'Delete failed');
    }
  };

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

  return (
    <>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <Search
              placeholder="Search users by name, email, or role"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
              prefix={<SearchOutlined />}
            />
            {currentUser?.role === USER_ROLES.ADMIN && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Add User
              </Button>
            )}
          </div>

          <UserTable
            users={filteredUsers()}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            currentUserRole={currentUser?.role}
          />
        </Space>
      </Card>

      <UserForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={selectedUser}
        loading={submitting}
      />

      <Modal
        title="User Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedUser && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={getRoleColor(selectedUser.role)}>
                {selectedUser.role?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedUser.phone || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Department">{selectedUser.department || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="ID">{selectedUser.id}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default UserList;