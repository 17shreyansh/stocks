import React from 'react';

const Logo = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0, overflow: 'hidden' }}>
      <img src="/logo/app-logo.png" alt="App Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
};

export default Logo;
