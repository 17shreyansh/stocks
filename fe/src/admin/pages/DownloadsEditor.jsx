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

const DownloadsEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState(['KYC Forms', 'Legal Documents', 'Trading Forms']);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docForm] = Form.useForm();
  const [newCategory, setNewCategory] = useState('');
  const [docFormData, setDocFormData] = useState({
    title: '',
    category: '',
    description: '',
    fileSize: '',
    downloadUrl: ''
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/downloads');
      const data = response.data.data || response.data;
      setPageData(data);
      form.setFieldsValue(data.downloads || data);
      setDocuments(data.downloads?.documents || []);
      setCategories(data.downloads?.categories || ['KYC Forms', 'Legal Documents', 'Trading Forms']);
    } catch (error) {
      if (error.response?.status === 404) {
        const newPageData = {
          name: 'downloads',
          downloads: {
            header: {
              title: 'Downloads Center',
              subtitle: 'Access all your important documents, forms, and resources in one place.'
            },
            categories: ['KYC Forms', 'Legal Documents', 'Trading Forms'],
            documents: [],
            emptyState: {
              title: 'No documents found',
              message: 'Try adjusting your search terms or filters'
            }
          }
        };
        setPageData(newPageData);
        form.setFieldsValue(newPageData.downloads);
        setDocuments([]);
        setCategories(newPageData.downloads.categories);
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
        name: 'downloads',
        downloads: {
          ...values,
          documents,
          categories
        }
      };
      
      if (pageData?._id) {
        await axios.put('/pages/downloads', payload);
        message.success('Downloads page updated successfully');
      } else {
        await axios.post('/pages', payload);
        message.success('Downloads page created successfully');
      }
    } catch (error) {
      message.error('Error saving page');
    } finally {
      setSaving(false);
    }
  };



  const addDocument = async () => {
    try {
      const newDoc = {
        id: Date.now(),
        ...docFormData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDoc]);
      setDocFormData({
        title: '',
        category: '',
        description: '',
        fileSize: '',
        downloadUrl: ''
      });
      setEditingDoc(null);
      message.success('Document added successfully');
    } catch (error) {
      message.error('Error adding document');
    }
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    message.success('Document deleted successfully');
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      message.success('Category added');
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
    message.success('Category deleted');
  };

  const editDocument = (doc) => {
    setEditingDoc(doc);
    setDocFormData({
      title: doc.title || '',
      category: doc.category || '',
      description: doc.description || '',
      fileSize: doc.fileSize || '',
      downloadUrl: doc.downloadUrl || ''
    });
  };

  const updateDocument = () => {
    setDocuments(documents.map(doc => 
      doc.id === editingDoc.id ? { ...doc, ...docFormData } : doc
    ));
    setDocFormData({
      title: '',
      category: '',
      description: '',
      fileSize: '',
      downloadUrl: ''
    });
    setEditingDoc(null);
    message.success('Document updated successfully');
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (cat) => <Tag>{cat}</Tag> },
    { title: 'File Size', dataIndex: 'fileSize', key: 'fileSize' },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => editDocument(record)} />
          <Popconfirm title="Delete document?" onConfirm={() => deleteDocument(record.id)}>
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
              styles={{
                header: {
                  background: '#f8f9fa',
                  borderBottom: '1px solid #dee2e6'
                }
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
            <Card title="Category Management" style={{ marginBottom: 24 }}>
              <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
                <Input 
                  placeholder="Add new category" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onPressEnter={addCategory}
                />
                <Button type="primary" onClick={addCategory}>Add</Button>
              </Space.Compact>
              <Space wrap>
                {categories.map(cat => (
                  <Tag key={cat} closable onClose={() => deleteCategory(cat)}>{cat}</Tag>
                ))}
              </Space>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Document Management">
              <div style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Input 
                      placeholder="Document title" 
                      value={docFormData.title}
                      onChange={(e) => setDocFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </Col>
                  <Col span={6}>
                    <Select 
                      placeholder="Select category"
                      value={docFormData.category || undefined}
                      onChange={(value) => setDocFormData(prev => ({ ...prev, category: value }))}
                    >
                      {categories.map(cat => <Select.Option key={cat} value={cat}>{cat}</Select.Option>)}
                    </Select>
                  </Col>
                  <Col span={10}>
                    <Input 
                      placeholder="Document description" 
                      value={docFormData.description}
                      onChange={(e) => setDocFormData(prev => ({ ...prev, description: e.target.value }))}
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
                            setDocFormData(prev => ({
                              ...prev,
                              downloadUrl: result.url,
                              fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
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
                  <Col span={6}>
                    <Input 
                      placeholder="Auto-filled" 
                      disabled 
                      value={docFormData.fileSize}
                    />
                  </Col>
                  <Col span={6}>
                    <Input 
                      placeholder="Auto-filled" 
                      disabled 
                      value={docFormData.downloadUrl}
                    />
                  </Col>
                </Row>
                <Space style={{ marginTop: 16 }}>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (!docFormData.title || !docFormData.category) {
                        message.error('Title and category are required');
                        return;
                      }
                      if (editingDoc) {
                        updateDocument();
                      } else {
                        addDocument();
                      }
                    }}
                  >
                    {editingDoc ? 'Update' : 'Add'} Document
                  </Button>
                  {editingDoc && (
                    <Button onClick={() => { 
                      setEditingDoc(null); 
                      setDocFormData({
                        title: '',
                        category: '',
                        description: '',
                        fileSize: '',
                        downloadUrl: ''
                      });
                    }}>
                      Cancel
                    </Button>
                  )}
                </Space>
              </div>
              
              <Table 
                dataSource={documents} 
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

export default DownloadsEditor;