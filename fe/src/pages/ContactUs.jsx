import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: ${theme.colors.platinum};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.darkNavy} 100%);
  color: white;
  padding: 100px 40px;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
  
  h1 {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    
    @media (max-width: 768px) {
      font-size: 36px;
    }
  }
  
  p {
    font-size: 20px;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    opacity: 0.9;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ContactCard = styled(motion.div)`
  background: white;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  padding: 32px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: ${theme.colors.green};
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }
  
  .icon {
    width: 48px;
    height: 48px;
    background: ${theme.colors.navy};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    font-size: 20px;
    color: ${theme.colors.white};
  }
  
  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${theme.colors.navy};
    margin-bottom: 12px;
  }
  
  .description {
    color: ${theme.colors.darkGray};
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .contact-info {
    color: ${theme.colors.green};
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    &:hover {
      color: ${theme.colors.success};
      text-decoration: underline;
    }
  }
`;

const TabSection = styled(AnimatedSection)`
  padding: ${theme.spacing.xl} 0;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  transition: all ${theme.transitions.medium};
  gap: ${theme.spacing.micro};
  font-size: ${theme.typography.fontSize.body};
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.medium};
  
  ${props => props.$active ? `
    background: linear-gradient(135deg, ${theme.colors.green} 0%, ${theme.colors.success} 100%);
    color: ${theme.colors.white};
    border: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.success} 0%, #0a2d5c 100%);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
      
      &::before {
        left: 100%;
      }
    }
  ` : `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%);
    color: ${theme.colors.navy};
    border: 2px solid rgba(52, 152, 219, 0.3);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.green} 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      color: ${theme.colors.white};
      border-color: ${theme.colors.green};
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
  `}
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
`;

const TabContent = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      title: 'Customer Support',
      description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'care@proficientgroup.in',
      type: 'email'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      title: 'Call & Trade',
      description: 'Call in for your trade execution or modifying pending orders Mon – Fri (09:00 am – 07:00 pm)',
      contact: '033 40266-315/316/317',
      type: 'phone'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      ),
      title: 'Account Opening & General Queries',
      description: 'Call us to open an account & to know more about our services Mon – Fri (09:00 am – 07:00 pm)',
      contact: 'communication@proficientgroup.in',
      type: 'email'
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
      <HeroSection>
        <h1>Contact Us</h1>
        <p>We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.</p>
      </HeroSection>
      
      <div className="container">

        <AnimatedSection style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', color: theme.colors.navy, marginBottom: '16px' }}>Get in Touch</h2>
            <p style={{ fontSize: '18px', color: theme.colors.darkGray, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Choose the best way to reach us for your specific needs</p>
          </div>
          <ContactGrid>
            {contactInfo.map((info, index) => (
              <ContactCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="description">{info.description}</p>
                {info.type === 'email' ? (
                  <a href={`mailto:${info.contact}`} className="contact-info">
                    {info.contact}
                  </a>
                ) : (
                  <a href={`tel:${info.contact.replace(/[^0-9]/g, '')}`} className="contact-info">
                    {info.contact}
                  </a>
                )}
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