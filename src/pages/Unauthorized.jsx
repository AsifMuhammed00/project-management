import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-code">403</div>
      <h1 className="error-title">Access Denied</h1>
      <p className="error-description">
        You do not have permission to access this page. Please contact your administrator if you believe this is a mistake.
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

export default Unauthorized;