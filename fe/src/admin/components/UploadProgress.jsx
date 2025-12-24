import React from 'react';
import { Progress, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadProgress = ({ visible, progress, fileName, onCancel }) => {
  return (
    <Modal
      title="Uploading File"
      open={visible}
      footer={null}
      closable={false}
      centered
      width={400}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <UploadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500' }}>
          {fileName}
        </div>
        <Progress 
          percent={progress} 
          status={progress === 100 ? 'success' : 'active'}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <div style={{ marginTop: '8px', color: '#666' }}>
          {progress}% uploaded
        </div>
      </div>
    </Modal>
  );
};

export default UploadProgress;