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
  Switch,
  Upload,
  Modal
} from 'antd';
import { SaveOutlined, EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ImageUpload = ({ value, onChange, placeholder }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [urlValue, setUrlValue] = useState(value && !value.startsWith('data:') ? value : '');
  const [uploadValue, setUploadValue] = useState(value && value.startsWith('data:') ? value : '');

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleConfirm = () => {
    onChange(previewImage);
    setPreviewVisible(false);
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadValue(e.target.result);
      setUrlValue('');
      handlePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlValue(url);
    if (url) {
      setUploadValue('');
    }
  };

  const handleRemove = () => {
    setUrlValue('');
    setUploadValue('');
    onChange('');
  };

  const currentValue = urlValue || uploadValue;

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <Input
          placeholder="Enter image URL"
          value={urlValue}
          onChange={handleUrlChange}
          disabled={!!uploadValue}
          addonAfter={
            urlValue ? (
              <Button size="small" onClick={() => handlePreview(urlValue)} icon={<EyeOutlined />} />
            ) : null
          }
        />
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
          accept="image/*"
          disabled={!!urlValue}
        >
          <Button icon={<UploadOutlined />} disabled={!!urlValue}>
            Upload from Device
          </Button>
        </Upload>
        {uploadValue && (
          <Button size="small" onClick={() => handlePreview(uploadValue)} icon={<EyeOutlined />}>
            Preview
          </Button>
        )}
        {currentValue && (
          <Button danger onClick={handleRemove}>
            Remove
          </Button>
        )}
      </div>
      <Modal
        open={previewVisible}
        title="Image Preview"
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setPreviewVisible(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        ]}
      >
        <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
      </Modal>
    </>
  );
};

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
      if (response.data) {
        setPageData(response.data);
        form.setFieldsValue(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      // Use real homepage data as fallback
      const fallbackData = {
        name: pageName,
        hero: {
          title: { main: "An intelligent way to", highlight: "Invest & Trade" },
          description: ["Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms."],
          scrollText: "Scroll Down",
          primaryButtonText: "Get Started",
          secondaryButtonText: "Learn More",
          backgroundImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
        },
        about: {
          title: "Focus Stock Broker Ltd",
          subtitle: ["From startup to success story - transforming how India invests since 2018"],
          story: {
            title: "Our Story",
            paragraphs: [
              "Since 2018, we've been on a mission to democratize stock market investing in India. What started as a vision to break down barriers has evolved into a comprehensive platform serving thousands of investors nationwide.",
              "Our journey reflects the growth of India's retail investment landscape. From our humble beginnings to becoming a trusted partner for 25,000+ investors, each milestone represents our commitment to innovation, transparency, and customer success."
            ]
          },
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
          milestones: [
            {
              date: "2018",
              title: "The Beginning",
              description: ["Started with a dream to make trading accessible."],
              value: "125.50 Cr",
              image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              date: "2019",
              title: "Official Launch",
              description: ["SEBI registered and launched zero brokerage platform."],
              value: "189.75 Cr",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              date: "2020",
              title: "Mobile App",
              description: ["Launched mobile app during pandemic for safe trading."],
              value: "245.30 Cr",
              image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              date: "2021",
              title: "10K Community",
              description: ["Built 10,000+ investor community with advisory."],
              value: "387.90 Cr",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              date: "2022",
              title: "AI Innovation",
              description: ["Introduced AI-powered insights and automation."],
              value: "456.25 Cr",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              date: "2023",
              title: "Trusted Partner",
              description: ["25,000+ investors, ₹500+ Crores managed."],
              value: "612.80 Cr",
              image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
            }
          ]
        },
        testimonials: {
          title: "What Our Clients Say",
          subtitle: "Real stories from real investors who trust Focus Stock Broker Ltd",
          testimonials: [
            {
              name: "Rajesh Sharma",
              role: "IT Professional",
              quote: "Focus Stock Broker Ltd has transformed my investment journey. The platform is clean and reliable; zero brokerage on delivery trades improved my net returns.",
              result: "23% returns in 8 months",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
            },
            {
              name: "Priya Patel",
              role: "Business Owner",
              quote: "As a busy entrepreneur, I needed speed and clarity. Focus Stock Broker Ltd delivers both, and support is responsive when it actually matters.",
              result: "18% portfolio growth",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
            },
            {
              name: "Amit Verma",
              role: "Retired Professor",
              quote: "Their research notes are concise and decision‑oriented. It helped me structure a disciplined retirement portfolio.",
              result: "Consistent 15% annual returns",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
            }
          ]
        },
        whyChooseUs: {
          title: "Why Choose Focus Stock Broker Ltd",
          subtitle: "Our competitive advantages that set us apart in the industry",
          advantages: [
            {
              title: "Lightning Fast",
              value: "<0.1s",
              description: ["Order execution speed, faster than industry average for seamless trading experience."],
              icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
            },
            {
              title: "Reliable Platform",
              value: "99.9%",
              description: ["Uptime guarantee with robust infrastructure to ensure uninterrupted trading."],
              icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
            },
            {
              title: "Expert Support",
              value: "24/7",
              description: ["Customer support availability with dedicated relationship managers for premium clients."],
              icon: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
            },
            {
              title: "Full Transparency",
              value: "0",
              description: ["Zero hidden charges with clear fee structure and transparent pricing policy."],
              icon: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
            }
          ]
        },
        mobileApp: {
          trading: {
            title: "Trading App",
            description: ["Professional trading platform with real-time market data, advanced charting, and instant execution."],
            features: [
              { title: "Real-time Charts", description: "Advanced technical analysis with live market data" },
              { title: "Quick Trading", description: "One-tap buy/sell with instant order execution" },
              { title: "Dark Mode UI", description: "Glassmorphism design optimized for trading" },
              { title: "Portfolio Tracking", description: "Real-time P&L and position monitoring" }
            ],
            rating: "4.8 • 50K+ downloads",
            downloadTitle: "Download Now"
          },
          mutualFunds: {
            title: "Mutual Funds App",
            description: ["Simplified investing with curated mutual funds, SIP automation, and educational resources."],
            features: [
              { title: "SIP Automation", description: "Set up systematic investment plans effortlessly" },
              { title: "Portfolio Overview", description: "Clean dashboard with performance insights" },
              { title: "Educational Cards", description: "Learn investing basics with interactive content" },
              { title: "Goal Planning", description: "Plan investments for life goals" }
            ],
            rating: "4.9 • 75K+ downloads",
            downloadTitle: "Download Now"
          },
          storeButtons: [
            { type: "apple", text: "Download on the", name: "App Store", link: "https://apps.apple.com/app/focus-trading" },
            { type: "google", text: "Get it on", name: "Google Play", link: "https://play.google.com/store/apps/details?id=com.focus.trading" }
          ]
        },
        productGrid: {
          header: {
            title: "Our Product Suite",
            subtitle: "Comprehensive financial solutions designed to empower your investment journey"
          },
          products: [
            { id: 1, title: "Equity Trading", description: ["Buy and sell stocks with advanced charting tools and real-time market data for informed investment decisions"], type: "trading", link: "#equity" },
            { id: 2, title: "Derivatives Trading", description: ["Trade futures and options with professional risk management tools"], type: "analytics", link: "#derivatives" },
            { id: 3, title: "IPO Investment", description: ["Apply for IPOs with seamless ASBA process and instant updates"], type: "research", link: "#ipo" },
            { id: 4, title: "Research Reports", description: ["Expert stock recommendations and detailed market analysis"], type: "mobile", link: "#research" },
            { id: 5, title: "Portfolio & SIP", description: ["Monitor investments with detailed P&L analysis and start SIP with as low as ₹500 per month"], type: "advisory", link: "#portfolio-sip" },
            { id: 6, title: "Mutual Funds", description: ["Diversified portfolio investments with expert fund selection"], type: "portfolio", link: "#mutualfunds" }
          ]
        },
        trustManifesto: {
          manifestoStatements: [
            { text: "Traditional brokers complicate." },
            { text: "We simplify." },
            { text: "Traditional brokers hide fees." },
            { text: "We reveal everything." },
            { text: "Traditional brokers use old technology." },
            { text: "We built the future." }
          ]
        },
        advancedSlider: {
          header: {
            title: "Our Financial Services",
            subtitle: "Comprehensive solutions tailored for your investment success"
          },
          slides: [
            {
              id: 1,
              background: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
              title: "Portfolio Management",
              subtitle: "Professional portfolio analysis and optimization",
              cta: "Learn More",
              ctaLink: "#portfolio"
            },
            {
              id: 2,
              background: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
              title: "Trading Platform",
              subtitle: "Advanced tools for professional trading",
              cta: "Start Trading",
              ctaLink: "#trading"
            },
            {
              id: 3,
              background: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
              title: "Market Analysis",
              subtitle: "Real-time market insights and research",
              cta: "View Reports",
              ctaLink: "#analysis"
            },
            {
              id: 4,
              background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
              title: "Investment Advisory",
              subtitle: "Expert guidance for your financial goals",
              cta: "Get Advice",
              ctaLink: "#advisory"
            },
            {
              id: 5,
              background: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
              title: "Wealth Management",
              subtitle: "Comprehensive wealth planning services",
              cta: "Explore",
              ctaLink: "#wealth"
            }
          ]
        },
        attentionInvestors: {
          title: "Attention Investors",
          bulletPoints: [
            "Stock market investments are subject to market risks. Read all scheme related documents carefully before investing.",
            "Registration granted by SEBI, membership of BSE/NSE and registration of the ARN with AMFI does not guarantee protection of investors' interests or ensure quality of service.",
            "There is no guarantee or assurance of returns or capital protection in any of our services.",
            "Past performance is not indicative of future returns.",
            "Investors should make investment decisions based on their financial goals, risk tolerance and investment horizon.",
            "Investors should note that the NAV of the schemes may go up or down depending upon the factors and forces affecting the securities market."
          ],
          disclaimer: "Focus Stock Broker Ltd is a SEBI registered stock broker with Registration No: INZ000123456. All disputes are subject to the exclusive jurisdiction of courts in Mumbai, India."
        },
        contact: {
          title: "Get in Touch",
          subtitle: ["Ready to start your investment journey? Our team of experts is here to help you make informed decisions."],
          form: {
            submitText: "Submit Inquiry",
            successMessage: "Thank you for contacting us! We'll get back to you shortly.",
            socialProof: "Join 500+ investors who contacted us this month"
          },
          contactInfo: {
            title: "Contact Information",
            description: "Our team of experts is ready to assist you with any questions about our services or how to get started with investing.",
            details: [
              { icon: "location", text: "Focus Tower, 123 Financial District, Mumbai 400001, India" },
              { icon: "phone", text: "+91 22 1234 5678" },
              { icon: "email", text: "support@focusstockbroker.com" },
              { icon: "clock", text: "Monday - Friday: 9:00 AM - 6:00 PM" }
            ]
          },
          team: {
            title: "Meet Our Team",
            members: [
              { name: "Rahul Kumar", role: "Senior Investment Advisor", initials: "RK", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Sanjay Mehta", role: "Client Relationship Manager", initials: "SM", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Anita Patel", role: "Research Analyst", initials: "AP", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Vikram Gupta", role: "Technical Support", initials: "VG", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" }
            ]
          }
        }
      };
      setPageData(fallbackData);
      form.setFieldsValue(fallbackData);
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
          <Form.Item label="Description">
            <Form.List name={['hero', 'description']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea rows={2} placeholder="Experience the future of investing..." />
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
          <Form.Item
            label="Scroll Text"
            name={['hero', 'scrollText']}
          >
            <Input placeholder="Scroll Down" />
          </Form.Item>
          <Form.Item
            label="Primary Button Text"
            name={['hero', 'primaryButtonText']}
          >
            <Input placeholder="Get Started" />
          </Form.Item>
          <Form.Item
            label="Secondary Button Text"
            name={['hero', 'secondaryButtonText']}
          >
            <Input placeholder="Learn More" />
          </Form.Item>
          <Form.Item
            label="Hero Background Image"
            name={['hero', 'backgroundImage']}
          >
            <ImageUpload placeholder="Image URL or upload from device" />
          </Form.Item>
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
          <Form.Item label="Subtitle">
            <Form.List name={['about', 'subtitle']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea rows={2} placeholder="From startup to success story..." />
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
          <Divider>Story Paragraphs</Divider>
          <Form.List name={['about', 'story', 'paragraphs']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <TextArea rows={3} placeholder="Since 2018, we've been on a mission to democratize stock market investing..." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger style={{ marginTop: 4 }}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Paragraph
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            label="About Section Image"
            name={['about', 'image']}
          >
            <ImageUpload placeholder="Image URL or upload from device" />
          </Form.Item>
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
                      <Col span={18}>
                        <Form.Item {...restField} name={[name, 'value']} label="Value">
                          <Input placeholder="125.50 Cr" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item {...restField} name={[name, 'title']} label="Title">
                      <Input placeholder="The Beginning" />
                    </Form.Item>
                    <Form.Item {...restField} label="Description">
                      <Form.List name={[name, 'description']}>
                        {(descFields, { add: addDesc, remove: removeDesc }) => (
                          <>
                            {descFields.map(({ key, name: descName, ...restDescField }) => (
                              <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                                <Form.Item {...restDescField} name={[descName]} style={{ flex: 1, marginBottom: 0 }}>
                                  <TextArea rows={2} placeholder="Started with a dream to make trading accessible." />
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
                    <Form.Item {...restField} name={[name, 'image']} label="Milestone Image">
                      <ImageUpload placeholder="Image URL or upload from device" />
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
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Name"
                        >
                          <Input placeholder="Rajesh Sharma" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'role']}
                          label="Role"
                        >
                          <Input placeholder="IT Professional" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'image']}
                          label="Photo"
                        >
                          <ImageUpload placeholder="Image URL or upload from device" />
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
                    <Form.Item
                      {...restField}
                      name={[name, 'result']}
                      label="Result"
                    >
                      <Input placeholder="23% returns in 8 months" />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger>
                      Remove Testimonial
                    </Button>
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
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'title']} label="Title">
                          <Input placeholder="Advantage Title" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'value']} label="Value">
                          <Input placeholder="0% Brokerage" />
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
                                  <TextArea rows={2} placeholder="Description..." />
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
                    <Form.Item {...restField} name={[name, 'icon']} label="Icon Image">
                      <ImageUpload placeholder="Image URL or upload from device" />
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
          <Form.Item label="Description">
            <Form.List name={['mobileApp', 'trading', 'description']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea rows={2} placeholder="App description..." />
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
          <Form.Item label="Description">
            <Form.List name={['mobileApp', 'mutualFunds', 'description']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea rows={2} placeholder="App description..." />
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
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'type']} label="Store Type">
                          <Select placeholder="Store Type">
                            <Select.Option value="apple">Apple</Select.Option>
                            <Select.Option value="google">Google</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'text']} label="Button Text">
                          <Input placeholder="Button Text" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'name']} label="App Name">
                          <Input placeholder="App Name" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'link']} label="Download Link">
                          <Input placeholder="https://apps.apple.com/..." />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button onClick={() => remove(name)} danger>
                      Remove Store Button
                    </Button>
                  </Card>
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
                    <Form.Item {...restField} label="Description">
                      <Form.List name={[name, 'description']}>
                        {(descFields, { add: addDesc, remove: removeDesc }) => (
                          <>
                            {descFields.map(({ key, name: descName, ...restDescField }) => (
                              <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                                <Form.Item {...restDescField} name={[descName]} style={{ flex: 1, marginBottom: 0 }}>
                                  <TextArea rows={2} placeholder="Product description..." />
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
                  <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Traditional brokers complicate." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger style={{ marginTop: 4 }}>
                      Remove
                    </Button>
                  </div>
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
                          <ImageUpload placeholder="Background image" />
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
                  <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <TextArea rows={2} placeholder="Stock market investments are subject to market risks..." />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger style={{ marginTop: 4 }}>
                      Remove
                    </Button>
                  </div>
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
          <Form.Item label="Subtitle">
            <Form.List name={['contact', 'subtitle']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
                      <Form.Item {...restField} name={[name]} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea rows={2} placeholder="Ready to start your investment journey..." />
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
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'name']}>
                        <Input placeholder="Member Name" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'role']}>
                        <Input placeholder="Member Role" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'initials']}>
                        <Input placeholder="RK" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} name={[name, 'photo']}>
                        <ImageUpload placeholder="Member photo" />
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
        <Row gutter={[0, 24]}>
          {orderedTabs.map((tab) => (
            <Col xs={24} key={tab.key}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>
                      {tab.label}
                    </span>
                  </div>
                }
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
                {tab.children}
              </Card>
            </Col>
          ))}
        </Row>
      </Form>
    </div>
  );
};

export default PageEditor;