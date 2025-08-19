import React, { useState, useEffect } from 'react';
import '../admin.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FooterAdmin = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('quickLinks');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/footer/admin`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
      } else {
        throw new Error('Failed to fetch footer data');
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setMessage('Failed to load footer data');
    } finally {
      setLoading(false);
    }
  };

  const saveFooterData = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/footer/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(footerData)
      });

      if (response.ok) {
        setMessage('Footer updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to update footer');
      }
    } catch (error) {
      console.error('Error saving footer data:', error);
      setMessage('Failed to save footer data');
    } finally {
      setSaving(false);
    }
  };

  const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${API_BASE_URL}/footer/admin/upload-pdf`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        return result.fileUrl;
      } else {
        throw new Error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setMessage('Failed to upload PDF');
      return null;
    }
  };

  const addQuickLink = () => {
    const newLink = {
      text: '',
      href: '',
      type: 'link',
      pdfFile: '',
      isActive: true
    };
    
    setFooterData(prev => ({
      ...prev,
      quickLinks: {
        ...prev.quickLinks,
        links: [...(prev.quickLinks?.links || []), newLink]
      }
    }));
  };

  const updateQuickLink = (index, field, value) => {
    setFooterData(prev => ({
      ...prev,
      quickLinks: {
        ...prev.quickLinks,
        links: prev.quickLinks.links.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const deleteQuickLink = (index) => {
    setFooterData(prev => ({
      ...prev,
      quickLinks: {
        ...prev.quickLinks,
        links: prev.quickLinks.links.filter((_, i) => i !== index)
      }
    }));
  };

  const addRegulatoryInfo = () => {
    const newItem = {
      text: '',
      href: '',
      type: 'text',
      pdfFile: '',
      isActive: true
    };
    
    setFooterData(prev => ({
      ...prev,
      regulatoryInfo: {
        ...prev.regulatoryInfo,
        items: [...(prev.regulatoryInfo?.items || []), newItem]
      }
    }));
  };

  const updateRegulatoryInfo = (index, field, value) => {
    setFooterData(prev => ({
      ...prev,
      regulatoryInfo: {
        ...prev.regulatoryInfo,
        items: prev.regulatoryInfo.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const deleteRegulatoryInfo = (index) => {
    setFooterData(prev => ({
      ...prev,
      regulatoryInfo: {
        ...prev.regulatoryInfo,
        items: prev.regulatoryInfo.items.filter((_, i) => i !== index)
      }
    }));
  };

  const handlePDFUpload = async (e, section, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = await uploadPDF(file);
    if (fileUrl) {
      if (section === 'quickLinks' && index !== null) {
        updateQuickLink(index, 'pdfFile', fileUrl);
        updateQuickLink(index, 'type', 'pdf');
      } else if (section === 'regulatoryInfo' && index !== null) {
        updateRegulatoryInfo(index, 'pdfFile', fileUrl);
        updateRegulatoryInfo(index, 'type', 'pdf');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading footer data...</div>;
  }

  if (!footerData) {
    return <div className="admin-error">Failed to load footer data</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Footer Management</h1>
        <button 
          onClick={saveFooterData} 
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`admin-message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'quickLinks' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickLinks')}
        >
          Quick Links
        </button>
        <button 
          className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button 
          className={`tab ${activeTab === 'regulatoryInfo' ? 'active' : ''}`}
          onClick={() => setActiveTab('regulatoryInfo')}
        >
          Regulatory Info
        </button>
        <button 
          className={`tab ${activeTab === 'moreLinks' ? 'active' : ''}`}
          onClick={() => setActiveTab('moreLinks')}
        >
          More Links
        </button>
        <button 
          className={`tab ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          Company Info
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'quickLinks' && (
          <div className="section">
            <div className="section-header">
              <h2>Quick Links Section</h2>
              <button onClick={addQuickLink} className="btn btn-secondary">
                Add Link
              </button>
            </div>

            <div className="form-group">
              <label>Section Heading:</label>
              <input
                type="text"
                value={footerData.quickLinks?.heading || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  quickLinks: { ...prev.quickLinks, heading: e.target.value }
                }))}
                className="form-control"
              />
            </div>

            <div className="links-list">
              {footerData.quickLinks?.links?.map((link, index) => (
                <div key={index} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Text:</label>
                      <input
                        type="text"
                        value={link.text}
                        onChange={(e) => updateQuickLink(index, 'text', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Type:</label>
                      <select
                        value={link.type}
                        onChange={(e) => updateQuickLink(index, 'type', e.target.value)}
                        className="form-control"
                      >
                        <option value="link">Link</option>
                        <option value="pdf">PDF Download</option>
                      </select>
                    </div>
                  </div>

                  {link.type === 'link' ? (
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                        className="form-control"
                        placeholder="https://example.com or #section"
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label>PDF File:</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePDFUpload(e, 'quickLinks', index)}
                          className="form-control"
                        />
                        {link.pdfFile && (
                          <span className="file-info">
                            Current: {link.pdfFile.split('/').pop()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={link.isActive}
                        onChange={(e) => updateQuickLink(index, 'isActive', e.target.checked)}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => deleteQuickLink(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'regulatoryInfo' && (
          <div className="section">
            <div className="section-header">
              <h2>Regulatory Information</h2>
              <button onClick={addRegulatoryInfo} className="btn btn-secondary">
                Add Item
              </button>
            </div>

            <div className="form-group">
              <label>Section Heading:</label>
              <input
                type="text"
                value={footerData.regulatoryInfo?.heading || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  regulatoryInfo: { ...prev.regulatoryInfo, heading: e.target.value }
                }))}
                className="form-control"
              />
            </div>

            <div className="links-list">
              {footerData.regulatoryInfo?.items?.map((item, index) => (
                <div key={index} className="link-item">
                  <div className="form-group">
                    <label>Text:</label>
                    <textarea
                      value={item.text}
                      onChange={(e) => updateRegulatoryInfo(index, 'text', e.target.value)}
                      className="form-control"
                      rows="2"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Type:</label>
                      <select
                        value={item.type}
                        onChange={(e) => updateRegulatoryInfo(index, 'type', e.target.value)}
                        className="form-control"
                      >
                        <option value="text">Text Only</option>
                        <option value="link">Link</option>
                        <option value="pdf">PDF Download</option>
                      </select>
                    </div>
                  </div>

                  {item.type === 'link' && (
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => updateRegulatoryInfo(index, 'href', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  )}

                  {item.type === 'pdf' && (
                    <div className="form-group">
                      <label>PDF File:</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePDFUpload(e, 'regulatoryInfo', index)}
                          className="form-control"
                        />
                        {item.pdfFile && (
                          <span className="file-info">
                            Current: {item.pdfFile.split('/').pop()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={(e) => updateRegulatoryInfo(index, 'isActive', e.target.checked)}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => deleteRegulatoryInfo(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="section">
            <div className="section-header">
              <h2>Services Section</h2>
              <button onClick={() => {
                setFooterData(prev => ({
                  ...prev,
                  services: {
                    ...prev.services,
                    links: [...(prev.services?.links || []), { text: '', href: '', type: 'link', isActive: true }]
                  }
                }));
              }} className="btn btn-secondary">
                Add Service
              </button>
            </div>

            <div className="form-group">
              <label>Section Heading:</label>
              <input
                type="text"
                value={footerData.services?.heading || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  services: { ...prev.services, heading: e.target.value }
                }))}
                className="form-control"
              />
            </div>

            <div className="links-list">
              {footerData.services?.links?.map((link, index) => (
                <div key={index} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Text:</label>
                      <input
                        type="text"
                        value={link.text}
                        onChange={(e) => {
                          const newLinks = [...footerData.services.links];
                          newLinks[index] = { ...newLinks[index], text: e.target.value };
                          setFooterData(prev => ({ ...prev, services: { ...prev.services, links: newLinks } }));
                        }}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => {
                          const newLinks = [...footerData.services.links];
                          newLinks[index] = { ...newLinks[index], href: e.target.value };
                          setFooterData(prev => ({ ...prev, services: { ...prev.services, links: newLinks } }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={link.isActive}
                        onChange={(e) => {
                          const newLinks = [...footerData.services.links];
                          newLinks[index] = { ...newLinks[index], isActive: e.target.checked };
                          setFooterData(prev => ({ ...prev, services: { ...prev.services, links: newLinks } }));
                        }}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => {
                        const newLinks = footerData.services.links.filter((_, i) => i !== index);
                        setFooterData(prev => ({ ...prev, services: { ...prev.services, links: newLinks } }));
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'moreLinks' && (
          <div className="section">
            <h2>More Links Section</h2>
            
            <div className="form-group">
              <label>Section Heading:</label>
              <input
                type="text"
                value={footerData.moreLinks?.heading || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  moreLinks: { ...prev.moreLinks, heading: e.target.value }
                }))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Investor Charter Heading:</label>
              <input
                type="text"
                value={footerData.moreLinks?.investorCharter?.heading || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  moreLinks: { 
                    ...prev.moreLinks, 
                    investorCharter: { 
                      ...prev.moreLinks?.investorCharter, 
                      heading: e.target.value 
                    }
                  }
                }))}
                className="form-control"
              />
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="section">
            <h2>Company Information</h2>
            
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                value={footerData.company?.name || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  company: { ...prev.company, name: e.target.value }
                }))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Company Description:</label>
              <textarea
                value={footerData.company?.description || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  company: { ...prev.company, description: e.target.value }
                }))}
                className="form-control"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Copyright Text:</label>
              <input
                type="text"
                value={footerData.copyright?.text || ''}
                onChange={(e) => setFooterData(prev => ({
                  ...prev,
                  copyright: { ...prev.copyright, text: e.target.value }
                }))}
                className="form-control"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterAdmin;