import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 255, 0.8));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(52, 152, 219, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(52, 152, 219, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(52, 152, 219, 0.2);
    border-color: rgba(52, 152, 219, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3498db, #667eea);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  color: white;
  font-size: 24px;
  
  ${Card}:hover & {
    transform: rotate(10deg) scale(1.1);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a2b4e;
  margin-bottom: 8px;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: #3498db;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
`;

const InteractiveCard = ({ icon, title, description, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default InteractiveCard;