import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Spin, Alert } from 'antd';
import { EditOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/pages/homepage');
      setPageData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setError('Failed to load homepage data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate('/admin/pages/homepage');
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Loading homepage data...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Homepage"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={fetchPageData}>
            Retry
          </Button>
        }
      />
    );
  }

  const getSectionStatus = (section) => {
    if (!pageData || !pageData[section]) return 'empty';
    
    const sectionData = pageData[section];
    const hasContent = Object.values(sectionData).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v && v.toString().trim() !== '');
      }
      return value && value.toString().trim() !== '';
    });
    
    return hasContent ? 'complete' : 'incomplete';
  };

  const sections = [
    { key: 'hero', title: 'Hero Section', description: 'Main banner with title and call-to-action' },
    { key: 'about', title: 'About Section', description: 'Company story and milestones' },
    { key: 'whyChooseUs', title: 'Why Choose Us', description: 'Key advantages and benefits', adminPath: '/admin/why-choose-us' },
    { key: 'productGrid', title: 'Products', description: 'Service offerings grid' },
    { key: 'mobileApp', title: 'Mobile Apps', description: 'Trading and mutual funds apps' },
    { key: 'testimonials', title: 'Testimonials', description: 'Customer reviews and feedback' },
    { key: 'contact', title: 'Contact Section', description: 'Contact form and information' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return '#52c41a';
      case 'incomplete': return '#faad14';
      case 'empty': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'complete': return 'Complete';
      case 'incomplete': return 'Needs Content';
      case 'empty': return 'Empty';
      default: return 'Unknown';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Homepage Management
          </Title>
          <Text type="secondary">
            Manage your homepage content and structure
          </Text>
        </div>
        <Space>
          <Button icon={<EyeOutlined />} onClick={handlePreview}>
            Preview Live Site
          </Button>
          <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
            Edit Homepage
          </Button>
        </Space>
      </div>

      {/* Overview Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                {sections.filter(s => getSectionStatus(s.key) === 'complete').length}
              </Title>
              <Text type="secondary">Complete Sections</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#faad14', margin: 0 }}>
                {sections.filter(s => getSectionStatus(s.key) === 'incomplete').length}
              </Title>
              <Text type="secondary">Needs Content</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#ff4d4f', margin: 0 }}>
                {sections.filter(s => getSectionStatus(s.key) === 'empty').length}
              </Title>
              <Text type="secondary">Empty Sections</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Sections Grid */}
      <Row gutter={[16, 16]}>
        {sections.map(section => {
          const status = getSectionStatus(section.key);
          return (
            <Col xs={24} sm={12} lg={8} key={section.key}>
              <Card
                hoverable
                style={{ 
                  height: '100%',
                  borderLeft: `4px solid ${getStatusColor(status)}`
                }}
                actions={[
                  <Button 
                    type="link" 
                    icon={<EditOutlined />}
                    onClick={() => {
                      if (section.adminPath) {
                        navigate(section.adminPath);
                      } else {
                        handleEdit();
                      }
                    }}
                  >
                    Edit
                  </Button>
                ]}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ margin: '0 0 8px 0' }}>
                      {section.title}
                    </Title>
                    <Paragraph 
                      type="secondary" 
                      style={{ margin: '0 0 12px 0', fontSize: '14px' }}
                    >
                      {section.description}
                    </Paragraph>
                  </div>
                  <div style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: getStatusColor(status),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {getStatusText(status)}
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Quick Actions */}
      <Card 
        title="Quick Actions" 
        style={{ marginTop: 24 }}
        extra={
          <Button type="link" icon={<SettingOutlined />}>
            Settings
          </Button>
        }
      >
        <Space wrap>
          <Button onClick={handleEdit}>
            Edit All Sections
          </Button>
          <Button onClick={handlePreview}>
            Preview Changes
          </Button>
          <Button onClick={fetchPageData}>
            Refresh Data
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default HomePage;