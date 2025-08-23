import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Row,
  Col,
  message,
  Spin,
  Select,
  Popconfirm,
  Badge,
  Tooltip,
  Avatar
} from 'antd';
import { 
  SaveOutlined, 
  EyeOutlined, 
  PlusOutlined, 
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  SettingOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const API_BASE_URL = 'http://localhost:5000/api';

const PrivacyPolicyEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token ? 'EXISTS' : 'NOT FOUND');
    console.log('Token length:', token ? token.length : 0);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/privacy-policy`);
      const data = response.data;
      
      form.setFieldsValue({
        title: data.title,
        lastUpdated: data.lastUpdated,
        introduction: data.introduction
      });
      setSections(data.sections || []);
    } catch (error) {
      if (error.response?.status === 404) {
        // Initialize with default data
        const defaultData = {
          title: 'Privacy Policy',
          lastUpdated: `Last updated: ${new Date().toLocaleDateString()}`,
          introduction: 'Focus Stock Brokers is committed to protecting your privacy.',
          sections: [{
            id: Date.now().toString(),
            title: 'Information We Collect',
            content: [{ type: 'paragraph', text: 'We collect information to provide better services.' }]
          }]
        };
        
        form.setFieldsValue(defaultData);
        setSections(defaultData.sections);
      } else {
        message.error('Failed to load content');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('=== SAVE ATTEMPT ===');
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        message.error('Please login first');
        window.location.href = '/admin/login';
        return;
      }
      
      const formValues = await form.validateFields();
      console.log('Form validated successfully');
      
      const payload = {
        ...formValues,
        sections: sections.filter(section => 
          section.title.trim() && 
          section.content.some(c => c.text?.trim() || c.items?.some(i => i.trim()))
        )
      };
      
      console.log('Payload prepared:', Object.keys(payload));
      console.log('Making API call to:', `${API_BASE_URL}/content/privacy-policy`);

      const response = await axios.post(`${API_BASE_URL}/content/privacy-policy`, payload, {
        headers: getAuthHeaders()
      });
      
      console.log('API call successful:', response.status);
      message.success('Privacy Policy saved successfully!');
    } catch (error) {
      console.error('=== SAVE ERROR ===');
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.response?.data?.message);
      console.error('Full error:', error);
      
      if (error.response?.status === 401) {
        message.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      } else {
        message.error('Failed to save. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setSections([...sections, {
      id: Date.now().toString(),
      title: 'New Section',
      content: [{ type: 'paragraph', text: '' }]
    }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addContent = (sectionId, type) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, content: [...s.content, type === 'list' ? { type, items: [''] } : { type, text: '' }] }
        : s
    ));
  };

  const removeContent = (sectionId, index) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, content: s.content.filter((_, i) => i !== index) }
        : s
    ));
  };

  const updateContent = (sectionId, index, field, value) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, content: s.content.map((c, i) => i === index ? { ...c, [field]: value } : c) }
        : s
    ));
  };

  const addListItem = (sectionId, contentIndex) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { 
            ...s, 
            content: s.content.map((c, i) => 
              i === contentIndex ? { ...c, items: [...(c.items || []), ''] } : c
            )
          }
        : s
    ));
  };

  const removeListItem = (sectionId, contentIndex, itemIndex) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { 
            ...s, 
            content: s.content.map((c, i) => 
              i === contentIndex ? { ...c, items: c.items.filter((_, ii) => ii !== itemIndex) } : c
            )
          }
        : s
    ));
  };

  const updateListItem = (sectionId, contentIndex, itemIndex, value) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { 
            ...s, 
            content: s.content.map((c, i) => 
              i === contentIndex ? { ...c, items: c.items.map((item, ii) => ii === itemIndex ? value : item) } : c
            )
          }
        : s
    ));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading Privacy Policy Editor...</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar size={48} style={{ background: '#1890ff' }}>
            <SettingOutlined style={{ fontSize: 24, color: 'white' }} />
          </Avatar>
          <div>
            <Title level={2} style={{ margin: 0 }}>Privacy Policy Editor</Title>
            <Text type="secondary">Manage your privacy policy content</Text>
          </div>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={18}>
          <Form form={form} layout="vertical">
            <Card title="📋 Basic Information" style={{ marginBottom: 24, borderRadius: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Page Title" name="title" rules={[{ required: true }]}>
                    <Input size="large" placeholder="Privacy Policy" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Updated" name="lastUpdated" rules={[{ required: true }]}>
                    <Input size="large" placeholder="Last updated: January 15, 2024" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Introduction" name="introduction" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Write an introduction..." />
              </Form.Item>
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>📝 Content Sections</span>
                  <Badge count={sections.length} style={{ backgroundColor: '#1890ff' }} />
                </div>
              }
              extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={addSection}>
                  Add Section
                </Button>
              }
              style={{ borderRadius: 12 }}
            >
              {sections.map((section) => (
                <Card 
                  key={section.id}
                  size="small"
                  style={{ marginBottom: 16, borderRadius: 8 }}
                  title={
                    <Input 
                      value={section.title} 
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                      placeholder="Section title"
                      style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
                    />
                  }
                  extra={
                    <Space>
                      <Tooltip title="Add Paragraph">
                        <Button 
                          type="text" 
                          icon={<FileTextOutlined />}
                          onClick={() => addContent(section.id, 'paragraph')}
                        />
                      </Tooltip>
                      <Tooltip title="Add List">
                        <Button 
                          type="text" 
                          icon={<UnorderedListOutlined />}
                          onClick={() => addContent(section.id, 'list')}
                        />
                      </Tooltip>
                      <Popconfirm title="Delete section?" onConfirm={() => removeSection(section.id)}>
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Space>
                  }
                >
                  {section.content?.map((content, contentIndex) => (
                    <div key={contentIndex} style={{ 
                      background: 'white',
                      border: '2px solid #e3f2fd',
                      borderRadius: 8,
                      padding: 16,
                      marginBottom: 12,
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Select 
                          value={content.type} 
                          onChange={(value) => {
                            updateContent(section.id, contentIndex, 'type', value);
                            if (value === 'list') {
                              updateContent(section.id, contentIndex, 'items', ['']);
                            } else {
                              updateContent(section.id, contentIndex, 'text', '');
                            }
                          }}
                          style={{ width: 140 }}
                        >
                          <Select.Option value="paragraph">Paragraph</Select.Option>
                          <Select.Option value="list">List</Select.Option>
                        </Select>
                        <Button 
                          danger 
                          size="small" 
                          icon={<DeleteOutlined />}
                          onClick={() => removeContent(section.id, contentIndex)}
                        />
                      </div>

                      {content.type === 'paragraph' ? (
                        <TextArea 
                          value={content.text || ''} 
                          onChange={(e) => updateContent(section.id, contentIndex, 'text', e.target.value)}
                          rows={4}
                          placeholder="Enter paragraph content..."
                        />
                      ) : (
                        <div>
                          {(content.items || []).map((item, itemIndex) => (
                            <div key={itemIndex} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <Input 
                                value={item}
                                onChange={(e) => updateListItem(section.id, contentIndex, itemIndex, e.target.value)}
                                placeholder="List item..."
                                prefix="•"
                              />
                              <Button 
                                danger 
                                size="small" 
                                icon={<DeleteOutlined />}
                                onClick={() => removeListItem(section.id, contentIndex, itemIndex)}
                              />
                            </div>
                          ))}
                          <Button 
                            type="dashed" 
                            size="small" 
                            icon={<PlusOutlined />}
                            onClick={() => addListItem(section.id, contentIndex)}
                            style={{ width: '100%' }}
                          >
                            Add List Item
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </Card>
              ))}
            </Card>
          </Form>
        </Col>

        <Col span={6}>
          <div style={{ position: 'sticky', top: 24 }}>
            <Card title="🚀 Actions" style={{ marginBottom: 16, borderRadius: 12 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  loading={saving} 
                  onClick={handleSave}
                  size="large"
                  block
                >
                  Save Changes
                </Button>
                <Button 
                  icon={<EyeOutlined />} 
                  onClick={() => window.open('/privacy-policy', '_blank')}
                  size="large"
                  block
                >
                  Preview Page
                </Button>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PrivacyPolicyEditor;