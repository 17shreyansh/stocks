import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import logo from '../../assets/logo1.png';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;

const FooterSection = styled.footer`
  background: linear-gradient(135deg, #1a2b4e 0%, #2c3e50 100%);
  color: ${theme.colors.white};
  padding: 40px 0 20px;
  position: relative;
  margin: 20px 12px 12px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 60px 0 30px;
    margin: 40px 20px 20px;
    border-radius: 24px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
    pointer-events: none;
    border-radius: 16px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      border-radius: 24px;
    }
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

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  font-size: 1.25rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.small};
  text-decoration: none;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.subheader};
  }
  
  img {
    width: 32px;
    height: 32px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      width: 40px;
      height: 40px;
    }
  }
  
  span {
    color: ${theme.colors.green};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.lightGray};
  margin-bottom: ${theme.spacing.small};
  font-size: 0.8rem;
  max-width: 300px;
  line-height: 1.5;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.small};
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(52, 152, 219, 0.1));
  color: ${theme.colors.white};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }
  
  svg {
    width: 16px;
    height: 16px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      width: 18px;
      height: 18px;
    }
  }
  
  &:hover {
    background: linear-gradient(135deg, #3498db, #2980b9);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }
`;

const ColumnTitle = styled.h4`
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.small};
  font-size: 0.9rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.body};
  }
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
  font-size: 0.8rem;
  transition: color ${theme.transitions.fast};
  line-height: 1.4;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
  
  &:hover {
    color: ${theme.colors.green};
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: ${theme.spacing.small};
  color: ${theme.colors.lightGray};
  font-size: 0.8rem;
  line-height: 1.4;
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.micro};
    font-size: ${theme.typography.fontSize.small};
  }
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.green};
    width: 14px;
    height: 14px;
    margin-top: 2px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      width: 16px;
      height: 16px;
    }
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
  font-size: 0.75rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.medium};
  }
`;

const LegalLink = styled.a`
  color: ${theme.colors.lightGray};
  font-size: 0.75rem;
  transition: color ${theme.transitions.fast};
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
  
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
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/footer`);
      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLink = (link) => {
    if (link.type === 'pdf' && link.pdfFile) {
      const baseUrl = API_BASE_URL.split('/api')[0];
      return (
        <FooterLinkAnchor 
          href={`${baseUrl}${link.pdfFile}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {link.text}
        </FooterLinkAnchor>
      );
    }
    return <FooterLinkAnchor href={link.href}>{link.text}</FooterLinkAnchor>;
  };

  if (loading) {
    return (
      <FooterSection>
        <Container>
          <div style={{ textAlign: 'center', padding: '40px 0', color: theme.colors.lightGray }}>
            Loading footer...
          </div>
        </Container>
      </FooterSection>
    );
  }

  if (!footerData) {
    return null;
  }
  
  return (
    <FooterSection>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <Logo href="/">
              <img src={logo} alt={footerData.company?.name || 'Focus Stock Broker Ltd'} />
              Focus<span>Stock</span> Broker Ltd
            </Logo>
            <FooterText>
              {footerData.company?.description || 'Focus Stock Broker Ltd is a SEBI registered stock broker providing innovative trading solutions.'}
            </FooterText>
            <SocialLinks>
              {footerData.socialLinks?.filter(link => link.isActive).map((social, index) => (
                <SocialLink key={index} href={social.url} aria-label={social.platform}>
                  {social.platform === 'facebook' && <FacebookIcon />}
                  {social.platform === 'twitter' && <TwitterIcon />}
                  {social.platform === 'instagram' && <InstagramIcon />}
                  {social.platform === 'linkedin' && <LinkedInIcon />}
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>{footerData.quickLinks1?.heading || 'Quick Links'}</ColumnTitle>
            <FooterLinks>
              {footerData.quickLinks1?.links?.filter(link => link.isActive).map((link, index) => (
                <FooterLink key={index}>
                  {renderLink(link)}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>{footerData.quickLinks2?.heading || 'Resources'}</ColumnTitle>
            <FooterLinks>
              {footerData.quickLinks2?.links?.filter(link => link.isActive).map((link, index) => (
                <FooterLink key={index}>
                  {renderLink(link)}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>{footerData.quickLinks3?.heading || 'Support'}</ColumnTitle>
            <FooterLinks>
              {footerData.quickLinks3?.links?.filter(link => link.isActive).map((link, index) => (
                <FooterLink key={index}>
                  {renderLink(link)}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>{footerData.quickLinks4?.heading || 'Legal'}</ColumnTitle>
            <FooterLinks>
              {footerData.quickLinks4?.links?.filter(link => link.isActive).map((link, index) => (
                <FooterLink key={index}>
                  {renderLink(link)}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterColumn>
        </FooterGrid>
        
        <Divider />
        
        {footerData.moreLinks && (
          <div style={{background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 255, 0.9))', border: '1px solid rgba(52, 152, 219, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)'}}>
            <p style={{color: '#1a2b4e', fontSize: '16px', fontWeight: '600', marginBottom: '12px'}}>{footerData.moreLinks.heading}</p>
            <div className="footer-more-links" style={{display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap'}}>
              {footerData.moreLinks.investorCharter && (
                <a href="/investor-charter" style={{color: theme.colors.navy, fontSize: '12px', fontWeight: theme.typography.fontWeight.medium, textDecoration: 'none', padding: '6px 10px', borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'}}>
                  {footerData.moreLinks.investorCharter.heading}
                </a>
              )}
              {footerData.moreLinks.otherLinks?.filter(link => link.isActive && !link.text.toLowerCase().includes('risk') && !link.text.toLowerCase().includes('disclosure')).map((link, index) => {
                const baseUrl = API_BASE_URL.split('/api')[0];
                return (
                  <a key={index} href={link.type === 'pdf' ? `${baseUrl}${link.pdfFile}` : link.href} target={link.type === 'pdf' ? '_blank' : '_self'} rel={link.type === 'pdf' ? 'noopener noreferrer' : ''} style={{color: theme.colors.navy, fontSize: '12px', fontWeight: theme.typography.fontWeight.medium, textDecoration: 'none', padding: '6px 10px', borderRadius: theme.borderRadius.small, transition: `all ${theme.transitions.fast}`}} onMouseEnter={(e) => {e.target.style.backgroundColor = theme.colors.platinum}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'}}>{link.text}</a>
                );
              })}
            </div>
          </div>
        )}
        
        {footerData.regulatoryInfo && (
          <div>
            <ColumnTitle>{footerData.regulatoryInfo.heading}</ColumnTitle>
            <ul style={{padding: 0, margin: 0}}>
              {footerData.regulatoryInfo.items?.filter(item => item.isActive).map((item, index) => (
                <li key={index} style={{marginBottom: '6px'}}>
                  {item.type === 'link' ? (
                    <FooterLinkAnchor href={item.href}>{item.text}</FooterLinkAnchor>
                  ) : item.type === 'pdf' ? (
                    <FooterLinkAnchor href={`${API_BASE_URL.split('/api')[0]}${item.pdfFile}`} target="_blank" rel="noopener noreferrer">{item.text}</FooterLinkAnchor>
                  ) : (
                    <span style={{color: theme.colors.lightGray, fontSize: '0.7rem', lineHeight: 1.4}}>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Divider />
        
        <BottomBar>
          <Copyright>
            &copy; {footerData.copyright?.year || currentYear} {footerData.copyright?.text || 'Focus Stock Broker Ltd. All rights reserved.'}
          </Copyright>
          
          <LegalLinks>
            {footerData.legalLinks?.filter(link => link.isActive).map((link, index) => (
              <LegalLink key={index} href={link.href}>{link.text}</LegalLink>
            ))}
          </LegalLinks>
        </BottomBar>
      </Container>
    </FooterSection>
  );
};

export default Footer;