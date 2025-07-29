import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const FooterSection = styled.footer`
  background-color: ${theme.colors.navy};
  color: ${theme.colors.white};
  padding: ${theme.spacing.large} 0 ${theme.spacing.medium};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled.a`
  display: inline-block;
  font-size: ${theme.typography.fontSize.subheader};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.small};
  
  span {
    color: ${theme.colors.green};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.lightGray};
  margin-bottom: ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  max-width: 300px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.white};
  transition: all ${theme.transitions.medium};
  
  &:hover {
    background-color: ${theme.colors.green};
    transform: translateY(-3px);
  }
`;

const ColumnTitle = styled.h4`
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.body};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${theme.spacing.micro};
`;

const FooterLinkAnchor = styled.a`
  color: ${theme.colors.lightGray};
  font-size: ${theme.typography.fontSize.small};
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.green};
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: ${theme.spacing.micro};
  margin-bottom: ${theme.spacing.small};
  color: ${theme.colors.lightGray};
  font-size: ${theme.typography.fontSize.small};
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.green};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: ${theme.spacing.medium} 0;
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.lightGray};
  font-size: ${theme.typography.fontSize.small};
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.medium};
`;

const LegalLink = styled.a`
  color: ${theme.colors.lightGray};
  font-size: ${theme.typography.fontSize.small};
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.green};
  }
`;

const AttentionInvestors = styled.div`
  background-color: ${theme.colors.warning};
  color: ${theme.colors.navy};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
  margin-top: ${theme.spacing.medium};
  font-size: ${theme.typography.fontSize.small};
  
  h5 {
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.micro};
  }
  
  p {
    margin-bottom: ${theme.spacing.micro};
  }
`;

// SVG Icons
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.30511 3.09849 2.44756 2.85669 2.63476 2.65163C2.82196 2.44656 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterSection>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <Logo href="/">
              Focus<span>Stock</span>
            </Logo>
            <FooterText>
              Focus Stock Brokers is a SEBI registered stock broker providing innovative trading solutions with a commitment to transparency and customer satisfaction.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLinks>
              <FooterLink>
                <FooterLinkAnchor href="#services">Services</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#about">About Us</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#app">Mobile App</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#testimonials">Testimonials</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#contact">Contact</FooterLinkAnchor>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              <FooterLink>
                <FooterLinkAnchor href="#">Stock Trading</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Mutual Funds</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Advisory Services</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">IPO Investments</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Research Reports</FooterLinkAnchor>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterGrid>
        
        <Divider />
        
        <div style={{backgroundColor: theme.colors.white, border: `1px solid ${theme.colors.lightGray}`, padding: theme.spacing.medium, borderRadius: theme.borderRadius.medium, marginBottom: theme.spacing.medium, boxShadow: theme.shadows.small}}>
          <p style={{color: theme.colors.navy, fontSize: theme.typography.fontSize.body, fontWeight: theme.typography.fontWeight.semiBold, marginBottom: theme.spacing.medium}}>More Links</p>
          <div style={{display: 'flex', gap: theme.spacing.large, alignItems: 'center'}}>
            <div style={{position: 'relative'}} onMouseEnter={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '1'; dropdown.style.visibility = 'visible'; dropdown.style.transform = 'translateY(0)'}}} onMouseLeave={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '0'; dropdown.style.visibility = 'hidden'; dropdown.style.transform = 'translateY(-10px)'}}}>
              <span style={{color: theme.colors.navy, fontSize: theme.typography.fontSize.small, fontWeight: theme.typography.fontWeight.medium, cursor: 'pointer', padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`, display: 'inline-flex', alignItems: 'center', gap: theme.spacing.micro}}>Investor Charter <span style={{fontSize: '10px'}}>▼</span></span>
              <div className="dropdown" style={{opacity: 0, visibility: 'hidden', transform: 'translateY(-10px)', transition: `all ${theme.transitions.medium}`, position: 'absolute', top: '100%', left: 0, backgroundColor: theme.colors.white, padding: theme.spacing.medium, borderRadius: theme.borderRadius.medium, boxShadow: theme.shadows.large, zIndex: 100, minWidth: '250px', border: `1px solid ${theme.colors.lightGray}`, marginTop: theme.spacing.micro}}>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Stock Broker</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Depository Participant</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Details-of-Proficient-Equities Pvt. Ltd</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Details-of-Client-Bank-Accounts</a>
              </div>
            </div>
            <a href="#" style={{color: theme.colors.navy, fontSize: theme.typography.fontSize.small, fontWeight: theme.typography.fontWeight.medium, textDecoration: 'none', padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'}}>Risk Disclosure & Disclaimer</a>
            <div style={{position: 'relative'}} onMouseEnter={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '1'; dropdown.style.visibility = 'visible'; dropdown.style.transform = 'translateY(0)'}}} onMouseLeave={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '0'; dropdown.style.visibility = 'hidden'; dropdown.style.transform = 'translateY(-10px)'}}}>
              <span style={{color: theme.colors.navy, fontSize: theme.typography.fontSize.small, fontWeight: theme.typography.fontWeight.medium, cursor: 'pointer', padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`, display: 'inline-flex', alignItems: 'center', gap: theme.spacing.micro}}>Downloads <span style={{fontSize: '10px'}}>▼</span></span>
              <div className="dropdown" style={{opacity: 0, visibility: 'hidden', transform: 'translateY(-10px)', transition: `all ${theme.transitions.medium}`, position: 'absolute', top: '100%', left: 0, backgroundColor: theme.colors.white, padding: theme.spacing.medium, borderRadius: theme.borderRadius.medium, boxShadow: theme.shadows.large, zIndex: 100, minWidth: '180px', border: `1px solid ${theme.colors.lightGray}`, marginTop: theme.spacing.micro}}>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>FPI</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>NRI Account</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Corporate</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>HUF</a>
              </div>
            </div>
            <div style={{position: 'relative'}} onMouseEnter={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '1'; dropdown.style.visibility = 'visible'; dropdown.style.transform = 'translateY(0)'}}} onMouseLeave={(e) => {const dropdown = e.currentTarget.querySelector('.dropdown'); if(dropdown) {dropdown.style.opacity = '0'; dropdown.style.visibility = 'hidden'; dropdown.style.transform = 'translateY(-10px)'}}}>
              <span style={{color: theme.colors.navy, fontSize: theme.typography.fontSize.small, fontWeight: theme.typography.fontWeight.medium, cursor: 'pointer', padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`, display: 'inline-flex', alignItems: 'center', gap: theme.spacing.micro}}>Membership Documents <span style={{fontSize: '10px'}}>▼</span></span>
              <div className="dropdown" style={{opacity: 0, visibility: 'hidden', transform: 'translateY(-10px)', transition: `all ${theme.transitions.medium}`, position: 'absolute', top: '100%', left: 0, backgroundColor: theme.colors.white, padding: theme.spacing.medium, borderRadius: theme.borderRadius.medium, boxShadow: theme.shadows.large, zIndex: 100, minWidth: '200px', border: `1px solid ${theme.colors.lightGray}`, marginTop: theme.spacing.micro}}>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Assamese</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Bengali</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Hindi</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`, marginBottom: theme.spacing.micro}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>Tamil</a>
                <a href="#" style={{display: 'block', color: theme.colors.darkGray, fontSize: theme.typography.fontSize.small, padding: `${theme.spacing.micro} ${theme.spacing.small}`, borderRadius: theme.borderRadius.small, textDecoration: 'none', transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum; e.target.style.color = theme.colors.navy}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = theme.colors.darkGray}}>More Languages...</a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <ColumnTitle>Regulatory Information</ColumnTitle>
          <ul style={{  padding: 0, margin: 0}}>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Proficient Equities Pvt Ltd – SEBI Regn. No : NSE/BSE – INZ000218531</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>NSE(13475) – Equity/Equity Derivative</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>BSE(4025) – Equity/Equity Derivative</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>CDSL SEBI Registration Number Depository Participant : IN-DP-157-2015</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Mutual Funds Registration Number : AMFI ARN No – 108196 Corporate Identity Number : U65990WB2007PTC259260</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Compliance Officer : Mr. Om Prakash Dalmia (email id: opdalmia@proficientgroup.in)</li>
            <li style={{marginBottom: theme.spacing.micro}}><FooterLinkAnchor href="https://evoting.cdslindia.com/Evoting/EvotingLogin">E-Voting API integration</FooterLinkAnchor></li>
            <li style={{marginBottom: theme.spacing.micro}}><FooterLinkAnchor href="https://scores.gov.in/scores/Welcome.html">Filing complaints on SCORES-Easy & quick</FooterLinkAnchor></li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Corporate Office : 23, R.N Mukherjee Road, BNCCI House, 4th Floor, Kolkata-700001</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Filing of complaints on SCORES-Easy & Quick. Mandatory Details for filing complaints on scores</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Register on the scores portal : Name, PAN, Address, Mobile Number, Email ID</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>Benefits : Effective Communication & Speedy redressal of the grievances</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>For NSE ( click Here)</li>
            <li style={{color: theme.colors.lightGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.micro}}>For BSE ( click Here)</li>
          </ul>
        </div>
        
        <Divider />
        
        <BottomBar>
          <Copyright>
            &copy; {currentYear} Focus Stock Brokers. All rights reserved.
          </Copyright>
          
          <LegalLinks>
            <LegalLink href="#">Terms of Service</LegalLink>
            <LegalLink href="#">Privacy Policy</LegalLink>
            <LegalLink href="#">Refund Policy</LegalLink>
            <LegalLink href="#">Grievance</LegalLink>
          </LegalLinks>
        </BottomBar>
      </Container>
    </FooterSection>
  );
};

export default Footer;