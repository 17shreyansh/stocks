import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  Tabs,
  Row,
  Col,
  message,
  Spin,
  Divider,
  Select,
  InputNumber,
  Switch
} from 'antd';
import { SaveOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PageEditor = () => {
  const { pageName } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, [pageName]);

  const fetchPageData = async () => {
    try {
      const response = await axios.get(`/pages/${pageName}`);
      setPageData(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        // Create new page structure
        const newPageData = {
          name: pageName,
          hero: { 
            title: { main: '', highlight: '' }, 
            description: '', 
            scrollText: '', 
            buttons: [], 
            orbitConfigs: [] 
          },
          about: { 
            title: '', 
            subtitle: '', 
            story: { title: '', paragraphs: [''] }, 
            milestones: [] 
          },
          testimonials: { 
            title: '', 
            subtitle: '', 
            testimonials: [] 
          },
          contact: { 
            title: '', 
            subtitle: '', 
            form: { submitText: '', successMessage: '', socialProof: '' }, 
            contactInfo: { title: '', description: '', details: [] }, 
            team: { title: '', members: [] } 
          },
          whyChooseUs: { 
            title: '', 
            subtitle: '', 
            advantages: [] 
          },
          mobileApp: { 
            trading: { title: '', description: '', features: [], rating: '', downloadTitle: '' }, 
            mutualFunds: { title: '', description: '', features: [], rating: '', downloadTitle: '' }, 
            storeButtons: [] 
          },
          productGrid: { 
            header: { title: '', subtitle: '' }, 
            products: [] 
          },
          trustManifesto: { 
            manifestoStatements: [] 
          },
          advancedSlider: { 
            header: { title: '', subtitle: '' }, 
            slides: [] 
          },
          attentionInvestors: { 
            title: '', 
            bulletPoints: [], 
            disclaimer: '' 
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
      const payload = { ...values, name: pageName };
      if (pageData?._id) {
        await axios.put(`/pages/${pageName}`, payload);
        message.success('Page updated successfully');
      } else {
        await axios.post('/pages', payload);
        message.success('Page created successfully');
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

  const tabItems = [
    {
      key: 'hero',
      label: 'Hero Section',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Main Title"
                name={['hero', 'title', 'main']}
                rules={[{ required: true, message: 'Main title is required' }]}
              >
                <Input placeholder="An intelligent way to" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Highlight Text"
                name={['hero', 'title', 'highlight']}
                rules={[{ required: true, message: 'Highlight text is required' }]}
              >
                <Input placeholder="Invest & Trade" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Description"
            name={['hero', 'description']}
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <TextArea
              rows={3}
              placeholder="Experience the future of investing..."
            />
          </Form.Item>
          <Form.Item
            label="Scroll Text"
            name={['hero', 'scrollText']}
          >
            <Input placeholder="Scroll Down" />
          </Form.Item>
          <Divider>Hero Buttons</Divider>
          <Form.List name={['hero', 'buttons']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Get Started" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                    >
                      <Select placeholder="Type" style={{ width: 120 }}>
                        <Select.Option value="primary">Primary</Select.Option>
                        <Select.Option value="secondary">Secondary</Select.Option>
                      </Select>
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Button
                </Button>
              </>
            )}
          </Form.List>
          <Divider>Orbit Configurations</Divider>
          <Form.List name={['hero', 'orbitConfigs']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'icon']} label="Icon">
                          <Input placeholder="FaApple" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'size']} label="Size">
                          <InputNumber placeholder="55" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'tilt']} label="Tilt">
                          <InputNumber placeholder="15" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'color']} label="Color">
                          <Input placeholder="#007AFF" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'bgColor']} label="Background Color">
                          <Input placeholder="#ffffff" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button onClick={() => remove(name)} danger>
                      Remove Orbit Config
                    </Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Orbit Config
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'about',
      label: 'About Section',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name={['about', 'title']}
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input placeholder="Focus Stock Broker Ltd" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Story Title"
                name={['about', 'story', 'title']}
              >
                <Input placeholder="Our Story" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Subtitle"
            name={['about', 'subtitle']}
          >
            <TextArea
              rows={2}
              placeholder="From startup to success story..."
            />
          </Form.Item>
          <Divider>Story Paragraphs</Divider>
          <Form.List name={['about', 'story', 'paragraphs']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      style={{ flex: 1 }}
                    >
                      <TextArea rows={3} placeholder="Since 2018, we've been on a mission to democratize stock market investing..." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Paragraph
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Divider>Milestones</Divider>
          <Form.List name={['about', 'milestones']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'date']} label="Date">
                          <Input placeholder="2018" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'year']} label="Year">
                          <InputNumber placeholder="2018" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'value']} label="Value">
                          <InputNumber placeholder="125.50" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'growth']} label="Growth">
                          <InputNumber placeholder="0" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item {...restField} name={[name, 'title']} label="Title">
                      <Input placeholder="The Beginning" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'description']} label="Description">
                      <TextArea rows={2} placeholder="Started with a dream to make trading accessible." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger>
                      Remove Milestone
                    </Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Milestone
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'testimonials',
      label: 'Testimonials',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Section Title"
                name={['testimonials', 'title']}
              >
                <Input placeholder="What Our Clients Say" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Section Subtitle"
                name={['testimonials', 'subtitle']}
              >
                <Input placeholder="Real stories from real investors..." />
              </Form.Item>
            </Col>
          </Row>
          <Divider>Testimonials</Divider>
          <Form.List name={['testimonials', 'testimonials']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'id']}
                          label="ID"
                        >
                          <InputNumber placeholder="1" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Name"
                        >
                          <Input placeholder="Rajesh Sharma" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'role']}
                          label="Role"
                        >
                          <Input placeholder="IT Professional" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'rating']}
                          label="Rating"
                        >
                          <InputNumber min={1} max={5} placeholder="5" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      {...restField}
                      name={[name, 'quote']}
                      label="Quote"
                    >
                      <TextArea rows={3} placeholder="Testimonial quote..." />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'result']}
                          label="Result"
                        >
                          <Input placeholder="23% returns in 8 months" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Button onClick={() => remove(name)} danger style={{ marginTop: 30 }}>
                          Remove Testimonial
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Testimonial
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'whyChooseUs',
      label: 'Why Choose Us',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title" name={['whyChooseUs', 'title']}>
                <Input placeholder="Why Choose Us" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Subtitle" name={['whyChooseUs', 'subtitle']}>
                <Input placeholder="Our advantages" />
              </Form.Item>
            </Col>
          </Row>
          <Divider>Advantages</Divider>
          <Form.List name={['whyChooseUs', 'advantages']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'title']} label="Title">
                          <Input placeholder="Advantage Title" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'value']} label="Value">
                          <Input placeholder="0% Brokerage" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'id']} label="ID">
                          <InputNumber placeholder="1" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item {...restField} name={[name, 'description']} label="Description">
                      <TextArea rows={2} placeholder="Description..." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger>
                      Remove Advantage
                    </Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Advantage
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'mobileApp',
      label: 'Mobile App',
      children: (
        <Card>
          <Divider>Trading App</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title" name={['mobileApp', 'trading', 'title']}>
                <Input placeholder="Trading App" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rating" name={['mobileApp', 'trading', 'rating']}>
                <Input placeholder="4.8 • 50K+ downloads" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name={['mobileApp', 'trading', 'description']}>
            <TextArea rows={2} placeholder="App description..." />
          </Form.Item>
          <Form.Item label="Download Title" name={['mobileApp', 'trading', 'downloadTitle']}>
            <Input placeholder="Download Now" />
          </Form.Item>
          <Form.List name={['mobileApp', 'trading', 'features']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={10}>
                      <Form.Item {...restField} name={[name, 'title']}>
                        <Input placeholder="Feature Title" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item {...restField} name={[name, 'description']}>
                        <Input placeholder="Feature Description" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Trading Feature
                </Button>
              </>
            )}
          </Form.List>
          
          <Divider>Mutual Funds App</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title" name={['mobileApp', 'mutualFunds', 'title']}>
                <Input placeholder="Mutual Funds App" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rating" name={['mobileApp', 'mutualFunds', 'rating']}>
                <Input placeholder="4.9 • 75K+ downloads" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name={['mobileApp', 'mutualFunds', 'description']}>
            <TextArea rows={2} placeholder="App description..." />
          </Form.Item>
          <Form.Item label="Download Title" name={['mobileApp', 'mutualFunds', 'downloadTitle']}>
            <Input placeholder="Download Now" />
          </Form.Item>
          <Form.List name={['mobileApp', 'mutualFunds', 'features']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={10}>
                      <Form.Item {...restField} name={[name, 'title']}>
                        <Input placeholder="Feature Title" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item {...restField} name={[name, 'description']}>
                        <Input placeholder="Feature Description" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add MF Feature
                </Button>
              </>
            )}
          </Form.List>
          
          <Divider>Store Buttons</Divider>
          <Form.List name={['mobileApp', 'storeButtons']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={8}>
                      <Form.Item {...restField} name={[name, 'type']}>
                        <Select placeholder="Store Type">
                          <Select.Option value="apple">Apple</Select.Option>
                          <Select.Option value="google">Google</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...restField} name={[name, 'text']}>
                        <Input placeholder="Button Text" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'name']}>
                        <Input placeholder="App Name" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Store Button
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'productGrid',
      label: 'Product Grid',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Header Title" name={['productGrid', 'header', 'title']}>
                <Input placeholder="Our Products" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Header Subtitle" name={['productGrid', 'header', 'subtitle']}>
                <Input placeholder="Choose your investment path" />
              </Form.Item>
            </Col>
          </Row>
          <Divider>Products</Divider>
          <Form.List name={['productGrid', 'products']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'id']} label="ID">
                          <InputNumber placeholder="1" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item {...restField} name={[name, 'title']} label="Title">
                          <Input placeholder="Product Title" />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item {...restField} name={[name, 'type']} label="Type">
                          <Select placeholder="Product Type">
                            <Select.Option value="trading">Trading</Select.Option>
                            <Select.Option value="investment">Investment</Select.Option>
                            <Select.Option value="mutual-funds">Mutual Funds</Select.Option>
                            <Select.Option value="insurance">Insurance</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item {...restField} name={[name, 'description']} label="Description">
                      <TextArea rows={2} placeholder="Product description..." />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'link']} label="Link">
                          <Input placeholder="/product-link" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Button onClick={() => remove(name)} danger style={{ marginTop: 30 }}>
                          Remove Product
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Product
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'trustManifesto',
      label: 'Trust Manifesto',
      children: (
        <Card>
          <Divider>Manifesto Statements</Divider>
          <Form.List name={['trustManifesto', 'manifestoStatements']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Traditional brokers complicate." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Statement
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'advancedSlider',
      label: 'Advanced Slider',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Header Title" name={['advancedSlider', 'header', 'title']}>
                <Input placeholder="Our Financial Services" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Header Subtitle" name={['advancedSlider', 'header', 'subtitle']}>
                <Input placeholder="Comprehensive solutions tailored for your investment success" />
              </Form.Item>
            </Col>
          </Row>
          <Divider>Slides</Divider>
          <Form.List name={['advancedSlider', 'slides']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'id']} label="ID">
                          <InputNumber placeholder="1" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item {...restField} name={[name, 'title']} label="Title">
                          <Input placeholder="Portfolio Management" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item {...restField} name={[name, 'subtitle']} label="Subtitle">
                      <Input placeholder="Professional portfolio analysis and optimization" />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'background']} label="Background Image">
                          <Input placeholder="https://images.unsplash.com/..." />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'cta']} label="CTA Text">
                          <Input placeholder="Learn More" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'ctaLink']} label="CTA Link">
                          <Input placeholder="#portfolio" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button onClick={() => remove(name)} danger>
                      Remove Slide
                    </Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Slide
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    },
    {
      key: 'attentionInvestors',
      label: 'Attention Investors',
      children: (
        <Card>
          <Form.Item label="Title" name={['attentionInvestors', 'title']}>
            <Input placeholder="Attention Investors" />
          </Form.Item>
          <Divider>Bullet Points</Divider>
          <Form.List name={['attentionInvestors', 'bulletPoints']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      style={{ flex: 1 }}
                    >
                      <TextArea rows={2} placeholder="Stock market investments are subject to market risks..." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Bullet Point
                </Button>
              </>
            )}
          </Form.List>
          <Divider>Disclaimer</Divider>
          <Form.Item label="Disclaimer" name={['attentionInvestors', 'disclaimer']}>
            <TextArea rows={3} placeholder="Focus Stock Broker Ltd is a SEBI registered stock broker..." />
          </Form.Item>
        </Card>
      )
    },
    {
      key: 'contact',
      label: 'Contact Section',
      children: (
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name={['contact', 'title']}
              >
                <Input placeholder="Get in Touch" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Submit Button Text"
                name={['contact', 'form', 'submitText']}
              >
                <Input placeholder="Submit Inquiry" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Subtitle"
            name={['contact', 'subtitle']}
          >
            <TextArea
              rows={2}
              placeholder="Ready to start your investment journey..."
            />
          </Form.Item>
          <Form.Item
            label="Success Message"
            name={['contact', 'form', 'successMessage']}
          >
            <TextArea
              rows={2}
              placeholder="Thank you for contacting us..."
            />
          </Form.Item>
          <Form.Item
            label="Social Proof"
            name={['contact', 'form', 'socialProof']}
          >
            <Input placeholder="Join 500+ investors who contacted us this month" />
          </Form.Item>
          
          <Divider>Contact Information</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Info Title" name={['contact', 'contactInfo', 'title']}>
                <Input placeholder="Contact Information" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Info Description" name={['contact', 'contactInfo', 'description']}>
                <TextArea rows={2} placeholder="Our team of experts..." />
              </Form.Item>
            </Col>
          </Row>
          <Form.List name={['contact', 'contactInfo', 'details']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'icon']}>
                        <Select placeholder="Icon">
                          <Select.Option value="location">Location</Select.Option>
                          <Select.Option value="phone">Phone</Select.Option>
                          <Select.Option value="email">Email</Select.Option>
                          <Select.Option value="clock">Clock</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item {...restField} name={[name, 'text']}>
                        <Input placeholder="Contact detail" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Contact Detail
                </Button>
              </>
            )}
          </Form.List>
          
          <Divider>Team Members</Divider>
          <Form.Item label="Team Title" name={['contact', 'team', 'title']}>
            <Input placeholder="Meet Our Team" />
          </Form.Item>
          <Form.List name={['contact', 'team', 'members']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={8}>
                      <Form.Item {...restField} name={[name, 'name']}>
                        <Input placeholder="Member Name" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...restField} name={[name, 'role']}>
                        <Input placeholder="Member Role" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'initials']}>
                        <Input placeholder="RK" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button onClick={() => remove(name)} danger icon={<DeleteOutlined />} />
                    </Col>
                  </Row>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Team Member
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )
    }
  ];

  // Reorder tabs for better UX
  const orderedTabs = [
    tabItems.find(tab => tab.key === 'hero'),
    tabItems.find(tab => tab.key === 'about'),
    tabItems.find(tab => tab.key === 'trustManifesto'),
    tabItems.find(tab => tab.key === 'advancedSlider'),
    tabItems.find(tab => tab.key === 'productGrid'),
    tabItems.find(tab => tab.key === 'mobileApp'),
    tabItems.find(tab => tab.key === 'whyChooseUs'),
    tabItems.find(tab => tab.key === 'testimonials'),
    tabItems.find(tab => tab.key === 'contact'),
    tabItems.find(tab => tab.key === 'attentionInvestors')
  ].filter(Boolean);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Edit {pageName} Page</Title>
        <Space>
          <Button icon={<EyeOutlined />}>
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
        <Tabs items={orderedTabs} />
      </Form>
    </div>
  );
};

export default PageEditor;