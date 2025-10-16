import React, { useMemo } from 'react';
import { Table, Button, Space, Tag, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { USER_ROLES } from '../../utils/constants';

const UserTable = ({ users, loading, onEdit, onDelete, onView, currentUserRole }) => {
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

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role?.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: USER_ROLES.ADMIN },
        { text: 'Manager', value: USER_ROLES.MANAGER },
        { text: 'User', value: USER_ROLES.USER }
      ],
      onFilter: (value, record) => record.role === value
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      ellipsis: true
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
          {currentUserRole === USER_ROLES.ADMIN && (
            <>
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                />
              </Tooltip>
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => onDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ], [onEdit, onDelete, onView, currentUserRole]);

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} users`
      }}
      scroll={{ x: 800 }}
    />
  );
};

export default UserTable;