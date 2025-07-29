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
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.small};
`

const Modal = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.small};
  max-width: 350px;
  width: 100%;
  // max-height: 85vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.xl};
  
  ${media.md} {
    padding: ${theme.spacing.large};
    max-width: 1000px;
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
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
  
  ${media.md} {
    font-size: ${theme.typography.fontSize.subheader};
  }
`

const Subtitle = styled.h3`
  color: ${theme.colors.darkNavy};
  font-size: ${theme.typography.fontSize.body};
  font-weight: ${theme.typography.fontWeight.semiBold};
  margin-bottom: ${theme.spacing.small};
`

const Text = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSize.tiny};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing.small};
  
  ${media.md} {
    font-size: ${theme.typography.fontSize.small};
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
  background: ${theme.colors.navy};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.typography.fontSize.tiny};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  margin-top: ${theme.spacing.medium};
  width: 100%;
  transition: background ${theme.transitions.fast};
  
  ${media.md} {
    font-size: ${theme.typography.fontSize.small};
  }
  
  &:hover {
    background: ${theme.colors.darkNavy};
  }
`

const RiskDisclosure = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
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