import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';
import Button from '../Button';
import { submitContactForm } from '../../utils/contactAPI';
import axios from '../../utils/axios';


gsap.registerPlugin(ScrollTrigger);

// Component Data Constants
const CONTACT_DATA = {
  title: "Get in Touch",
  subtitle: "Ready to start your investment journey? Our team of experts is here to help you make informed decisions.",
  form: {
    submitText: "Submit Inquiry",
    successMessage: "Thank you for contacting us! We'll get back to you shortly.",
    socialProof: "Join 500+ investors who contacted us this month"
  },
  contactInfo: {
    title: "Contact Information",
    description: "Our team of experts is ready to assist you with any questions about our services or how to get started with investing.",
    details: [
      { icon: "location", text: "Focus Tower, 123 Financial District, Mumbai 400001, India" },
      { icon: "phone", text: "+91 22 1234 5678" },
      { icon: "email", text: "support@focusstockbroker.com" },
      { icon: "clock", text: "Monday - Friday: 9:00 AM - 6:00 PM" }
    ]
  },
  team: {
    title: "Meet Our Team",
    members: [
      { name: "Rahul Kumar", role: "Senior Investment Advisor", initials: "RK" },
      { name: "Sanjay Mehta", role: "Client Relationship Manager", initials: "SM" },
      { name: "Anita Patel", role: "Research Analyst", initials: "AP" },
      { name: "Vikram Gupta", role: "Technical Support", initials: "VG" }
    ]
  }
};

const ContactSection = styled.section`
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f8ff 100%);
  padding: ${theme.spacing.xl} 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xxl} 0;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(30, 58, 138, 0.08));
  pointer-events: none;
  
  &:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  
  &:nth-child(2) {
    top: 20%;
    right: 15%;
  }
  
  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  position: relative;
  z-index: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.body};
  color: ${theme.colors.mediumGray};
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.subheader};
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${theme.spacing.large};
  }
`;

const FormColumn = styled.div`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-right: ${theme.spacing.medium};
  }
`;

const InfoColumn = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.08);
  
  @media (min-width: ${theme.breakpoints.md}) {
    margin-left: ${theme.spacing.medium};
    padding: ${theme.spacing.large};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.large};
  }
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
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

const FormInput = styled.input`
  padding: ${theme.spacing.small};
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  transition: all ${theme.transitions.fast};
  background: ${theme.colors.white};
  min-height: 44px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 16px;
    padding: 12px;
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.blue};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 25px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: ${theme.colors.blue};
    transform: translateY(-1px);
  }
`;

const FormTextarea = styled.textarea`
  padding: ${theme.spacing.small};
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  min-height: 120px;
  resize: vertical;
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  background: ${theme.colors.white};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 16px;
    padding: 12px;
    min-height: 100px;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    min-height: 150px;
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.blue};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 25px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: ${theme.colors.blue};
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.small};
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, ${theme.colors.blue}, ${theme.colors.navy});
  color: ${theme.colors.white};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: ${theme.spacing.small};
  text-align: center;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
`;

const SocialProof = styled.div`
  margin-top: ${theme.spacing.small};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
  padding: ${theme.spacing.small};
  background: rgba(59, 130, 246, 0.05);
  border-radius: ${theme.borderRadius.medium};
`;

const InfoTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  font-size: 1.25rem;
  font-weight: 600;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const InfoText = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.medium};
  line-height: 1.6;
  font-size: 0.9rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
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
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8px;
    gap: 8px;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.05);
    transform: translateX(8px);
  }
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.blue};
    margin-top: 4px;
    transition: transform ${theme.transitions.fast};
    width: 20px;
    height: 20px;
    
    @media (max-width: ${theme.breakpoints.sm}) {
      width: 18px;
      height: 18px;
    }
  }
  
  &:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ContactInfoText = styled.div`
  color: ${theme.colors.darkGray};
  font-size: 0.9rem;
  line-height: 1.4;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const MapContainer = styled.div`
  height: 200px;
  border-radius: ${theme.borderRadius.large};
  overflow: hidden;
  margin-top: ${theme.spacing.medium};
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.1);
  
  @media (min-width: ${theme.breakpoints.md}) {
    height: 300px;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const TeamSection = styled.div`
  margin-top: ${theme.spacing.large};
`;

const TeamMembers = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8px;
    gap: 8px;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.05);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
  }
`;

const TeamMemberImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  position: relative;
  overflow: hidden;
  transition: transform ${theme.transitions.fast};
  flex-shrink: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: 0.75rem;
  z-index: 10;
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 50px;
    height: 50px;
    font-size: ${theme.typography.fontSize.small};
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

const TeamMemberInfo = styled.div``;

const TeamMemberName = styled.div`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  font-size: 0.9rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const TeamMemberRole = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.mediumGray};
  line-height: 1.3;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
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

const Contact = ({ data: propData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await axios.get('/contactSection/homepage');
      if (response.data.success && response.data.data) {
        setContactData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    const team = teamRef.current;

    // Main title animation
    gsap.fromTo(title, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo(form.children,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Info section animation
    gsap.fromTo(info.children,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: info,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Team members animation
    if (team) {
      gsap.fromTo(team.querySelectorAll('[data-team-member]'),
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: team,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Floating elements animation
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-180, 180)",
      duration: "random(4, 8)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const leadData = {
          ...formData,
          formType: 'homepage'
        };
        await submitContactForm(leadData);
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
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };
  
  return (
    <ContactSection id="contact" ref={sectionRef}>
      <FloatingElement className="floating-element" />
      <FloatingElement className="floating-element" />
      <FloatingElement className="floating-element" />
      
      <Container>
        <SectionHeader>
          <SectionTitle ref={titleRef}>
            {propData?.title || contactData?.title || CONTACT_DATA.title}
          </SectionTitle>
          <SectionSubtitle>
            {propData?.subtitle || contactData?.subtitle || CONTACT_DATA.subtitle}
          </SectionSubtitle>
        </SectionHeader>
        
        <ContentWrapper>
          <FormColumn ref={formRef}>
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {propData?.form?.successMessage || contactData?.form?.successMessage || CONTACT_DATA.form.successMessage}
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
                {propData?.form?.submitText || contactData?.form?.submitText || CONTACT_DATA.form.submitText}
              </Button>
            </ContactForm>
            
            <SocialProof>
              <UserIcon />
              {propData?.form?.socialProof || contactData?.form?.socialProof || CONTACT_DATA.form.socialProof}
            </SocialProof>
          </FormColumn>
          
          <InfoColumn ref={infoRef}>
            <InfoTitle>{propData?.contactInfo?.title || contactData?.contactInfo?.title || CONTACT_DATA.contactInfo.title}</InfoTitle>
            <InfoText>
              {propData?.contactInfo?.description || contactData?.contactInfo?.description || CONTACT_DATA.contactInfo.description}
            </InfoText>
            
            <ContactInfoList>
              {(propData?.contactInfo?.details || contactData?.contactInfo?.details || CONTACT_DATA.contactInfo.details).map((detail, index) => {
                const IconComponent = {
                  location: LocationIcon,
                  phone: PhoneIcon,
                  email: EmailIcon,
                  clock: ClockIcon
                }[detail.icon];
                return (
                  <ContactInfoItem key={index}>
                    <IconComponent />
                    <ContactInfoText>
                      {detail.text}
                    </ContactInfoText>
                  </ContactInfoItem>
                );
              })}
            </ContactInfoList>
            
            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13596.0!2d77.186464!3d28.6608505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02825f1de7d7%3A0xd1bd5dbabeaa75aa!2sFOCUS%20STOCK%20BROKERS%20LTD!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Focus Stock Brokers Ltd Office Location"
              />
            </MapContainer>
            
            <TeamSection ref={teamRef}>
              <InfoTitle>{propData?.team?.title || contactData?.team?.title || CONTACT_DATA.team.title}</InfoTitle>
              <TeamMembers>
                {(propData?.team?.members || contactData?.team?.members || CONTACT_DATA.team.members).map((member, index) => {
                  const initials = member.name?.split(' ').map(n => n[0]).join('').toUpperCase() || member.initials;
                  return (
                    <TeamMember key={index} data-team-member>
                      <TeamMemberImage>{initials}</TeamMemberImage>
                      <TeamMemberInfo>
                        <TeamMemberName>{member.name}</TeamMemberName>
                        <TeamMemberRole>{member.role}</TeamMemberRole>
                      </TeamMemberInfo>
                    </TeamMember>
                  );
                })}
              </TeamMembers>
            </TeamSection>
          </InfoColumn>
        </ContentWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact;