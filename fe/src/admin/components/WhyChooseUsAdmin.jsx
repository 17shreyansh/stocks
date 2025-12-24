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
  Select,
  InputNumber,
  Switch,
  Modal,
  Alert,
  Tooltip,
  Badge
} from 'antd';
import { 
  SaveOutlined, 
  EyeOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  ReloadOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const WhyChooseUsAdmin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/whyChooseUs/homepage');
      if (response.data.success && response.data.data) {
        setData(response.data.data);
        form.setFieldsValue(response.data.data);
      } else {
        // Set default data if none exists
        const defaultData = {
          title: "Why Choose Focus Stock Broker Ltd",
          subtitle: "Our competitive advantages that set us apart in the industry",
          advantages: [
            {
              id: 1,
              title: "Lightning Fast",
              value: "<0.1s",
              description: "Order execution speed, faster than industry average for seamless trading experience.",
              icon: "FaRocket"
            },
            {
              id: 2,
              title: "Reliable Platform",
              value: "99.9%",
              description: "Uptime guarantee with robust infrastructure to ensure uninterrupted trading.",
              icon: "FaServer"
            },
            {
              id: 3,
              title: "Expert Support",
              value: "24/7",
              description: "Customer support availability with dedicated relationship managers for premium clients.",
              icon: "FaHeadset"
            },
            {
              id: 4,
              title: "Full Transparency",
              value: "0",
              description: "Zero hidden charges with clear fee structure and transparent pricing policy.",
              icon: "FaEye"
            }
          ]
        };
        setData(defaultData);
        form.setFieldsValue(defaultData);
      }
    } catch (error) {
      console.error('Error fetching WhyChooseUs data:', error);
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const response = await axios.post('/whyChooseUs/homepage', values);
      if (response.data.success) {
        setData(response.data.data);
        setHasUnsavedChanges(false);
        message.success('WhyChooseUs section updated successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      message.error('Error saving WhyChooseUs section');
    } finally {
      setSaving(false);
    }
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleReset = () => {
    Modal.confirm({
      title: 'Reset Form',
      content: 'Are you sure you want to reset all changes? This will discard any unsaved modifications.',
      onOk: () => {
        form.setFieldsValue(data);
        setHasUnsavedChanges(false);
        message.success('Form reset successfully');
      }
    });
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>Loading WhyChooseUs data...</Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Why Choose Us Section
          </Title>
          <Text type="secondary">
            Manage the advantages and benefits that set your company apart
          </Text>
        </div>
        <Space size="middle">
          {hasUnsavedChanges && (
            <Badge dot>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleReset}
                title="Reset to last saved version"
              >
                Reset
              </Button>
            </Badge>
          )}
          <Button 
            icon={<EyeOutlined />}
            onClick={handlePreview}
            title="Preview on live site"
          >
            Preview
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={() => form.submit()}
            disabled={!hasUnsavedChanges}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Space>
      </div>

      {/* Info Alert */}
      <Alert
        message="Section Information"
        description="This section highlights your company's key advantages. Each advantage should have a clear title, measurable value, and compelling description."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
        closable
      />

      {/* Main Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        onValuesChange={handleFormChange}
      >
        <Card title="Section Header" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Section Title"
                name="title"
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input 
                  placeholder="Why Choose Focus Stock Broker Ltd" 
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Section Subtitle"
                name="subtitle"
                rules={[{ required: true, message: 'Subtitle is required' }]}
              >
                <Input 
                  placeholder="Our competitive advantages that set us apart in the industry" 
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Advantages" style={{ marginBottom: 24 }}>
          <Form.List name="advantages">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    style={{ marginBottom: 16 }}
                    title={`Advantage ${name + 1}`}
                    extra={
                      <Button 
                        onClick={() => remove(name)} 
                        danger 
                        size="small"
                        icon={<DeleteOutlined />}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'title']} 
                          label="Title"
                          rules={[{ required: true, message: 'Title is required' }]}
                        >
                          <Input placeholder="Lightning Fast" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'value']} 
                          label="Value/Metric"
                          rules={[{ required: true, message: 'Value is required' }]}
                        >
                          <Input placeholder="<0.1s" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'icon']} 
                          label="Icon"
                          rules={[{ required: true, message: 'Icon is required' }]}
                        >
                          <Select placeholder="Select Icon">
                            <Select.Option value="FaRocket">🚀 Rocket (Speed)</Select.Option>
                            <Select.Option value="FaServer">🖥️ Server (Reliability)</Select.Option>
                            <Select.Option value="FaHeadset">🎧 Headset (Support)</Select.Option>
                            <Select.Option value="FaEye">👁️ Eye (Transparency)</Select.Option>
                            <Select.Option value="FaClock">🕐 Clock (24/7)</Select.Option>
                            <Select.Option value="FaShieldAlt">🛡️ Shield (Security)</Select.Option>
                            <Select.Option value="FaChartLine">📈 Chart (Growth)</Select.Option>
                            <Select.Option value="FaMobile">📱 Mobile (App)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item 
                      {...restField} 
                      name={[name, 'description']} 
                      label="Description"
                      rules={[{ required: true, message: 'Description is required' }]}
                    >
                      <TextArea 
                        rows={3} 
                        placeholder="Order execution speed, faster than industry average for seamless trading experience."
                      />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'id']} style={{ display: 'none' }}>
                      <InputNumber />
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add({ 
                      id: fields.length + 1,
                      title: '',
                      value: '',
                      description: '',
                      icon: 'FaRocket'
                    })} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    Add Advantage
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        {/* Tips Card */}
        <Card 
          title={
            <Space>
              <InfoCircleOutlined />
              <span>Tips for Better Content</span>
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Keep titles short and impactful (2-3 words)</li>
            <li>Use specific, measurable values when possible (99.9%, &lt;0.1s, 24/7)</li>
            <li>Write descriptions that focus on customer benefits</li>
            <li>Choose icons that clearly represent each advantage</li>
            <li>Aim for 3-6 advantages for optimal visual balance</li>
          </ul>
        </Card>
      </Form>
    </div>
  );
};

export default WhyChooseUsAdmin;