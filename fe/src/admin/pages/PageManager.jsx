import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Row, 
  Col, 
  Switch, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Typography,
  Tag,
  Space,
  Divider,
  Tabs
} from 'antd';
import { 
  EditOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  SaveOutlined,
  FileTextOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const PageManager = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ visible: false, page: null });
  const [form] = Form.useForm();

  const pageConfig = {
    homepage: {
      name: 'Homepage',
      icon: '🏠',
      description: 'Main landing page with hero section and key components',
      fields: [
        { key: 'hero.title.main', label: 'Hero Main Title', type: 'input', required: true },
        { key: 'hero.title.highlight', label: 'Hero Highlight Text', type: 'input', required: true },
        { key: 'hero.description', label: 'Hero Description', type: 'textarea', required: true }
      ]
    },
    downloads: {
      name: 'Downloads',
      icon: '📥',
      description: 'Document downloads and resources page',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.subtitle', label: 'Page Subtitle', type: 'textarea', required: true },
        { key: 'emptyState.title', label: 'Empty State Title', type: 'input' },
        { key: 'emptyState.message', label: 'Empty State Message', type: 'input' }
      ]
    },
    policies: {
      name: 'Policies',
      icon: '📋',
      description: 'General policies overview page',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.subtitle', label: 'Page Subtitle', type: 'textarea', required: true },
        { key: 'emptyState.title', label: 'Empty State Title', type: 'input' },
        { key: 'emptyState.message', label: 'Empty State Message', type: 'input' }
      ]
    },
    'terms-of-service': {
      name: 'Terms of Service',
      icon: '📄',
      description: 'Terms and conditions page',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.lastUpdated', label: 'Last Updated Text', type: 'input', required: true },
        { key: 'contact.title', label: 'Contact Section Title', type: 'input' },
        { key: 'contact.text', label: 'Contact Section Text', type: 'textarea' },
        { key: 'contact.details', label: 'Contact Details', type: 'textarea' }
      ]
    },
    'privacy-policy': {
      name: 'Privacy Policy',
      icon: '🔒',
      description: 'Privacy policy and data protection information',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.lastUpdated', label: 'Last Updated Text', type: 'input', required: true },
        { key: 'contact.title', label: 'Privacy Officer Title', type: 'input' },
        { key: 'contact.intro', label: 'Privacy Officer Intro', type: 'textarea' },
        { key: 'contact.details', label: 'Privacy Officer Details', type: 'textarea' }
      ]
    },
    'refund-policy': {
      name: 'Refund Policy',
      icon: '💰',
      description: 'Refund and cancellation policy',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.lastUpdated', label: 'Last Updated Text', type: 'input', required: true },
        { key: 'importantNotice', label: 'Important Notice', type: 'textarea', required: true },
        { key: 'contact.title', label: 'Contact Section Title', type: 'input' },
        { key: 'contact.intro', label: 'Contact Section Intro', type: 'textarea' },
        { key: 'contact.details', label: 'Contact Details', type: 'textarea' }
      ]
    },
    'grievance-policy': {
      name: 'Grievance Policy',
      icon: '📞',
      description: 'Customer grievance and complaint handling',
      fields: [
        { key: 'header.title', label: 'Page Title', type: 'input', required: true },
        { key: 'header.lastUpdated', label: 'Last Updated Text', type: 'input', required: true },
        { key: 'content.commitment', label: 'Commitment Statement', type: 'textarea', required: true }
      ]
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/pages');
      const pagesData = {};
      
      if (Array.isArray(response.data)) {
        response.data.forEach(page => {
          pagesData[page.name] = page;
        });
      }
      
      // Initialize missing pages
      Object.keys(pageConfig).forEach(key => {
        if (!pagesData[key]) {
          pagesData[key] = {
            name: key,
            isActive: true,
            data: {},
            lastModified: new Date().toISOString()
          };
        }
      });
      
      setPages(pagesData);
    } catch (error) {
      console.error('Error fetching pages:', error);
      // Initialize with default structure
      const defaultPages = {};
      Object.keys(pageConfig).forEach(key => {
        defaultPages[key] = {
          name: key,
          isActive: true,
          data: {},
          lastModified: new Date().toISOString()
        };
      });
      setPages(defaultPages);
    } finally {
      setLoading(false);
    }
  };

  const togglePageStatus = async (pageKey) => {
    try {
      const updatedPage = {
        ...pages[pageKey],
        isActive: !pages[pageKey]?.isActive,
        lastModified: new Date().toISOString()
      };
      
      await axios.put(`/pages/${pageKey}`, updatedPage);
      
      setPages(prev => ({
        ...prev,
        [pageKey]: updatedPage
      }));
      
      message.success(`${pageConfig[pageKey].name} status updated`);
    } catch (error) {
      console.error('Error updating page status:', error);
      message.error('Failed to update page status');
    }
  };

  const openEditModal = (pageKey) => {
    // Navigate to specific page editor based on page type
    const editorRoutes = {
      'homepage': '/admin/pages/homepage',
      'downloads': '/admin/pages/downloads', 
      'policies': '/admin/pages/policies',
      'terms-of-service': '/admin/pages/terms-of-service',
      'privacy-policy': '/admin/pages/privacy-policy',
      'refund-policy': '/admin/pages/refund-policy',
      'grievance-policy': '/admin/pages/grievance-policy'
    };
    
    if (editorRoutes[pageKey]) {
      navigate(editorRoutes[pageKey]);
    } else {
      // Fallback to modal for unknown page types
      const pageData = pages[pageKey]?.data || {};
      form.setFieldsValue(pageData);
      setEditModal({ visible: true, page: pageKey });
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const pageKey = editModal.page;
      
      const updatedPage = {
        ...pages[pageKey],
        data: values,
        lastModified: new Date().toISOString()
      };
      
      await axios.put(`/pages/${pageKey}`, updatedPage);
      
      setPages(prev => ({
        ...prev,
        [pageKey]: updatedPage
      }));
      
      setEditModal({ visible: false, page: null });
      form.resetFields();
      message.success(`${pageConfig[pageKey].name} updated successfully`);
    } catch (error) {
      console.error('Error saving page:', error);
      message.error('Failed to save page');
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'input':
        return <Input placeholder={`Enter ${field.label.toLowerCase()}`} />;
      case 'textarea':
        return <TextArea rows={4} placeholder={`Enter ${field.label.toLowerCase()}`} />;
      case 'switch':
        return <Switch />;
      case 'select':
        return (
          <Select placeholder={`Select ${field.label.toLowerCase()}`}>
            {field.options?.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  const getStatusColor = (isActive) => isActive ? 'success' : 'error';
  const getStatusText = (isActive) => isActive ? 'Active' : 'Inactive';

  return (
    <div className="fade-in">
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <Title level={2} style={{ color: '#495057', margin: 0 }}>
          Page Management
        </Title>
        <Text style={{ color: '#6c757d', fontSize: '16px' }}>
          Manage all website pages, their content, and visibility
        </Text>
      </div>

      <Row gutter={[0, 24]}>
        {Object.entries(pageConfig).map(([key, config]) => {
          const page = pages[key] || { isActive: true, data: {}, lastModified: new Date().toISOString() };
          
          return (
            <Col xs={24} key={key}>
              <Card
                style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '24px' }}>{config.icon}</span>
                    <div>
                      <Title level={5} style={{ margin: 0, color: '#495057' }}>
                        {config.name}
                      </Title>
                      <Text style={{ color: '#6c757d', fontSize: '14px' }}>
                        {config.description}
                      </Text>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: '12px', color: '#6c757d', display: 'block' }}>Status</Text>
                      <Switch
                        checked={page.isActive}
                        onChange={() => togglePageStatus(key)}
                        size="small"
                      />
                    </div>
                    
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => openEditModal(key)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>
              {editModal.page ? pageConfig[editModal.page]?.icon : ''}
            </span>
            Edit {editModal.page ? pageConfig[editModal.page]?.name : ''}
          </div>
        }
        open={editModal.visible}
        onCancel={() => {
          setEditModal({ visible: false, page: null });
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setEditModal({ visible: false, page: null });
            form.resetFields();
          }}>
            Cancel
          </Button>,
          <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save Changes
          </Button>
        ]}
        width={900}
        style={{ top: 20 }}
      >
        {editModal.page && (
          <Form
            form={form}
            layout="vertical"
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
          >
            {pageConfig[editModal.page]?.fields.map((field) => (
              <Form.Item
                key={field.key}
                name={field.key}
                label={field.label}
                rules={[{ required: field.required, message: `Please enter ${field.label.toLowerCase()}` }]}
              >
                {renderField(field)}
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default PageManager;