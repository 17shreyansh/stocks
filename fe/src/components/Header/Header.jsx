import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Button from '../Button';
import logo from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';



const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  padding: ${theme.spacing.small} 0;
  transition: all ${theme.transitions.medium};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  font-size: ${theme.typography.fontSize.subheader};
  font-weight: ${theme.typography.fontWeight.bold};
  transition: color ${theme.transitions.medium};
  
  span {
    color: ${theme.colors.green};
  }
`;

const Nav = styled.nav`
  display: none;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.medium};
  }
`;

const NavLink = styled.a`
  position: relative;
  font-size: ${theme.typography.fontSize.body};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${ theme.colors.navy };
  transition: color ${theme.transitions.medium};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.green};
    transition: width ${theme.transitions.medium};
  }
  
  &:hover {
    color: ${theme.colors.green};
    
    &:after {
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: none;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.$isScrolled ? theme.colors.navy : theme.colors.white};
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.navy};
  z-index: ${theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.large};
`;

const MobileMenuHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.small} ${theme.spacing.small};
`;

const MobileNavLink = styled(motion.a)`
  font-size: ${theme.typography.fontSize.header};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.medium};
  transition: color ${theme.transitions.medium};
  
  &:hover {
    color: ${theme.colors.green};
  }
`;

const MobileButtonContainer = styled(motion.div)`
  margin-top: ${theme.spacing.medium};
`;

// SVG Icons
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };
  
  const mobileNavItemVariants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: {
      opacity: 1,
      y: 0
    }
  };
  
  return (
    <>
      <HeaderContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? theme.shadows.small : 'none'
        }}
      >
        <HeaderInner>
          <Logo href="/">
            <img src={logo} style={{ height: '50px', width: 'auto' }} alt="" />
            <img src={logo2} style={{ height: '30px', width: 'auto', marginLeft: '10px' }} alt="" />



          </Logo>
          
          <Nav>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#app">Mobile App</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </Nav>
          
          <ButtonContainer>
            <Button variant="primary" size="medium">Open Account</Button>
          </ButtonContainer>
          
          <MobileMenuButton 
            $isScrolled={isScrolled}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </MobileMenuButton>
        </HeaderInner>
      </HeaderContainer>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <MobileMenuHeader>
              <Logo href="/">
                Focus<span>Stock</span>
              </Logo>
              <MobileMenuButton 
                $isScrolled={false}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </MobileMenuButton>
            </MobileMenuHeader>
            
            <MobileNavLink 
              href="#services" 
              variants={mobileNavItemVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </MobileNavLink>
            <MobileNavLink 
              href="#about" 
              variants={mobileNavItemVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </MobileNavLink>
            <MobileNavLink 
              href="#app" 
              variants={mobileNavItemVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mobile App
            </MobileNavLink>
            <MobileNavLink 
              href="#testimonials" 
              variants={mobileNavItemVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </MobileNavLink>
            <MobileNavLink 
              href="#contact" 
              variants={mobileNavItemVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </MobileNavLink>
            
            <MobileButtonContainer variants={mobileNavItemVariants}>
              <Button variant="primary" size="large" fullWidth={true}>
                Open Account
              </Button>
            </MobileButtonContainer>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;