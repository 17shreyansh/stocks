import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Row, Col, notification, Space } from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const ProductEditor = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/pages/product');
      const data = response.data.data || response.data;
      if (data?.product) {
        form.setFieldsValue(data.product);
      } else {
        form.setFieldsValue(getDefaultValues());
      }
    } catch (error) {
      console.error('Fetch error:', error);
      form.setFieldsValue(getDefaultValues());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultValues = () => ({
    hero: {
      title: 'Our Services',
      subtitle: 'At Focus Stock Brokers Ltd., we believe in providing more than just a trading platform — we offer end-to-end financial solutions under one roof.'
    },
    servicesSection: {
      title: 'Complete Financial Solutions',
      subtitle: 'Everything you need for your investment journey, backed by expert guidance and personalized service.'
    },
    services: [
      {
        title: 'Equity Trading – NSE & BSE',
        description: 'Buy and sell shares seamlessly across India\'s two leading stock exchanges. Whether you\'re an active trader or a long-term investor, we provide you with research-driven ideas and a smooth execution experience.',
        features: []
      },
      {
        title: 'Derivatives (F&O) Trading',
        description: 'Access futures and options across indices and stocks. Get margin benefit, hedging strategies, and real-time support from our experienced team.',
        features: []
      }
    ],
    productsSection: {
      title: 'Products We Deal In',
      subtitle: 'We provide a curated list of financial products, focusing on quality, reliability, and long-term value creation.'
    },
    products: [
      {
        title: 'Equity (Cash & F&O)',
        description: 'Complete equity trading solutions with advanced tools and strategies.',
        features: [
          'Shares, ETFs, and Index-based trading',
          'Intraday and delivery trades',
          'Futures and Options with smart margin strategies'
        ]
      },
      {
        title: 'Currency Derivatives',
        description: 'Trade in USD-INR, EUR-INR, and other pairs via NSE/BSE. Ideal for exporters/importers and arbitragers.',
        features: []
      }
    ]
  });

  const handleSave = async (values) => {
    setSaving(true);
    try {
      await axios.post('/pages', {
        name: 'product',
        product: values
      });
      notification.success({
        message: 'Success',
        description: 'Product page updated successfully!',
        placement: 'topRight'
      });
    } catch (error) {
      console.error('Save error:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to save product page',
        placement: 'topRight'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
      <Title level={2}>Product Page Editor</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        {/* Hero Section */}
        <Card title="🎯 Hero Section" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={['hero', 'title']} label="Hero Title">
                <Input placeholder="Our Services" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['hero', 'subtitle']} label="Hero Subtitle">
                <TextArea rows={3} placeholder="Hero subtitle description..." />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Services Section */}
        <Card title="🛠️ Services Section" style={{ marginBottom: 24 }}>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Form.Item name={['servicesSection', 'title']} label="Services Section Title">
                <Input placeholder="Complete Financial Solutions" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['servicesSection', 'subtitle']} label="Services Section Subtitle">
                <TextArea rows={2} placeholder="Section subtitle..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="services">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16, backgroundColor: '#f0f9ff' }}>
                    <Row gutter={16} align="top">
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'title']} label="Service Title">
                          <Input placeholder="Service name" />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item {...restField} name={[name, 'description']} label="Description">
                          <TextArea rows={3} placeholder="Service description..." />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Col>
                    </Row>
                    
                    <Form.Item {...restField} name={[name, 'features']} label="Features (Optional)">
                      <Form.List name={[name, 'features']}>
                        {(featureFields, { add: addFeature, remove: removeFeature }) => (
                          <>
                            {featureFields.map(({ key: featureKey, name: featureName, ...featureRestField }) => (
                              <Space key={featureKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item {...featureRestField} name={featureName} style={{ margin: 0, flex: 1 }}>
                                  <Input placeholder="Feature description" />
                                </Form.Item>
                                <Button type="text" danger onClick={() => removeFeature(featureName)} icon={<DeleteOutlined />} />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => addFeature()} block icon={<PlusOutlined />}>
                              Add Feature
                            </Button>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Service
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        {/* Products Section */}
        <Card title="📦 Products Section" style={{ marginBottom: 24 }}>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Form.Item name={['productsSection', 'title']} label="Products Section Title">
                <Input placeholder="Products We Deal In" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['productsSection', 'subtitle']} label="Products Section Subtitle">
                <TextArea rows={2} placeholder="Section subtitle..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16, backgroundColor: '#f6ffed' }}>
                    <Row gutter={16} align="top">
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'title']} label="Product Title">
                          <Input placeholder="Product name" />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item {...restField} name={[name, 'description']} label="Description">
                          <TextArea rows={3} placeholder="Product description..." />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Col>
                    </Row>
                    
                    <Form.Item {...restField} name={[name, 'features']} label="Features (Optional)">
                      <Form.List name={[name, 'features']}>
                        {(featureFields, { add: addFeature, remove: removeFeature }) => (
                          <>
                            {featureFields.map(({ key: featureKey, name: featureName, ...featureRestField }) => (
                              <Space key={featureKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item {...featureRestField} name={featureName} style={{ margin: 0, flex: 1 }}>
                                  <Input placeholder="Feature description" />
                                </Form.Item>
                                <Button type="text" danger onClick={() => removeFeature(featureName)} icon={<DeleteOutlined />} />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => addFeature()} block icon={<PlusOutlined />}>
                              Add Feature
                            </Button>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Product
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={saving} 
            icon={<SaveOutlined />}
            size="large"
            style={{ minWidth: 200 }}
          >
            {saving ? 'Saving...' : 'Save Product Page'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductEditor;