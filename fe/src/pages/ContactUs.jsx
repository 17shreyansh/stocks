import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: ${theme.colors.white};
`;

const HeroSection = styled(AnimatedSection)`
  text-align: center;
  padding: ${theme.spacing.large} 0;
  
  h1 {
    font-size: 42px;
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.small};
    
    @media (max-width: 768px) {
      font-size: 32px;
    }
  }
  
  p {
    font-size: 16px;
    color: ${theme.colors.darkGray};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.medium};
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const ContactCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium};
  border: 1px solid ${theme.colors.lightGray};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.green};
  }
  
  .icon {
    width: 48px;
    height: 48px;
    background: ${theme.colors.navy};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme.spacing.small};
    font-size: 20px;
    color: ${theme.colors.white};
  }
  
  h3 {
    font-size: 18px;
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.micro};
    font-weight: ${theme.typography.fontWeight.bold};
  }
  
  p {
    color: ${theme.colors.darkGray};
    line-height: 1.4;
    margin-bottom: ${theme.spacing.small};
    font-size: 14px;
  }
  
  .contact-info {
    color: ${theme.colors.green};
    font-weight: ${theme.typography.fontWeight.semiBold};
    font-size: 15px;
  }
`;

const TabSection = styled(AnimatedSection)`
  padding: ${theme.spacing.large} 0;
  background: ${theme.colors.platinum};
`;

const TabContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  background: ${props => props.$active ? theme.colors.navy : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.navy};
  border: 1px solid ${theme.colors.navy};
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.navy};
    color: ${theme.colors.white};
  }
`;

const TabContent = styled.div`
  background: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium};
  border: 1px solid ${theme.colors.lightGray};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.small};
  
  label {
    display: block;
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.navy};
    margin-bottom: 4px;
    font-size: 14px;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 10px;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.green};
      box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.1);
    }
  }
  
  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const FileUpload = styled.div`
  position: relative;
  
  input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-label {
    display: block;
    padding: 10px;
    border: 1px dashed ${theme.colors.lightGray};
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    
    &:hover {
      border-color: ${theme.colors.green};
      background: rgba(0, 119, 255, 0.02);
    }
  }
`;

const AssociateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
`;

const AssociateCard = styled.div`
  background: ${theme.colors.platinum};
  border-radius: 6px;
  padding: ${theme.spacing.small};
  border-left: 3px solid ${theme.colors.green};
  
  h4 {
    color: ${theme.colors.navy};
    font-weight: ${theme.typography.fontWeight.semiBold};
    margin-bottom: 4px;
    font-size: 15px;
  }
  
  p {
    color: ${theme.colors.darkGray};
    line-height: 1.4;
    font-size: 13px;
  }
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  font-size: 18px;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const SectionText = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.medium};
  font-size: 14px;
  line-height: 1.5;
`;

const ContactUs = () => {
  const [activeTab, setActiveTab] = useState('callback');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    applyingFor: '',
    cv: null
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Customer Support',
      description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'care@proficientgroup.in'
    },
    {
      icon: '📈',
      title: 'Call & Trade',
      description: 'Call in for your trade execution or modifying pending orders Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'Call: 033 40266-315/316/317'
    },
    {
      icon: '🏦',
      title: 'Account Opening & General Queries',
      description: 'Call us to open an account & to know more about our services Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'communication@proficientgroup.in'
    }
  ];

  const associateTypes = [
    {
      title: 'Trader',
      description: 'We are always looking for smart and dynamic professional traders having an ability of discovering successful trading strategies in ever changing markets across Equity, Commodity, Currency and others.'
    },
    {
      title: 'Algo Strategist',
      description: 'Proficient is looking for professional algorithmic traders and strategists, who have full proof algo system and strategies ready, and also the once who needs end-to-end support in getting their strategies live.'
    },
    {
      title: 'Thought Leader',
      description: 'We are always looking for well informed opinion leaders in the field of equity, commodity, and currency, with expertise in fundamental analysis; looking out for a platform to showcase their capability to the world.'
    },
    {
      title: 'Support Team',
      description: 'Proficient always looks for innovative, energetic and passionate professionals to be part of our ever growing business operation team. If you believe having this in you, come join us and make an impact.'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'callback':
        return (
          <TabContent>
            <SectionTitle>Request Callback</SectionTitle>
            <SectionText>Have an enquiry? leave your details with us and we'll call you back.</SectionText>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Mobile Number"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                />
              </FormGroup>
              
              <Button variant="primary" size="medium" type="submit" style={{ width: '100%' }}>
                Request Callback
              </Button>
            </form>
          </TabContent>
        );
      
      case 'associate':
        return (
          <TabContent>
            <SectionTitle>Associate With Us</SectionTitle>
            <SectionText>Are you a Trader, an Algo Strategist, a Thought leader or a Support Team?</SectionText>
            
            <AssociateGrid>
              {associateTypes.map((type, index) => (
                <AssociateCard key={index}>
                  <h4>{type.title}</h4>
                  <p>{type.description}</p>
                </AssociateCard>
              ))}
            </AssociateGrid>
            
            <h4 style={{ color: theme.colors.navy, marginBottom: theme.spacing.small, fontSize: '16px', fontWeight: theme.typography.fontWeight.bold }}>
              Apply to us
            </h4>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="applyingFor">Applying for?</label>
                <select
                  id="applyingFor"
                  name="applyingFor"
                  value={formData.applyingFor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="trader">Trader</option>
                  <option value="algo-strategist">Algo Strategist</option>
                  <option value="thought-leader">Thought Leader</option>
                  <option value="support-team">Support Team</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label>Upload CV - Only Doc & PDF upto 5MB</label>
                <FileUpload>
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    onChange={handleFileChange}
                  />
                  <div className="file-label">
                    {formData.cv ? formData.cv.name : 'No file chosen - Click to upload'}
                  </div>
                </FileUpload>
              </FormGroup>
              
              <Button variant="primary" size="medium" type="submit" style={{ width: '100%' }}>
                Submit Application
              </Button>
            </form>
          </TabContent>
        );
      
      case 'partner':
        return (
          <TabContent>
            <SectionTitle>Partner With Us</SectionTitle>
            <SectionText>
              Register with us today to grow your business the right way!! Proficient provides an excellent opportunity for the interested business partners to grow and gain from our vast experience in the field. We offer advance robust tools and dedicated support desk for hassle free trading. We want our partners to know that we take full responsibility, today and in the future.
            </SectionText>
            
            <div style={{ marginBottom: theme.spacing.medium }}>
              <h4 style={{ color: theme.colors.navy, marginBottom: theme.spacing.small, fontSize: '16px', fontWeight: theme.typography.fontWeight.bold }}>
                Authorised Person
              </h4>
              <p style={{ color: theme.colors.darkGray, lineHeight: '1.5', fontSize: '14px' }}>
                Register with us today to grow your business the right way!! Proficient provides an excellent opportunity for the interested business partners to grow and gain from our vast experience in the field. We offer advance robust tools, multiple products and dedicated support desk for hassle free trading. From individual to large organisation, we cater to everyone's need with same dedication. We want our partners to know that we offer the best customer service and extensive customization for all their needs, today and in the future.
              </p>
            </div>
            
            <Button variant="primary" size="medium" style={{ width: '100%' }}>
              Become a Partner
            </Button>
          </TabContent>
        );
      
      default:
        return null;
    }
  };

  return (
    <ContactContainer>
      <div className="container">
        <HeroSection>
          <h1>Contact Us</h1>
          <p>We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.</p>
        </HeroSection>

        <AnimatedSection>
          <ContactGrid>
            {contactInfo.map((info, index) => (
              <ContactCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.description}</p>
                <div className="contact-info">{info.contact}</div>
              </ContactCard>
            ))}
          </ContactGrid>
        </AnimatedSection>

        <TabSection>
          <TabContainer>
            <TabButtons>
              <TabButton 
                $active={activeTab === 'callback'} 
                onClick={() => setActiveTab('callback')}
              >
                Request Callback
              </TabButton>
              <TabButton 
                $active={activeTab === 'associate'} 
                onClick={() => setActiveTab('associate')}
              >
                Associate with Us
              </TabButton>
              <TabButton 
                $active={activeTab === 'partner'} 
                onClick={() => setActiveTab('partner')}
              >
                Partner with Us
              </TabButton>
            </TabButtons>
            
            {renderTabContent()}
          </TabContainer>
        </TabSection>
      </div>
    </ContactContainer>
  );
};

export default ContactUs;