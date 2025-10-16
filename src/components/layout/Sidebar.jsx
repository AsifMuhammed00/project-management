import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = useMemo(() => {
    const items = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/dashboard')
      }
    ];

    if (user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MANAGER) {
      items.push({
        key: '/users',
        icon: <UserOutlined />,
        label: 'Users',
        onClick: () => navigate('/users')
      });
      items.push({
        key: '/projects',
        icon: <ProjectOutlined />,
        label: 'Projects',
        onClick: () => navigate('/projects')
      });
    }

    items.push({
      key: '/profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    });

    items.push({
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
      danger: true
    });

    return items;
  }, [user, navigate, logout]);

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={setCollapsed}
      breakpoint="lg"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0
      }}
    >
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: collapsed ? '16px' : '20px',
        fontWeight: 'bold',
        padding: '0 16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        {collapsed ? 'PM' : 'PM Portal'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;