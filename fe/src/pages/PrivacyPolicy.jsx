import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

import { pageAPI } from '../utils/api';

// Fallback data in case API fails
const FALLBACK_PRIVACY_DATA = {
  header: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 15, 2024"
  },
  content: {
    collection: {
      title: "1. Information We Collect",
      intro: "Focus Stock Brokers collects information necessary to provide our financial services effectively and securely. We collect:",
      personalInfo: {
        title: "Personal Information:",
        items: [
          "Name, address, phone number, and email address",
          "Date of birth and government-issued identification",
          "Financial information including income and investment experience",
          "Bank account details and payment information"
        ]
      },
      technicalInfo: {
        title: "Technical Information:",
        items: [
          "IP address, browser type, and device information",
          "Trading platform usage data and preferences",
          "Website interaction and navigation patterns",
          "Cookies and similar tracking technologies"
        ]
      }
    },
    usage: {
      title: "2. How We Use Your Information",
      intro: "We use your information for the following purposes:",
      items: [
        "Account opening and KYC compliance",
        "Processing trades and managing your portfolio",
        "Providing customer support and communication",
        "Regulatory reporting and compliance obligations",
        "Risk management and fraud prevention",
        "Improving our services and platform functionality",
        "Marketing communications (with your consent)"
      ]
    },
    sharing: {
      title: "3. Information Sharing and Disclosure",
      intro: "We may share your information in the following circumstances:",
      items: [
        "Regulatory Authorities: SEBI, stock exchanges, and other regulatory bodies as required by law",
        "Service Providers: Third-party vendors who assist in providing our services",
        "Legal Requirements: When required by court orders, legal processes, or government requests",
        "Business Transfers: In case of merger, acquisition, or sale of business assets",
        "Consent: When you have explicitly consented to such sharing"
      ]
    },
    security: {
      title: "4. Data Security Measures",
      intro: "We implement comprehensive security measures to protect your information:",
      items: [
        "256-bit SSL encryption for all data transmissions",
        "Multi-factor authentication for account access",
        "Regular security audits and vulnerability assessments",
        "Secure data centers with physical access controls",
        "Employee training on data protection and privacy",
        "Incident response procedures for security breaches"
      ]
    },
    rights: {
      title: "5. Your Privacy Rights",
      intro: "You have the following rights regarding your personal information:",
      items: [
        "Access: Request copies of your personal data",
        "Correction: Request correction of inaccurate information",
        "Deletion: Request deletion of your data (subject to legal requirements)",
        "Portability: Request transfer of your data to another service provider",
        "Objection: Object to processing of your data for marketing purposes",
        "Restriction: Request restriction of processing in certain circumstances"
      ]
    },
    cookies: {
      title: "6. Cookies and Tracking Technologies",
      intro: "We use cookies and similar technologies to enhance your experience:",
      items: [
        "Essential Cookies: Required for platform functionality and security",
        "Performance Cookies: Help us understand how you use our services",
        "Functional Cookies: Remember your preferences and settings",
        "Marketing Cookies: Used for targeted advertising (with consent)"
      ],
      note: "You can manage cookie preferences through your browser settings or our cookie preference center."
    },
    retention: {
      title: "7. Data Retention",
      intro: "We retain your information for as long as necessary to:",
      items: [
        "Provide our services and maintain your account",
        "Comply with legal and regulatory requirements",
        "Resolve disputes and enforce our agreements",
        "Prevent fraud and ensure security"
      ],
      note: "Generally, we retain account information for 7 years after account closure, as required by financial regulations."
    },
    transfers: {
      title: "8. International Data Transfers",
      intro: "Your information may be transferred to and processed in countries other than India. We ensure adequate protection through:",
      items: [
        "Adequacy decisions by relevant authorities",
        "Standard contractual clauses",
        "Binding corporate rules",
        "Certification schemes and codes of conduct"
      ]
    },
    changes: {
      title: "9. Changes to This Policy",
      intro: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes through:",
      items: [
        "Email notifications to your registered email address",
        "Prominent notices on our website and trading platform",
        "In-app notifications when you next log in"
      ]
    }
  },
  contact: {
    title: "Privacy Officer Contact",
    intro: "For privacy-related questions or to exercise your rights, contact our Privacy Officer:",
    details: "Email: privacy@focusstockbrokers.com\nPhone: +91-11-4567-8901\nAddress: Privacy Officer, Focus Stock Brokers, Financial District, Mumbai, India\nResponse Time: We will respond to your request within 30 days"
  }
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  color: ${theme.colors.mediumGray};
  font-size: 14px;
  background: ${theme.colors.white};
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;



const ContentCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Section = styled.section`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.navy};
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin-bottom: 16px;
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
  color: ${theme.colors.darkGray};
  margin-bottom: 8px;
`;



const ContactInfo = styled.div`
  background: linear-gradient(135deg, ${theme.colors.green}10, ${theme.colors.green}05);
  border: 1px solid ${theme.colors.green}30;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
`;

const PrivacyPolicy = () => {
  const [pageData, setPageData] = useState(FALLBACK_PRIVACY_DATA);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('privacy-policy');
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPageData(FALLBACK_PRIVACY_DATA);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_PRIVACY_DATA.header.title}</Title>
          <LastUpdated>{pageData.header?.lastUpdated || FALLBACK_PRIVACY_DATA.header.lastUpdated}</LastUpdated>
        </Header>

        <ContentCard>
          {Object.entries(pageData.content || FALLBACK_PRIVACY_DATA.content).map(([key, section]) => (
            <Section key={key}>
              <SectionTitle>{section.title}</SectionTitle>
              <Paragraph>{section.intro}</Paragraph>
              {section.items && (
                <List>
                  {section.items.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </List>
              )}
              {section.note && <Paragraph>{section.note}</Paragraph>}
            </Section>
          ))}

          <ContactInfo>
            <SectionTitle style={{ marginBottom: '16px' }}>
              {(pageData.contact || FALLBACK_PRIVACY_DATA.contact).title}
            </SectionTitle>
            <Paragraph style={{ marginBottom: '16px' }}>
              {(pageData.contact || FALLBACK_PRIVACY_DATA.contact).intro}
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              {(pageData.contact || FALLBACK_PRIVACY_DATA.contact).details.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < (pageData.contact || FALLBACK_PRIVACY_DATA.contact).details.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Paragraph>
          </ContactInfo>
        </ContentCard>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPolicy;