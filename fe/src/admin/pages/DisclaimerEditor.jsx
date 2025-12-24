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
  Avatar,
  Alert
} from 'antd';
import { 
  SaveOutlined, 
  EyeOutlined, 
  PlusOutlined, 
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  WarningOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;
const { TextArea } = Input;


const DisclaimerEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);



  const fetchContent = async () => {
    try {
      const response = await axios.get('/content/disclaimer');
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
          title: 'Disclaimer',
          lastUpdated: `Last updated: ${new Date().toLocaleDateString()}`,
          introduction: 'Please read the following disclaimers carefully before using our services.',
          sections: [{
            id: Date.now().toString(),
            title: 'General Disclaimer',
            content: [{ type: 'paragraph', text: 'Information provided is for general purposes only.' }]
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
      const formValues = await form.validateFields();
      
      const payload = {
        ...formValues,
        sections: sections.filter(section => 
          section.title.trim() && 
          section.content.some(c => c.text?.trim() || c.items?.some(i => i.trim()))
        )
      };

      await axios.post('/content/disclaimer', payload);

      message.success('Disclaimer saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      message.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setSections([...sections, {
      id: Date.now().toString(),
      title: 'New Disclaimer Section',
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
        <div style={{ marginTop: 16 }}>Loading Disclaimer Editor...</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar size={48} style={{ background: '#fa541c' }}>
            <WarningOutlined style={{ fontSize: 24, color: 'white' }} />
          </Avatar>
          <div>
            <Title level={2} style={{ margin: 0 }}>Disclaimer Editor</Title>
            <Text type="secondary">Manage legal disclaimers and risk warnings</Text>
          </div>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={18}>
          <Alert
            message="Legal Notice"
            description="Ensure all disclaimers comply with regulations and are reviewed by legal counsel."
            type="warning"
            showIcon
            style={{ marginBottom: 24, borderRadius: 8 }}
          />

          <Form form={form} layout="vertical">
            <Card title="⚠️ Basic Information" style={{ marginBottom: 24, borderRadius: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Page Title" name="title" rules={[{ required: true }]}>
                    <Input size="large" placeholder="Disclaimer" />
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
                  <span>⚖️ Disclaimer Sections</span>
                  <Badge count={sections.length} style={{ backgroundColor: '#fa541c' }} />
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <WarningOutlined style={{ color: '#fa541c' }} />
                      <Input 
                        value={section.title} 
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        placeholder="Section title"
                        style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
                      />
                    </div>
                  }
                  extra={
                    <Space>
                      <Tooltip title="Add Warning Text">
                        <Button 
                          type="text" 
                          icon={<FileTextOutlined />}
                          onClick={() => addContent(section.id, 'paragraph')}
                          style={{ color: '#ffc107' }}
                        />
                      </Tooltip>
                      <Tooltip title="Add Risk List">
                        <Button 
                          type="text" 
                          icon={<UnorderedListOutlined />}
                          onClick={() => addContent(section.id, 'list')}
                          style={{ color: '#dc3545' }}
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
                      border: '2px solid #fff3cd',
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
                          <Select.Option value="paragraph">Warning Text</Select.Option>
                          <Select.Option value="list">Risk List</Select.Option>
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
                          placeholder="Enter disclaimer or warning text..."
                        />
                      ) : (
                        <div>
                          {(content.items || []).map((item, itemIndex) => (
                            <div key={itemIndex} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <Input 
                                value={item}
                                onChange={(e) => updateListItem(section.id, contentIndex, itemIndex, e.target.value)}
                                placeholder="Risk or warning point..."
                                prefix="⚠️"
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
                            Add Risk Point
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
                  onClick={() => window.open('/disclaimer', '_blank')}
                  size="large"
                  block
                >
                  Preview Page
                </Button>
              </Space>
            </Card>

            <Card title="⚖️ Legal Guidelines" style={{ borderRadius: 12 }}>
              <Space direction="vertical" size="small">
                <Text type="secondary" style={{ fontSize: 12 }}>• Include all material risks</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• Use clear language</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• Update with regulatory changes</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• Review with legal counsel</Text>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DisclaimerEditor;