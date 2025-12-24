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
  Select
} from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const RefundPolicyEditor = () => {
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
      const response = await axios.get('/pages/refund-policy');
      if (response.data && Object.keys(response.data).length > 0) {
        setPageData(response.data);
        form.setFieldsValue(response.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('API error, using fallback data:', error);
    }
    
    const newPageData = {
      name: 'refund-policy',
      header: {
        title: 'Refund Policy',
        lastUpdated: 'Last updated: January 15, 2024'
      },
      sections: [
        { id: 'refundable', title: 'Refundable Services' },
        { id: 'non-refundable', title: 'Non-Refundable Items' },
        { id: 'eligibility', title: 'Eligibility Criteria' },
        { id: 'timeline', title: 'Processing Timeline' },
        { id: 'request', title: 'How to Request' },
        { id: 'documentation', title: 'Required Documents' },
        { id: 'methods', title: 'Processing Methods' },
        { id: 'partial', title: 'Partial Refunds' },
        { id: 'dispute', title: 'Dispute Resolution' },
        { id: 'special', title: 'Special Circumstances' }
      ],
      importantNotice: 'This refund policy applies to service fees and charges only. Trading losses due to market movements are not eligible for refunds as they are inherent risks of securities trading.',
      content: {
        refundable: {
          title: '1. Refundable Services',
          text: ['The following services and fees may be eligible for refunds under specific circumstances:'],
          items: [
            'Account Opening Fees: Refundable within 7 days if account is not activated',
            'Annual Maintenance Charges: Pro-rated refund for unused period upon account closure',
            'Premium Service Subscriptions: Refundable within 14 days of subscription',
            'Research Report Purchases: Refundable within 24 hours if not accessed',
            'Platform Access Fees: Refundable for technical issues lasting more than 4 hours'
          ]
        },
        nonRefundable: {
          title: '2. Non-Refundable Items',
          text: ['The following are not eligible for refunds under any circumstances:'],
          items: [
            'Brokerage Charges: Commission on executed trades',
            'Statutory Charges: Government taxes, SEBI fees, exchange charges',
            'Trading Losses: Losses due to market movements or investment decisions',
            'Penalty Charges: Fees for policy violations or non-compliance',
            'Third-party Charges: Bank charges, payment gateway fees',
            'Used Services: Services that have been fully utilized or accessed'
          ]
        },
        eligibility: {
          title: '3. Refund Eligibility Criteria',
          text: ['To be eligible for a refund, the following conditions must be met:'],
          items: [
            'Request must be made within the specified time frame for each service',
            'Account must be in good standing with no pending obligations',
            'Service must not have been fully utilized or accessed',
            'Valid reason for refund request must be provided',
            'All required documentation must be submitted'
          ]
        },
        timeline: {
          title: '4. Refund Processing Timeline',
          text: ['Refunds are processed according to the following schedule:'],
          items: [
            'Account Opening Fee: 7 days request window, 5-7 business days processing',
            'Premium Subscriptions: 14 days request window, 7-10 business days processing',
            'Research Reports: 24 hours request window, 3-5 business days processing',
            'Platform Access: Same day request window, 1-3 business days processing'
          ]
        },
        request: {
          title: '5. How to Request a Refund',
          text: ['To request a refund, follow these steps:'],
          items: [
            'Step 1: Log into your account and navigate to the Support section',
            'Step 2: Select Refund Request from the available options',
            'Step 3: Fill out the refund request form with complete details',
            'Step 4: Attach supporting documents (receipts, screenshots, etc.)',
            'Step 5: Submit the request and note the reference number',
            'Step 6: Track your request status through the support portal'
          ]
        },
        documentation: {
          title: '6. Required Documentation',
          text: ['Please provide the following documents with your refund request:'],
          items: [
            'Original payment receipt or transaction confirmation',
            'Account statement showing the charge',
            'Detailed explanation of the refund reason',
            'Screenshots or evidence supporting your claim (if applicable)',
            'Bank account details for refund processing'
          ]
        },
        methods: {
          title: '7. Refund Processing Methods',
          text: ['Refunds will be processed using the following methods:'],
          items: [
            'Original Payment Method: For credit/debit card payments within 30 days',
            'Bank Transfer: For older transactions or when original method is unavailable',
            'Account Credit: For small amounts or when requested by the client',
            'Cheque: For large amounts or when electronic transfer is not possible'
          ]
        },
        partial: {
          title: '8. Partial Refunds',
          text: ['In certain cases, partial refunds may be applicable:'],
          items: [
            'Pro-rated Services: Based on unused portion of the service period',
            'Processing Fees: Administrative costs may be deducted',
            'Usage-based Refunds: Calculated based on actual service utilization'
          ]
        },
        dispute: {
          title: '9. Dispute Resolution',
          text: ['If your refund request is denied or you disagree with our decision:'],
          items: [
            'You may escalate the matter to our Grievance Officer',
            'Provide additional documentation or clarification if requested',
            'Request a review by senior management',
            'Approach regulatory authorities if the dispute remains unresolved'
          ]
        },
        special: {
          title: '10. Special Circumstances',
          text: ['Refunds may be considered outside normal policy in cases of:'],
          items: [
            'Technical Failures: System outages affecting trading or access',
            'Service Errors: Mistakes made by our staff or systems',
            'Regulatory Changes: Changes in laws affecting service delivery',
            'Force Majeure: Events beyond our control affecting services'
          ]
        }
      },
      timelineTable: [
        { service: 'Account Opening Fee', window: '7 days', processing: '5-7 business days', method: 'Original payment method' },
        { service: 'Premium Subscriptions', window: '14 days', processing: '7-10 business days', method: 'Bank transfer' },
        { service: 'Research Reports', window: '24 hours', processing: '3-5 business days', method: 'Account credit' },
        { service: 'Platform Access', window: 'Same day', processing: '1-3 business days', method: 'Account credit' }
      ],
      contact: {
        title: 'Refund Support Contact',
        text: ['For refund requests and related queries, contact our support team:'],
        details: ['Email: refunds@focusstockbrokers.com', 'Phone: +91-11-4567-8902', 'Support Hours: Monday to Friday, 9:00 AM to 6:00 PM IST', 'Online Portal: Available 24/7 through your account dashboard']
      }
    };
    setPageData(newPageData);
    form.setFieldsValue(newPageData);
    setLoading(false);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, name: 'refund-policy' };
      let response;
      if (pageData?._id) {
        response = await axios.put('/pages/refund-policy', payload);
      } else {
        response = await axios.post('/pages', payload);
      }
      setPageData(response.data || payload);
      message.success('Refund Policy page saved successfully');
    } catch (error) {
      message.error('Error saving page');
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
        <Title level={2}>Edit Refund Policy Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/refund-policy', '_blank')}>
            Preview
          </Button>
          <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={() => form.submit()}>
            Save Changes
          </Button>
        </Space>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={[0, 24]}>
          <Col xs={24}>
            <Card title="Header Section">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Page Title" name={['header', 'title']}>
                    <Input placeholder="Refund Policy" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Updated" name={['header', 'lastUpdated']}>
                    <Input placeholder="Last updated: January 15, 2024" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Important Notice">
              <Form.Item label="Important Notice" name="importantNotice">
                <TextArea rows={3} placeholder="This refund policy applies to service fees and charges only..." />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Table of Contents Sections">
              <Form.List name="sections">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'id']} label="Section ID">
                              <Input placeholder="refundable" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'title']} label="Section Title">
                              <Input placeholder="Refundable Services" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button onClick={() => remove(name)} danger>Remove Section</Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>Add Section</Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Content Sections" extra={
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
              }}>Add Content Section</Button>
            }>
              {Object.keys(pageData?.content || {}).map((sectionId) => {
                const sections = pageData?.sections || [];
                const section = sections.find(s => s.id === sectionId);
                return (
                  <Card key={sectionId} title={section?.title || 'Content Section'} size="small" style={{ marginBottom: 16 }}>
                    <Form.Item label="Section Text">
                      <Form.List name={['content', sectionId, 'text']}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                                <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                                  <TextArea rows={2} placeholder="Section content..." />
                                </Form.Item>
                                <Button onClick={() => remove(name)} danger size="small">Remove</Button>
                              </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>Add Paragraph</Button>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                    <Form.Item label="List Items">
                      <Form.List name={['content', sectionId, 'items']}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                                <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                                  <Input placeholder="List item text" />
                                </Form.Item>
                                <Button onClick={() => remove(name)} danger size="small">Remove</Button>
                              </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>Add Item</Button>
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
            <Card title="Timeline Table">
              <Form.List name="timelineTable">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'service']} label="Service">
                              <Input placeholder="Account Opening Fee" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'window']} label="Request Window">
                              <Input placeholder="7 days" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'processing']} label="Processing Time">
                              <Input placeholder="5-7 business days" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'method']} label="Refund Method">
                              <Input placeholder="Original payment method" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button onClick={() => remove(name)} danger>Remove Row</Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>Add Timeline Row</Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Contact Information">
              <Form.Item label="Contact Title" name={['contact', 'title']}>
                <Input placeholder="Refund Support Contact" />
              </Form.Item>
              <Form.Item label="Contact Text">
                <Form.List name={['contact', 'text']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                          <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                            <TextArea rows={2} placeholder="For refund requests..." />
                          </Form.Item>
                          <Button onClick={() => remove(name)} danger size="small">Remove</Button>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>Add Paragraph</Button>
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
                            <Input placeholder="Email: refunds@focusstockbrokers.com" />
                          </Form.Item>
                          <Button onClick={() => remove(name)} danger size="small">Remove</Button>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>Add Detail</Button>
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

export default RefundPolicyEditor;