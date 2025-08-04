import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Button from '../Button';
import logo from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';



const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 16px;
  left: 50%;
  z-index: ${theme.zIndex.sticky};
  background: ${theme.colors.white};
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  width: calc(100% - 20px);
  
  @media (max-width: 768px) {
    width: calc(100% - 16px);
    top: 12px;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  
  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    transition: all 0.3s ease;
  }
`;

const Nav = styled.nav`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const NavLink = styled.a`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.darkGray};
  transition: all 0.2s ease;
  padding: 8px 0;
  margin: 0 20px;
  position: relative;
  
  &:hover {
    color: ${theme.colors.navy};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.green};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.$isScrolled ? theme.colors.navy : 'white'};
  border-radius: 8px;
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.small};
  min-width: 200px;
  z-index: ${theme.zIndex.dropdown};
`;

const DropdownItem = styled.a`
  display: block;
  padding: ${theme.spacing.small};
  color: ${props => props.$isScrolled ? theme.colors.white : theme.colors.navy};
  text-decoration: none;
  border-radius: 4px;
  transition: background-color ${theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.$isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
    color: ${theme.colors.green};
  }
`;

const ButtonContainer = styled.div`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 12px;
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
  color: ${theme.colors.darkGray};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.navy};
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26, 43, 78, 0.95), rgba(44, 62, 80, 0.95));
  backdrop-filter: blur(20px);
  z-index: ${theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 120px 20px 20px;
`;

const MobileMenuHeader = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  z-index: 10;
`;

const MobileLinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
`;

const MobileNavLink = styled(motion.a)`
  font-size: 16px;
  font-weight: 500;
  color: white;
  padding: 16px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    color: white;
    background: linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.navy});
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }
`;

const MobileButtonContainer = styled(motion.div)`
  margin-top: 24px;
  width: 100%;
  max-width: 250px;
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

const Header = ({ startAnimation: shouldStartAnimation = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  
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

  // Start animation when prop changes
  useEffect(() => {
    if (shouldStartAnimation) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldStartAnimation]);
  
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
        className="header-container"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: startAnimation ? 0 : -100, 
          x: "-50%",
          opacity: startAnimation ? 1 : 0
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        style={{
          background: theme.colors.white,
          boxShadow: isScrolled 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            : 'none'
        }}
      >
        <HeaderInner>
          <Logo href="/">
            <img src={logo} style={{ height: '40px', width: 'auto' }} alt="Focus Stock" />
            <img src={logo2} style={{ height: '24px', width: 'auto', marginLeft: '8px' }} alt="" />



          </Logo>
          
          <Nav className="header-nav">
            <NavLink href="#home" $isScrolled={isScrolled}>Home</NavLink>
            <NavLink href="#services" $isScrolled={isScrolled}>Service</NavLink>
            <NavLink href="#pricing" $isScrolled={isScrolled}>Pricing</NavLink>
            <NavLink href="#about" $isScrolled={isScrolled}>About Us</NavLink>
            <NavLink href="#contact" $isScrolled={isScrolled}>Contact Us</NavLink>
          </Nav>
          
          <ButtonContainer className="header-button">
            <DropdownContainer
              onMouseEnter={() => setIsLoginDropdownOpen(true)}
              onMouseLeave={() => setIsLoginDropdownOpen(false)}
            >
              <Button variant="primary" size="medium">Login</Button>
              <AnimatePresence>
                {isLoginDropdownOpen && (
                  <DropdownMenu
                    $isScrolled={isScrolled}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem href="#backoffice" $isScrolled={isScrolled}>Backoffice Login</DropdownItem>
                    <DropdownItem href="#trading" $isScrolled={isScrolled}>Online Trading</DropdownItem>
                    <DropdownItem href="#mutual-funds" $isScrolled={isScrolled}>Mutual Funds</DropdownItem>
                    <DropdownItem href="#dp-login" $isScrolled={isScrolled}>DP Login</DropdownItem>
                    <DropdownItem href="#branch" $isScrolled={isScrolled}>Branch Login</DropdownItem>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </DropdownContainer>
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
              <Logo href="/" style={{ color: 'white' }}>
                Focus<span style={{ color: '#3498db' }}>Stock</span>
              </Logo>
              <MobileMenuButton 
                $isScrolled={false}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </MobileMenuButton>
            </MobileMenuHeader>
            
            <MobileLinksGrid>
              <MobileNavLink 
                href="#home" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink 
                href="#services" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Service
              </MobileNavLink>
              <MobileNavLink 
                href="#pricing" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </MobileNavLink>
              <MobileNavLink 
                href="#about" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </MobileNavLink>
              <MobileNavLink 
                href="#contact" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </MobileNavLink>
              <MobileNavLink 
                href="#backoffice" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Backoffice
              </MobileNavLink>
              <MobileNavLink 
                href="#trading" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trading
              </MobileNavLink>
              <MobileNavLink 
                href="#mutual-funds" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mutual Funds
              </MobileNavLink>
              <MobileNavLink 
                href="#dp-login" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DP Login
              </MobileNavLink>
              <MobileNavLink 
                href="#branch" 
                variants={mobileNavItemVariants}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Branch
              </MobileNavLink>
            </MobileLinksGrid>
            
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