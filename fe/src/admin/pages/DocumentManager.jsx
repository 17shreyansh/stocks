import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
  Tag,
  Card,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [stats, setStats] = useState({ total: 0, totalDownloads: 0 });

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/documents');
      setDocuments(response.data);
      
      // Calculate stats
      const totalDownloads = response.data.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0);
      setStats({
        total: response.data.length,
        totalDownloads
      });
    } catch (error) {
      message.error('Error fetching documents');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/documents/categories');
      setCategories(response.data.filter(cat => cat !== 'All Categories'));
    } catch (error) {
      console.error('Error fetching categories');
    }
  };

  const handleAdd = () => {
    setEditingDocument(null);
    setModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEdit = (record) => {
    setEditingDocument(record);
    setModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      category: record.category
    });
    setFileList([]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/documents/${id}`);
      message.success('Document deleted successfully');
      fetchDocuments();
    } catch (error) {
      message.error('Error deleting document');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);

      if (fileList.length > 0) {
        formData.append('document', fileList[0].originFileObj);
      }

      if (editingDocument) {
        // Update existing document (metadata only)
        await axios.put(`/documents/${editingDocument._id}`, {
          title: values.title,
          description: values.description,
          category: values.category
        });
        message.success('Document updated successfully');
      } else {
        // Create new document
        if (fileList.length === 0) {
          message.error('Please select a file to upload');
          return;
        }
        await axios.post('/documents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Document uploaded successfully');
      }

      setModalVisible(false);
      fetchDocuments();
      fetchCategories();
    } catch (error) {
      message.error(error.response?.data?.message || 'Error saving document');
    }
  };

  const handleDownload = async (id, title) => {
    try {
      const response = await axios.get(`/documents/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title + '.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      // Refresh to update download count
      fetchDocuments();
    } catch (error) {
      message.error('Error downloading document');
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // No restrictions - allow all file types and sizes
      setFileList([file]);
      return false;
    },
    fileList,
    onRemove: () => setFileList([]),
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>,
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size) => `${(size / 1024 / 1024).toFixed(2)} MB`,
      sorter: (a, b) => a.fileSize - b.fileSize,
    },
    {
      title: 'Downloads',
      dataIndex: 'downloadCount',
      key: 'downloadCount',
      render: (count) => count || 0,
      sorter: (a, b) => (a.downloadCount || 0) - (b.downloadCount || 0),
    },
    {
      title: 'Upload Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record._id, record.title)}
          >
            Download
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this document?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Document Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Upload Document
        </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Documents"
              value={stats.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Downloads"
              value={stats.totalDownloads}
              prefix={<DownloadOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={documents}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={editingDocument ? 'Edit Document' : 'Upload Document'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter document title' }]}
          >
            <Input placeholder="Enter document title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter document description' }]}
          >
            <TextArea
              rows={3}
              placeholder="Enter document description"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder="Select category"
              showSearch
              allowClear
              options={categories.map(cat => ({ label: cat, value: cat }))}
            />
          </Form.Item>

          {!editingDocument && (
            <Form.Item
              label="Document File"
              required
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                  Select Any File
                </Button>
              </Upload>
              <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
                All file types and sizes are supported. No limitations.
              </div>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentManager;