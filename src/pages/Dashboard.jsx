import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getUsers } from '../api/users';
import { getProjects } from '../api/projects';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { PROJECT_STATUS, USER_ROLES } from '../utils/constants';

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useAuth();
  const { data: users, loading: usersLoading } = useFetch(getUsers, []);
  const { data: projects, loading: projectsLoading } = useFetch(getProjects, []);

  const stats = useMemo(() => {
    const activeProjects = projects?.filter(p => p.status === PROJECT_STATUS.ACTIVE).length || 0;
    const completedProjects = projects?.filter(p => p.status === PROJECT_STATUS.COMPLETED).length || 0;
    
    return {
      totalUsers: users?.length || 0,
      totalProjects: projects?.length || 0,
      activeProjects,
      completedProjects
    };
  }, [users, projects]);

  if (usersLoading || projectsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          Dashboard
        </Title>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginTop: 0 }}>
          Welcome back, {user?.name}!
        </Title>
        <p style={{ color: '#8c8c8c', marginBottom: 0 }}>
          Role: <strong>{user?.role?.toUpperCase()}</strong>
        </p>
      </Card>

      {(user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER) && (
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <UserOutlined className="stat-card-icon" style={{ color: '#1890ff' }} />
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <ProjectOutlined className="stat-card-icon" style={{ color: '#52c41a' }} />
              <Statistic
                title="Total Projects"
                value={stats.totalProjects}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <ClockCircleOutlined className="stat-card-icon" style={{ color: '#faad14' }} />
              <Statistic
                title="Active Projects"
                value={stats.activeProjects}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <CheckCircleOutlined className="stat-card-icon" style={{ color: '#722ed1' }} />
              <Statistic
                title="Completed Projects"
                value={stats.completedProjects}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {user?.role === USER_ROLES.USER && (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <ProjectOutlined className="stat-card-icon" style={{ color: '#52c41a' }} />
              <Statistic
                title="Total Projects"
                value={stats.totalProjects}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              className="stat-card"
              style={{ textAlign: 'center' }}
            >
              <ClockCircleOutlined className="stat-card-icon" style={{ color: '#faad14' }} />
              <Statistic
                title="Active Projects"
                value={stats.activeProjects}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Quick Actions</Title>
        <p style={{ color: '#8c8c8c' }}>
          {user?.role === USER_ROLES.ADMIN && 'You have full access to manage users and projects.'}
          {user?.role === USER_ROLES.MANAGER && 'You can manage projects and view user information.'}
          {user?.role === USER_ROLES.USER && 'You can view your projects and profile information.'}
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;