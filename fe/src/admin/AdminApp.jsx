import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme as antTheme } from 'antd';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PageEditor from './pages/PageEditor';
import DocumentManager from './pages/DocumentManager';

import PageManager from './pages/PageManager';
import VisibilityControl from './pages/VisibilityControl';
import Settings from './pages/Settings';
import PageNotAvailable from './pages/PageNotAvailable';
import DownloadsEditor from './pages/DownloadsEditor';
import PoliciesEditor from './pages/PoliciesEditor';
import PrivacyPolicyEditor from './pages/PrivacyPolicyEditor';
import DisclaimerEditor from './pages/DisclaimerEditor';
import InvestorCharterAdmin from './components/InvestorCharterAdmin';
import FooterAdmin from './components/FooterAdmin';
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
      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 256) }}>
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
            <Route path="/admin/pages/homepage" element={
              <ProtectedRoute>
                <PageEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/downloads" element={
              <ProtectedRoute>
                <DownloadsEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/policies" element={
              <ProtectedRoute>
                <PoliciesEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/privacy-policy" element={
              <ProtectedRoute>
                <PrivacyPolicyEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/disclaimer" element={
              <ProtectedRoute>
                <DisclaimerEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/investor-charter" element={
              <ProtectedRoute>
                <InvestorCharterAdmin />
              </ProtectedRoute>
            } />
            <Route path="/admin/footer" element={
              <ProtectedRoute>
                <FooterAdmin />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages" element={
              <ProtectedRoute>
                <PageManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/pages/:pageName" element={
              <ProtectedRoute>
                <PageEditor />
              </ProtectedRoute>
            } />

            <Route path="/admin/documents" element={
              <ProtectedRoute>
                <PageNotAvailable pageName="Documents" />
              </ProtectedRoute>
            } />
            <Route path="/admin/visibility" element={
              <ProtectedRoute>
                <VisibilityControl />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <PageNotAvailable pageName="Settings" />
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