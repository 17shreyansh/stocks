import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;

const Settings = () => {
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (values) => {
    try {
      setLoading(true);
      await axios.put('/auth/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      message.success('Password changed successfully');
      passwordForm.resetFields();
    } catch (error) {
      console.error('Error changing password:', error);
      message.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>
        <SecurityScanOutlined /> Settings
      </Title>
      
      <Card title="Change Admin Password">
        <Form form={passwordForm} onFinish={handlePasswordChange} layout="vertical">
          <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter current password" />
          </Form.Item>
          
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}>
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;