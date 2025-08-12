import React, { useState, useEffect } from 'react';
import { Card, Switch, Typography, Row, Col, message, Spin } from 'antd';
import axios from '../../utils/axios';

const { Title, Text } = Typography;

const VisibilityControl = () => {
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState({});

  const components = {
    homepage: [
      { key: 'hero', label: 'Hero Section', icon: '🎯' },
      { key: 'about', label: 'About Us', icon: '👥' },
      { key: 'products', label: 'Product Grid', icon: '📊' },
      { key: 'whychoose', label: 'Why Choose Us', icon: '⭐' },
      { key: 'testimonials', label: 'Testimonials', icon: '💬' },
      { key: 'mobileapp', label: 'Mobile App', icon: '📱' },
      { key: 'slider', label: 'Advanced Slider', icon: '🎠' },
      { key: 'attention', label: 'Attention Investors', icon: '⚠️' },
      { key: 'header', label: 'Header Navigation', icon: '🧭' },
      { key: 'footer', label: 'Footer', icon: '📄' },
      { key: 'stats', label: 'Statistics Section', icon: '📈' },
      { key: 'cta', label: 'Call to Action', icon: '📢' }
    ],
    downloads: [
      { key: 'header', label: 'Page Header', icon: '📋' },
      { key: 'searchbar', label: 'Search Bar', icon: '🔍' },
      { key: 'filters', label: 'Category Filters', icon: '🏷️' },
      { key: 'sorting', label: 'Sort Options', icon: '🔄' },
      { key: 'documentcards', label: 'Document Cards', icon: '📁' },
      { key: 'pagination', label: 'Pagination', icon: '📄' },
      { key: 'breadcrumb', label: 'Breadcrumb', icon: '🍞' },
      { key: 'emptystate', label: 'Empty State', icon: '📭' }
    ],
    policies: [
      { key: 'header', label: 'Page Header', icon: '📋' },
      { key: 'searchbar', label: 'Search Bar', icon: '🔍' },
      { key: 'filters', label: 'Department Filters', icon: '🏢' },
      { key: 'sorting', label: 'Sort Options', icon: '🔄' },
      { key: 'policycards', label: 'Policy Cards', icon: '📜' },
      { key: 'breadcrumb', label: 'Breadcrumb', icon: '🍞' },
      { key: 'emptystate', label: 'Empty State', icon: '📭' }
    ],
    'privacy-policy': [
      { key: 'header', label: 'Page Header', icon: '🔒' },
      { key: 'tableofcontents', label: 'Table of Contents', icon: '📑' },
      { key: 'sections', label: 'Content Sections', icon: '📝' },
      { key: 'contactinfo', label: 'Contact Information', icon: '📞' }
    ],
    'terms-of-service': [
      { key: 'header', label: 'Page Header', icon: '📋' },
      { key: 'tableofcontents', label: 'Table of Contents', icon: '📑' },
      { key: 'sections', label: 'Content Sections', icon: '📝' },
      { key: 'contactinfo', label: 'Contact Information', icon: '📞' }
    ],
    'refund-policy': [
      { key: 'header', label: 'Page Header', icon: '💰' },
      { key: 'tableofcontents', label: 'Table of Contents', icon: '📑' },
      { key: 'sections', label: 'Content Sections', icon: '📝' },
      { key: 'contactinfo', label: 'Contact Information', icon: '📞' }
    ],
    'grievance-policy': [
      { key: 'header', label: 'Page Header', icon: '📞' },
      { key: 'tableofcontents', label: 'Table of Contents', icon: '📑' },
      { key: 'sections', label: 'Content Sections', icon: '📝' },
      { key: 'contactinfo', label: 'Contact Information', icon: '📞' }
    ],
    contact: [
      { key: 'header', label: 'Page Header', icon: '📞' },
      { key: 'contactform', label: 'Contact Form', icon: '📧' },
      { key: 'contactinfo', label: 'Contact Information', icon: '📍' },
      { key: 'map', label: 'Location Map', icon: '🗺️' },
      { key: 'socialmedia', label: 'Social Media Links', icon: '🌐' },
      { key: 'officelocations', label: 'Office Locations', icon: '🏢' }
    ],
    products: [
      { key: 'header', label: 'Page Header', icon: '🛍️' },
      { key: 'productgrid', label: 'Product Grid', icon: '📦' },
      { key: 'filters', label: 'Product Filters', icon: '🔍' },
      { key: 'sorting', label: 'Sort Options', icon: '🔄' },
      { key: 'productdetails', label: 'Product Details', icon: '📝' },
      { key: 'pricing', label: 'Pricing Cards', icon: '💲' },
      { key: 'features', label: 'Feature Comparison', icon: '⚖️' },
      { key: 'testimonials', label: 'Product Reviews', icon: '⭐' }
    ],
    global: [
      { key: 'navbar', label: 'Navigation Bar', icon: '🧭' },
      { key: 'footer', label: 'Footer', icon: '📄' },
      { key: 'chatbot', label: 'Chat Support', icon: '💬' },
      { key: 'notifications', label: 'Notifications', icon: '🔔' },
      { key: 'cookies', label: 'Cookie Banner', icon: '🍪' },
      { key: 'loading', label: 'Loading Screens', icon: '⏳' }
    ]
  };

  useEffect(() => {
    fetchVisibilitySettings();
  }, []);

  const fetchVisibilitySettings = async () => {
    try {
      const response = await axios.get('/visibility').catch(() => ({ data: {} }));
      setVisibility(response.data);
    } catch (error) {
      console.error('Error fetching visibility settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (page, component, checked) => {
    try {
      const newVisibility = {
        ...visibility,
        [page]: {
          ...visibility[page],
          [component]: checked
        }
      };
      
      setVisibility(newVisibility);
      
      await axios.put('/visibility', {
        page,
        component,
        visible: checked
      }).catch(() => {});
      
      message.success(`${component} ${checked ? 'shown' : 'hidden'} successfully`);
    } catch (error) {
      message.error('Failed to update visibility');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <Title level={2} style={{ color: '#495057', margin: 0 }}>
          Visibility Control
        </Title>
        <Text style={{ color: '#6c757d', fontSize: '16px' }}>
          Control which components are visible on each page
        </Text>
      </div>

      <Row gutter={[0, 24]}>
        {Object.entries(components).map(([page, pageComponents]) => (
          <Col xs={24} key={page}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>
                    {page === 'homepage' ? '🏠' : 
                     page === 'downloads' ? '📥' : 
                     page === 'policies' ? '📜' :
                     page === 'privacy-policy' ? '🔒' :
                     page === 'terms-of-service' ? '📋' :
                     page === 'refund-policy' ? '💰' :
                     page === 'grievance-policy' ? '📞' :
                     page === 'contact' ? '📞' :
                     page === 'products' ? '🛍️' : '🌐'}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </span>
                </div>
              }
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              headStyle={{ 
                background: '#f8f9fa',
                borderBottom: '2px solid #dee2e6',
                borderRadius: '12px 12px 0 0'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              {pageComponents.map(({ key, label, icon }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 12px',
                    borderBottom: '1px solid #e9ecef',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    background: visibility[page]?.[key] !== false ? '#f8f9fa' : '#ffffff',
                    border: '1px solid #dee2e6',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{icon}</span>
                    <Text style={{ fontSize: '14px', fontWeight: '500' }}>{label}</Text>
                  </div>
                  <Switch
                    checked={visibility[page]?.[key] !== false}
                    onChange={(checked) => handleToggle(page, key, checked)}
                  />
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VisibilityControl;