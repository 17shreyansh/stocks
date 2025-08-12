import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  CloudDownloadOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'pages',
      icon: <FileTextOutlined />,
      label: 'Page Management',
      children: [
        {
          key: '/admin/pages/homepage',
          label: 'Homepage',
        },
        {
          key: '/admin/pages/about',
          label: 'About Page',
        },
        {
          key: '/admin/pages/contact',
          label: 'Contact Page',
        },
      ],
    },
    {
      key: '/admin/documents',
      icon: <CloudDownloadOutlined />,
      label: 'Documents',
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key.startsWith('/admin')) {
      navigate(key);
    }
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('/pages/')) {
      return [path];
    }
    return [path];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.includes('/pages/')) {
      return ['pages'];
    }
    return [];
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{
        height: 48,
        margin: 16,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: collapsed ? '14px' : '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        {collapsed ? '🏢' : '🏢 Focus Stock Broker'}
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default AdminSidebar;