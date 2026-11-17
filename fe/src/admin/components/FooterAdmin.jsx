import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axios';
import { resolveFileUrl, toStoredFilePath } from '../../utils/fileUrl';
import '../admin.css';

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

const PdfFileField = ({ pdfFile, progress, onChange, disabled }) => {
  const isUploading = progress !== undefined;
  return (
    <div className="form-group">
      <label>PDF File:</label>
      <div className="file-upload">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={onChange}
          disabled={isUploading || disabled}
          className="form-control"
        />
        {isUploading && (
          <span className="file-info">Uploading… {progress}%</span>
        )}
        {!isUploading && pdfFile && (
          <span className="file-info">
            Current:{' '}
            <a href={resolveFileUrl(pdfFile)} target="_blank" rel="noopener noreferrer">
              {decodeURIComponent(pdfFile.split('/').pop())}
            </a>
          </span>
        )}
        {!isUploading && !pdfFile && (
          <span className="file-info">No PDF uploaded yet – this link stays hidden until one is uploaded.</span>
        )}
      </div>
    </div>
  );
};

const FooterAdmin = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('quickLinks1');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [uploading, setUploading] = useState({}); // { "<section>-<index>": percent }
  const footerDataRef = useRef(null);

  useEffect(() => {
    footerDataRef.current = footerData;
  }, [footerData]);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await axios.get('/footer/admin');
      setFooterData(response.data);
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setMessage('Failed to load footer data');
    } finally {
      setLoading(false);
    }
  };

  const saveFooterData = async (data = footerData, { silent = false } = {}) => {
    setSaving(true);
    try {
      await axios.put('/footer/admin', data);
      if (!silent) showMessage('Footer updated successfully!', 3000, 'success');
      return true;
    } catch (error) {
      console.error('Error saving footer data:', error);
      const reason = error.response?.data?.message || error.message;
      showMessage(`Failed to save footer data: ${reason}`, 6000);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (text, timeout = 4000, type = 'error') => {
    setMessage(text);
    setMessageType(type);
    if (timeout) setTimeout(() => setMessage(current => (current === text ? '' : current)), timeout);
  };

  const uploadPDF = async (file, key) => {
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      showMessage('Please choose a PDF file (.pdf)');
      return null;
    }
    if (file.size > MAX_PDF_SIZE) {
      showMessage(`PDF is too large (${formatSize(file.size)}). Maximum is ${formatSize(MAX_PDF_SIZE)}.`);
      return null;
    }

    const formData = new FormData();
    formData.append('document', file);

    setUploading(prev => ({ ...prev, [key]: 0 }));
    try {
      const response = await axios.post('/upload/document', formData, {
        timeout: 0, // large PDFs can take longer than the default 10s
        onUploadProgress: (e) => {
          if (e.total) {
            setUploading(prev => ({ ...prev, [key]: Math.round((e.loaded * 100) / e.total) }));
          }
        }
      });
      // Store a host-independent path so the link works on http/https and any domain.
      return toStoredFilePath(response.data.path || response.data.url);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      const reason = error.response?.data?.error || error.response?.data?.message || error.message;
      showMessage(`Failed to upload PDF: ${reason}`, 6000);
      return null;
    } finally {
      setUploading(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const addQuickLink = (section) => {
    const newLink = {
      text: '',
      href: '',
      type: 'link',
      pdfFile: '',
      isActive: true
    };
    
    setFooterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: [...(prev[section]?.links || []), newLink]
      }
    }));
  };

  const updateQuickLink = (section, index, field, value) => {
    setFooterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: prev[section].links.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const deleteQuickLink = (section, index) => {
    setFooterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        links: prev[section].links.filter((_, i) => i !== index)
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
    const input = e.target;
    const file = input.files?.[0];
    input.value = ''; // allow choosing the same file again
    if (!file || index === null) return;

    const listKey = section === 'regulatoryInfo' ? 'items' : 'links';
    const filePath = await uploadPDF(file, `${section}-${index}`);
    if (!filePath) return;

    // Apply to the latest state (edits made during the upload are kept) and
    // save right away so the PDF goes live without a separate "Save Changes" click.
    const prev = footerDataRef.current;
    const list = prev[section]?.[listKey] || [];
    const nextData = {
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: list.map((item, i) => (i !== index ? item : {
          ...item,
          type: 'pdf',
          pdfFile: filePath,
          text: item.text || file.name.replace(/\.pdf$/i, '')
        }))
      }
    };
    footerDataRef.current = nextData;
    setFooterData(nextData);

    const saved = await saveFooterData(nextData, { silent: true });
    if (saved) {
      showMessage(`“${file.name}” uploaded and published.`, 4000, 'success');
    } else {
      showMessage(`“${file.name}” uploaded, but saving failed – click Save Changes.`, 0);
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
          onClick={() => saveFooterData()}
          disabled={saving || Object.keys(uploading).length > 0}
          className="btn btn-primary"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`admin-message ${messageType}`} role="status">
          {message}
        </div>
      )}

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'quickLinks1' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickLinks1')}
        >
          Quick Links 1
        </button>
        <button 
          className={`tab ${activeTab === 'quickLinks2' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickLinks2')}
        >
          Quick Links 2
        </button>
        <button 
          className={`tab ${activeTab === 'quickLinks3' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickLinks3')}
        >
          Quick Links 3
        </button>
        <button 
          className={`tab ${activeTab === 'quickLinks4' ? 'active' : ''}`}
          onClick={() => setActiveTab('quickLinks4')}
        >
          Quick Links 4
        </button>
        <button 
          className={`tab ${activeTab === 'regulatoryInfo' ? 'active' : ''}`}
          onClick={() => setActiveTab('regulatoryInfo')}
        >
          Regulatory Info
        </button>
        <button 
          className={`tab ${activeTab === 'socialLinks' ? 'active' : ''}`}
          onClick={() => setActiveTab('socialLinks')}
        >
          Social Media
        </button>
        <button 
          className={`tab ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          Company Info
        </button>
      </div>

      <div className="admin-content">
        {(activeTab === 'quickLinks1' || activeTab === 'quickLinks2' || activeTab === 'quickLinks3' || activeTab === 'quickLinks4') && (
          <QuickLinksSection 
            section={activeTab}
            data={footerData[activeTab]}
            onAddLink={() => addQuickLink(activeTab)}
            onUpdateLink={(index, field, value) => updateQuickLink(activeTab, index, field, value)}
            onDeleteLink={(index) => deleteQuickLink(activeTab, index)}
            onUpdateHeading={(value) => setFooterData(prev => ({
              ...prev,
              [activeTab]: { ...prev[activeTab], heading: value }
            }))}
            onPDFUpload={(e, index) => handlePDFUpload(e, activeTab, index)}
            uploading={uploading}
          />
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
                        aria-label="Select regulatory info type"
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
                    <PdfFileField
                      pdfFile={item.pdfFile}
                      progress={uploading[`regulatoryInfo-${index}`]}
                      onChange={(e) => handlePDFUpload(e, 'regulatoryInfo', index)}
                    />
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



        {activeTab === 'socialLinks' && (
          <div className="section">
            <h2>Social Media Links</h2>
            
            <div className="links-list">
              {footerData.socialLinks?.map((social, index) => (
                <div key={index} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Platform:</label>
                      <select
                        aria-label="Select social media platform"
                        value={social.platform}
                        onChange={(e) => {
                          const newSocials = [...footerData.socialLinks];
                          newSocials[index] = { ...newSocials[index], platform: e.target.value };
                          setFooterData(prev => ({ ...prev, socialLinks: newSocials }));
                        }}
                        className="form-control"
                      >
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => {
                          const newSocials = [...footerData.socialLinks];
                          newSocials[index] = { ...newSocials[index], url: e.target.value };
                          setFooterData(prev => ({ ...prev, socialLinks: newSocials }));
                        }}
                        className="form-control"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={social.isActive}
                        onChange={(e) => {
                          const newSocials = [...footerData.socialLinks];
                          newSocials[index] = { ...newSocials[index], isActive: e.target.checked };
                          setFooterData(prev => ({ ...prev, socialLinks: newSocials }));
                        }}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => {
                        const newSocials = footerData.socialLinks.filter((_, i) => i !== index);
                        setFooterData(prev => ({ ...prev, socialLinks: newSocials }));
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => {
                setFooterData(prev => ({
                  ...prev,
                  socialLinks: [...(prev.socialLinks || []), { platform: 'facebook', url: '', isActive: true }]
                }));
              }} 
              className="btn btn-secondary"
            >
              Add Social Link
            </button>
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

const QuickLinksSection = ({ section, data, onAddLink, onUpdateLink, onDeleteLink, onUpdateHeading, onPDFUpload, uploading = {} }) => {
  const getSectionTitle = (section) => {
    const titles = {
      quickLinks1: 'Quick Links 1',
      quickLinks2: 'Quick Links 2', 
      quickLinks3: 'Quick Links 3',
      quickLinks4: 'Quick Links 4'
    };
    return titles[section] || 'Quick Links';
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>{getSectionTitle(section)}</h2>
        <button onClick={onAddLink} className="btn btn-secondary">
          Add Link
        </button>
      </div>

      <div className="form-group">
        <label>Section Heading:</label>
        <input
          type="text"
          value={data?.heading || ''}
          onChange={(e) => onUpdateHeading(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="links-list">
        {data?.links?.map((link, index) => (
          <div key={index} className="link-item">
            <div className="form-row">
              <div className="form-group">
                <label>Text:</label>
                <input
                  type="text"
                  value={link.text}
                  onChange={(e) => onUpdateLink(index, 'text', e.target.value)}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Type:</label>
                <select
                  aria-label="Select link type"
                  value={link.type}
                  onChange={(e) => onUpdateLink(index, 'type', e.target.value)}
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
                  onChange={(e) => onUpdateLink(index, 'href', e.target.value)}
                  className="form-control"
                  placeholder="https://example.com or #section"
                />
              </div>
            ) : (
              <PdfFileField
                pdfFile={link.pdfFile}
                progress={uploading[`${section}-${index}`]}
                onChange={(e) => onPDFUpload(e, index)}
              />
            )}

            <div className="form-actions">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={link.isActive}
                  onChange={(e) => onUpdateLink(index, 'isActive', e.target.checked)}
                />
                Active
              </label>
              <button 
                onClick={() => onDeleteLink(index)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterAdmin;