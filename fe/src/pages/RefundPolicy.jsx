import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

import { pageAPI } from '../utils/api';

// Fallback data in case API fails
const FALLBACK_REFUND_DATA = {
  header: {
    title: "Refund Policy",
    lastUpdated: "Last updated: January 15, 2024"
  },
  sections: [
    { id: 'refundable', title: 'Refundable Services' },
    { id: 'non-refundable', title: 'Non-Refundable Items' },
    { id: 'eligibility', title: 'Eligibility Criteria' },
    { id: 'timeline', title: 'Processing Timeline' },
    { id: 'request', title: 'How to Request' },
    { id: 'documentation', title: 'Required Documents' },
    { id: 'methods', title: 'Processing Methods' },
    { id: 'partial', title: 'Partial Refunds' },
    { id: 'dispute', title: 'Dispute Resolution' },
    { id: 'special', title: 'Special Circumstances' }
  ],
  importantNotice: "This refund policy applies to service fees and charges only. Trading losses due to market movements are not eligible for refunds as they are inherent risks of securities trading.",
  content: {
    refundable: {
      title: "1. Refundable Services",
      intro: "The following services and fees may be eligible for refunds under specific circumstances:",
      items: [
        "Account Opening Fees: Refundable within 7 days if account is not activated",
        "Annual Maintenance Charges: Pro-rated refund for unused period upon account closure",
        "Premium Service Subscriptions: Refundable within 14 days of subscription",
        "Research Report Purchases: Refundable within 24 hours if not accessed",
        "Platform Access Fees: Refundable for technical issues lasting more than 4 hours"
      ]
    },
    nonRefundable: {
      title: "2. Non-Refundable Items",
      intro: "The following are not eligible for refunds under any circumstances:",
      items: [
        "Brokerage Charges: Commission on executed trades",
        "Statutory Charges: Government taxes, SEBI fees, exchange charges",
        "Trading Losses: Losses due to market movements or investment decisions",
        "Penalty Charges: Fees for policy violations or non-compliance",
        "Third-party Charges: Bank charges, payment gateway fees",
        "Used Services: Services that have been fully utilized or accessed"
      ]
    },
    eligibility: {
      title: "3. Refund Eligibility Criteria",
      intro: "To be eligible for a refund, the following conditions must be met:",
      items: [
        "Request must be made within the specified time frame for each service",
        "Account must be in good standing with no pending obligations",
        "Service must not have been fully utilized or accessed",
        "Valid reason for refund request must be provided",
        "All required documentation must be submitted"
      ]
    }
  },
  timelineTable: [
    { service: "Account Opening Fee", window: "7 days", processing: "5-7 business days", method: "Original payment method" },
    { service: "Premium Subscriptions", window: "14 days", processing: "7-10 business days", method: "Bank transfer" },
    { service: "Research Reports", window: "24 hours", processing: "3-5 business days", method: "Account credit" },
    { service: "Platform Access", window: "Same day", processing: "1-3 business days", method: "Account credit" }
  ],
  contact: {
    title: "Refund Support Contact",
    intro: "For refund requests and related queries, contact our support team:",
    details: "Email: refunds@focusstockbrokers.com\nPhone: +91-11-4567-8902\nSupport Hours: Monday to Friday, 9:00 AM to 6:00 PM IST\nOnline Portal: Available 24/7 through your account dashboard"
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

const ImportantNote = styled.div`
  background: linear-gradient(135deg, ${theme.colors.warning}20, ${theme.colors.warning}10);
  border: 1px solid ${theme.colors.warning}50;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
    margin: 20px 0;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
    margin: 16px 0;
  }
`;

const RefundTable = styled.div`
  background: ${theme.colors.platinum};
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    margin: 20px 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 8px;
    margin: 16px 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  
  th, td {
    padding: 16px 12px;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.lightGray};
  }
  
  th {
    background: ${theme.colors.green}15;
    font-weight: 600;
    color: ${theme.colors.navy};
    font-size: 14px;
  }
  
  td {
    color: ${theme.colors.darkGray};
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    th, td {
      padding: 12px 8px;
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    th, td {
      padding: 8px 6px;
      font-size: 11px;
    }
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

const RefundPolicy = () => {
  const [pageData, setPageData] = useState(FALLBACK_REFUND_DATA);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('refund-policy');
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPageData(FALLBACK_REFUND_DATA);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_REFUND_DATA.header.title}</Title>
          <LastUpdated>{pageData.header?.lastUpdated || FALLBACK_REFUND_DATA.header.lastUpdated}</LastUpdated>
        </Header>

        <ContentGrid>
          <TableOfContents>
            <TOCTitle>Contents</TOCTitle>
            <TOCList>
              {(pageData.sections || FALLBACK_REFUND_DATA.sections).map((section) => (
                <TOCItem key={section.id}>
                  <TOCLink href={`#${section.id}`}>{section.title}</TOCLink>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>

          <ContentCard>
            <ImportantNote>
              <strong>Important Notice:</strong> {pageData.importantNotice || FALLBACK_REFUND_DATA.importantNotice}
            </ImportantNote>

            <Section id="refundable">
              <SectionTitle>1. Refundable Services</SectionTitle>
              <Paragraph>
                The following services and fees may be eligible for refunds under specific circumstances:
              </Paragraph>
              <List>
                <ListItem><strong>Account Opening Fees:</strong> Refundable within 7 days if account is not activated</ListItem>
                <ListItem><strong>Annual Maintenance Charges:</strong> Pro-rated refund for unused period upon account closure</ListItem>
                <ListItem><strong>Premium Service Subscriptions:</strong> Refundable within 14 days of subscription</ListItem>
                <ListItem><strong>Research Report Purchases:</strong> Refundable within 24 hours if not accessed</ListItem>
                <ListItem><strong>Platform Access Fees:</strong> Refundable for technical issues lasting more than 4 hours</ListItem>
              </List>
            </Section>

            <Section id="non-refundable">
              <SectionTitle>2. Non-Refundable Items</SectionTitle>
              <Paragraph>
                The following are not eligible for refunds under any circumstances:
              </Paragraph>
              <List>
                <ListItem><strong>Brokerage Charges:</strong> Commission on executed trades</ListItem>
                <ListItem><strong>Statutory Charges:</strong> Government taxes, SEBI fees, exchange charges</ListItem>
                <ListItem><strong>Trading Losses:</strong> Losses due to market movements or investment decisions</ListItem>
                <ListItem><strong>Penalty Charges:</strong> Fees for policy violations or non-compliance</ListItem>
                <ListItem><strong>Third-party Charges:</strong> Bank charges, payment gateway fees</ListItem>
                <ListItem><strong>Used Services:</strong> Services that have been fully utilized or accessed</ListItem>
              </List>
            </Section>

            <Section id="eligibility">
              <SectionTitle>3. Refund Eligibility Criteria</SectionTitle>
              <Paragraph>
                To be eligible for a refund, the following conditions must be met:
              </Paragraph>
              <List>
                <ListItem>Request must be made within the specified time frame for each service</ListItem>
                <ListItem>Account must be in good standing with no pending obligations</ListItem>
                <ListItem>Service must not have been fully utilized or accessed</ListItem>
                <ListItem>Valid reason for refund request must be provided</ListItem>
                <ListItem>All required documentation must be submitted</ListItem>
              </List>
            </Section>

            <Section id="timeline">
              <SectionTitle>4. Refund Processing Timeline</SectionTitle>
              <RefundTable>
                <Table>
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Request Window</th>
                      <th>Processing Time</th>
                      <th>Refund Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(pageData.timelineTable || FALLBACK_REFUND_DATA.timelineTable).map((row, index) => (
                      <tr key={index}>
                        <td>{row.service}</td>
                        <td>{row.window}</td>
                        <td>{row.processing}</td>
                        <td>{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </RefundTable>
            </Section>

            <Section id="request">
              <SectionTitle>5. How to Request a Refund</SectionTitle>
              <Paragraph>
                To request a refund, follow these steps:
              </Paragraph>
              <List>
                <ListItem><strong>Step 1:</strong> Log into your account and navigate to the "Support" section</ListItem>
                <ListItem><strong>Step 2:</strong> Select "Refund Request" from the available options</ListItem>
                <ListItem><strong>Step 3:</strong> Fill out the refund request form with complete details</ListItem>
                <ListItem><strong>Step 4:</strong> Attach supporting documents (receipts, screenshots, etc.)</ListItem>
                <ListItem><strong>Step 5:</strong> Submit the request and note the reference number</ListItem>
                <ListItem><strong>Step 6:</strong> Track your request status through the support portal</ListItem>
              </List>
            </Section>

            <Section id="documentation">
              <SectionTitle>6. Required Documentation</SectionTitle>
              <Paragraph>
                Please provide the following documents with your refund request:
              </Paragraph>
              <List>
                <ListItem>Original payment receipt or transaction confirmation</ListItem>
                <ListItem>Account statement showing the charge</ListItem>
                <ListItem>Detailed explanation of the refund reason</ListItem>
                <ListItem>Screenshots or evidence supporting your claim (if applicable)</ListItem>
                <ListItem>Bank account details for refund processing</ListItem>
              </List>
            </Section>

            <Section id="methods">
              <SectionTitle>7. Refund Processing Methods</SectionTitle>
              <Paragraph>
                Refunds will be processed using the following methods:
              </Paragraph>
              <List>
                <ListItem><strong>Original Payment Method:</strong> For credit/debit card payments within 30 days</ListItem>
                <ListItem><strong>Bank Transfer:</strong> For older transactions or when original method is unavailable</ListItem>
                <ListItem><strong>Account Credit:</strong> For small amounts or when requested by the client</ListItem>
                <ListItem><strong>Cheque:</strong> For large amounts or when electronic transfer is not possible</ListItem>
              </List>
            </Section>

            <Section id="partial">
              <SectionTitle>8. Partial Refunds</SectionTitle>
              <Paragraph>
                In certain cases, partial refunds may be applicable:
              </Paragraph>
              <List>
                <ListItem><strong>Pro-rated Services:</strong> Based on unused portion of the service period</ListItem>
                <ListItem><strong>Processing Fees:</strong> Administrative costs may be deducted</ListItem>
                <ListItem><strong>Usage-based Refunds:</strong> Calculated based on actual service utilization</ListItem>
              </List>
            </Section>

            <Section id="dispute">
              <SectionTitle>9. Dispute Resolution</SectionTitle>
              <Paragraph>
                If your refund request is denied or you disagree with our decision:
              </Paragraph>
              <List>
                <ListItem>You may escalate the matter to our Grievance Officer</ListItem>
                <ListItem>Provide additional documentation or clarification if requested</ListItem>
                <ListItem>Request a review by senior management</ListItem>
                <ListItem>Approach regulatory authorities if the dispute remains unresolved</ListItem>
              </List>
            </Section>

            <Section id="special">
              <SectionTitle>10. Special Circumstances</SectionTitle>
              <Paragraph>
                Refunds may be considered outside normal policy in cases of:
              </Paragraph>
              <List>
                <ListItem><strong>Technical Failures:</strong> System outages affecting trading or access</ListItem>
                <ListItem><strong>Service Errors:</strong> Mistakes made by our staff or systems</ListItem>
                <ListItem><strong>Regulatory Changes:</strong> Changes in laws affecting service delivery</ListItem>
                <ListItem><strong>Force Majeure:</strong> Events beyond our control affecting services</ListItem>
              </List>
            </Section>

            <ContactInfo>
              <SectionTitle style={{ marginBottom: '16px', paddingLeft: 0 }}>
                {(pageData.contact || FALLBACK_REFUND_DATA.contact).title}
              </SectionTitle>
              <Paragraph style={{ marginBottom: '16px' }}>
                {(pageData.contact || FALLBACK_REFUND_DATA.contact).intro}
              </Paragraph>
              <Paragraph style={{ marginBottom: 0 }}>
                {(pageData.contact || FALLBACK_REFUND_DATA.contact).details.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < (pageData.contact || FALLBACK_REFUND_DATA.contact).details.split('\n').length - 1 && <br />}
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

export default RefundPolicy;