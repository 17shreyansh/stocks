import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Typography, Space, Row, Col, Popconfirm, Table, Modal, notification } from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined, EditOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title } = Typography;
const { TextArea } = Input;

const PricingTableEditor = ({ form, tabIndex }) => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const formValues = form.getFieldsValue();
    const tabData = formValues?.costBreakdown?.tabs?.[tabIndex];
    
    if (tabData) {
      setHeaders(tabData.columnHeaders || []);
      setTableData(tabData.charges || []);
    }
  }, [form, tabIndex]);

  const updateFormData = (newHeaders, newData) => {
    const formValues = form.getFieldsValue();
    const updatedTabs = [...(formValues?.costBreakdown?.tabs || [])];
    
    if (updatedTabs[tabIndex]) {
      updatedTabs[tabIndex].columnHeaders = newHeaders;
      updatedTabs[tabIndex].charges = newData;
      form.setFieldsValue({
        ...formValues,
        costBreakdown: {
          ...formValues.costBreakdown,
          tabs: updatedTabs
        }
      });
    }
  };

  const addColumn = () => {
    const newHeaders = [...headers, `Column ${headers.length + 1}`];
    const newData = tableData.map(row => ({ ...row, [`col_${headers.length}`]: '' }));
    
    setHeaders(newHeaders);
    setTableData(newData);
    updateFormData(newHeaders, newData);
  };

  const removeColumn = (colIndex) => {
    if (headers.length <= 1) return;
    
    const newHeaders = headers.filter((_, index) => index !== colIndex);
    const newData = tableData.map(row => {
      const newRow = { ...row };
      delete newRow[`col_${colIndex}`];
      return newRow;
    });
    
    setHeaders(newHeaders);
    setTableData(newData);
    updateFormData(newHeaders, newData);
  };

  const updateHeader = (colIndex, value) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    
    setHeaders(newHeaders);
    updateFormData(newHeaders, tableData);
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [`col_${colIndex}`]: value };
    
    setTableData(newData);
    updateFormData(headers, newData);
  };

  const addRow = () => {
    const newRow = {};
    headers.forEach((_, index) => {
      newRow[`col_${index}`] = '';
    });
    
    const newData = [...tableData, newRow];
    setTableData(newData);
    updateFormData(headers, newData);
  };

  const removeRow = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
    updateFormData(headers, newData);
  };

  const moveColumn = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= headers.length) return;
    
    const newHeaders = [...headers];
    const [movedHeader] = newHeaders.splice(fromIndex, 1);
    newHeaders.splice(toIndex, 0, movedHeader);
    
    const newData = tableData.map(row => {
      const newRow = {};
      newHeaders.forEach((_, newIndex) => {
        const oldIndex = headers.findIndex(h => h === newHeaders[newIndex]);
        newRow[`col_${newIndex}`] = row[`col_${oldIndex}`] || '';
      });
      return newRow;
    });
    
    setHeaders(newHeaders);
    setTableData(newData);
    updateFormData(newHeaders, newData);
  };

  return (
    <div>
      {/* Column Headers */}
      <div style={{ marginBottom: 16, padding: 12, backgroundColor: '#f0f9ff', borderRadius: 6 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Table Columns:</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {headers.map((header, index) => (
            <div key={index} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Input
                value={header}
                onChange={(e) => updateHeader(index, e.target.value)}
                placeholder="Column name"
                style={{ 
                  width: 150,
                  fontWeight: index === 0 ? 600 : 400,
                  backgroundColor: index === 0 ? '#fff7e6' : 'white'
                }}
              />
              <Button
                size="small"
                icon="←"
                onClick={() => moveColumn(index, index - 1)}
                disabled={index === 0}
                title="Move Left"
              />
              <Button
                size="small"
                icon="→"
                onClick={() => moveColumn(index, index + 1)}
                disabled={index === headers.length - 1}
                title="Move Right"
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeColumn(index)}
                disabled={headers.length <= 1}
              />
            </div>
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addColumn}
          >
            Add Column
          </Button>
        </div>
      </div>

      {/* Table Data */}
      <div style={{ border: '1px solid #d9d9d9', borderRadius: 6, overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{ display: 'flex', backgroundColor: '#1890ff', color: 'white' }}>
          {headers.map((header, index) => (
            <div key={index} style={{ 
              flex: 1, 
              padding: '12px 8px', 
              fontWeight: 600, 
              borderRight: '1px solid rgba(255,255,255,0.2)',
              minWidth: 120,
              backgroundColor: index === 0 ? '#0050b3' : '#1890ff'
            }}>
              {header} {index === 0 && '(Bold)'}
            </div>
          ))}
          <div style={{ width: 100, padding: '12px 8px', fontWeight: 600 }}>Actions</div>
        </div>

        {/* Table Rows */}
        {tableData.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
            {headers.map((_, colIndex) => (
              <div key={colIndex} style={{ 
                flex: 1, 
                padding: 4, 
                borderRight: '1px solid #f0f0f0',
                minWidth: 120
              }}>
                <Input.TextArea
                  value={row[`col_${colIndex}`] || ''}
                  onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  style={{ 
                    border: 'none', 
                    resize: 'none',
                    fontWeight: colIndex === 0 ? 600 : 400,
                    backgroundColor: colIndex === 0 ? '#fff7e6' : 'white'
                  }}
                  placeholder="Enter value"
                />
              </div>
            ))}
            <div style={{ width: 100, padding: 8, display: 'flex', justifyContent: 'center' }}>
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeRow(rowIndex)}
              />
            </div>
          </div>
        ))}

        {/* Empty State */}
        {tableData.length === 0 && (
          <div style={{ 
            padding: 40, 
            textAlign: 'center', 
            color: '#8c8c8c',
            backgroundColor: '#fafafa'
          }}>
            No data rows. Click "Add Row" to start.
          </div>
        )}
      </div>

      {/* Add Row Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addRow}
        style={{ marginTop: 16 }}
        disabled={headers.length === 0}
      >
        Add Row
      </Button>
    </div>
  );
};

const PricingEditor = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/pages/pricing');
      const data = response.data.data || response.data;
      if (data?.pricing) {
        form.setFieldsValue(data.pricing);
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
      title: 'Our Prices',
      subtitle: 'With our scalable packages, you can pay for what you need and leave out what you don\'t. We will grow with you.'
    },
    accountOpening: {
      title: 'Account Opening Charges',
      plans: [
        { title: 'Non Resident Indian', price: '₹500', description: 'Unlocking Limitless Trading Potential' },
        { title: 'Corporate & Business Entities', price: '₹1000', description: 'For LLP, Partnership Firms, Public Companies & HUF' }
      ]
    },
    costBreakdown: {
      title: 'Cost Breakdown',
      tabs: [
        {
          id: 'equity',
          label: 'Equity',
          columnHeaders: ['Charge Type', 'Delivery', 'Intraday', 'Futures', 'Options'],
          charges: [
            {
              col_0: 'STT/CTT',
              col_1: '0.1% on buy & sell',
              col_2: '0.025% on the sell side',
              col_3: '0.0125% on the sell side',
              col_4: '0.125% of intrinsic value on exercised options'
            },
            {
              col_0: 'Transaction charges',
              col_1: 'NSE: 0.00325% / BSE: 0.00375%',
              col_2: 'NSE: 0.00325% / BSE: 0.00375%',
              col_3: 'NSE: 0.0019% / BSE: 0',
              col_4: 'NSE: 0.05% (on premium) / BSE: 0.005% (on premium)'
            },
            {
              col_0: 'GST',
              col_1: '18% on (brokerage + SEBI charges + transaction charges)',
              col_2: '18% on (brokerage + SEBI charges + transaction charges)',
              col_3: '18% on (brokerage + SEBI charges + transaction charges)',
              col_4: '18% on (brokerage + SEBI charges + transaction charges)'
            },
            {
              col_0: 'SEBI charges',
              col_1: '₹10 / crore',
              col_2: '₹10 / crore',
              col_3: '₹10 / crore',
              col_4: '₹10 / crore'
            },
            {
              col_0: 'Stamp charges',
              col_1: '0.015% or ₹1500 / crore on buy side',
              col_2: '0.003% or ₹300 / crore on buy side',
              col_3: '0.002% or ₹200 / crore on buy side',
              col_4: '0.003% or ₹300 / crore on buy side'
            }
          ]
        },
        {
          id: 'currency',
          label: 'Currency',
          columnHeaders: ['Charge Type', 'Delivery', 'Intraday', 'Futures', 'Options'],
          charges: [
            {
              col_0: 'STT/CTT',
              col_1: 'No STT',
              col_2: 'No STT',
              col_3: 'No STT',
              col_4: 'No STT'
            },
            {
              col_0: 'Transaction charges',
              col_1: 'NSE: 0.0009% / BSE: 0.00025%',
              col_2: 'NSE: 0.0009% / BSE: 0.00025%',
              col_3: 'NSE: 0.0009% / BSE: 0.00025%',
              col_4: 'NSE: 0.035% / BSE: 0.001%'
            },
            {
              col_0: 'GST',
              col_1: '18% on (brokerage + SEBI charges + transaction charges)',
              col_2: '18% on (brokerage + SEBI charges + transaction charges)',
              col_3: '18% on (brokerage + SEBI charges + transaction charges)',
              col_4: '18% on (brokerage + SEBI charges + transaction charges)'
            },
            {
              col_0: 'SEBI charges',
              col_1: '₹10 / crore',
              col_2: '₹10 / crore',
              col_3: '₹10 / crore',
              col_4: '₹10 / crore'
            },
            {
              col_0: 'Stamp charges',
              col_1: '0.0001% or ₹10 / crore on buy side',
              col_2: '0.0001% or ₹10 / crore on buy side',
              col_3: '0.0001% or ₹10 / crore on buy side',
              col_4: '0.0001% or ₹10 / crore on buy side'
            }
          ]
        }
      ]
    }
  });

  const handleSave = async (values) => {
    setSaving(true);
    try {
      await axios.post('/pages', {
        name: 'pricing',
        pricing: values
      });
      notification.success({
        message: 'Success',
        description: 'Pricing page updated successfully!',
        placement: 'topRight'
      });
    } catch (error) {
      console.error('Save error:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to save pricing page',
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
      <Title level={2}>Pricing Page Editor</Title>
      
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
                <Input placeholder="Our Prices" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['hero', 'subtitle']} label="Hero Subtitle">
                <TextArea rows={3} placeholder="Subtitle description..." />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Account Opening Section */}
        <Card title="💳 Account Opening Plans" style={{ marginBottom: 24 }}>
          <Form.Item name={['accountOpening', 'title']} label="Section Title">
            <Input placeholder="Account Opening Charges" />
          </Form.Item>
          
          <Form.List name={['accountOpening', 'plans']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size="small" style={{ marginBottom: 16, backgroundColor: '#f8f9fa' }}>
                    <Row gutter={16} align="middle">
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'title']} label="Plan Title">
                          <Input placeholder="Plan name" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item {...restField} name={[name, 'price']} label="Price">
                          <Input placeholder="₹500" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item {...restField} name={[name, 'description']} label="Description">
                          <TextArea rows={2} placeholder="Plan description..." />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Pricing Plan
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        {/* Cost Breakdown Section */}
        <Card title="📊 Cost Breakdown Tables" style={{ marginBottom: 24 }}>
          <Form.Item name={['costBreakdown', 'title']} label="Section Title">
            <Input placeholder="Cost Breakdown" />
          </Form.Item>
          
          <Form.List name={['costBreakdown', 'tabs']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    style={{ marginBottom: 24, border: '2px solid #e6f7ff' }}
                    title={
                      <Space>
                        <span>Tab Configuration</span>
                        <Button type="text" danger size="small" onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Space>
                    }
                  >
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'id']} label="Tab ID (for navigation)">
                          <Input placeholder="equity, currency, etc." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...restField} name={[name, 'label']} label="Tab Display Name">
                          <Input placeholder="Equity, Currency, etc." />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Card title={<><TableOutlined /> Pricing Table Editor</>} style={{ marginBottom: 16 }}>
                      <PricingTableEditor 
                        form={form}
                        tabIndex={name}
                      />
                    </Card>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} size="large">
                  Add New Tab (Equity, Currency, etc.)
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
            {saving ? 'Saving...' : 'Save Pricing Page'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PricingEditor;