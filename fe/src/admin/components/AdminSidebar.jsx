import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import logo1 from '../../assets/logo1.png';
import {
  DashboardOutlined,
  FileTextOutlined,
  CloudDownloadOutlined,
  SettingOutlined,
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  DownloadOutlined,
  SafetyOutlined,
  EyeOutlined,
  MobileOutlined,
  StarOutlined,
  TrophyOutlined,
  MessageOutlined,
  GlobalOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);
  
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);
  
  return matches;
};

const AdminSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
          key: '/admin/pages',
          label: 'All Pages',
          icon: <FileTextOutlined />
        },
        {
          key: '/admin/pages/homepage',
          label: 'Homepage',
          icon: <HomeOutlined />
        },
        {
          key: '/admin/pages/downloads',
          label: 'Downloads',
          icon: <DownloadOutlined />
        },
        {
          key: '/admin/pages/policies',
          label: 'Policies',
          icon: <SafetyOutlined />
        },
        {
          key: '/admin/pages/privacy-policy',
          label: 'Privacy Policy',
          icon: <EyeOutlined />
        },
        {
          key: '/admin/pages/disclaimer',
          label: 'Disclaimer',
          icon: <SafetyOutlined />
        },
        {
          key: '/admin/pages/investor-charter',
          label: 'Investor Charter',
          icon: <FileTextOutlined />
        },
      ],
    },
    {
      key: '/admin/footer',
      icon: <GlobalOutlined />,
      label: 'Footer Management',
    },
    {
      key: 'components',
      icon: <AppstoreOutlined />,
      label: 'Components',
      children: [
      ],
    },

    {
      key: '/admin/documents',
      icon: <CloudDownloadOutlined />,
      label: 'Documents',
    },
    {
      key: '/admin/visibility',
      icon: <EyeOutlined />,
      label: 'Visibility Control',
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
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };
  
  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const closeMobile = () => {
    setMobileOpen(false);
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('/pages/')) {
      return [path];
    }
    return [path];
  };

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/pages/')) {
      setOpenKeys(['pages']);

    } else {
      setOpenKeys([]);
    }
  }, [location.pathname]);

  return (
    <>
      {isMobile && (
        <>
          <div 
            className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}
            onClick={closeMobile}
          />
          <button 
            className="mobile-menu-button"
            onClick={toggleMobile}
            style={{
              position: 'fixed',
              top: '16px',
              left: '16px',
              zIndex: 1002
            }}
          >
            <MenuOutlined />
          </button>
        </>
      )}
      <Sider
        trigger={null}
        collapsible
        collapsed={!isMobile && collapsed}
        className={isMobile && mobileOpen ? 'mobile-sidebar-open' : ''}
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
        height: collapsed ? 64 : 80,
        margin: '16px',
        // background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        transition: 'all 0.2s ease'
      }}>
        {collapsed ? (
          <img 
            src={logo1} 
            alt="Logo" 
            style={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain'
            }} 
          />
        ) : (
          <img 
            src={logo1} 
            alt="Focus Stock Brokers" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '60px', 
              objectFit: 'contain'
            }} 
          />
        )}
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
    </>
  );
};

export default AdminSidebar;