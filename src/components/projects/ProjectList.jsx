import React, { useState, useCallback } from 'react';
import { Card, Input, Button, Space, message, Modal, Descriptions, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ProjectTable from './ProjectTable';
import ProjectForm from './ProjectForm';
import { useDebounce } from '../../hooks/useDebounce';
import { PROJECT_STATUS, USER_ROLES } from '../../utils/constants';

const { Search } = Input;

const ProjectList = ({ projects, loading, onRefresh, onCreateProject, onUpdateProject, onDeleteProject, currentUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const debouncedSearch = useDebounce(searchText, 300);

  const filteredProjects = useCallback(() => {
    if (!debouncedSearch) return projects;
    
    return projects.filter(project =>
      project.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      project.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      project.manager?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      project.status?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [projects, debouncedSearch]);

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalVisible(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setIsViewModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (selectedProject) {
        await onUpdateProject(selectedProject.id, values);
        message.success('Project updated successfully');
      } else {
        await onCreateProject(values);
        message.success('Project created successfully');
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
      await onDeleteProject(id);
      message.success('Project deleted successfully');
      onRefresh();
    } catch (error) {
      message.error(error.message || 'Delete failed');
    }
  };

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

  return (
    <>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <Search
              placeholder="Search projects by title, manager, or status"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
              prefix={<SearchOutlined />}
            />
            {(currentUser?.role === USER_ROLES.ADMIN || currentUser?.role === USER_ROLES.MANAGER) && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Add Project
              </Button>
            )}
          </div>

          <ProjectTable
            projects={filteredProjects()}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            currentUserRole={currentUser?.role}
          />
        </Space>
      </Card>

      <ProjectForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={selectedProject}
        loading={submitting}
      />

      <Modal
        title="Project Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedProject && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Title">{selectedProject.title}</Descriptions.Item>
            <Descriptions.Item label="Description">{selectedProject.description}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(selectedProject.status)}>
                {selectedProject.status?.toUpperCase().replace('-', ' ')}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Manager">{selectedProject.manager}</Descriptions.Item>
            <Descriptions.Item label="Budget">
              {selectedProject.budget ? `$${parseInt(selectedProject.budget).toLocaleString()}` : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">{selectedProject.startDate || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="End Date">{selectedProject.endDate || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Team Members">{selectedProject.team || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="ID">{selectedProject.id}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default ProjectList;