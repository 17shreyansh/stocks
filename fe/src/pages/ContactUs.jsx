import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.success} 0%, #0a2d5c 100%);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
    }
  ` : `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%);
    color: ${theme.colors.navy};
    border: 2px solid rgba(52, 152, 219, 0.3);
    backdrop-filter: blur(10px);
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.green} 100%);
      color: ${theme.colors.white};
      border-color: ${theme.colors.green};
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
    }
  `}
  
  &:active {
    transform: translateY(-1px) scale(1.01);
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
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    applyingFor: '',
    cv: null
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contact/public`);
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      // Use default data if API fails
      setPageData({
        hero: {
          title: 'Contact Us',
          subtitle: 'We bring you comprehensive, insightful & up-to-date reports to let you take the right steps towards your financial goals.'
        },
        contactCards: [
          {
            id: 'support',
            icon: 'phone',
            title: 'Customer Support',
            description: 'Our team is dedicated in providing you hassle free experience Mon – Fri (09:00 am – 07:00 pm)',
            contact: 'care@proficientgroup.in',
            type: 'email'
          }
        ],
        tabs: [
          {
            id: 'callback',
            title: 'Request Callback',
            subtitle: 'Have an enquiry? leave your details with us and we\'ll call you back.'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let cvUrl = null;
      
      // Upload CV if present
      if (formData.cv) {
        const cvFormData = new FormData();
        cvFormData.append('document', formData.cv);
        
        try {
          const uploadResponse = await axios.post(`${API_BASE_URL}/upload/pdf`, cvFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          cvUrl = uploadResponse.data.url;
        } catch (uploadError) {
          console.error('CV upload failed:', uploadError);
        }
      }

      // Submit lead with proper formType
      const leadData = {
        formType: type,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        position: type === 'associate' ? formData.applyingFor : undefined,
        cvUrl: cvUrl || undefined
      };

      await axios.post(`${API_BASE_URL}/contact/lead`, leadData);
      
      alert('Thank you for contacting us! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        applyingFor: '',
        cv: null
      });
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getIconComponent = (iconType) => {
    const iconMap = {
      phone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      email: '📧',
      support: '🎧',
      trade: '📈'
    };
    return iconMap[iconType] || '📞';
  };

  if (loading) {
    return (
      <ContactContainer>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div>Loading...</div>
        </div>
      </ContactContainer>
    );
  }

  return (
    <ContactContainer>
      <HeroSection>
        <h1>{pageData?.hero?.title || 'Contact Us'}</h1>
        <p>{pageData?.hero?.subtitle || 'Get in touch with us'}</p>
      </HeroSection>
      
      <div className="container">
        <AnimatedSection style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', color: theme.colors.navy, marginBottom: '16px' }}>Get in Touch</h2>
            <p style={{ fontSize: '18px', color: theme.colors.darkGray, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Choose the best way to reach us for your specific needs</p>
          </div>
          <ContactGrid>
            {pageData?.contactCards?.map((info, index) => (
              <ContactCard
                key={info.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{getIconComponent(info.icon)}</div>
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
            
            <TabContent>
              {activeTab === 'callback' && (
                <div>
                  <SectionTitle>Request Callback</SectionTitle>
                  <SectionText>Have an enquiry? leave your details with us and we'll call you back.</SectionText>
                  <form onSubmit={(e) => handleSubmit(e, 'callback')}>
                    <FormGroup>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
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
                      />
                    </FormGroup>
                    
                    <Button 
                      variant="primary" 
                      size="medium" 
                      type="submit" 
                      style={{ width: '100%' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Request Callback'}
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'associate' && (
                <div>
                  <SectionTitle>Associate With Us</SectionTitle>
                  <SectionText>Join our team of professionals and grow your career with us.</SectionText>
                  
                  <form onSubmit={(e) => handleSubmit(e, 'associate')}>
                    <FormGroup>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
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
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="applyingFor">Applying for?</label>
                      <select
                        id="applyingFor"
                        name="applyingFor"
                        value={formData.applyingFor}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Position</option>
                        <option value="trader">Trader</option>
                        <option value="algo-strategist">Algo Strategist</option>
                        <option value="thought-leader">Thought Leader</option>
                        <option value="support-team">Support Team</option>
                      </select>
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                      />
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
                    
                    <Button 
                      variant="primary" 
                      size="medium" 
                      type="submit" 
                      style={{ width: '100%' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'partner' && (
                <div>
                  <SectionTitle>Partner With Us</SectionTitle>
                  <SectionText>Register with us today to grow your business the right way!</SectionText>
                  
                  <form onSubmit={(e) => handleSubmit(e, 'partner')}>
                    <FormGroup>
                      <label htmlFor="partnerName">Name</label>
                      <input
                        type="text"
                        id="partnerName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="partnerEmail">Email</label>
                      <input
                        type="email"
                        id="partnerEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="partnerPhone">Phone Number</label>
                      <input
                        type="tel"
                        id="partnerPhone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your Mobile Number"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="partnerMessage">Message</label>
                      <textarea
                        id="partnerMessage"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message"
                      />
                    </FormGroup>
                    
                    <Button 
                      variant="primary" 
                      size="medium" 
                      type="submit" 
                      style={{ width: '100%' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              )}
            </TabContent>
          </TabContainer>
        </TabSection>
      </div>
    </ContactContainer>
  );
};

export default ContactUs;