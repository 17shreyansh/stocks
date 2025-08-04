import React from 'react'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'
import sebi from '../assets/sebi.jpg'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${theme.zIndex.modal};
  padding: 20px;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const Modal = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 255, 0.9));
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(52, 152, 219, 0.1);
  backdrop-filter: blur(20px);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @media (min-width: 768px) {
    padding: 32px;
    max-width: 600px;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`

const Logo = styled.img`
  width: 50px;
  height: auto;
  
  ${media.md} {
    width: 150px;
  }
`

const Title = styled.h2`
  color: ${theme.colors.navy};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  
  @media (min-width: 768px) {
    font-size: 24px;
  }
`

const Subtitle = styled.h3`
  color: #3498db;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`

const Text = styled.p`
  color: ${theme.colors.darkGray};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  padding-left: 8px;
  
  @media (min-width: 768px) {
    font-size: 15px;
  }
`

const Source = styled.p`
  color: ${theme.colors.mediumGray};
  font-size: ${theme.typography.fontSize.tiny};
  font-style: italic;
  margin-top: ${theme.spacing.medium};
  padding-top: ${theme.spacing.small};
  border-top: 1px solid ${theme.colors.lightGray};
`

const CloseButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: linear-gradient(135deg, #2980b9, #1f5f8b);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const RiskDisclosure = ({ onClose }) => {
  return (
    <Overlay>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Logo src={sebi} alt="SEBI Logo" />
          <Title>Risk Disclosures</Title>
        </Header>
        
        <Subtitle>RISK DISCLOSURES ON DERIVATIVES</Subtitle>
        
        <Text>• 9 out of 10 individual traders in equity Futures and Options Segment, incurred net losses</Text>
        
        <Text>• On an average, loss makers registered net trading loss close to ₹50,000</Text>
        
        <Text>• Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs</Text>
        
        <Text>• Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost</Text>
        
        <Source>
          <strong>Source:</strong> SEBI study dated January 25, 2023 on "Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22
        </Source>
        
        <CloseButton onClick={onClose}>
          I Understand
        </CloseButton>
      </Modal>
    </Overlay>
  )
}

export default RiskDisclosure