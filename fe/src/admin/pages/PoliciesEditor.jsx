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
      setPageData(data);
      form.setFieldsValue(data.policies || data);
      setPolicies(data.policies?.policies || []);
      setDepartments(data.policies?.departments || ['Trading', 'Compliance', 'Risk Management']);
    } catch (error) {
      if (error.response?.status === 404) {
        const newPageData = {
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
        setPageData(newPageData);
        form.setFieldsValue(newPageData.policies);
        setPolicies([]);
        setDepartments(newPageData.policies.departments);
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
      const payload = {
        name: 'policies',
        policies: {
          ...values,
          policies,
          departments
        }
      };
      
      if (pageData?._id) {
        await axios.put('/pages/policies', payload);
        message.success('Policies page updated successfully');
      } else {
        await axios.post('/pages', payload);
        message.success('Policies page created successfully');
      }
    } catch (error) {
      message.error('Error saving page');
    } finally {
      setSaving(false);
    }
  };



  const addPolicy = async () => {
    try {
      const newPolicy = {
        id: Date.now(),
        ...policyFormData,
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
      message.success('Policy added successfully');
    } catch (error) {
      message.error('Error adding policy');
    }
  };

  const deletePolicy = (id) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    message.success('Policy deleted successfully');
  };

  const addDepartment = () => {
    if (newDepartment && !departments.includes(newDepartment)) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment('');
      message.success('Department added');
    }
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
    setPolicies(policies.map(policy => 
      policy.id === editingPolicy.id ? { ...policy, ...policyFormData } : policy
    ));
    setPolicyFormData({
      title: '',
      department: '',
      description: '',
      downloadUrl: ''
    });
    setEditingPolicy(null);
    message.success('Policy updated successfully');
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
            onClick={() => form.submit()}
          >
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
                          const formData = new FormData();
                          formData.append('document', file);
                          
                          const response = await fetch(`${API_BASE_URL}/upload/pdf`, {
                            method: 'POST',
                            body: formData
                          });
                          
                          if (response.ok) {
                            const result = await response.json();
                            setPolicyFormData(prev => ({
                              ...prev,
                              downloadUrl: result.url
                            }));
                            message.success('PDF uploaded successfully');
                          } else {
                            message.error('Upload failed');
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
                      if (!policyFormData.title || !policyFormData.department) {
                        message.error('Title and department are required');
                        return;
                      }
                      if (editingPolicy) {
                        updatePolicy();
                      } else {
                        addPolicy();
                      }
                    }}
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