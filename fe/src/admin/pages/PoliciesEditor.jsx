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
  Spin
} from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const PoliciesEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/policies');
      setPageData(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        const newPageData = {
          name: 'policies',
          header: {
            title: 'Policies Center',
            subtitle: 'Access all company policies and procedures organized by department.'
          },
          departments: ['All Departments', 'Trading', 'Risk Management', 'Compliance', 'Operations', 'IT', 'Customer Service', 'HR', 'Internal Audit'],
          sortOptions: [
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'name', label: 'Name A-Z' }
          ],
          emptyState: {
            title: 'No policies found',
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
      const payload = { ...values, name: 'policies' };
      if (pageData?._id) {
        await axios.put('/pages/policies', payload);
        message.success('Policies page updated successfully');
      } else {
        await axios.post('/pages', payload);
        message.success('Policies page created successfully');
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
        <Title level={2}>Edit Policies Page</Title>
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open('/policies', '_blank')}>
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
                    <Input placeholder="Policies Center" />
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
                      placeholder="Access all company policies and procedures organized by department."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title="Departments Configuration"
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
              <Form.List name="departments">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                        <Form.Item
                          {...restField}
                          name={[name]}
                          style={{ flex: 1, marginBottom: 0 }}
                        >
                          <Input placeholder="Department name" />
                        </Form.Item>
                        <Button onClick={() => remove(name)} danger style={{ marginTop: 4 }}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Department
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
              title="Policy Cards Management"
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
              <Form.List name="policies">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'title']} label="Policy Title">
                              <Input placeholder="Trading Policy" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'department']} label="Department">
                              <Input placeholder="Trading" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item {...restField} name={[name, 'lastUpdated']} label="Last Updated">
                              <Input placeholder="2024-01-15" />
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
                                      <TextArea rows={2} placeholder="Policy description..." />
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
                        <Button onClick={() => remove(name)} danger>
                          Remove Policy
                        </Button>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Add Policy Card
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
                    <Input placeholder="No policies found" />
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

export default PoliciesEditor;