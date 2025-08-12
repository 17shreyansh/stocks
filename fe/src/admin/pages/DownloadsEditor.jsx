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
  Divider
} from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const DownloadsEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/downloads');
      setPageData(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        const newPageData = {
          name: 'downloads',
          header: {
            title: 'Downloads Center',
            subtitle: 'Access all your important documents, forms, and resources in one place.'
          },
          categories: ['All Categories', 'KYC Forms', 'Modification Forms', 'Legal Documents', 'Corporate Forms', 'Trading Forms', 'Support Forms'],
          sortOptions: [
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'name', label: 'Name A-Z' },
            { value: 'size', label: 'File Size' }
          ],
          documents: [
            {
              id: 1,
              title: 'KYC Application Form',
              description: ['Complete KYC form for new account opening with all required fields and instructions.'],
              category: 'KYC Forms',
              fileSize: '2.0 MB',
              lastUpdated: '2024-01-15',
              downloadUrl: '/documents/kyc-form.pdf'
            },
            {
              id: 2,
              title: 'Account Modification Form',
              description: ['Form to modify existing account details including personal and financial information.'],
              category: 'Modification Forms',
              fileSize: '1.5 MB',
              lastUpdated: '2024-01-10',
              downloadUrl: '/documents/modification-form.pdf'
            },
            {
              id: 3,
              title: 'Terms of Service Agreement',
              description: ['Complete terms and conditions for using Focus Stock Broker services.'],
              category: 'Legal Documents',
              fileSize: '3.0 MB',
              lastUpdated: '2024-01-05',
              downloadUrl: '/documents/terms-of-service.pdf'
            },
            {
              id: 4,
              title: 'Privacy Policy Document',
              description: ['Detailed privacy policy explaining how we collect, use, and protect your data.'],
              category: 'Legal Documents',
              fileSize: '2.5 MB',
              lastUpdated: '2024-01-05',
              downloadUrl: '/documents/privacy-policy.pdf'
            },
            {
              id: 5,
              title: 'Corporate Account Opening Form',
              description: ['Specialized form for corporate clients to open trading accounts.'],
              category: 'Corporate Forms',
              fileSize: '2.0 MB',
              lastUpdated: '2024-01-12',
              downloadUrl: '/documents/corporate-form.pdf'
            },
            {
              id: 6,
              title: 'Trading Platform User Guide',
              description: ['Comprehensive guide to using our trading platform with step-by-step instructions.'],
              category: 'Trading Forms',
              fileSize: '5.0 MB',
              lastUpdated: '2024-01-08',
              downloadUrl: '/documents/trading-guide.pdf'
            },
            {
              id: 7,
              title: 'Customer Support Request Form',
              description: ['Form to submit support requests and technical issues.'],
              category: 'Support Forms',
              fileSize: '1.0 MB',
              lastUpdated: '2024-01-14',
              downloadUrl: '/documents/support-form.pdf'
            },
            {
              id: 8,
              title: 'Risk Disclosure Statement',
              description: ['Important risk disclosure information for all trading activities.'],
              category: 'Legal Documents',
              fileSize: '1.8 MB',
              lastUpdated: '2024-01-06',
              downloadUrl: '/documents/risk-disclosure.pdf'
            }
          ],
          emptyState: {
            title: 'No documents found',
            message: 'Try adjusting your search terms or filters'
          }
        };
        setPageData(newPageData);
        form.setFieldsValue(newPageData);
      } else {
        message.error('Error fetching page data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, name: 'downloads' };
      if (pageData?._id) {
        await axios.put('/pages/downloads', payload);
        message.success('Downloads page updated successfully');
      } else {
        await axios.post('/pages', payload);
        message.success('Downloads page created successfully');
      }
      fetchPageData();
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
        <Title level={2}>Edit Downloads Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/downloads', '_blank')}>
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
                    <Input placeholder="Downloads Center" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Page Subtitle"
                    name={['header', 'subtitle']}
                    rules={[{ required: true, message: 'Page subtitle is required' }]}
                  >
                    <TextArea
                      rows={2}
                      placeholder="Access all your important documents, forms, and resources in one place."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Categories Configuration"
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
              <Form.List name="categories">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                        <Form.Item
                          {...restField}
                          name={[name]}
                          style={{ flex: 1, marginBottom: 0 }}
                        >
                          <Input placeholder="Category name" />
                        </Form.Item>
                        <Button onClick={() => remove(name)} danger style={{ marginTop: 4 }}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Category
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Sort Options Configuration"
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
              <Form.List name="sortOptions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'value']} label="Value">
                              <Input placeholder="newest" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'label']} label="Label">
                              <Input placeholder="Newest First" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button onClick={() => remove(name)} danger>
                          Remove Sort Option
                        </Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Add Sort Option
                    </Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Document Cards Management"
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
              <Form.List name="documents">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'title']} label="Document Title">
                              <Input placeholder="KYC Application Form" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'category']} label="Category">
                              <Input placeholder="KYC Forms" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'fileSize']} label="File Size">
                              <Input placeholder="2.3 MB" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item {...restField} label="Description">
                          <Form.List name={[name, 'description']}>
                            {(descFields, { add: addDesc, remove: removeDesc }) => (
                              <>
                                {descFields.map(({ key, name: descName, ...restDescField }) => (
                                  <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                                    <Form.Item {...restDescField} name={[descName]} style={{ flex: 1, marginBottom: 0 }}>
                                      <TextArea rows={2} placeholder="Document description..." />
                                    </Form.Item>
                                    <Button onClick={() => removeDesc(descName)} danger size="small">
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                                <Button type="dashed" onClick={() => addDesc()} size="small">
                                  Add Description
                                </Button>
                              </>
                            )}
                          </Form.List>
                        </Form.Item>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'lastUpdated']} label="Last Updated">
                              <Input placeholder="2024-01-15" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'downloadUrl']} label="Download URL">
                              <Input placeholder="/documents/kyc-form.pdf" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button onClick={() => remove(name)} danger>
                          Remove Document
                        </Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Add Document Card
                    </Button>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Empty State Configuration"
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
                    label="Empty State Title"
                    name={['emptyState', 'title']}
                  >
                    <Input placeholder="No documents found" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Empty State Message"
                    name={['emptyState', 'message']}
                  >
                    <Input placeholder="Try adjusting your search terms or filters" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DownloadsEditor;