import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ScrollIndicatorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 1000;
  pointer-events: none;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #10B981, #1A365D);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  transition: width 0.3s ease;
`;

const ScrollIndicator = () => {
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    const updateProgress = () => {
      if (!progressBarRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      progressBarRef.current.style.width = `${scrollPercentage}%`;
    };
    
    // Initial update
    updateProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateProgress);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);
  
  return (
    <ScrollIndicatorContainer className="scrollIndicator">
      <ProgressBar ref={progressBarRef} />
    </ScrollIndicatorContainer>
  );
};

export default ScrollIndicator;