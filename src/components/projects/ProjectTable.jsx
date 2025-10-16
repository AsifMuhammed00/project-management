import React, { useMemo } from 'react';
import { Table, Button, Space, Tag, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PROJECT_STATUS, USER_ROLES } from '../../utils/constants';

const ProjectTable = ({ projects, loading, onEdit, onDelete, onView, currentUserRole }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case PROJECT_STATUS.ACTIVE:
        return 'green';
      case PROJECT_STATUS.COMPLETED:
        return 'blue';
      case PROJECT_STATUS.ON_HOLD:
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ellipsis: true,
      width: 200
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 250
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status?.toUpperCase().replace('-', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: PROJECT_STATUS.ACTIVE },
        { text: 'Completed', value: PROJECT_STATUS.COMPLETED },
        { text: 'On Hold', value: PROJECT_STATUS.ON_HOLD }
      ],
      onFilter: (value, record) => record.status === value,
      width: 120
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
      ellipsis: true,
      width: 150
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => budget ? `$${parseInt(budget).toLocaleString()}` : 'N/A',
      sorter: (a, b) => (parseInt(a.budget) || 0) - (parseInt(b.budget) || 0),
      width: 120
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
      width: 120
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
          {(currentUserRole === USER_ROLES.ADMIN || currentUserRole === USER_ROLES.MANAGER) && (
            <>
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                />
              </Tooltip>
              {currentUserRole === USER_ROLES.ADMIN && (
                <Popconfirm
                  title="Are you sure you want to delete this project?"
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
              )}
            </>
          )}
        </Space>
      )
    }
  ], [onEdit, onDelete, onView, currentUserRole]);

  return (
    <Table
      columns={columns}
      dataSource={projects}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} projects`
      }}
      scroll={{ x: 1200 }}
    />
  );
};

export default ProjectTable;