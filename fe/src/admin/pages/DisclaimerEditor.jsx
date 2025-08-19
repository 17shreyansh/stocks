import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Typography, Space, Divider } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const DisclaimerEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialData = {
    header: {
      title: "Disclaimer",
      lastUpdated: "Last updated: January 15, 2024"
    },
    content: {
      general: {
        title: "General Disclaimer",
        text: "The information provided on this website and trading platform is for general informational purposes only. Focus Stock Broker Ltd does not guarantee the accuracy, completeness, or reliability of any information presented."
      },
      investment: {
        title: "Investment Risk Disclaimer", 
        text: "All investments in securities market are subject to market risks. Past performance is not indicative of future results. Investors should carefully consider their investment objectives and risk tolerance before making any investment decisions."
      },
      trading: {
        title: "Trading Disclaimer",
        text: "Trading in stocks, derivatives, and other financial instruments involves substantial risk and may not be suitable for all investors. You may lose all or more than your initial investment. Only trade with money you can afford to lose."
      },
      advice: {
        title: "No Financial Advice",
        text: "The content on this platform does not constitute financial, investment, or trading advice. We recommend consulting with qualified financial advisors before making investment decisions."
      },
      liability: {
        title: "Limitation of Liability", 
        text: "Focus Stock Broker Ltd shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or reliance on information provided."
      },
      regulatory: {
        title: "Regulatory Compliance",
        text: "Focus Stock Broker Ltd is regulated by SEBI. All trading activities are subject to applicable laws and regulations. Clients are responsible for understanding and complying with relevant tax obligations."
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from API
      form.setFieldsValue(initialData);
    } catch (error) {
      message.error('Failed to load disclaimer data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      // In a real app, this would save to API
      console.log('Saving disclaimer data:', values);
      message.success('Disclaimer updated successfully');
    } catch (error) {
      message.error('Failed to save disclaimer');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(initialData);
    message.info('Form reset to default values');
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Disclaimer Editor</Title>
        <Text type="secondary">
          Manage the disclaimer page content and legal notices.
        </Text>
      </div>

      <Card loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={initialData}
        >
          <Title level={4}>Header Information</Title>
          <Form.Item
            name={['header', 'title']}
            label="Page Title"
            rules={[{ required: true, message: 'Please enter page title' }]}
          >
            <Input placeholder="Enter page title" />
          </Form.Item>

          <Form.Item
            name={['header', 'lastUpdated']}
            label="Last Updated"
            rules={[{ required: true, message: 'Please enter last updated date' }]}
          >
            <Input placeholder="Last updated: January 15, 2024" />
          </Form.Item>

          <Divider />

          <Title level={4}>Content Sections</Title>

          <Form.Item
            name={['content', 'general', 'title']}
            label="General Disclaimer Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'general', 'text']}
            label="General Disclaimer Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item
            name={['content', 'investment', 'title']}
            label="Investment Risk Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'investment', 'text']}
            label="Investment Risk Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item
            name={['content', 'trading', 'title']}
            label="Trading Disclaimer Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'trading', 'text']}
            label="Trading Disclaimer Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item
            name={['content', 'advice', 'title']}
            label="No Financial Advice Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'advice', 'text']}
            label="No Financial Advice Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item
            name={['content', 'liability', 'title']}
            label="Limitation of Liability Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'liability', 'text']}
            label="Limitation of Liability Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item
            name={['content', 'regulatory', 'title']}
            label="Regulatory Compliance Title"
            rules={[{ required: true, message: 'Please enter section title' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
            name={['content', 'regulatory', 'text']}
            label="Regulatory Compliance Text"
            rules={[{ required: true, message: 'Please enter section content' }]}
          >
            <TextArea rows={4} placeholder="Enter section content" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving}
                icon={<SaveOutlined />}
              >
                Save Changes
              </Button>
              <Button 
                onClick={handleReset}
                icon={<ReloadOutlined />}
              >
                Reset to Default
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DisclaimerEditor;