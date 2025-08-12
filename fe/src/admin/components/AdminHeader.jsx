import React, { useState } from 'react';
import { Layout, Button, Avatar, Dropdown, Space, Typography, Badge, Tooltip, Modal } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const AdminHeader = ({ collapsed, setCollapsed, isMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [helpModal, setHelpModal] = useState(false);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/admin/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/admin/settings')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  const notificationItems = [
    {
      key: '1',
      label: 'New document uploaded',
    },
    {
      key: '2', 
      label: 'Page content updated',
    },
    {
      key: '3',
      label: 'System backup completed',
    },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <Header
        style={{
          padding: isMobile ? '0 12px' : '0 24px',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid #dee2e6',
        }}
      >
        <Space size={isMobile ? 'small' : 'middle'}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
              color: '#495057'
            }}
          />
          {!isMobile && (
            <div>
              <Text strong style={{ fontSize: '18px', color: '#495057' }}>
                Focus Stock Brokers
              </Text>
            </div>
          )}
        </Space>

        <Space size={isMobile ? 'small' : 'middle'}>
          {!isMobile && (
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Welcome back, <Text strong>{user?.username || 'Admin'}</Text>
            </Text>
          )}
          


          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar
              style={{
                background: '#6c757d',
                cursor: 'pointer'
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Space>
      </Header>

      <Modal
        title="Admin Panel Help"
        open={helpModal}
        onCancel={() => setHelpModal(false)}
        footer={[
          <Button key="close" onClick={() => setHelpModal(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h4>🚀 Quick Start Guide</h4>
          <ul>
            <li><strong>Dashboard:</strong> Overview of your website statistics</li>
            <li><strong>Page Management:</strong> Edit content and settings for all pages</li>
            <li><strong>Component Management:</strong> Control visibility and content of components</li>
            <li><strong>Document Management:</strong> Upload and manage downloadable files</li>
            <li><strong>Visibility Control:</strong> Centralized control for all elements</li>
            <li><strong>Settings:</strong> System-wide configuration options</li>
          </ul>
          
          <h4>💡 Tips</h4>
          <ul>
            <li>Use the visibility toggles to quickly show/hide elements</li>
            <li>All changes are saved automatically to the database</li>
            <li>Use the backup feature before making major changes</li>
            <li>The admin panel is fully responsive and mobile-friendly</li>
          </ul>
          
          <h4>🔧 Keyboard Shortcuts</h4>
          <ul>
            <li><kbd>Ctrl + S</kbd> - Save current form</li>
            <li><kbd>Ctrl + R</kbd> - Refresh current page</li>
            <li><kbd>F11</kbd> - Toggle fullscreen mode</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default AdminHeader;