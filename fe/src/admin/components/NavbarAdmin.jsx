import React, { useState, useEffect } from 'react';
import '../admin.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const NavbarAdmin = () => {
  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('mainNav');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/navbar/admin`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNavbarData(data);
      } else {
        throw new Error('Failed to fetch navbar data');
      }
    } catch (error) {
      console.error('Error fetching navbar data:', error);
      setMessage('Failed to load navbar data');
    } finally {
      setLoading(false);
    }
  };

  const saveNavbarData = async () => {
    setSaving(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/navbar/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(navbarData)
      });

      if (response.ok) {
        setMessage('Navbar updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to update navbar');
      }
    } catch (error) {
      console.error('Error saving navbar data:', error);
      setMessage('Failed to save navbar data');
    } finally {
      setSaving(false);
    }
  };

  const addMainNavItem = () => {
    setNavbarData(prev => ({
      ...prev,
      mainNavigation: [...(prev.mainNavigation || []), {
        text: '',
        href: '',
        isActive: true,
        order: (prev.mainNavigation?.length || 0) + 1
      }]
    }));
  };

  const updateMainNavItem = (index, field, value) => {
    setNavbarData(prev => ({
      ...prev,
      mainNavigation: prev.mainNavigation.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteMainNavItem = (index) => {
    setNavbarData(prev => ({
      ...prev,
      mainNavigation: prev.mainNavigation.filter((_, i) => i !== index)
    }));
  };

  const addLoginDropdownItem = () => {
    setNavbarData(prev => ({
      ...prev,
      loginDropdown: [...(prev.loginDropdown || []), {
        text: '',
        href: '',
        isActive: true,
        order: (prev.loginDropdown?.length || 0) + 1
      }]
    }));
  };

  const updateLoginDropdownItem = (index, field, value) => {
    setNavbarData(prev => ({
      ...prev,
      loginDropdown: prev.loginDropdown.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteLoginDropdownItem = (index) => {
    setNavbarData(prev => ({
      ...prev,
      loginDropdown: prev.loginDropdown.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="admin-loading">Loading navbar data...</div>;
  }

  if (!navbarData) {
    return <div className="admin-error">Failed to load navbar data</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Navbar Management</h1>
        <button 
          onClick={saveNavbarData} 
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
          className={`tab ${activeTab === 'mainNav' ? 'active' : ''}`}
          onClick={() => setActiveTab('mainNav')}
        >
          Main Navigation
        </button>
        <button 
          className={`tab ${activeTab === 'loginDropdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('loginDropdown')}
        >
          Login Dropdown
        </button>
        <button 
          className={`tab ${activeTab === 'buttons' ? 'active' : ''}`}
          onClick={() => setActiveTab('buttons')}
        >
          Buttons
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'mainNav' && (
          <div className="section">
            <div className="section-header">
              <h2>Main Navigation Links</h2>
              <button onClick={addMainNavItem} className="btn btn-secondary">
                Add Navigation Item
              </button>
            </div>

            <div className="links-list">
              {navbarData.mainNavigation?.map((item, index) => (
                <div key={index} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Text:</label>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateMainNavItem(index, 'text', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => updateMainNavItem(index, 'href', e.target.value)}
                        className="form-control"
                        placeholder="https://example.com or #section"
                      />
                    </div>

                    <div className="form-group">
                      <label>Order:</label>
                      <input
                        type="number"
                        value={item.order}
                        onChange={(e) => updateMainNavItem(index, 'order', parseInt(e.target.value))}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={(e) => updateMainNavItem(index, 'isActive', e.target.checked)}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => deleteMainNavItem(index)}
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

        {activeTab === 'loginDropdown' && (
          <div className="section">
            <div className="section-header">
              <h2>Login Dropdown Items</h2>
              <button onClick={addLoginDropdownItem} className="btn btn-secondary">
                Add Dropdown Item
              </button>
            </div>

            <div className="links-list">
              {navbarData.loginDropdown?.map((item, index) => (
                <div key={index} className="link-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Text:</label>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateLoginDropdownItem(index, 'text', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => updateLoginDropdownItem(index, 'href', e.target.value)}
                        className="form-control"
                        placeholder="https://example.com or #section"
                      />
                    </div>

                    <div className="form-group">
                      <label>Order:</label>
                      <input
                        type="number"
                        value={item.order}
                        onChange={(e) => updateLoginDropdownItem(index, 'order', parseInt(e.target.value))}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={(e) => updateLoginDropdownItem(index, 'isActive', e.target.checked)}
                      />
                      Active
                    </label>
                    <button 
                      onClick={() => deleteLoginDropdownItem(index)}
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

        {activeTab === 'buttons' && (
          <div className="section">
            <h2>Button Settings</h2>
            
            <div className="form-group">
              <label>Open Account Button Text:</label>
              <input
                type="text"
                value={navbarData.buttons?.openAccount?.text || ''}
                onChange={(e) => setNavbarData(prev => ({
                  ...prev,
                  buttons: {
                    ...prev.buttons,
                    openAccount: { ...prev.buttons?.openAccount, text: e.target.value }
                  }
                }))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Open Account Button URL:</label>
              <input
                type="text"
                value={navbarData.buttons?.openAccount?.href || ''}
                onChange={(e) => setNavbarData(prev => ({
                  ...prev,
                  buttons: {
                    ...prev.buttons,
                    openAccount: { ...prev.buttons?.openAccount, href: e.target.value }
                  }
                }))}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Login Button Text:</label>
              <input
                type="text"
                value={navbarData.buttons?.login?.text || ''}
                onChange={(e) => setNavbarData(prev => ({
                  ...prev,
                  buttons: {
                    ...prev.buttons,
                    login: { ...prev.buttons?.login, text: e.target.value }
                  }
                }))}
                className="form-control"
              />
            </div>

            <div className="form-actions">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={navbarData.buttons?.openAccount?.isActive}
                  onChange={(e) => setNavbarData(prev => ({
                    ...prev,
                    buttons: {
                      ...prev.buttons,
                      openAccount: { ...prev.buttons?.openAccount, isActive: e.target.checked }
                    }
                  }))}
                />
                Show Open Account Button
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={navbarData.buttons?.login?.isActive}
                  onChange={(e) => setNavbarData(prev => ({
                    ...prev,
                    buttons: {
                      ...prev.buttons,
                      login: { ...prev.buttons?.login, isActive: e.target.checked }
                    }
                  }))}
                />
                Show Login Button
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;