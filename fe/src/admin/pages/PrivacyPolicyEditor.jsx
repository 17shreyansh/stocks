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

const PrivacyPolicyEditor = () => {
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
      const response = await axios.get('/pages/privacy-policy');
      if (response.data && Object.keys(response.data).length > 0) {
        setPageData(response.data);
        form.setFieldsValue(response.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('API error, using fallback data:', error);
    }
    
    // Use fallback data if API fails or returns empty data
    const newPageData = {
      name: 'privacy-policy',
      header: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: January 15, 2024'
      },
      sections: [
        { id: 'collection', title: 'Information We Collect' },
        { id: 'usage', title: 'How We Use Information' },
        { id: 'sharing', title: 'Information Sharing' },
        { id: 'security', title: 'Data Security' },
        { id: 'rights', title: 'Your Privacy Rights' },
        { id: 'cookies', title: 'Cookies & Tracking' },
        { id: 'retention', title: 'Data Retention' },
        { id: 'transfers', title: 'International Transfers' },
        { id: 'changes', title: 'Policy Changes' }
      ],
      content: {
        collection: {
          title: '1. Information We Collect',
          text: ['Focus Stock Brokers collects information necessary to provide our financial services effectively and securely. We collect:'],
          items: [
            'Name, address, phone number, and email address',
            'Date of birth and government-issued identification',
            'Financial information including income and investment experience',
            'Bank account details and payment information',
            'IP address, browser type, and device information',
            'Trading platform usage data and preferences',
            'Website interaction and navigation patterns',
            'Cookies and similar tracking technologies'
          ]
        },
        usage: {
          title: '2. How We Use Your Information',
          text: ['We use your information for the following purposes:'],
          items: [
            'Account opening and KYC compliance',
            'Processing trades and managing your portfolio',
            'Providing customer support and communication',
            'Regulatory reporting and compliance obligations',
            'Risk management and fraud prevention',
            'Improving our services and platform functionality',
            'Marketing communications (with your consent)'
          ]
        },
        sharing: {
          title: '3. Information Sharing and Disclosure',
          text: ['We may share your information in the following circumstances:'],
          items: [
            'Regulatory Authorities: SEBI, stock exchanges, and other regulatory bodies as required by law',
            'Service Providers: Third-party vendors who assist in providing our services',
            'Legal Requirements: When required by court orders, legal processes, or government requests',
            'Business Transfers: In case of merger, acquisition, or sale of business assets',
            'Consent: When you have explicitly consented to such sharing'
          ]
        },
        security: {
          title: '4. Data Security Measures',
          text: ['We implement comprehensive security measures to protect your information:'],
          items: [
            '256-bit SSL encryption for all data transmissions',
            'Multi-factor authentication for account access',
            'Regular security audits and vulnerability assessments',
            'Secure data centers with physical access controls',
            'Employee training on data protection and privacy',
            'Incident response procedures for security breaches'
          ]
        },
        rights: {
          title: '5. Your Privacy Rights',
          text: ['You have the following rights regarding your personal information:'],
          items: [
            'Access: Request copies of your personal data',
            'Correction: Request correction of inaccurate information',
            'Deletion: Request deletion of your data (subject to legal requirements)',
            'Portability: Request transfer of your data to another service provider',
            'Objection: Object to processing of your data for marketing purposes',
            'Restriction: Request restriction of processing in certain circumstances'
          ]
        },
        cookies: {
          title: '6. Cookies and Tracking Technologies',
          text: ['We use cookies and similar technologies to enhance your experience:'],
          items: [
            'Essential Cookies: Required for platform functionality and security',
            'Performance Cookies: Help us understand how you use our services',
            'Functional Cookies: Remember your preferences and settings',
            'Marketing Cookies: Used for targeted advertising (with consent)'
          ]
        },
        retention: {
          title: '7. Data Retention',
          text: ['We retain your information for as long as necessary to:'],
          items: [
            'Provide our services and maintain your account',
            'Comply with legal and regulatory requirements',
            'Resolve disputes and enforce our agreements',
            'Prevent fraud and ensure security'
          ]
        },
        transfers: {
          title: '8. International Data Transfers',
          text: ['Your information may be transferred to and processed in countries other than India. We ensure adequate protection through:'],
          items: [
            'Adequacy decisions by relevant authorities',
            'Standard contractual clauses',
            'Binding corporate rules',
            'Certification schemes and codes of conduct'
          ]
        },
        changes: {
          title: '9. Changes to This Policy',
          text: ['We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes through:'],
          items: [
            'Email notifications to your registered email address',
            'Prominent notices on our website and trading platform',
            'In-app notifications when you next log in'
          ]
        }
      },
      contact: {
        title: 'Privacy Officer Contact',
        text: ['For privacy-related questions or to exercise your rights, contact our Privacy Officer:'],
        details: ['Email: privacy@focusstockbrokers.com', 'Phone: +91-11-4567-8901', 'Address: Privacy Officer, Focus Stock Brokers, Financial District, Mumbai, India', 'Response Time: We will respond to your request within 30 days']
      }
    };
    setPageData(newPageData);
    form.setFieldsValue(newPageData);
    setLoading(false);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, name: 'privacy-policy' };
      console.log('Saving payload:', payload);
      
      let response;
      if (pageData?._id) {
        response = await axios.put('/pages/privacy-policy', payload);
      } else {
        response = await axios.post('/pages', payload);
      }
      
      console.log('Save response:', response.data);
      setPageData(response.data || payload);
      message.success('Privacy Policy page saved successfully');
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
        <Title level={2}>Edit Privacy Policy Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/privacy-policy', '_blank')}>
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
              headStyle={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid #dee2e6'
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Page Title"
                    name={['header', 'title']}
                    rules={[{ required: true, message: 'Page title is required' }]}
                  >
                    <Input placeholder="Privacy Policy" />
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
              headStyle={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid #dee2e6'
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
                              <Input placeholder="collection" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'title']} label="Section Title">
                              <Input placeholder="Information We Collect" />
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
              headStyle={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid #dee2e6'
              }}
              extra={
                <Button type="primary" size="small" onClick={() => {
                  const sections = form.getFieldValue('sections') || [];
                  const content = form.getFieldValue('content') || {};
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
              headStyle={{ 
                background: '#f8f9fa',
                borderBottom: '1px solid #dee2e6'
              }}
            >
              <Form.Item
                label="Contact Title"
                name={['contact', 'title']}
              >
                <Input placeholder="Privacy Officer Contact" />
              </Form.Item>
              
              <Form.Item label="Contact Text">
                <Form.List name={['contact', 'text']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                          <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                            <TextArea rows={2} placeholder="For privacy-related questions..." />
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
                            <Input placeholder="Email: privacy@focusstockbrokers.com" />
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

export default PrivacyPolicyEditor;