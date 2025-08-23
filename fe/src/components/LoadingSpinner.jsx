import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.minHeight || '200px'};
  width: 100%;
  padding: 20px;
`;

const SpinnerWrapper = styled.div`
  text-align: center;
`;

const SpinnerText = styled.div`
  margin-top: 16px;
  color: #666;
  font-size: 14px;
`;

const LoadingSpinner = ({ 
  size = 'large', 
  text = 'Loading...', 
  minHeight = '200px',
  showText = true 
}) => {
  return (
    <SpinnerContainer minHeight={minHeight}>
      <SpinnerWrapper>
        <Spin size={size} />
        {showText && <SpinnerText>{text}</SpinnerText>}
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;