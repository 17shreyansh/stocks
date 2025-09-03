import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Select,
  Input,
  message,
  Popconfirm,
  Modal,
  Form,
  Row,
  Col,
  Badge,
  Avatar
} from 'antd';
import { 
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;

const ContactLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [filters, setFilters] = useState({ formType: '', status: '' });
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLeads();
  }, [pagination.current, pagination.pageSize, filters]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.current,
        limit: pagination.pageSize,
        ...(filters.formType && { formType: filters.formType }),
        ...(filters.status && { status: filters.status })
      });

      const response = await axios.get(`${API_BASE_URL}/contact/leads?${params}`, {
        headers: getAuthHeaders()
      });

      setLeads(response.data.leads);
      setPagination(prev => ({
        ...prev,
        total: response.data.total
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/contact/leads/${id}`, { status }, {
        headers: getAuthHeaders()
      });
      message.success('Status updated successfully');
      fetchLeads();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/contact/leads/${id}`, {
        headers: getAuthHeaders()
      });
      message.success('Lead deleted successfully');
      fetchLeads();
    } catch (error) {
      message.error('Failed to delete lead');
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    form.setFieldsValue({
      status: lead.status,
      notes: lead.notes || ''
    });
    setModalVisible(true);
  };

  const handleUpdateLead = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`${API_BASE_URL}/contact/leads/${selectedLead._id}`, values, {
        headers: getAuthHeaders()
      });
      message.success('Lead updated successfully');
      setModalVisible(false);
      fetchLeads();
    } catch (error) {
      message.error('Failed to update lead');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'contacted': return 'orange';
      case 'closed': return 'green';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'callback': return '📞';
      case 'associate': return '🤝';
      case 'partner': return '🤝';
      default: return '📋';
    }
  };

  const columns = [
    {
      title: 'Form Type',
      dataIndex: 'formType',
      key: 'formType',
      width: 140,
      render: (formType) => {
        const typeColors = {
          'homepage': 'blue',
          'callback': 'green',
          'associate': 'orange',
          'partner': 'purple'
        };
        return (
          <Tag color={typeColors[formType] || 'default'}>
            {formType || 'homepage'}
          </Tag>
        );
      }
    },
    {
      title: 'Contact Info',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <UserOutlined style={{ color: '#1890ff' }} />
            <Text strong>{record.name || 'No name'}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <MailOutlined style={{ color: '#52c41a' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email || 'No email'}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <PhoneOutlined style={{ color: '#fa8c16' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.phone || 'No phone'}</Text>
          </div>
          {record.formType === 'associate' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text type="secondary" style={{ fontSize: 11, color: '#722ed1' }}>Position: {record.position || 'Not specified'}</Text>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text) => (
        <Text style={{ fontSize: 12 }}>{text || '-'}</Text>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status, record) => (
        <Select
          value={status}
          size="small"
          style={{ width: '100%' }}
          onChange={(value) => handleStatusUpdate(record._id, value)}
        >
          <Select.Option value="new">
            <Tag color="blue">New</Tag>
          </Select.Option>
          <Select.Option value="contacted">
            <Tag color="orange">Contacted</Tag>
          </Select.Option>
          <Select.Option value="closed">
            <Tag color="green">Closed</Tag>
          </Select.Option>
        </Select>
      ),
      filters: [
        { text: 'New', value: 'new' },
        { text: 'Contacted', value: 'contacted' },
        { text: 'Closed', value: 'closed' }
      ]
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => (
        <Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString()}
        </Text>
      ),
      sorter: true
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            title="View Details"
          />
          {(record.cvUrl || record.formType === 'associate') && (
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => record.cvUrl ? window.open(record.cvUrl, '_blank') : alert('No CV uploaded')}
              title={record.cvUrl ? "Download CV" : "No CV"}
              disabled={!record.cvUrl}
            />
          )}
          <Popconfirm
            title="Delete this lead?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Delete"
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const getStats = () => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const contacted = leads.filter(l => l.status === 'contacted').length;
    const closed = leads.filter(l => l.status === 'closed').length;

    return { total, newLeads, contacted, closed };
  };

  const stats = getStats();

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar size={48} style={{ background: '#52c41a' }}>
            <MailOutlined style={{ fontSize: 24, color: 'white' }} />
          </Avatar>
          <div>
            <Title level={2} style={{ margin: 0 }}>Contact Leads</Title>
            <Text type="secondary">Manage all contact form submissions from homepage and contact page</Text>
          </div>
        </div>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>{stats.total}</div>
              <div style={{ fontSize: 12, color: '#666' }}>Total Leads</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>{stats.newLeads}</div>
              <div style={{ fontSize: 12, color: '#666' }}>New Leads</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#fa8c16' }}>{stats.contacted}</div>
              <div style={{ fontSize: 12, color: '#666' }}>Contacted</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#f5222d' }}>{stats.closed}</div>
              <div style={{ fontSize: 12, color: '#666' }}>Closed</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
          <Select
            placeholder="Filter by form type"
            style={{ width: 180 }}
            allowClear
            value={filters.formType || undefined}
            onChange={(value) => setFilters(prev => ({ ...prev, formType: value || '' }))}
          >
            <Select.Option value="homepage">Homepage</Select.Option>
            <Select.Option value="callback">Callback</Select.Option>
            <Select.Option value="associate">Associate</Select.Option>
            <Select.Option value="partner">Partner</Select.Option>
          </Select>
          
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
            value={filters.status || undefined}
            onChange={(value) => setFilters(prev => ({ ...prev, status: value || '' }))}
          >
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="contacted">Contacted</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={leads}
          loading={loading}
          rowKey="_id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leads`
          }}
          onChange={(pag, filters, sorter) => {
            setPagination(pag);
          }}
        />
      </Card>

      <Modal
        title="Lead Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleUpdateLead}
        width={600}
      >
        {selectedLead && (
          <div>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Text strong>Name:</Text> {selectedLead.name}
              </Col>
              <Col span={12}>
                <Text strong>Form Type:</Text> {selectedLead.formType || 'homepage'}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Text strong>Email:</Text> {selectedLead.email}
              </Col>
              <Col span={12}>
                <Text strong>Phone:</Text> {selectedLead.phone || 'N/A'}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              {selectedLead.investment && (
                <Col span={12}>
                  <Text strong>Investment:</Text> {selectedLead.investment}
                </Col>
              )}
              {(selectedLead.position || selectedLead.formType === 'associate') && (
                <Col span={12}>
                  <Text strong>Position:</Text> {selectedLead.position || 'Not specified'}
                </Col>
              )}
              {selectedLead.companyName && (
                <Col span={12}>
                  <Text strong>Company:</Text> {selectedLead.companyName}
                </Col>
              )}
              {selectedLead.businessType && (
                <Col span={12}>
                  <Text strong>Business Type:</Text> {selectedLead.businessType}
                </Col>
              )}
              <Col span={12}>
                <Text strong>Date:</Text> {new Date(selectedLead.createdAt).toLocaleDateString()}
              </Col>
            </Row>
            {(selectedLead.cvUrl || selectedLead.formType === 'associate') && (
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={24}>
                  <Text strong>CV:</Text> 
                  {selectedLead.cvUrl ? (
                    <Button 
                      type="link" 
                      icon={<DownloadOutlined />}
                      onClick={() => window.open(selectedLead.cvUrl, '_blank')}
                    >
                      Download CV
                    </Button>
                  ) : (
                    <Text type="secondary"> No CV uploaded</Text>
                  )}
                </Col>
              </Row>
            )}
            {selectedLead.message && (
              <div style={{ marginBottom: 16 }}>
                <Text strong>Message:</Text>
                <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, marginTop: 4 }}>
                  {selectedLead.message}
                </div>
              </div>
            )}
            
            <Form form={form} layout="vertical">
              <Form.Item label="Status" name="status">
                <Select>
                  <Select.Option value="new">New</Select.Option>
                  <Select.Option value="contacted">Contacted</Select.Option>
                  <Select.Option value="closed">Closed</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Notes" name="notes">
                <TextArea rows={4} placeholder="Add notes about this lead..." />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactLeads;