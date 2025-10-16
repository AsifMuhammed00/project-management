import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Modal, Spin } from 'antd';
import { PROJECT_STATUS, USER_ROLES } from '../../utils/constants';
import { getUsers } from '../../api/users';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const ProjectForm = ({ visible, onCancel, onSubmit, initialValues, loading }) => {
  const [form] = Form.useForm();
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchManagers();
    }
  }, [visible]);

  const fetchManagers = async () => {
    try {
      setLoadingManagers(true);
      const users = await getUsers();
      const managersList = users.filter(
        user => user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.MANAGER
      );
      setManagers(managersList);
    } catch (error) {
      console.error('Failed to fetch managers:', error);
      setManagers([]);
    } finally {
      setLoadingManagers(false);
    }
  };

  useEffect(() => {
    if (visible && initialValues) {
      const formValues = {
        ...initialValues,
        startDate: initialValues.startDate ? dayjs(initialValues.startDate) : null,
        endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null
      };
      form.setFieldsValue(formValues);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const submitData = {
        ...values,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null
      };
      onSubmit(submitData);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Project' : 'Create Project'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: PROJECT_STATUS.ACTIVE }}
      >
        <Form.Item
          name="title"
          label="Project Title"
          rules={[
            { required: true, message: 'Please enter project title' },
            { min: 3, message: 'Title must be at least 3 characters' },
            { max: 100, message: 'Title must not exceed 100 characters' }
          ]}
        >
          <Input placeholder="Enter project title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter description' },
            { min: 10, message: 'Description must be at least 10 characters' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="Enter project description"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select project status">
            <Option value={PROJECT_STATUS.ACTIVE}>Active</Option>
            <Option value={PROJECT_STATUS.COMPLETED}>Completed</Option>
            <Option value={PROJECT_STATUS.ON_HOLD}>On Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="manager"
          label="Project Manager"
          rules={[
            { required: true, message: 'Please select a project manager' }
          ]}
        >
          <Select 
            placeholder="Select project manager"
            loading={loadingManagers}
            notFoundContent={loadingManagers ? <Spin size="small" /> : 'No managers available'}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {managers.map(manager => (
              <Option key={manager.id} value={manager.name}>
                {manager.name} ({manager.role})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="budget"
          label="Budget"
          rules={[
            { pattern: /^\d+$/, message: 'Budget must be a number' }
          ]}
        >
          <Input placeholder="Enter budget amount" prefix="$" />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <Form.Item
          name="team"
          label="Team Members"
        >
          <Input placeholder="Enter team member names (comma separated)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;