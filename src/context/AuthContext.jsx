import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { MOCK_USERS } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { message, modal } = App.useApp();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      if (!email || !password) {
        message.error('Please enter both email and password');
        return { success: false, error: 'Email and password are required' };
      }

      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: Date.now().toString(),
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        message.success('Login successful!');
        navigate('/dashboard');
        return { success: true };
      } else {
        const userExists = MOCK_USERS.find(u => u.email === email);
        if (userExists) {
          message.error('Incorrect password. Please try again.');
          return { success: false, error: 'Incorrect password' };
        } else {
          message.error('Email not found. Please check your email address.');
          return { success: false, error: 'Email not found' };
        }
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  }, [navigate, message]);

  const logout = useCallback(() => {
    modal.confirm({
      title: 'Confirm Logout',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to logout?',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk() {
        setUser(null);
        localStorage.removeItem('user');
        message.success('Logged out successfully');
        navigate('/login');
      },
      onCancel() {
        console.log('Logout cancelled');
      }
    });
  }, [navigate, message, modal]);

  const hasPermission = useCallback((allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }, [user]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  }), [user, loading, login, logout, hasPermission]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};