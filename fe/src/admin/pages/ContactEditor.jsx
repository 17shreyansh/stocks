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
  PhoneOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { contactAPI } from '../../utils/contactAPI';

const { Title, Text } = Typography;
const { TextArea } = Input;

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ContactEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactCards, setContactCards] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);



  const fetchContent = async () => {
    try {
      console.log('Fetching contact content...');
      const response = await contactAPI.getContent();
      const data = response.data;
      
      console.log('Fetched data:', data);
      
      // Ensure data has the expected structure
      const hero = data.hero || {
        title: 'Contact Us',
        subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
      };
      
      const contactCards = Array.isArray(data.contactCards) ? data.contactCards : [
        {
          id: 'support',
          icon: 'phone',
          title: 'Customer Support',
          description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
          contact: 'care@proficientgroup.in',
          type: 'email'
        }
      ];
      
      const tabs = Array.isArray(data.tabs) ? data.tabs : [
        {
          id: 'callback',
          title: 'Request Callback',
          subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.',
          content: {}
        }
      ];
      
      form.setFieldsValue({ hero });
      setContactCards(contactCards);
      setTabs(tabs);
      
      console.log('Data loaded successfully:', { hero, contactCards: contactCards.length, tabs: tabs.length });
    } catch (error) {
      console.error('Error fetching content:', error);
      
      if (error.response?.status === 401) {
        message.error('Please login to admin panel first');
      } else if (error.response?.status === 404) {
        // Initialize with default data
        const defaultData = {
          hero: {
            title: 'Contact Us',
            subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
          },
          contactCards: [
            {
              id: 'support',
              icon: 'phone',
              title: 'Customer Support',
              description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
              contact: 'care@proficientgroup.in',
              type: 'email'
            }
          ],
          tabs: [
            {
              id: 'callback',
              title: 'Request Callback',
              subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.',
              content: {}
            }
          ]
        };
        
        form.setFieldsValue({ hero: defaultData.hero });
        setContactCards(defaultData.contactCards);
        setTabs(defaultData.tabs);
        console.log('Initialized with default data');
      } else {
        message.error(`Failed to load content: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('Starting save process...');
      console.log('Form values:', form.getFieldsValue());
      console.log('Contact cards:', contactCards);
      console.log('Tabs:', tabs);
      
      const formValues = form.getFieldsValue();
      
      const payload = {
        hero: formValues.hero || { title: '', subtitle: '' },
        contactCards: contactCards || [],
        tabs: tabs || []
      };
      
      console.log('Sending payload:', JSON.stringify(payload, null, 2));

      const response = await contactAPI.saveContent(payload);
      console.log('Save response:', response.data);
      
      message.success('Contact page saved successfully!');
      
      // Refresh the data after saving
      setTimeout(() => {
        fetchContent();
      }, 500);
      
    } catch (error) {
      console.error('Save error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 401) {
        message.error('Please login to admin panel first');
      } else if (error.response?.status === 403) {
        message.error('Access denied. Please check your permissions.');
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to save';
        message.error(`Save failed: ${errorMsg}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const addContactCard = () => {
    setContactCards([...contactCards, {
      id: Date.now().toString(),
      icon: 'phone',
      title: 'New Contact',
      description: '',
      contact: '',
      type: 'email'
    }]);
  };

  const removeContactCard = (id) => {
    setContactCards(contactCards.filter(c => c.id !== id));
  };

  const updateContactCard = (id, field, value) => {
    setContactCards(contactCards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addTab = () => {
    setTabs([...tabs, {
      id: Date.now().toString(),
      title: 'New Tab',
      subtitle: '',
      content: {}
    }]);
  };

  const removeTab = (id) => {
    setTabs(tabs.filter(t => t.id !== id));
  };

  const updateTab = (id, field, value) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading Contact Editor...</div>
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
            <Title level={2} style={{ margin: 0 }}>Contact Us Editor</Title>
            <Text type="secondary">Manage contact page content and forms</Text>
          </div>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={18}>
          <Form form={form} layout="vertical">
            <Card title="🏠 Hero Section" style={{ marginBottom: 24, borderRadius: 12 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Page Title" name={['hero', 'title']} rules={[{ required: true }]}>
                    <Input size="large" placeholder="Contact Us" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Subtitle" name={['hero', 'subtitle']} rules={[{ required: true }]}>
                    <TextArea rows={3} placeholder="Page subtitle..." />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>📞 Contact Cards</span>
                  <Badge count={contactCards.length} style={{ backgroundColor: '#1890ff' }} />
                </div>
              }
              extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={addContactCard}>
                  Add Contact Card
                </Button>
              }
              style={{ marginBottom: 24, borderRadius: 12 }}
            >
              {contactCards.map((card) => (
                <Card 
                  key={card.id}
                  size="small"
                  style={{ marginBottom: 16, borderRadius: 8 }}
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {card.type === 'email' ? <MailOutlined /> : <PhoneOutlined />}
                      <Input 
                        value={card.title} 
                        onChange={(e) => updateContactCard(card.id, 'title', e.target.value)}
                        placeholder="Contact title"
                        style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
                      />
                    </div>
                  }
                  extra={
                    <Popconfirm title="Delete contact card?" onConfirm={() => removeContactCard(card.id)}>
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  }
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ marginBottom: 12 }}>
                        <label>Icon</label>
                        <Select 
                          value={card.icon} 
                          onChange={(value) => updateContactCard(card.id, 'icon', value)}
                          style={{ width: '100%', marginTop: 4 }}
                        >
                          <Select.Option value="phone">📞 Phone</Select.Option>
                          <Select.Option value="email">📧 Email</Select.Option>
                          <Select.Option value="support">🎧 Support</Select.Option>
                          <Select.Option value="trade">📈 Trade</Select.Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: 12 }}>
                        <label>Contact Type</label>
                        <Select 
                          value={card.type} 
                          onChange={(value) => updateContactCard(card.id, 'type', value)}
                          style={{ width: '100%', marginTop: 4 }}
                        >
                          <Select.Option value="email">Email</Select.Option>
                          <Select.Option value="phone">Phone</Select.Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ marginBottom: 12 }}>
                        <label>Description</label>
                        <TextArea 
                          value={card.description} 
                          onChange={(e) => updateContactCard(card.id, 'description', e.target.value)}
                          rows={3}
                          placeholder="Contact description..."
                          style={{ marginTop: 4 }}
                        />
                      </div>
                    </Col>
                    <Col span={24}>
                      <div>
                        <label>Contact Info</label>
                        <Input 
                          value={card.contact} 
                          onChange={(e) => updateContactCard(card.id, 'contact', e.target.value)}
                          placeholder={card.type === 'email' ? 'email@example.com' : '+91-123-456-7890'}
                          style={{ marginTop: 4 }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>📋 Form Tabs</span>
                  <Badge count={tabs.length} style={{ backgroundColor: '#52c41a' }} />
                </div>
              }
              extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={addTab}>
                  Add Tab
                </Button>
              }
              style={{ borderRadius: 12 }}
            >
              {tabs.map((tab) => (
                <Card 
                  key={tab.id}
                  size="small"
                  style={{ marginBottom: 16, borderRadius: 8 }}
                  title={
                    <Input 
                      value={tab.title} 
                      onChange={(e) => updateTab(tab.id, 'title', e.target.value)}
                      placeholder="Tab title"
                      style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
                    />
                  }
                  extra={
                    <Popconfirm title="Delete tab?" onConfirm={() => removeTab(tab.id)}>
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  }
                >
                  <div style={{ marginBottom: 12 }}>
                    <label>Tab Subtitle</label>
                    <TextArea 
                      value={tab.subtitle} 
                      onChange={(e) => updateTab(tab.id, 'subtitle', e.target.value)}
                      rows={2}
                      placeholder="Tab subtitle..."
                      style={{ marginTop: 4 }}
                    />
                  </div>
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
                  onClick={() => window.open('/contact', '_blank')}
                  size="large"
                  block
                >
                  Preview Page
                </Button>
              </Space>
            </Card>

            <Card title="📊 Form Types" style={{ borderRadius: 12 }}>
              <Space direction="vertical" size="small">
                <Text type="secondary" style={{ fontSize: 12 }}>• Request Callback</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• Associate with Us</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• Partner with Us</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>• All leads are captured</Text>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactEditor;