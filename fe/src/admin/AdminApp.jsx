import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme as antTheme } from 'antd';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PageEditor from './pages/PageEditor';
import DocumentManager from './pages/DocumentManager';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { AuthProvider, useAuth } from './context/AuthContext';
import './admin.css';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar collapsed={collapsed} isMobile={isMobile} />
      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) }}>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
        <Content style={{ 
          margin: isMobile ? '64px 8px 8px' : '24px 16px', 
          padding: isMobile ? 12 : 24, 
          background: '#fff',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/admin/login" />;
};

const AdminApp = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#0077ff',
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/:pageName" element={
              <ProtectedRoute>
                <PageEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/documents" element={
              <ProtectedRoute>
                <DocumentManager />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default AdminApp;