import React, { useCallback } from 'react';
import { Typography } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';
import ProjectList from '../components/projects/ProjectList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const { Title } = Typography;

const ProjectManagement = () => {
  const { user } = useAuth();
  const { data: projects, loading, refetch } = useFetch(getProjects, []);

  const handleCreateProject = useCallback(async (projectData) => {
    return await createProject(projectData);
  }, []);

  const handleUpdateProject = useCallback(async (id, projectData) => {
    return await updateProject(id, projectData);
  }, []);

  const handleDeleteProject = useCallback(async (id) => {
    return await deleteProject(id);
  }, []);

  if (loading && !projects) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          Project Management
        </Title>
      </div>

      <ProjectList
        projects={projects || []}
        loading={loading}
        onRefresh={refetch}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        currentUser={user}
      />
    </div>
  );
};

export default ProjectManagement;