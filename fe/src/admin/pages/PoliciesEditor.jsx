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
  Upload,
  Select,
  Table,
  Popconfirm,
  Tag
} from 'antd';
import { SaveOutlined, EyeOutlined, UploadOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';
import { handleUploadError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const { Title } = Typography;
const { TextArea } = Input;

const PoliciesEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [departments, setDepartments] = useState(['Trading', 'Compliance', 'Risk Management']);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [policyForm] = Form.useForm();
  const [newDepartment, setNewDepartment] = useState('');
  const [policyFormData, setPolicyFormData] = useState({
    title: '',
    department: '',
    description: '',
    downloadUrl: ''
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/policies');
      const data = response.data.data || response.data;
      
      if (data && data.policies) {
        setPageData(data);
        form.setFieldsValue(data.policies);
        setPolicies(data.policies.policies || []);
        setDepartments(data.policies.departments || ['Trading', 'Compliance', 'Risk Management']);
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      console.error('Error fetching policies data:', error);
      const defaultData = {
        name: 'policies',
        policies: {
          header: {
            title: 'Policies Center',
            subtitle: 'Access all company policies and procedures organized by department.'
          },
          departments: ['Trading', 'Compliance', 'Risk Management'],
          policies: [],
          emptyState: {
            title: 'No policies found',
            message: 'Try adjusting your search terms or filters'
          }
        }
      };
      setPageData(defaultData);
      form.setFieldsValue(defaultData.policies);
      setPolicies([]);
      setDepartments(defaultData.policies.departments);
      
      if (error.response?.status !== 404) {
        message.error('Error loading policies data. Using defaults.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await form.validateFields();
      const formValues = form.getFieldsValue();
      
      const payload = {
        name: 'policies',
        policies: {
          header: formValues.header || {
            title: 'Policies Center',
            subtitle: 'Access all company policies and procedures organized by department.'
          },
          departments,
          policies,
          emptyState: {
            title: 'No policies found',
            message: 'Try adjusting your search terms or filters'
          }
        }
      };
      
      console.log('Saving payload:', payload);
      
      const response = await axios.post('/pages', payload);
      console.log('Save response:', response.data);
      
      message.success('Policies page saved successfully');
      setPageData(response.data);
    } catch (error) {
      console.error('Save error:', error);
      message.error(error.response?.data?.message || 'Error saving policies page');
    } finally {
      setSaving(false);
    }
  };



  const addPolicy = () => {
    if (!policyFormData.title.trim() || !policyFormData.department) {
      message.error('Title and department are required');
      return;
    }
    
    const newPolicy = {
      id: Date.now(),
      title: policyFormData.title.trim(),
      department: policyFormData.department,
      description: policyFormData.description.trim(),
      downloadUrl: policyFormData.downloadUrl,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setPolicies([...policies, newPolicy]);
    setPolicyFormData({
      title: '',
      department: '',
      description: '',
      downloadUrl: ''
    });
    setEditingPolicy(null);
    message.success('Policy added. Click Save Changes to persist.');
  };

  const deletePolicy = (id) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    message.success('Policy deleted successfully');
  };

  const addDepartment = () => {
    if (!newDepartment.trim()) {
      message.error('Department name is required');
      return;
    }
    
    if (departments.includes(newDepartment.trim())) {
      message.error('Department already exists');
      return;
    }
    
    setDepartments([...departments, newDepartment.trim()]);
    setNewDepartment('');
    message.success('Department added. Click Save Changes to persist.');
  };

  const deleteDepartment = (department) => {
    setDepartments(departments.filter(dept => dept !== department));
    message.success('Department deleted');
  };

  const editPolicy = (policy) => {
    setEditingPolicy(policy);
    setPolicyFormData({
      title: policy.title || '',
      department: policy.department || '',
      description: policy.description || '',
      downloadUrl: policy.downloadUrl || ''
    });
  };

  const updatePolicy = () => {
    if (!policyFormData.title.trim() || !policyFormData.department) {
      message.error('Title and department are required');
      return;
    }
    
    setPolicies(policies.map(policy => 
      policy.id === editingPolicy.id ? {
        ...policy,
        title: policyFormData.title.trim(),
        department: policyFormData.department,
        description: policyFormData.description.trim(),
        downloadUrl: policyFormData.downloadUrl,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : policy
    ));
    
    setPolicyFormData({
      title: '',
      department: '',
      description: '',
      downloadUrl: ''
    });
    setEditingPolicy(null);
    message.success('Policy updated. Click Save Changes to persist.');
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Department', dataIndex: 'department', key: 'department', render: (dept) => <Tag>{dept}</Tag> },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => editPolicy(record)} />
          <Popconfirm title="Delete policy?" onConfirm={() => deletePolicy(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

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
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={[0, 24]}>
          <Col xs={24}>
            <Card title="Header Section">
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
            <Card title="Department Management" style={{ marginBottom: 24 }}>
              <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                <Input 
                  placeholder="Add new department" 
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  onPressEnter={addDepartment}
                />
                <Button type="primary" onClick={addDepartment}>Add</Button>
              </Space.Compact>
              <Space wrap>
                {departments.map(dept => (
                  <Tag key={dept} closable onClose={() => deleteDepartment(dept)}>{dept}</Tag>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Policy Management">
              <div style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Input 
                      placeholder="Policy title" 
                      value={policyFormData.title}
                      onChange={(e) => setPolicyFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </Col>
                  <Col span={6}>
                    <Select 
                      placeholder="Select department"
                      value={policyFormData.department || undefined}
                      onChange={(value) => setPolicyFormData(prev => ({ ...prev, department: value }))}
                    >
                      {departments.map(dept => <Select.Option key={dept} value={dept}>{dept}</Select.Option>)}
                    </Select>
                  </Col>
                  <Col span={10}>
                    <Input 
                      placeholder="Policy description" 
                      value={policyFormData.description}
                      onChange={(e) => setPolicyFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Upload
                      accept=".pdf"
                      showUploadList={false}
                      beforeUpload={async (file) => {
                        try {
                          // Validate file
                          if (file.type !== 'application/pdf') {
                            message.error('Only PDF files are allowed');
                            return false;
                          }
                          
                          if (file.size > 10 * 1024 * 1024) {
                            message.error('File size must be less than 10MB');
                            return false;
                          }
                          
                          const formData = new FormData();
                          formData.append('document', file);
                          
                          const response = await fetch(`${API_BASE_URL}/upload/pdf`, {
                            method: 'POST',
                            body: formData
                          });
                          
                          const result = await response.json();
                          
                          if (result.success) {
                            setPolicyFormData(prev => ({
                              ...prev,
                              downloadUrl: result.url
                            }));
                            message.success(result.message || 'PDF uploaded successfully');
                          } else {
                            message.error(result.message || 'Upload failed');
                          }
                        } catch (error) {
                          message.error('Upload failed');
                        }
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload PDF</Button>
                    </Upload>
                  </Col>
                  <Col span={12}>
                    <Input 
                      placeholder="Auto-filled" 
                      disabled 
                      value={policyFormData.downloadUrl}
                    />
                  </Col>
                </Row>
                <Space style={{ marginTop: 16 }}>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (editingPolicy) {
                        updatePolicy();
                      } else {
                        addPolicy();
                      }
                    }}
                    disabled={!policyFormData.title.trim() || !policyFormData.department}
                  >
                    {editingPolicy ? 'Update' : 'Add'} Policy
                  </Button>
                  {editingPolicy && (
                    <Button onClick={() => { 
                      setEditingPolicy(null); 
                      setPolicyFormData({
                        title: '',
                        department: '',
                        description: '',
                        downloadUrl: ''
                      });
                    }}>
                      Cancel
                    </Button>
                  )}
                </Space>
              </div>
              
              <Table 
                dataSource={policies} 
                columns={columns} 
                rowKey="id" 
                style={{ marginTop: 24 }}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PoliciesEditor;