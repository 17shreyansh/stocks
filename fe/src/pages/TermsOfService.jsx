import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// Component Data Constants
const TERMS_DATA = {
  header: {
    title: "Terms of Service",
    lastUpdated: "Last updated: January 15, 2024"
  },
  sections: [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Services Provided' },
    { id: 'registration', title: 'Account Registration' },
    { id: 'trading', title: 'Trading Rules' },
    { id: 'fees', title: 'Fees and Charges' },
    { id: 'risk', title: 'Risk Disclosure' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'modifications', title: 'Modifications' }
  ],
  content: {
    acceptance: {
      title: "1. Acceptance of Terms",
      text: "By accessing and using the services provided by Focus Stock Brokers, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Focus Stock Brokers."
    },
    services: {
      title: "2. Services Provided",
      text: "Focus Stock Brokers provides the following services:",
      items: [
        "Stock trading and investment services",
        "Portfolio management and advisory services",
        "Market research and analysis",
        "Online trading platform access",
        "Customer support and assistance"
      ]
    },
    registration: {
      title: "3. Account Registration and Eligibility",
      text: "To use our services, you must:",
      items: [
        "Be at least 18 years of age",
        "Provide accurate and complete information during registration",
        "Maintain the confidentiality of your account credentials",
        "Comply with all applicable laws and regulations",
        "Complete the required KYC (Know Your Customer) procedures"
      ]
    },
    trading: {
      title: "4. Trading Rules and Regulations",
      text: "All trading activities must comply with:",
      items: [
        "SEBI (Securities and Exchange Board of India) regulations",
        "Stock exchange rules and guidelines",
        "Anti-money laundering (AML) requirements",
        "Market conduct and fair dealing principles"
      ]
    },
    fees: {
      title: "5. Fees and Charges",
      text: "You agree to pay all applicable fees and charges as outlined in our fee schedule. Fees may include but are not limited to:",
      items: [
        "Brokerage charges on transactions",
        "Account maintenance fees",
        "Platform usage charges",
        "Regulatory and statutory charges"
      ]
    },
    risk: {
      title: "6. Risk Disclosure",
      text: "Trading in securities involves substantial risk and may not be suitable for all investors. You acknowledge that:",
      items: [
        "Past performance does not guarantee future results",
        "Market volatility can result in significant losses",
        "You are responsible for your investment decisions",
        "Professional advice should be sought when needed"
      ]
    },
    liability: {
      title: "7. Limitation of Liability",
      text: "Focus Stock Brokers shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our liability is limited to the extent permitted by applicable law."
    },
    termination: {
      title: "8. Termination",
      text: "Either party may terminate this agreement with appropriate notice. Upon termination, you remain liable for all outstanding obligations and fees incurred prior to termination."
    },
    modifications: {
      title: "9. Modifications to Terms",
      text: "We reserve the right to modify these terms at any time. Changes will be communicated through our website or direct notification. Continued use of our services constitutes acceptance of modified terms."
    }
  },
  contact: {
    title: "Contact Information",
    text: "For questions regarding these Terms of Service, please contact us:",
    details: "Email: legal@focusstockbrokers.com\nPhone: +91-11-4567-8900\nAddress: Focus Stock Brokers, Financial District, Mumbai, India"
  }
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  padding: 100px 0 60px;
  
  @media (max-width: 768px) {
    padding: 80px 0 40px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 6vw, 3.5rem);
  font-weight: 700;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const LastUpdated = styled.p`
  color: ${theme.colors.mediumGray};
  font-size: clamp(12px, 2vw, 14px);
  background: ${theme.colors.white};
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TableOfContents = styled.div`
  background: ${theme.colors.white};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  height: fit-content;
  position: sticky;
  top: 120px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TOCTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li`
  margin-bottom: 8px;
`;

const TOCLink = styled.a`
  color: ${theme.colors.darkGray};
  font-size: 14px;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  display: block;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.platinum};
    color: ${theme.colors.green};
  }
`;

const ContentCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, ${theme.colors.green}, #0056cc);
    border-radius: 2px;
  }
  
  @media (max-width: 480px) {
    padding-left: 16px;
    margin-bottom: 12px;
    
    &::before {
      width: 3px;
      height: 16px;
    }
  }
`;

const Paragraph = styled.p`
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin-bottom: 16px;
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 0;
  
  @media (max-width: 480px) {
    margin: 12px 0;
  }
`;

const ListItem = styled.li`
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.5;
  color: ${theme.colors.darkGray};
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  list-style: none;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${theme.colors.green};
    font-weight: bold;
  }
  
  @media (max-width: 480px) {
    padding-left: 16px;
    margin-bottom: 8px;
  }
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, ${theme.colors.green}10, ${theme.colors.green}05);
  border: 1px solid ${theme.colors.green}30;
  border-radius: 16px;
  padding: 24px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
    margin-top: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
    margin-top: 20px;
  }
`;

const TermsOfService = () => {

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{TERMS_DATA.header.title}</Title>
          <LastUpdated>{TERMS_DATA.header.lastUpdated}</LastUpdated>
        </Header>

        <ContentGrid>
          <TableOfContents>
            <TOCTitle>Contents</TOCTitle>
            <TOCList>
              {TERMS_DATA.sections.map((section) => (
                <TOCItem key={section.id}>
                  <TOCLink href={`#${section.id}`}>{section.title}</TOCLink>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>

          <ContentCard>
          {Object.entries(TERMS_DATA.content).map(([key, section]) => (
            <Section key={key} id={key}>
              <SectionTitle>{section.title}</SectionTitle>
              <Paragraph>{section.text}</Paragraph>
              {section.items && (
                <List>
                  {section.items.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </List>
              )}
            </Section>
          ))}

          <ContactInfo>
            <SectionTitle style={{ marginBottom: '16px', paddingLeft: 0 }}>
              {TERMS_DATA.contact.title}
            </SectionTitle>
            <Paragraph style={{ marginBottom: '16px' }}>
              {TERMS_DATA.contact.text}
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              {TERMS_DATA.contact.details.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < TERMS_DATA.contact.details.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Paragraph>
          </ContactInfo>
        </ContentCard>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default TermsOfService;