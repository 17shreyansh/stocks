import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

import { pageAPI } from '../utils/api';

// Fallback data in case API fails
const FALLBACK_GRIEVANCE_DATA = {
  header: {
    title: "Grievance Redressal Policy",
    lastUpdated: "Last updated: January 15, 2024"
  },
  sections: [
    { id: 'commitment', title: 'Our Commitment' },
    { id: 'types', title: 'Types of Grievances' },
    { id: 'process', title: 'Resolution Process' },
    { id: 'response', title: 'Response Times' },
    { id: 'escalation', title: 'Escalation Matrix' },
    { id: 'external', title: 'External Redressal' }
  ],
  content: {
    commitment: "At Focus Stock Brokers, we are committed to providing exceptional service to our clients. We understand that despite our best efforts, there may be occasions when you are not satisfied with our services. This Grievance Redressal Policy outlines our systematic approach to address and resolve your concerns promptly and fairly.",
    grievanceTypes: [
      { type: "Trading Issues", description: "Order execution problems, pricing discrepancies, platform issues" },
      { type: "Account Services", description: "Account opening delays, documentation issues, KYC problems" },
      { type: "Billing & Charges", description: "Incorrect charges, billing disputes, fee clarifications" },
      { type: "Customer Service", description: "Poor service quality, delayed responses, staff behavior" },
      { type: "Technical Issues", description: "Platform downtime, mobile app problems, system errors" },
      { type: "Compliance Matters", description: "Regulatory concerns, policy violations, audit issues" },
      { type: "Research Services", description: "Report quality, recommendation disputes, advisory issues" }
    ],
    processSteps: [
      { step: 1, title: "Initial Contact", description: "Submit your complaint through any of our available channels" },
      { step: 2, title: "Acknowledgment", description: "Receive confirmation within 24 hours with complaint reference number" },
      { step: 3, title: "Investigation", description: "Our team investigates the issue and gathers relevant information" },
      { step: 4, title: "Resolution", description: "Provide solution or explanation within 7 working days" },
      { step: 5, title: "Follow-up", description: "Ensure satisfaction and close the complaint formally" }
    ],
    responseTime: [
      { type: "Acknowledgment", time: "Within 24 hours of receiving the complaint" },
      { type: "Simple Issues", time: "Resolution within 3 working days" },
      { type: "Complex Issues", time: "Resolution within 7 working days" },
      { type: "Investigation Required", time: "Resolution within 15 working days" },
      { type: "Regulatory Matters", time: "Resolution within 30 working days" }
    ],
    escalationLevels: [
      { level: "Level 1", handler: "Customer Service Team", description: "Initial handling" },
      { level: "Level 2", handler: "Team Leader/Supervisor", description: "Within 2 days if unresolved" },
      { level: "Level 3", handler: "Grievance Officer", description: "Within 5 days if unresolved" },
      { level: "Level 4", handler: "Senior Management", description: "Within 10 days if unresolved" },
      { level: "Level 5", handler: "External Authorities", description: "SEBI, Stock Exchanges, Ombudsman" }
    ],
    externalRedressal: [
      { authority: "SEBI SCORES", description: "Online complaint redressal system (www.scores.gov.in)" },
      { authority: "Stock Exchange Arbitration", description: "For trading-related disputes" },
      { authority: "SEBI Ombudsman", description: "For unresolved complaints after 30 days" },
      { authority: "Consumer Courts", description: "For service deficiency issues" },
      { authority: "Civil Courts", description: "For contractual disputes" }
    ]
  },
  contacts: [
    {
      title: "Grievance Officer",
      details: [
        { label: "Name", value: "Mr. Rajesh Kumar" },
        { label: "Email", value: "grievance@focusstockbrokers.com" },
        { label: "Phone", value: "+91-11-4567-8903" },
        { label: "Hours", value: "Mon-Fri, 9 AM - 6 PM" }
      ]
    },
    {
      title: "Customer Support",
      details: [
        { label: "Email", value: "support@focusstockbrokers.com" },
        { label: "Phone", value: "+91-11-4567-8900" },
        { label: "WhatsApp", value: "+91-98765-43210" },
        { label: "Hours", value: "24/7 Support Available" }
      ]
    },
    {
      title: "Postal Address",
      details: [
        { label: "", value: "Focus Stock Brokers Ltd." },
        { label: "", value: "Grievance Department" },
        { label: "", value: "Financial District, BKC" },
        { label: "", value: "Mumbai - 400051, India" }
      ]
    },
    {
      title: "SEBI Registration",
      details: [
        { label: "SEBI Reg No", value: "INZ000123456" },
        { label: "BSE Member ID", value: "12345" },
        { label: "NSE Member ID", value: "67890" },
        { label: "DP ID", value: "IN300000-12345678" }
      ]
    }
  ],
  complaintTypes: [
    { value: "trading", label: "Trading Issues" },
    { value: "account", label: "Account Services" },
    { value: "billing", label: "Billing & Charges" },
    { value: "service", label: "Customer Service" },
    { value: "technical", label: "Technical Issues" },
    { value: "compliance", label: "Compliance Matters" },
    { value: "research", label: "Research Services" },
    { value: "other", label: "Other" }
  ]
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
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
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

const ProcessFlow = styled.div`
  background: ${theme.colors.platinum};
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

const FlowStep = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const StepNumber = styled.div`
  background: linear-gradient(135deg, ${theme.colors.green}, #0056cc);
  color: ${theme.colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 16px;
  flex-shrink: 0;
  font-size: 16px;
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
    margin-right: 12px;
  }
`;

const StepContent = styled.div`
  flex: 1;
  padding-top: 4px;
`;

const StepTitle = styled.h4`
  color: ${theme.colors.navy};
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: clamp(14px, 2.5vw, 16px);
`;

const StepDescription = styled.p`
  color: ${theme.colors.darkGray};
  margin: 0;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.5;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ContactItem = styled.div`
  background: ${theme.colors.platinum};
  border-radius: 12px;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ContactTitle = styled.h4`
  color: ${theme.colors.navy};
  margin: 0 0 12px 0;
  font-weight: 600;
  font-size: clamp(14px, 2.5vw, 16px);
`;

const ContactDetail = styled.p`
  color: ${theme.colors.darkGray};
  margin: 6px 0;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.4;
`;

const ComplaintForm = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${theme.colors.navy};
  font-weight: 600;
  margin-bottom: 8px;
  font-size: clamp(12px, 2vw, 14px);
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: 12px;
  font-size: clamp(14px, 2.5vw, 16px);
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    border-radius: 8px;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: 12px;
  font-size: clamp(14px, 2.5vw, 16px);
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    border-radius: 8px;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: 12px;
  font-size: clamp(14px, 2.5vw, 16px);
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    border-radius: 8px;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.green}, #0056cc);
  color: ${theme.colors.white};
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 119, 255, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    border-radius: 8px;
    width: 100%;
  }
`;

const GrievancePolicy = () => {
  const [pageData, setPageData] = useState(FALLBACK_GRIEVANCE_DATA);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountNumber: '',
    complaintType: '',
    subject: '',
    description: ''
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('grievance-policy');
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPageData(FALLBACK_GRIEVANCE_DATA);
    }
  };



  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', formData);
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_GRIEVANCE_DATA.header.title}</Title>
          <LastUpdated>{pageData.header?.lastUpdated || FALLBACK_GRIEVANCE_DATA.header.lastUpdated}</LastUpdated>
        </Header>

        <ContentGrid>
          <TableOfContents>
            <TOCTitle>Contents</TOCTitle>
            <TOCList>
              {(pageData.sections || FALLBACK_GRIEVANCE_DATA.sections).map((section) => (
                <TOCItem key={section.id}>
                  <TOCLink href={`#${section.id}`}>{section.title}</TOCLink>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>

          <div>
            <ContentCard>
              <Section id="commitment">
                <SectionTitle>1. Our Commitment</SectionTitle>
                <Paragraph>
                  {(pageData.content?.commitment || FALLBACK_GRIEVANCE_DATA.content.commitment)}
                </Paragraph>
              </Section>

              <Section id="types">
                <SectionTitle>2. Types of Grievances We Handle</SectionTitle>
                <List>
                  {(pageData.content?.grievanceTypes || FALLBACK_GRIEVANCE_DATA.content.grievanceTypes).map((item, index) => (
                    <ListItem key={index}><strong>{item.type}:</strong> {item.description}</ListItem>
                  ))}
                </List>
              </Section>

              <Section id="process">
                <SectionTitle>3. Grievance Resolution Process</SectionTitle>
                <ProcessFlow>
                  {(pageData.content?.processSteps || FALLBACK_GRIEVANCE_DATA.content.processSteps).map((step, index) => (
                    <FlowStep key={index}>
                      <StepNumber>{step.step}</StepNumber>
                      <StepContent>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </StepContent>
                    </FlowStep>
                  ))}
                </ProcessFlow>
              </Section>

              <Section id="response">
                <SectionTitle>4. Response Time Commitments</SectionTitle>
                <List>
                  <ListItem><strong>Acknowledgment:</strong> Within 24 hours of receiving the complaint</ListItem>
                  <ListItem><strong>Simple Issues:</strong> Resolution within 3 working days</ListItem>
                  <ListItem><strong>Complex Issues:</strong> Resolution within 7 working days</ListItem>
                  <ListItem><strong>Investigation Required:</strong> Resolution within 15 working days</ListItem>
                  <ListItem><strong>Regulatory Matters:</strong> Resolution within 30 working days</ListItem>
                </List>
              </Section>

              <Section id="escalation">
                <SectionTitle>5. Escalation Matrix</SectionTitle>
                <Paragraph>
                  If you are not satisfied with the initial resolution, you can escalate your complaint:
                </Paragraph>
                <List>
                  <ListItem><strong>Level 1:</strong> Customer Service Team (Initial handling)</ListItem>
                  <ListItem><strong>Level 2:</strong> Team Leader/Supervisor (Within 2 days if unresolved)</ListItem>
                  <ListItem><strong>Level 3:</strong> Grievance Officer (Within 5 days if unresolved)</ListItem>
                  <ListItem><strong>Level 4:</strong> Senior Management (Within 10 days if unresolved)</ListItem>
                  <ListItem><strong>Level 5:</strong> External Authorities (SEBI, Stock Exchanges, Ombudsman)</ListItem>
                </List>
              </Section>

              <Section id="external">
                <SectionTitle>6. External Redressal Mechanisms</SectionTitle>
                <Paragraph>
                  If your grievance is not resolved to your satisfaction, you may approach:
                </Paragraph>
                <List>
                  <ListItem><strong>SEBI SCORES:</strong> Online complaint redressal system (www.scores.gov.in)</ListItem>
                  <ListItem><strong>Stock Exchange Arbitration:</strong> For trading-related disputes</ListItem>
                  <ListItem><strong>SEBI Ombudsman:</strong> For unresolved complaints after 30 days</ListItem>
                  <ListItem><strong>Consumer Courts:</strong> For service deficiency issues</ListItem>
                  <ListItem><strong>Civil Courts:</strong> For contractual disputes</ListItem>
                </List>
              </Section>

              <Section>
                <SectionTitle style={{ marginBottom: '24px', paddingLeft: 0 }}>
                  Grievance Contact Information
                </SectionTitle>
                
                <ContactGrid>
                  <ContactItem>
                    <ContactTitle>Grievance Officer</ContactTitle>
                    <ContactDetail><strong>Name:</strong> Mr. Rajesh Kumar</ContactDetail>
                    <ContactDetail><strong>Email:</strong> grievance@focusstockbrokers.com</ContactDetail>
                    <ContactDetail><strong>Phone:</strong> +91-11-4567-8903</ContactDetail>
                    <ContactDetail><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM</ContactDetail>
                  </ContactItem>
                  
                  <ContactItem>
                    <ContactTitle>Customer Support</ContactTitle>
                    <ContactDetail><strong>Email:</strong> support@focusstockbrokers.com</ContactDetail>
                    <ContactDetail><strong>Phone:</strong> +91-11-4567-8900</ContactDetail>
                    <ContactDetail><strong>WhatsApp:</strong> +91-98765-43210</ContactDetail>
                    <ContactDetail><strong>Hours:</strong> 24/7 Support Available</ContactDetail>
                  </ContactItem>
                  
                  <ContactItem>
                    <ContactTitle>Postal Address</ContactTitle>
                    <ContactDetail>Focus Stock Brokers Ltd.</ContactDetail>
                    <ContactDetail>Grievance Department</ContactDetail>
                    <ContactDetail>Financial District, BKC</ContactDetail>
                    <ContactDetail>Mumbai - 400051, India</ContactDetail>
                  </ContactItem>
                  
                  <ContactItem>
                    <ContactTitle>SEBI Registration</ContactTitle>
                    <ContactDetail><strong>SEBI Reg No:</strong> INZ000123456</ContactDetail>
                    <ContactDetail><strong>BSE Member ID:</strong> 12345</ContactDetail>
                    <ContactDetail><strong>NSE Member ID:</strong> 67890</ContactDetail>
                    <ContactDetail><strong>DP ID:</strong> IN300000-12345678</ContactDetail>
                  </ContactItem>
                </ContactGrid>
              </Section>
            </ContentCard>

            <ComplaintForm>
              <SectionTitle style={{ marginBottom: '24px', paddingLeft: 0 }}>
                Submit a Complaint
              </SectionTitle>
              
              <form onSubmit={handleSubmit}>
                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </FormGrid>
                
                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="complaintType">Complaint Type *</Label>
                    <Select
                      id="complaintType"
                      name="complaintType"
                      value={formData.complaintType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select complaint type</option>
                      {(pageData.complaintTypes || FALLBACK_GRIEVANCE_DATA.complaintTypes).map((type, index) => (
                        <option key={index} value={type.value}>{type.label}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </FormGroup>
                </FormGrid>
                
                <FormGroup style={{ marginBottom: '32px' }}>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about your complaint, including dates, transaction details, and any relevant information that will help us resolve your issue quickly."
                    required
                  />
                </FormGroup>
                
                <SubmitButton type="submit">
                  Submit Complaint
                </SubmitButton>
              </form>
            </ComplaintForm>
          </div>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default GrievancePolicy;