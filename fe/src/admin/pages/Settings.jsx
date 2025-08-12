import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Upload, 
  message, 
  Typography,
  Tabs,
  Divider,
  Space,
  Tag,
  Modal,
  List
} from 'antd';
import { 
  SaveOutlined,
  UploadOutlined,
  ReloadOutlined,
  SettingOutlined,
  GlobalOutlined,
  SecurityScanOutlined,
  MailOutlined,
  DatabaseOutlined,
  ApiOutlined,
  BugOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});
  const [backupModal, setBackupModal] = useState(false);
  const [backups, setBackups] = useState([]);

  useEffect(() => {
    fetchSettings();
    fetchBackups();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/settings');
      const settingsData = response.data || {};
      setSettings(settingsData);
      form.setFieldsValue(settingsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Set default settings
      const defaultSettings = {
        general: {
          siteName: 'Focus Stock Brokers',
          siteDescription: 'Professional Stock Broking Services',
          contactEmail: 'info@focusstockbrokers.com',
          contactPhone: '+91-XXXXXXXXXX',
          address: 'Your Business Address',
          workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM'
        },
        seo: {
          metaTitle: 'Focus Stock Brokers - Professional Trading Services',
          metaDescription: 'Leading stock broking services with advanced trading platforms',
          metaKeywords: 'stock broker, trading, investment, financial services',
          googleAnalyticsId: '',
          googleTagManagerId: ''
        },
        email: {
          smtpHost: '',
          smtpPort: 587,
          smtpUser: '',
          smtpPassword: '',
          fromEmail: '',
          fromName: 'Focus Stock Brokers'
        },
        features: {
          maintenanceMode: false,
          userRegistration: true,
          contactForm: true,
          newsletter: true,
          liveChat: false,
          analytics: true
        },
        security: {
          enableTwoFactor: false,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordMinLength: 8
        }
      };
      setSettings(defaultSettings);
      form.setFieldsValue(defaultSettings);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await axios.get('/admin/backups');
      setBackups(response.data || []);
    } catch (error) {
      console.error('Error fetching backups:', error);
      setBackups([]);
    }
  };

  const handleSave = async (section) => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const updatedSettings = {
        ...settings,
        [section]: values[section]
      };
      
      await axios.put('/settings', updatedSettings);
      setSettings(updatedSettings);
      message.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`);
    } catch (error) {
      console.error('Error saving settings:', error);
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    try {
      setLoading(true);
      await axios.post('/admin/backup');
      message.success('Backup created successfully');
      fetchBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
      message.error('Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  const restoreBackup = async (backupId) => {
    try {
      setLoading(true);
      await axios.post(`/admin/restore/${backupId}`);
      message.success('Backup restored successfully');
      fetchSettings();
    } catch (error) {
      console.error('Error restoring backup:', error);
      message.error('Failed to restore backup');
    } finally {
      setLoading(false);
    }
  };

  const testEmailSettings = async () => {
    try {
      setLoading(true);
      await axios.post('/admin/test-email');
      message.success('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email:', error);
      message.error('Failed to send test email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              ⚙️ System Settings
            </Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
              Configure system-wide settings and preferences
            </Text>
          </div>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={fetchSettings}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}
            >
              Refresh
            </Button>
            <Button 
              icon={<DatabaseOutlined />} 
              onClick={() => setBackupModal(true)}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}
            >
              Backup
            </Button>
          </Space>
        </div>
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <Form form={form} layout="vertical">
          <Tabs defaultActiveKey="general" size="large">
            <TabPane 
              tab={
                <span>
                  <GlobalOutlined />
                  General
                </span>
              } 
              key="general"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item name={['general', 'siteName']} label="Site Name" rules={[{ required: true }]}>
                    <Input placeholder="Enter site name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['general', 'contactEmail']} label="Contact Email" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="Enter contact email" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={['general', 'siteDescription']} label="Site Description">
                    <TextArea rows={3} placeholder="Enter site description" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['general', 'contactPhone']} label="Contact Phone">
                    <Input placeholder="Enter contact phone" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['general', 'workingHours']} label="Working Hours">
                    <Input placeholder="Enter working hours" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={['general', 'address']} label="Address">
                    <TextArea rows={2} placeholder="Enter business address" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave('general')} loading={loading}>
                Save General Settings
              </Button>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <ApiOutlined />
                  SEO
                </span>
              } 
              key="seo"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item name={['seo', 'metaTitle']} label="Meta Title" rules={[{ required: true }]}>
                    <Input placeholder="Enter meta title" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={['seo', 'metaDescription']} label="Meta Description" rules={[{ required: true }]}>
                    <TextArea rows={3} placeholder="Enter meta description" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={['seo', 'metaKeywords']} label="Meta Keywords">
                    <Input placeholder="Enter keywords separated by commas" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['seo', 'googleAnalyticsId']} label="Google Analytics ID">
                    <Input placeholder="GA-XXXXXXXXX" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['seo', 'googleTagManagerId']} label="Google Tag Manager ID">
                    <Input placeholder="GTM-XXXXXXX" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave('seo')} loading={loading}>
                Save SEO Settings
              </Button>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <MailOutlined />
                  Email
                </span>
              } 
              key="email"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'smtpHost']} label="SMTP Host">
                    <Input placeholder="smtp.gmail.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'smtpPort']} label="SMTP Port">
                    <Input type="number" placeholder="587" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'smtpUser']} label="SMTP Username">
                    <Input placeholder="your-email@gmail.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'smtpPassword']} label="SMTP Password">
                    <Input.Password placeholder="Your email password" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'fromEmail']} label="From Email">
                    <Input placeholder="noreply@yoursite.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['email', 'fromName']} label="From Name">
                    <Input placeholder="Your Company Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Space>
                <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave('email')} loading={loading}>
                  Save Email Settings
                </Button>
                <Button icon={<BugOutlined />} onClick={testEmailSettings} loading={loading}>
                  Test Email
                </Button>
              </Space>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <SettingOutlined />
                  Features
                </span>
              } 
              key="features"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card size="small" title="Site Features">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Maintenance Mode</Text>
                        <Form.Item name={['features', 'maintenanceMode']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>User Registration</Text>
                        <Form.Item name={['features', 'userRegistration']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Contact Form</Text>
                        <Form.Item name={['features', 'contactForm']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card size="small" title="Marketing Features">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Newsletter Signup</Text>
                        <Form.Item name={['features', 'newsletter']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Live Chat</Text>
                        <Form.Item name={['features', 'liveChat']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Analytics Tracking</Text>
                        <Form.Item name={['features', 'analytics']} valuePropName="checked" style={{ margin: 0 }}>
                          <Switch />
                        </Form.Item>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave('features')} loading={loading}>
                Save Feature Settings
              </Button>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <SecurityScanOutlined />
                  Security
                </span>
              } 
              key="security"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item name={['security', 'sessionTimeout']} label="Session Timeout (minutes)">
                    <Input type="number" placeholder="30" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['security', 'maxLoginAttempts']} label="Max Login Attempts">
                    <Input type="number" placeholder="5" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name={['security', 'passwordMinLength']} label="Minimum Password Length">
                    <Input type="number" placeholder="8" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Enable Two-Factor Authentication</Text>
                    <Form.Item name={['security', 'enableTwoFactor']} valuePropName="checked" style={{ margin: 0 }}>
                      <Switch />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave('security')} loading={loading}>
                Save Security Settings
              </Button>
            </TabPane>
          </Tabs>
        </Form>
      </Card>

      <Modal
        title="Backup Management"
        open={backupModal}
        onCancel={() => setBackupModal(false)}
        footer={[
          <Button key="close" onClick={() => setBackupModal(false)}>
            Close
          </Button>,
          <Button key="create" type="primary" icon={<DatabaseOutlined />} onClick={createBackup} loading={loading}>
            Create New Backup
          </Button>
        ]}
        width={600}
      >
        <List
          dataSource={backups}
          renderItem={(backup) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => restoreBackup(backup.id)}>
                  Restore
                </Button>
              ]}
            >
              <List.Item.Meta
                title={`Backup - ${new Date(backup.createdAt).toLocaleString()}`}
                description={`Size: ${backup.size} | Type: ${backup.type}`}
              />
            </List.Item>
          )}
          locale={{ emptyText: 'No backups available' }}
        />
      </Modal>
    </div>
  );
};

export default Settings;