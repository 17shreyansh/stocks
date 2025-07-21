import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { theme } from '../../styles/theme';
import Button from '../Button';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ContactSection = styled.section`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.large} 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const SectionTitle = styled(motion.h2)`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.subheader};
  color: ${theme.colors.mediumGray};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const FormColumn = styled(motion.div)`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-right: ${theme.spacing.medium};
  }
`;

const InfoColumn = styled(motion.div)`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing.medium};
    border-left: 1px solid ${theme.colors.lightGray};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.micro};
`;

const FormLabel = styled.label`
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
`;

const FormInput = styled.input`
  padding: ${theme.spacing.small};
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  padding: ${theme.spacing.small};
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  min-height: 150px;
  resize: vertical;
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.small};
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${theme.colors.success};
  color: ${theme.colors.white};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: ${theme.spacing.small};
  text-align: center;
`;

const SocialProof = styled.div`
  margin-top: ${theme.spacing.small};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
`;

const InfoTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
`;

const InfoText = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.medium};
`;

const ContactInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.medium};
`;

const ContactInfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.green};
    margin-top: 4px;
  }
`;

const ContactInfoText = styled.div`
  color: ${theme.colors.darkGray};
`;

const MapContainer = styled.div`
  height: 250px;
  background-color: ${theme.colors.platinum};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  margin-top: ${theme.spacing.medium};
  
  /* Placeholder for actual map */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.navy};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const TeamSection = styled.div`
  margin-top: ${theme.spacing.large};
`;

const TeamMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.small};
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
`;

const TeamMemberImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.lightGray};
  
  /* Placeholder for actual image */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.navy};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.small};
`;

const TeamMemberInfo = styled.div``;

const TeamMemberName = styled.div`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
`;

const TeamMemberRole = styled.div`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
`;

// SVG Icons
const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.30511 3.09849 2.44756 2.85669 2.63476 2.65163C2.82196 2.44656 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 14V12.6667C13.3333 11.9594 13.0524 11.2811 12.5523 10.781C12.0522 10.281 11.3739 10 10.6667 10H5.33333C4.62609 10 3.94781 10.281 3.44771 10.781C2.94762 11.2811 2.66666 11.9594 2.66666 12.6667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.00001 7.33333C9.47277 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47277 2 8.00001 2C6.52725 2 5.33334 3.19391 5.33334 4.66667C5.33334 6.13943 6.52725 7.33333 8.00001 7.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true 
  });
  
  // Animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/i.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        investment: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };
  
  // Variants for animations
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            Get in Touch
          </SectionTitle>
          <SectionSubtitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            Have questions? Our team is here to help you start your investment journey
          </SectionSubtitle>
        </SectionHeader>
        
        <ContentWrapper>
          <FormColumn
            initial="hidden"
            animate={controls}
            variants={columnVariants}
          >
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Thank you for contacting us! We'll get back to you shortly.
              </SuccessMessage>
            )}
            
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email address"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="investment">Investment Amount (₹)</FormLabel>
                <FormInput
                  type="text"
                  id="investment"
                  name="investment"
                  value={formData.investment}
                  onChange={handleChange}
                  placeholder="Enter your investment amount"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="message">Message (Optional)</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your investment goals"
                />
              </FormGroup>
              
              <Button type="submit" variant="primary" size="large">
                Submit Inquiry
              </Button>
            </ContactForm>
            
            <SocialProof>
              <UserIcon />
              Join 500+ investors who contacted us this month
            </SocialProof>
          </FormColumn>
          
          <InfoColumn
            initial="hidden"
            animate={controls}
            variants={columnVariants}
          >
            <InfoTitle>Contact Information</InfoTitle>
            <InfoText>
              Our team of experts is ready to assist you with any questions about our services or how to get started with investing.
            </InfoText>
            
            <ContactInfoList>
              <ContactInfoItem>
                <LocationIcon />
                <ContactInfoText>
                  Focus Tower, 123 Financial District, Mumbai 400001, India
                </ContactInfoText>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <PhoneIcon />
                <ContactInfoText>
                  +91 22 1234 5678
                </ContactInfoText>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <EmailIcon />
                <ContactInfoText>
                  support@focusstock.com
                </ContactInfoText>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ClockIcon />
                <ContactInfoText>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </ContactInfoText>
              </ContactInfoItem>
            </ContactInfoList>
            
            <MapContainer>
              Map Location
            </MapContainer>
            
            <TeamSection>
              <InfoTitle>Meet Our Team</InfoTitle>
              <TeamMembers>
                <TeamMember>
                  <TeamMemberImage>RK</TeamMemberImage>
                  <TeamMemberInfo>
                    <TeamMemberName>Rahul Kumar</TeamMemberName>
                    <TeamMemberRole>Senior Investment Advisor</TeamMemberRole>
                  </TeamMemberInfo>
                </TeamMember>
                
                <TeamMember>
                  <TeamMemberImage>SM</TeamMemberImage>
                  <TeamMemberInfo>
                    <TeamMemberName>Sanjay Mehta</TeamMemberName>
                    <TeamMemberRole>Client Relationship Manager</TeamMemberRole>
                  </TeamMemberInfo>
                </TeamMember>
                
                <TeamMember>
                  <TeamMemberImage>AP</TeamMemberImage>
                  <TeamMemberInfo>
                    <TeamMemberName>Anita Patel</TeamMemberName>
                    <TeamMemberRole>Research Analyst</TeamMemberRole>
                  </TeamMemberInfo>
                </TeamMember>
                
                <TeamMember>
                  <TeamMemberImage>VG</TeamMemberImage>
                  <TeamMemberInfo>
                    <TeamMemberName>Vikram Gupta</TeamMemberName>
                    <TeamMemberRole>Technical Support</TeamMemberRole>
                  </TeamMemberInfo>
                </TeamMember>
              </TeamMembers>
            </TeamSection>
          </InfoColumn>
        </ContentWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact;