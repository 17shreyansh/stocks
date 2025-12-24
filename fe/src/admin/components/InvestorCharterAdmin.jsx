import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Space, Typography, message, Select, Row, Col, Popconfirm, Upload, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined, FileOutlined } from '@ant-design/icons';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import CodeTool from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import axios from '../../utils/axios';
import '../../styles/editor.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;

const { Title } = Typography;
const { TextArea } = Input;

// Editor Component
const EditorComponent = ({ sectionId, content, onChange, editorRefs }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: `editor-${sectionId}`,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              placeholder: 'Enter text here...',
              preserveBlank: false
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${API_BASE_URL}/upload/image`
              },
              field: 'image',
              types: 'image/*'
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          delimiter: Delimiter,
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+C'
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${API_BASE_URL}/upload/fetch-url`,
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
          },
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
        },
        data: content && content.blocks ? content : { blocks: [] },
        onChange: async () => {
          try {
            const outputData = await editor.save();
            onChange(outputData);
          } catch (error) {
            console.error('Saving failed: ', error);
          }
        },
        placeholder: 'Let\'s write an awesome content!',
      });

      editorRef.current = editor;
      editorRefs.current[sectionId] = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        delete editorRefs.current[sectionId];
      }
    };
  }, [sectionId]);

  return null;
};

const InvestorCharterAdmin = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const editorRefs = useRef({});
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
      const response = await axios.get('/content/investor-charter');
      const data = response.data;
      setPageData({
        title: data.title || 'Investor Charter',
        breadcrumb: data.breadcrumb || 'Home › Investor Charter',
        sections: data.sections || pageData.sections,
        tables: data.tables || pageData.tables
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save all editor content before submitting
      const updatedSections = [...pageData.sections];
      for (let i = 0; i < updatedSections.length; i++) {
        const section = updatedSections[i];
        if (section.type === 'editor' && editorRefs.current[section.id]) {
          try {
            const editorData = await editorRefs.current[section.id].save();
            updatedSections[i] = { ...section, content: editorData };
          } catch (error) {
            console.error('Error saving editor content:', error);
            message.warning(`Could not save content for section: ${section.title}`);
          }
        }
      }

      await axios.post('/content/investor-charter', {
        title: pageData.title,
        breadcrumb: pageData.breadcrumb,
        sections: updatedSections,
        tables: pageData.tables
      });
      message.success('Investor Charter saved successfully!');
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
    const section = pageData.sections[index];
    if (section.type === 'editor' && editorRefs.current[section.id]) {
      editorRefs.current[section.id].destroy();
      delete editorRefs.current[section.id];
    }
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
                    <Select.Option value="editor">Rich Editor</Select.Option>
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

              {section.type === 'editor' && (
                <div>
                  <label>Rich Content Editor</label>
                  <div 
                    id={`editor-${section.id}`}
                    style={{ 
                      marginTop: '8px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '6px',
                      minHeight: '200px',
                      padding: '16px'
                    }}
                  />
                  <EditorComponent 
                    sectionId={section.id}
                    content={section.content}
                    onChange={(data) => updateSection(index, 'content', data)}
                    editorRefs={editorRefs}
                  />
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
                              
                              const response = await axios.post('/upload/document', formData, {
                                headers: {
                                  'Content-Type': 'multipart/form-data'
                                }
                              });
                              
                              const cellValue = {
                                text: typeof cell === 'object' ? (cell.text || file.name) : file.name,
                                pdfUrl: response.data.url,
                                fileName: file.name,
                                originalName: response.data.originalName || file.name
                              };
                              updateTableCell(tableIndex, rowIndex, cellIndex, cellValue);
                              message.success('PDF uploaded successfully');
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