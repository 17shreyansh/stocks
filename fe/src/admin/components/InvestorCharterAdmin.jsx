import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, message, Select, Row, Col, Popconfirm, Upload, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined, FileOutlined } from '@ant-design/icons';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;

const { Title } = Typography;
const { TextArea } = Input;

const InvestorCharterAdmin = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState({
    title: 'Investor Charter',
    breadcrumb: 'Home › Investor Charter',
    sections: [
      {
        id: 'vision',
        title: 'Vision',
        type: 'text',
        content: 'To follow highest standards of ethics and compliances while facilitating the trading by clients in securities in a fair and transparent manner, so as to contribute in creation of wealth for investors.'
      }
    ],
    tables: [
      {
        id: 'complaint-details',
        title: 'Annexure C - INVESTOR COMPLAINT DETAILS',
        headers: ['Month', 'Equity', 'F&O', 'DP'],
        rows: [['July 2025', '-', '-', '-']],
        downloadLinks: [
          { cell: 0, fileName: 'Investor Charter' }
        ]
      }
    ]
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/content/investor-charter`);
      if (response.ok) {
        const data = await response.json();
        setPageData({
          title: data.title || 'Investor Charter',
          breadcrumb: data.breadcrumb || 'Home › Investor Charter',
          sections: data.sections || pageData.sections,
          tables: data.tables || pageData.tables
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login first');
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch(`${API_BASE_URL}/content/investor-charter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: pageData.title,
          breadcrumb: pageData.breadcrumb,
          sections: pageData.sections,
          tables: pageData.tables
        })
      });

      if (response.ok) {
        message.success('Investor Charter saved successfully!');
      } else {
        const error = await response.json();
        message.error(error.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      message.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updatePageField = (field, value) => {
    setPageData({ ...pageData, [field]: value });
  };

  const addSection = () => {
    setPageData({
      ...pageData,
      sections: [...pageData.sections, {
        id: Date.now(),
        title: 'New Section',
        type: 'text',
        content: ''
      }]
    });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...pageData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setPageData({ ...pageData, sections: newSections });
  };

  const deleteSection = (index) => {
    const newSections = pageData.sections.filter((_, i) => i !== index);
    setPageData({ ...pageData, sections: newSections });
  };

  const addListItem = (sectionIndex) => {
    const newSections = [...pageData.sections];
    if (!Array.isArray(newSections[sectionIndex].content)) {
      newSections[sectionIndex].content = [];
    }
    newSections[sectionIndex].content.push('New item');
    setPageData({ ...pageData, sections: newSections });
  };

  const updateListItem = (sectionIndex, itemIndex, value) => {
    const newSections = [...pageData.sections];
    newSections[sectionIndex].content[itemIndex] = value;
    setPageData({ ...pageData, sections: newSections });
  };

  const deleteListItem = (sectionIndex, itemIndex) => {
    const newSections = [...pageData.sections];
    newSections[sectionIndex].content.splice(itemIndex, 1);
    setPageData({ ...pageData, sections: newSections });
  };

  const addTable = () => {
    setPageData({
      ...pageData,
      tables: [...pageData.tables, {
        id: Date.now(),
        title: 'New Table',
        headers: ['Column 1', 'Column 2'],
        rows: [['Data 1', 'Data 2']],
        downloadLinks: []
      }]
    });
  };

  const updateTable = (index, field, value) => {
    const newTables = [...pageData.tables];
    newTables[index] = { ...newTables[index], [field]: value };
    setPageData({ ...pageData, tables: newTables });
  };

  const deleteTable = (index) => {
    const newTables = pageData.tables.filter((_, i) => i !== index);
    setPageData({ ...pageData, tables: newTables });
  };

  const addTableColumn = (tableIndex) => {
    const newTables = [...pageData.tables];
    newTables[tableIndex].headers.push('New Column');
    newTables[tableIndex].rows.forEach(row => row.push(''));
    setPageData({ ...pageData, tables: newTables });
  };

  const updateTableHeader = (tableIndex, headerIndex, value) => {
    const newTables = [...pageData.tables];
    newTables[tableIndex].headers[headerIndex] = value;
    setPageData({ ...pageData, tables: newTables });
  };

  const deleteTableColumn = (tableIndex, columnIndex) => {
    const newTables = [...pageData.tables];
    newTables[tableIndex].headers.splice(columnIndex, 1);
    newTables[tableIndex].rows.forEach(row => row.splice(columnIndex, 1));
    setPageData({ ...pageData, tables: newTables });
  };

  const addTableRow = (tableIndex) => {
    const newTables = [...pageData.tables];
    const columnCount = newTables[tableIndex].headers.length;
    newTables[tableIndex].rows.push(new Array(columnCount).fill(''));
    setPageData({ ...pageData, tables: newTables });
  };

  const updateTableCell = (tableIndex, rowIndex, cellIndex, value) => {
    const newTables = [...pageData.tables];
    newTables[tableIndex].rows[rowIndex][cellIndex] = value;
    setPageData({ ...pageData, tables: newTables });
  };

  const deleteTableRow = (tableIndex, rowIndex) => {
    const newTables = [...pageData.tables];
    newTables[tableIndex].rows.splice(rowIndex, 1);
    setPageData({ ...pageData, tables: newTables });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <div>Loading Investor Charter...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Investor Charter Management</Title>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={handleSave} 
          loading={saving}
          size="large"
          style={{ marginBottom: '24px' }}
        >
          Save Changes
        </Button>

        <Card title="Page Settings" style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <label>Page Title</label>
              <Input 
                value={pageData.title}
                onChange={(e) => updatePageField('title', e.target.value)}
                style={{ marginTop: '8px' }}
              />
            </Col>
            <Col span={12}>
              <label>Breadcrumb</label>
              <Input 
                value={pageData.breadcrumb}
                onChange={(e) => updatePageField('breadcrumb', e.target.value)}
                style={{ marginTop: '8px' }}
              />
            </Col>
          </Row>
        </Card>

        <Card title="Content Sections" style={{ marginBottom: '24px' }}>
          <Button 
            type="dashed" 
            icon={<PlusOutlined />} 
            onClick={addSection}
            style={{ marginBottom: '16px' }}
          >
            Add Section
          </Button>
          
          {pageData.sections?.map((section, index) => (
            <Card 
              key={section.id || index}
              size="small" 
              style={{ marginBottom: '16px' }}
              title={`Section ${index + 1}`}
              extra={
                <Popconfirm title="Delete this section?" onConfirm={() => deleteSection(index)}>
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              }
            >
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                  <label>Section Title</label>
                  <Input 
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </Col>
                <Col span={12}>
                  <label>Content Type</label>
                  <Select 
                    value={section.type}
                    onChange={(value) => updateSection(index, 'type', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    <Select.Option value="text">Text</Select.Option>
                    <Select.Option value="list">List</Select.Option>
                  </Select>
                </Col>
              </Row>
              
              {section.type === 'text' && (
                <div>
                  <label>Content</label>
                  <TextArea 
                    rows={4}
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              )}

              {section.type === 'list' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label>List Items</label>
                    <Button size="small" onClick={() => addListItem(index)}>Add Item</Button>
                  </div>
                  {Array.isArray(section.content) && section.content.map((item, itemIndex) => (
                    <div key={itemIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <Input 
                        value={item}
                        onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                      />
                      <Button 
                        size="small" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => deleteListItem(index, itemIndex)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </Card>

        <Card title="Tables">
          <Button 
            type="dashed" 
            icon={<PlusOutlined />} 
            onClick={addTable}
            style={{ marginBottom: '16px' }}
          >
            Add Table
          </Button>
          
          {pageData.tables?.map((table, tableIndex) => (
            <Card 
              key={table.id || tableIndex}
              size="small" 
              style={{ marginBottom: '24px' }}
              title={`Table: ${table.title}`}
              extra={
                <Popconfirm title="Delete this table?" onConfirm={() => deleteTable(tableIndex)}>
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              }
            >
              <div style={{ marginBottom: '16px' }}>
                <label>Table Title</label>
                <Input 
                  value={table.title}
                  onChange={(e) => updateTable(tableIndex, 'title', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label>Table Headers</label>
                  <Button size="small" onClick={() => addTableColumn(tableIndex)}>Add Column</Button>
                </div>
                <Row gutter={8}>
                  {table.headers?.map((header, headerIndex) => (
                    <Col key={headerIndex} span={6}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <Input 
                          value={header}
                          onChange={(e) => updateTableHeader(tableIndex, headerIndex, e.target.value)}
                          placeholder={`Column ${headerIndex + 1}`}
                        />
                        <Button 
                          size="small" 
                          danger 
                          icon={<DeleteOutlined />}
                          onClick={() => deleteTableColumn(tableIndex, headerIndex)}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label>Table Data</label>
                  <Button size="small" onClick={() => addTableRow(tableIndex)}>Add Row</Button>
                </div>
                {table.rows?.map((row, rowIndex) => (
                  <div key={rowIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    {row.map((cell, cellIndex) => (
                      <div key={cellIndex} style={{ flex: 1, display: 'flex', gap: '4px' }}>
                        <Input 
                          value={typeof cell === 'object' ? cell.text || '' : cell}
                          onChange={(e) => {
                            const newValue = typeof cell === 'object' 
                              ? { ...cell, text: e.target.value }
                              : e.target.value;
                            updateTableCell(tableIndex, rowIndex, cellIndex, newValue);
                          }}
                          placeholder="Enter text or upload PDF"
                        />
                        <Upload
                          accept=".pdf"
                          showUploadList={false}
                          beforeUpload={async (file) => {
                            try {
                              const formData = new FormData();
                              formData.append('document', file);
                              
                              const token = localStorage.getItem('token');
                              const response = await fetch(`${API_BASE_URL}/upload/pdf`, {
                                method: 'POST',
                                headers: {
                                  'Authorization': `Bearer ${token}`
                                },
                                body: formData
                              });
                              
                              if (response.ok) {
                                const result = await response.json();
                                const cellValue = {
                                  text: typeof cell === 'object' ? cell.text || file.name : file.name,
                                  pdfUrl: result.url,
                                  fileName: file.name
                                };
                                updateTableCell(tableIndex, rowIndex, cellIndex, cellValue);
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
                          <Tooltip title="Upload PDF">
                            <Button 
                              size="small" 
                              icon={<UploadOutlined />}
                              type={typeof cell === 'object' && cell.pdfUrl ? 'primary' : 'default'}
                            />
                          </Tooltip>
                        </Upload>
                        {typeof cell === 'object' && cell.pdfUrl && (
                          <Tooltip title="Download PDF">
                            <Button 
                              size="small" 
                              icon={<FileOutlined />}
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = cell.pdfUrl;
                                link.download = '';
                                link.click();
                              }}
                              type="link"
                            />
                          </Tooltip>
                        )}
                      </div>
                    ))}
                    <Button 
                      size="small" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => deleteTableRow(tableIndex, rowIndex)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </Card>
      </Card>
    </div>
  );
};

export default InvestorCharterAdmin;