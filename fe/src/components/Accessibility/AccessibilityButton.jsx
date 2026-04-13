import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(52, 152, 219, 0.4);
  z-index: 10000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(52, 152, 219, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    width: 52px;
    height: 52px;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 70px;
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-right: 6px solid #1f2937;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AccessibilityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    <path d="M8 14h8" />
    <path d="M9 18l1.5-4" />
    <path d="M15 18l-1.5-4" />
    <path d="M8.5 11l-1.5 3" />
    <path d="M15.5 11l1.5 3" />
  </svg>
);

const AccessibilityButton = () => {
  const { setIsPanelOpen } = useAccessibility();
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <FloatingButton
      onClick={() => setIsPanelOpen(true)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Open accessibility settings"
      title="Accessibility Settings (Ctrl + F2)"
    >
      <AccessibilityIcon />
      {showTooltip && (
        <Tooltip
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          Accessibility (Ctrl + F2)
        </Tooltip>
      )}
    </FloatingButton>
  );
};

export default AccessibilityButton;
