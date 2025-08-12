import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Space, Typography, Tag } from 'antd';
import {
  FileTextOutlined,
  CloudDownloadOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPages: 0,
    totalDocuments: 0,
    totalDownloads: 0
  });
  const [recentPages, setRecentPages] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [pagesRes, documentsRes] = await Promise.all([
        axios.get('/pages'),
        axios.get('/documents').catch(() => ({ data: [] }))
      ]);

      const pages = pagesRes.data;
      const documents = documentsRes.data;

      setStats({
        totalPages: pages.length,
        totalDocuments: documents.length,
        totalDownloads: documents.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0)
      });

      setRecentPages(pages.slice(0, 5));
      setRecentDocuments(documents.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pageColumns = [
    {
      title: 'Page Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Tag color="blue">{name}</Tag>
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/pages/${record.name}`)}
          >
            Edit
          </Button>
        </Space>
      )
    }
  ];

  const documentColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag>{category}</Tag>
    },
    {
      title: 'Downloads',
      dataIndex: 'downloadCount',
      key: 'downloadCount',
      render: (count) => count || 0
    },
    {
      title: 'Upload Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div className="fade-in">
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(50px, -50px)'
        }} />
        <Title level={2} style={{ color: 'white', margin: 0, position: 'relative', zIndex: 1 }}>
          📊 Dashboard Overview
        </Title>
        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', position: 'relative', zIndex: 1 }}>
          Welcome back! Here's what's happening with your content.
        </Text>
      </div>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="slide-up" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <Statistic
              title="📄 Total Pages"
              value={stats.totalPages}
              loading={loading}
              valueStyle={{ color: '#3b82f6', fontSize: window.innerWidth <= 576 ? '20px' : '24px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="slide-up" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            animationDelay: '0.1s'
          }}>
            <Statistic
              title="📁 Total Documents"
              value={stats.totalDocuments}
              loading={loading}
              valueStyle={{ color: '#10b981', fontSize: window.innerWidth <= 576 ? '20px' : '24px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="slide-up" style={{
            background: 'linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(245, 101, 101, 0.05))',
            border: '1px solid rgba(245, 101, 101, 0.2)',
            animationDelay: '0.2s'
          }}>
            <Statistic
              title="📈 Total Downloads"
              value={stats.totalDownloads}
              loading={loading}
              valueStyle={{ color: '#f56565', fontSize: window.innerWidth <= 576 ? '20px' : '24px' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card
            title="Recent Pages"
            extra={
              <Button type="link" size={window.innerWidth <= 576 ? 'small' : 'middle'} onClick={() => navigate('/admin/pages/homepage')}>
                View All
              </Button>
            }
          >
            <Table
              columns={pageColumns}
              dataSource={recentPages}
              rowKey="_id"
              pagination={false}
              loading={loading}
              size={window.innerWidth <= 768 ? 'small' : 'middle'}
              scroll={{ x: 400 }}
            />
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card
            title="Recent Documents"
            extra={
              <Button type="link" size={window.innerWidth <= 576 ? 'small' : 'middle'} onClick={() => navigate('/admin/documents')}>
                View All
              </Button>
            }
          >
            <Table
              columns={documentColumns}
              dataSource={recentDocuments}
              rowKey="_id"
              pagination={false}
              loading={loading}
              size={window.innerWidth <= 768 ? 'small' : 'middle'}
              scroll={{ x: 400 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;