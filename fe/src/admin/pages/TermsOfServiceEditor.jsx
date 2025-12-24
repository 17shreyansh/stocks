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
  Divider,
  Select
} from 'antd';
import { SaveOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const TermsOfServiceEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pages/terms-of-service');
      if (response.data && response.data.header && response.data.sections && response.data.content) {
        setPageData(response.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('API error, using fallback data:', error);
    }
    
    // Use fallback data if API fails or returns empty data
    const newPageData = {
      name: 'terms-of-service',
      header: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated: January 15, 2024'
      },
      sections: [
        { id: 'acceptance', title: 'Acceptance of Terms' },
        { id: 'services', title: 'Services Provided' },
        { id: 'registration', title: 'Account Registration' },
        { id: 'trading', title: 'Trading Rules' },
        { id: 'fees', title: 'Fees and Charges' },
        { id: 'risk', title: 'Risk Disclosure' },
        { id: 'liability', title: 'Limitation of Liability' },
        { id: 'termination', title: 'Termination' },
        { id: 'modifications', title: 'Modifications' }
      ],
      content: {
        acceptance: {
          title: '1. Acceptance of Terms',
          text: ['By accessing and using the services provided by Focus Stock Brokers, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Focus Stock Brokers.'],
          items: []
        },
        services: {
          title: '2. Services Provided',
          text: ['Focus Stock Brokers provides the following services:'],
          items: [
            'Stock trading and investment services',
            'Portfolio management and advisory services',
            'Market research and analysis',
            'Online trading platform access',
            'Customer support and assistance'
          ]
        },
        registration: {
          title: '3. Account Registration and Eligibility',
          text: ['To use our services, you must:'],
          items: [
            'Be at least 18 years of age',
            'Provide accurate and complete information during registration',
            'Maintain the confidentiality of your account credentials',
            'Comply with all applicable laws and regulations',
            'Complete the required KYC (Know Your Customer) procedures'
          ]
        },
        trading: {
          title: '4. Trading Rules and Regulations',
          text: ['All trading activities must comply with:'],
          items: [
            'SEBI (Securities and Exchange Board of India) regulations',
            'Stock exchange rules and guidelines',
            'Anti-money laundering (AML) requirements',
            'Market conduct and fair dealing principles'
          ]
        },
        fees: {
          title: '5. Fees and Charges',
          text: ['You agree to pay all applicable fees and charges as outlined in our fee schedule. Fees may include but are not limited to:'],
          items: [
            'Brokerage charges on transactions',
            'Account maintenance fees',
            'Platform usage charges',
            'Regulatory and statutory charges'
          ]
        },
        risk: {
          title: '6. Risk Disclosure',
          text: ['Trading in securities involves substantial risk and may not be suitable for all investors. You acknowledge that:'],
          items: [
            'Past performance does not guarantee future results',
            'Market volatility can result in significant losses',
            'You are responsible for your investment decisions',
            'Professional advice should be sought when needed'
          ]
        },
        liability: {
          title: '7. Limitation of Liability',
          text: ['Focus Stock Brokers shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our liability is limited to the extent permitted by applicable law.'],
          items: []
        },
        termination: {
          title: '8. Termination',
          text: ['Either party may terminate this agreement with appropriate notice. Upon termination, you remain liable for all outstanding obligations and fees incurred prior to termination.'],
          items: []
        },
        modifications: {
          title: '9. Modifications to Terms',
          text: ['We reserve the right to modify these terms at any time. Changes will be communicated through our website or direct notification. Continued use of our services constitutes acceptance of modified terms.'],
          items: []
        }
      },
      contact: {
        title: 'Contact Information',
        text: ['For questions regarding these Terms of Service, please contact us:'],
        details: ['Email: legal@focusstockbrokers.com', 'Phone: +91-11-4567-8900', 'Address: Focus Stock Brokers, Financial District, Mumbai, India']
      }
    };
    setPageData(newPageData);
    setLoading(false);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, name: 'terms-of-service' };
      console.log('Saving payload:', payload);
      
      let response;
      if (pageData?._id) {
        response = await axios.put('/pages/terms-of-service', payload);
      } else {
        response = await axios.post('/pages', payload);
      }
      
      console.log('Save response:', response.data);
      setPageData(response.data || payload);
      message.success('Terms of Service page saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      message.error('Error saving page: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Edit Terms of Service Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/terms-of-service', '_blank')}>
            Preview
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={pageData}
        key={pageData ? 'loaded' : 'loading'}
      >
        <Row gutter={[0, 24]}>
          <Col xs={24}>
            <Card
              title="Header Section"
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              styles={{
                header: {
                  background: '#f8f9fa',
                  borderBottom: '1px solid #dee2e6'
                }
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Page Title"
                    name={['header', 'title']}
                    rules={[{ required: true, message: 'Page title is required' }]}
                  >
                    <Input placeholder="Terms of Service" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Updated Text"
                    name={['header', 'lastUpdated']}
                    rules={[{ required: true, message: 'Last updated text is required' }]}
                  >
                    <Input placeholder="Last updated: January 15, 2024" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Table of Contents Sections"
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              styles={{
                header: {
                  background: '#f8f9fa',
                  borderBottom: '1px solid #dee2e6'
                }
              }}
            >
              <Form.List name="sections">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'id']} label="Section ID">
                              <Input placeholder="acceptance" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'title']} label="Section Title">
                              <Input placeholder="Acceptance of Terms" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button onClick={() => remove(name)} danger>
                          Remove Section
                        </Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Add Section
                    </Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Content Sections"
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              styles={{
                header: {
                  background: '#f8f9fa',
                  borderBottom: '1px solid #dee2e6'
                }
              }}
              extra={
                <Button type="primary" size="small" onClick={() => {
                  const sections = form.getFieldValue('sections') || pageData?.sections || [];
                  const content = form.getFieldValue('content') || pageData?.content || {};
                  const availableSections = sections.filter(section => !content[section.id]);
                  
                  if (availableSections.length > 0) {
                    const firstAvailable = availableSections[0];
                    const newContent = {
                      ...content,
                      [firstAvailable.id]: { title: firstAvailable.title, text: [''], items: [] }
                    };
                    form.setFieldsValue({ content: newContent });
                    setPageData(prev => ({ ...prev, content: newContent }));
                  }
                }}>
                  Add Content Section
                </Button>
              }
            >
              {Object.keys(pageData?.content || {}).map((sectionId) => {
                const sections = pageData?.sections || [];
                const section = sections.find(s => s.id === sectionId);
                const content = pageData?.content || {};
                const usedSectionIds = Object.keys(content);
                
                return (
                  <Card key={sectionId} title={section?.title || 'Content Section'} size="small" style={{ marginBottom: 16 }}>
                    <Form.Item
                      label="Select Section"
                      name={['content', sectionId, 'sectionId']}
                      initialValue={sectionId}
                    >
                      <Select placeholder="Select a section">
                        {sections.map(s => (
                          <Select.Option 
                            key={s.id} 
                            value={s.id} 
                            disabled={usedSectionIds.includes(s.id) && s.id !== sectionId}
                          >
                            {s.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  <Form.Item label="Section Text">
                    <Form.List name={['content', section?.id, 'text']}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                              <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                                <TextArea rows={2} placeholder="Section content..." />
                              </Form.Item>
                              <Button onClick={() => remove(name)} danger size="small">
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            Add Paragraph
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Form.Item label="List Items">
                    <Form.List name={['content', section?.id, 'items']}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                              <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                                <Input placeholder="List item text" />
                              </Form.Item>
                              <Button onClick={() => remove(name)} danger size="small">
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block>
                            Add Item
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
                );
              })}
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Contact Information"
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              styles={{
                header: {
                  background: '#f8f9fa',
                  borderBottom: '1px solid #dee2e6'
                }
              }}
            >
              <Form.Item
                label="Contact Title"
                name={['contact', 'title']}
              >
                <Input placeholder="Contact Information" />
              </Form.Item>
              
              <Form.Item label="Contact Text">
                <Form.List name={['contact', 'text']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                          <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                            <TextArea rows={2} placeholder="For questions regarding these Terms..." />
                          </Form.Item>
                          <Button onClick={() => remove(name)} danger size="small">
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>
                        Add Paragraph
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
              
              <Form.Item label="Contact Details">
                <Form.List name={['contact', 'details']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                          <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                            <Input placeholder="Email: legal@focusstockbrokers.com" />
                          </Form.Item>
                          <Button onClick={() => remove(name)} danger size="small">
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>
                        Add Detail
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TermsOfServiceEditor;