import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotAvailable = ({ pageName = 'This page' }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Page Not Available"
      subTitle={`${pageName} is currently under development and will be available soon.`}
      extra={
        <Button type="primary" onClick={() => navigate('/admin')}>
          Back to Dashboard
        </Button>
      }
    />
  );
};

export default PageNotAvailable;