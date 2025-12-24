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
import UploadProgress from '../components/UploadProgress';


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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/downloads');
      const data = response.data.data || response.data;
      
      if (data && data.downloads) {
        setPageData(data);
        form.setFieldsValue(data.downloads);
        setDocuments(data.downloads.documents || []);
        setCategories(data.downloads.categories || ['KYC Forms', 'Legal Documents', 'Trading Forms']);
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      console.error('Error fetching downloads data:', error);
      const defaultData = {
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
      setPageData(defaultData);
      form.setFieldsValue(defaultData.downloads);
      setDocuments([]);
      setCategories(defaultData.downloads.categories);
      
      if (error.response?.status !== 404) {
        message.error('Error loading downloads data. Using defaults.');
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
        name: 'downloads',
        downloads: {
          header: formValues.header || {
            title: 'Downloads Center',
            subtitle: 'Access all your important documents, forms, and resources in one place.'
          },
          categories,
          documents,
          emptyState: {
            title: 'No documents found',
            message: 'Try adjusting your search terms or filters'
          }
        }
      };
      
      console.log('Saving payload:', payload);
      
      const response = await axios.post('/pages', payload);
      console.log('Save response:', response.data);
      
      message.success('Downloads page saved successfully');
      setPageData(response.data);
    } catch (error) {
      console.error('Save error:', error);
      message.error(error.response?.data?.message || 'Error saving downloads page');
    } finally {
      setSaving(false);
    }
  };



  const addDocument = () => {
    if (!docFormData.title.trim() || !docFormData.category) {
      message.error('Title and category are required');
      return;
    }
    
    const newDoc = {
      id: Date.now(),
      title: docFormData.title.trim(),
      category: docFormData.category,
      description: docFormData.description.trim(),
      fileSize: docFormData.fileSize,
      downloadUrl: docFormData.downloadUrl,
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
    message.success('Document added. Click Save Changes to persist.');
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    message.success('Document deleted successfully');
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      message.error('Category name is required');
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      message.error('Category already exists');
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    message.success('Category added. Click Save Changes to persist.');
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
    if (!docFormData.title.trim() || !docFormData.category) {
      message.error('Title and category are required');
      return;
    }
    
    setDocuments(documents.map(doc => 
      doc.id === editingDoc.id ? {
        ...doc,
        title: docFormData.title.trim(),
        category: docFormData.category,
        description: docFormData.description.trim(),
        fileSize: docFormData.fileSize,
        downloadUrl: docFormData.downloadUrl,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : doc
    ));
    
    setDocFormData({
      title: '',
      category: '',
      description: '',
      fileSize: '',
      downloadUrl: ''
    });
    setEditingDoc(null);
    message.success('Document updated. Click Save Changes to persist.');
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
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
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
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
                      showUploadList={false}
                      beforeUpload={async (file) => {
                        try {
                          const allowedTypes = [
                            'application/pdf',
                            'application/msword',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/vnd.ms-excel',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            'application/zip',
                            'application/x-zip-compressed',
                            'text/plain',
                            'text/csv',
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                            'image/webp'
                          ];
                          
                          if (!allowedTypes.includes(file.type)) {
                            message.error('File type not supported');
                            return false;
                          }
                          
                          setUploading(true);
                          setUploadFileName(file.name);
                          setUploadProgress(0);
                          
                          const formData = new FormData();
                          formData.append('document', file);
                          
                          const xhr = new XMLHttpRequest();
                          
                          xhr.upload.onprogress = (event) => {
                            if (event.lengthComputable) {
                              const progress = Math.round((event.loaded / event.total) * 100);
                              setUploadProgress(progress);
                            }
                          };
                          
                          xhr.onload = () => {
                            setUploading(false);
                            if (xhr.status === 200) {
                              const result = JSON.parse(xhr.responseText);
                              if (result.success) {
                                const fileSize = file.size > 1024 * 1024 
                                  ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
                                  : (file.size / 1024).toFixed(1) + ' KB';
                                  
                                setDocFormData(prev => ({
                                  ...prev,
                                  downloadUrl: result.url,
                                  fileSize: fileSize
                                }));
                                message.success(result.message || 'File uploaded successfully');
                              } else {
                                message.error(result.message || 'Upload failed');
                              }
                            } else {
                              message.error('Upload failed');
                            }
                          };
                          
                          xhr.onerror = () => {
                            setUploading(false);
                            message.error('Upload failed');
                          };
                          
                          xhr.open('POST', `${API_BASE_URL}/upload/document`);
                          xhr.send(formData);
                          
                        } catch (error) {
                          setUploading(false);
                          console.error('Upload error:', error);
                          message.error(error.message || 'Upload failed');
                        }
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload File</Button>
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
                      if (editingDoc) {
                        updateDocument();
                      } else {
                        addDocument();
                      }
                    }}
                    disabled={!docFormData.title.trim() || !docFormData.category}
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
      
      <UploadProgress 
        visible={uploading}
        progress={uploadProgress}
        fileName={uploadFileName}
      />
    </div>
  );
};

export default DownloadsEditor;