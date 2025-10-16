import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <h1 className="error-title">Page Not Found</h1>
      <p className="error-description">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        type="primary"
        size="large"
        icon={<HomeOutlined />}
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;