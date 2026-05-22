import React from 'react';

const Logo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <img src="/logo/app-logo.png" alt="App Logo" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default Logo;
