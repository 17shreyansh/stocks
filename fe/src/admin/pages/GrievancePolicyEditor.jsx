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

const GrievancePolicyEditor = () => {
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
      const response = await axios.get('/pages/grievance-policy');
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
      name: 'grievance-policy',
      header: {
        title: 'Grievance Redressal Policy',
        lastUpdated: 'Last updated: January 15, 2024'
      },
      sections: [
        { id: 'commitment', title: 'Our Commitment' },
        { id: 'types', title: 'Types of Grievances' },
        { id: 'process', title: 'Resolution Process' },
        { id: 'response', title: 'Response Times' },
        { id: 'escalation', title: 'Escalation Matrix' },
        { id: 'external', title: 'External Redressal' }
      ],
      content: {
        commitment: {
          title: '1. Our Commitment',
          text: ['At Focus Stock Brokers, we are committed to providing exceptional service to our clients. We understand that despite our best efforts, there may be occasions when you are not satisfied with our services. This Grievance Redressal Policy outlines our systematic approach to address and resolve your concerns promptly and fairly.'],
          items: []
        },
        types: {
          title: '2. Types of Grievances We Handle',
          text: ['We handle various types of grievances including:'],
          items: [
            'Trading Issues: Order execution problems, pricing discrepancies, platform issues',
            'Account Services: Account opening delays, documentation issues, KYC problems',
            'Billing & Charges: Incorrect charges, billing disputes, fee clarifications',
            'Customer Service: Poor service quality, delayed responses, staff behavior',
            'Technical Issues: Platform downtime, mobile app problems, system errors',
            'Compliance Matters: Regulatory concerns, policy violations, audit issues',
            'Research Services: Report quality, recommendation disputes, advisory issues'
          ]
        },
        process: {
          title: '3. Grievance Resolution Process',
          text: ['Our structured 5-step process ensures efficient resolution:'],
          items: [
            'Step 1 - Initial Contact: Submit your complaint through any of our available channels',
            'Step 2 - Acknowledgment: Receive confirmation within 24 hours with complaint reference number',
            'Step 3 - Investigation: Our team investigates the issue and gathers relevant information',
            'Step 4 - Resolution: Provide solution or explanation within 7 working days',
            'Step 5 - Follow-up: Ensure satisfaction and close the complaint formally'
          ]
        },
        response: {
          title: '4. Response Time Commitments',
          text: ['We are committed to the following response times:'],
          items: [
            'Acknowledgment: Within 24 hours of receiving the complaint',
            'Simple Issues: Resolution within 3 working days',
            'Complex Issues: Resolution within 7 working days',
            'Investigation Required: Resolution within 15 working days',
            'Regulatory Matters: Resolution within 30 working days'
          ]
        },
        escalation: {
          title: '5. Escalation Matrix',
          text: ['If you are not satisfied with the initial resolution, you can escalate your complaint:'],
          items: [
            'Level 1: Customer Service Team (Initial handling)',
            'Level 2: Team Leader/Supervisor (Within 2 days if unresolved)',
            'Level 3: Grievance Officer (Within 5 days if unresolved)',
            'Level 4: Senior Management (Within 10 days if unresolved)',
            'Level 5: External Authorities (SEBI, Stock Exchanges, Ombudsman)'
          ]
        },
        external: {
          title: '6. External Redressal Mechanisms',
          text: ['If your grievance is not resolved to your satisfaction, you may approach:'],
          items: [
            'SEBI SCORES: Online complaint redressal system (www.scores.gov.in)',
            'Stock Exchange Arbitration: For trading-related disputes',
            'SEBI Ombudsman: For unresolved complaints after 30 days',
            'Consumer Courts: For service deficiency issues',
            'Civil Courts: For contractual disputes'
          ]
        }
      },
      contacts: [
        {
          title: 'Grievance Officer',
          details: [
            { label: 'Name', value: 'Mr. Rajesh Kumar' },
            { label: 'Email', value: 'grievance@focusstockbrokers.com' },
            { label: 'Phone', value: '+91-11-4567-8903' },
            { label: 'Hours', value: 'Mon-Fri, 9 AM - 6 PM' }
          ]
        },
        {
          title: 'Customer Support',
          details: [
            { label: 'Email', value: 'support@focusstockbrokers.com' },
            { label: 'Phone', value: '+91-11-4567-8900' },
            { label: 'WhatsApp', value: '+91-98765-43210' },
            { label: 'Hours', value: '24/7 Support Available' }
          ]
        },
        {
          title: 'Postal Address',
          details: [
            { label: '', value: 'Focus Stock Brokers Ltd.' },
            { label: '', value: 'Grievance Department' },
            { label: '', value: 'Financial District, BKC' },
            { label: '', value: 'Mumbai - 400051, India' }
          ]
        },
        {
          title: 'SEBI Registration',
          details: [
            { label: 'SEBI Reg No', value: 'INZ000123456' },
            { label: 'BSE Member ID', value: '12345' },
            { label: 'NSE Member ID', value: '67890' },
            { label: 'DP ID', value: 'IN300000-12345678' }
          ]
        }
      ],
      complaintTypes: [
        { value: 'trading', label: 'Trading Issues' },
        { value: 'account', label: 'Account Services' },
        { value: 'billing', label: 'Billing & Charges' },
        { value: 'service', label: 'Customer Service' },
        { value: 'technical', label: 'Technical Issues' },
        { value: 'compliance', label: 'Compliance Matters' },
        { value: 'research', label: 'Research Services' },
        { value: 'other', label: 'Other' }
      ]
    };
    setPageData(newPageData);
    form.setFieldsValue(newPageData);
    setLoading(false);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, name: 'grievance-policy' };
      let response;
      if (pageData?._id) {
        response = await axios.put('/pages/grievance-policy', payload);
      } else {
        response = await axios.post('/pages', payload);
      }
      setPageData(response.data || payload);
      message.success('Grievance Policy page saved successfully');
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
        <Title level={2}>Edit Grievance Policy Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/grievance-policy', '_blank')}>
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
                    <Input placeholder="Grievance Redressal Policy" />
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
            <Card title="Table of Contents Sections">
              <Form.List name="sections">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'id']} label="Section ID">
                              <Input placeholder="commitment" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'title']} label="Section Title">
                              <Input placeholder="Our Commitment" />
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
            <Card title="Contact Information">
              <Form.List name="contacts">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Form.Item {...restField} name={[name, 'title']} label="Contact Title">
                          <Input placeholder="Grievance Officer" />
                        </Form.Item>
                        <Form.Item label="Contact Details">
                          <Form.List name={[name, 'details']}>
                            {(detailFields, { add: addDetail, remove: removeDetail }) => (
                              <>
                                {detailFields.map(({ key: detailKey, name: detailName, ...restDetailField }) => (
                                  <Row key={detailKey} gutter={8} style={{ marginBottom: 8 }}>
                                    <Col span={8}>
                                      <Form.Item {...restDetailField} name={[detailName, 'label']} style={{ marginBottom: 0 }}>
                                        <Input placeholder="Label (e.g., Name)" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={14}>
                                      <Form.Item {...restDetailField} name={[detailName, 'value']} style={{ marginBottom: 0 }}>
                                        <Input placeholder="Value (e.g., Mr. Rajesh Kumar)" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                      <Button onClick={() => removeDetail(detailName)} danger size="small">×</Button>
                                    </Col>
                                  </Row>
                                ))}
                                <Button type="dashed" onClick={() => addDetail()} size="small">Add Detail</Button>
                              </>
                            )}
                          </Form.List>
                        </Form.Item>
                        <Button onClick={() => remove(name)} danger>Remove Contact</Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>Add Contact</Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Complaint Types">
              <Form.List name="complaintTypes">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={10}>
                          <Form.Item {...restField} name={[name, 'value']} label="Value" style={{ marginBottom: 0 }}>
                            <Input placeholder="trading" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item {...restField} name={[name, 'label']} label="Label" style={{ marginBottom: 0 }}>
                            <Input placeholder="Trading Issues" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Button onClick={() => remove(name)} danger style={{ marginTop: 30 }}>×</Button>
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>Add Complaint Type</Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GrievancePolicyEditor;