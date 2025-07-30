import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Section = styled.section`
  background: linear-gradient(180deg, 
    ${theme.colors.white} 0%, 
    rgba(255, 255, 255, 0.95) 20%,
    rgba(255, 255, 255, 0.8) 40%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.2) 80%,
    ${theme.colors.navy} 100%
  );
  padding: ${theme.spacing.medium} 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const AlertBox = styled.div`
  background-color: ${theme.colors.warning};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.medium};
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
`;

const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.navy};
`;

const AlertTitle = styled.h3`
  color: ${theme.colors.navy};
  font-size: ${theme.typography.fontSize.subheader};
  margin: 0;
`;

const AlertContent = styled.div``;

const BulletList = styled.ul`
  padding-left: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.small};
  
  li {
    margin-bottom: ${theme.spacing.micro};
    color: ${theme.colors.navy};
  }
`;

const DisclaimerText = styled.p`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.navy};
  margin-top: ${theme.spacing.small};
  font-style: italic;
`;

const WarningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.29 3.86001L1.82001 18C1.64537 18.3024 1.55297 18.6453 1.55199 18.9945C1.55102 19.3437 1.6415 19.6871 1.81443 19.9905C1.98737 20.2939 2.23673 20.5468 2.53771 20.7239C2.83869 20.901 3.1808 20.9962 3.53001 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5468 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86001C13.5317 3.56611 13.2807 3.32313 12.9812 3.15449C12.6817 2.98585 12.3437 2.89726 12 2.89726C11.6563 2.89726 11.3183 2.98585 11.0188 3.15449C10.7193 3.32313 10.4683 3.56611 10.29 3.86001V3.86001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttentionInvestors = () => {
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
          
          <AlertContent>
            <BulletList>
              <li>Stock market investments are subject to market risks. Read all scheme related documents carefully before investing.</li>
              <li>Registration granted by SEBI, membership of BSE/NSE and registration of the ARN with AMFI does not guarantee protection of investors' interests or ensure quality of service.</li>
              <li>There is no guarantee or assurance of returns or capital protection in any of our services.</li>
              <li>Past performance is not indicative of future returns.</li>
              <li>Investors should make investment decisions based on their financial goals, risk tolerance and investment horizon.</li>
              <li>Investors should note that the NAV of the schemes may go up or down depending upon the factors and forces affecting the securities market.</li>
            </BulletList>
            
            <DisclaimerText>
              Focus Stock Brokers is a SEBI registered stock broker with Registration No: INZ000123456. All disputes are subject to the exclusive jurisdiction of courts in Mumbai, India.
            </DisclaimerText>
          </AlertContent>
        </AlertBox>
      </Container>
    </Section>
  );
};

export default AttentionInvestors;