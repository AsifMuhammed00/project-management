import React, { useCallback } from 'react';
import { Typography } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';
import UserList from '../components/users/UserList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const { Title } = Typography;

const UserManagement = () => {
  const { user } = useAuth();
  const { data: users, loading, refetch } = useFetch(getUsers, []);

  const handleCreateUser = useCallback(async (userData) => {
    return await createUser(userData);
  }, []);

  const handleUpdateUser = useCallback(async (id, userData) => {
    return await updateUser(id, userData);
  }, []);

  const handleDeleteUser = useCallback(async (id) => {
    return await deleteUser(id);
  }, []);

  if (loading && !users) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          User Management
        </Title>
      </div>

      <UserList
        users={users || []}
        loading={loading}
        onRefresh={refetch}
        onCreateUser={handleCreateUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        currentUser={user}
      />
    </div>
  );
};

export default UserManagement;