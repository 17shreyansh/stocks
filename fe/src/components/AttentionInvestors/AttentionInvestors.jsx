import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Section = styled.section`
  background: #f8fafc;
  padding: 80px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const AlertBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 32px 24px;
  }
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const AlertIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #fef3c7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d97706;
`;

const AlertTitle = styled.h3`
  color: #1f2937;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 24px;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: grid;
  gap: 16px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.6;
`;

const BulletDot = styled.div`
  width: 6px;
  height: 6px;
  background: #f59e0b;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  background: #f1f5f9;
  color: #475569;
  padding: 24px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  border: 1px solid #e2e8f0;
`;

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.29 3.86001L1.82001 18C1.64537 18.3024 1.55297 18.6453 1.55199 18.9945C1.55102 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5468 2.53771 20.7239C2.83869 20.901 3.1808 20.9962 3.53001 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5468 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86001C13.5317 3.56611 13.2807 3.32313 12.9812 3.15449C12.6817 2.98585 12.3437 2.89726 12 2.89726C11.6563 2.89726 11.3183 2.98585 11.0188 3.15449C10.7193 3.32313 10.4683 3.56611 10.29 3.86001V3.86001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttentionInvestors = () => {
  const bulletPoints = [
    "Stock market investments are subject to market risks. Read all scheme related documents carefully before investing.",
    "Registration granted by SEBI, membership of BSE/NSE and registration of the ARN with AMFI does not guarantee protection of investors' interests or ensure quality of service.",
    "There is no guarantee or assurance of returns or capital protection in any of our services.",
    "Past performance is not indicative of future returns.",
    "Investors should make investment decisions based on their financial goals, risk tolerance and investment horizon.",
    "Investors should note that the NAV of the schemes may go up or down depending upon the factors and forces affecting the securities market."
  ];

  return (
    <Section id="attention-investors">
      <Container>
        <AlertBox>
          <AlertHeader>
            <AlertIcon>
              <WarningIcon />
            </AlertIcon>
            <AlertTitle>Attention Investors</AlertTitle>
          </AlertHeader>
          
          <BulletList>
            {bulletPoints.map((point, index) => (
              <BulletItem key={index}>
                <BulletDot />
                <span>{point}</span>
              </BulletItem>
            ))}
          </BulletList>
          
          <DisclaimerText>
            <strong>Focus Stock Brokers</strong> is a SEBI registered stock broker with Registration No: INZ000123456. All disputes are subject to the exclusive jurisdiction of courts in Mumbai, India.
          </DisclaimerText>
        </AlertBox>
      </Container>
    </Section>
  );
};

export default AttentionInvestors;