import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ size = 'large', tip = 'Loading...', fullScreen = false }) => {
  const style = fullScreen ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  } : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    width: '100%'
  };

  return (
    <div style={style}>
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default LoadingSpinner;