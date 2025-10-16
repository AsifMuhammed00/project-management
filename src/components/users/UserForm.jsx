import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { validateEmail, validateName } from '../../utils/validation';
import { USER_ROLES } from '../../utils/constants';

const { Option } = Select;

const UserForm = ({ visible, onCancel, onSubmit, initialValues, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
try {
const values = await form.validateFields();
onSubmit(values);
} catch (error) {
console.error('Validation failed:', error);
}
};
return (
<Modal
title={initialValues ? 'Edit User' : 'Create User'}
open={visible}
onCancel={onCancel}
onOk={handleSubmit}
confirmLoading={loading}
width={600}
>
<Form
form={form}
layout="vertical"
initialValues={{ role: USER_ROLES.USER }}
>
<Form.Item
name="name"
label="Name"
rules={[
{ required: true, message: 'Please enter name' },
{ min: 2, message: 'Name must be at least 2 characters' },
{ max: 50, message: 'Name must not exceed 50 characters' }
]}
>
<Input placeholder="Enter user name" />
</Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: 'Please enter email' },
        { type: 'email', message: 'Please enter a valid email' }
      ]}
    >
      <Input placeholder="Enter email address" />
    </Form.Item>

    <Form.Item
      name="role"
      label="Role"
      rules={[{ required: true, message: 'Please select a role' }]}
    >
      <Select placeholder="Select user role">
        <Option value={USER_ROLES.ADMIN}>Admin</Option>
        <Option value={USER_ROLES.MANAGER}>Manager</Option>
        <Option value={USER_ROLES.USER}>User</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="phone"
      label="Phone"
      rules={[
        { min: 10, message: 'Phone must be at least 10 digits' },
        { max: 15, message: 'Phone must not exceed 15 digits' }
      ]}
    >
      <Input placeholder="Enter phone number" />
    </Form.Item>

    <Form.Item
      name="department"
      label="Department"
    >
      <Input placeholder="Enter department" />
    </Form.Item>
  </Form>
</Modal>
);
};
export default UserForm;
