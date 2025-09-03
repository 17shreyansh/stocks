import React, { useState, useEffect } from 'react';
import { Card, Button, message, Spin } from 'antd';

const ContactEditorDebug = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🔍 Testing connection...');
      
      // Check if token exists
      const token = localStorage.getItem('adminToken');
      console.log('Token exists:', !!token);
      
      if (!token) {
        setError('No admin token found. Please login first.');
        setLoading(false);
        return;
      }

      // Test API call
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('API Base:', API_BASE);

      const response = await fetch(`${API_BASE}/contact/content`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data);
        setData(data);
        message.success('Connection successful!');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError(`API Error: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError(`Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const testData = {
        hero: {
          title: 'Debug Test',
          subtitle: 'This is a test from debug component'
        },
        contactCards: [],
        tabs: []
      };

      const response = await fetch(`${API_BASE}/contact/content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Save successful:', result);
        message.success('Save test successful!');
        testConnection(); // Reload data
      } else {
        const errorData = await response.json();
        console.error('Save Error:', errorData);
        message.error(`Save failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Save Network Error:', err);
      message.error(`Save failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Testing connection...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title="🔧 Contact Editor Debug" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <strong>Environment:</strong>
          <ul>
            <li>API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</li>
            <li>Token exists: {localStorage.getItem('adminToken') ? '✅' : '❌'}</li>
            <li>Current URL: {window.location.href}</li>
          </ul>
        </div>

        {error && (
          <div style={{ 
            background: '#fff2f0', 
            border: '1px solid #ffccc7', 
            padding: 16, 
            borderRadius: 6,
            marginBottom: 16,
            color: '#a8071a'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div style={{ 
            background: '#f6ffed', 
            border: '1px solid #b7eb8f', 
            padding: 16, 
            borderRadius: 6,
            marginBottom: 16
          }}>
            <strong>✅ Connection successful!</strong>
            <details style={{ marginTop: 8 }}>
              <summary>View data structure</summary>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: 12, 
                borderRadius: 4, 
                marginTop: 8,
                fontSize: 12,
                overflow: 'auto'
              }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <Button onClick={testConnection}>
            🔄 Test Connection
          </Button>
          <Button type="primary" onClick={testSave} disabled={!data}>
            💾 Test Save
          </Button>
          <Button onClick={() => window.location.reload()}>
            🔃 Reload Page
          </Button>
        </div>
      </Card>

      {data && (
        <Card title="📊 Data Preview">
          <div>
            <h4>Hero Section:</h4>
            <p><strong>Title:</strong> {data.hero?.title || 'Not set'}</p>
            <p><strong>Subtitle:</strong> {data.hero?.subtitle || 'Not set'}</p>
            
            <h4>Contact Cards: ({data.contactCards?.length || 0})</h4>
            {data.contactCards?.map((card, index) => (
              <div key={index} style={{ marginLeft: 16, marginBottom: 8 }}>
                • {card.title} ({card.type}): {card.contact}
              </div>
            ))}
            
            <h4>Tabs: ({data.tabs?.length || 0})</h4>
            {data.tabs?.map((tab, index) => (
              <div key={index} style={{ marginLeft: 16, marginBottom: 8 }}>
                • {tab.title}: {tab.subtitle}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ContactEditorDebug;