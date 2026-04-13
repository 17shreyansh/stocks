import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import Button from '../Button';
import logo from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL ;



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
  padding: 8px 20px;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  outline: none;
  border: none;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:focus {
    outline: none;
    border: none;
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

const NavLink = styled(Link)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${theme.colors.darkGray};
  transition: all 0.2s ease;
  padding: 8px 0;
  margin: 0 20px;
  position: relative;
  outline: none;
  border: none;
  
  &:hover {
    color: ${theme.colors.navy};
  }
  
  &:focus {
    outline: none;
    border: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.$isActive ? '#3498db' : theme.colors.green};
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
  outline: none;
  border: none;
  
  &:hover {
    background-color: ${props => props.$isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
    color: ${theme.colors.green};
  }
  
  &:focus {
    outline: none;
    border: none;
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

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${theme.zIndex.modal};
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background: ${theme.colors.white};
  z-index: ${theme.zIndex.modal + 1};
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${theme.colors.lightGray};
  background: ${theme.colors.white};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.platinum};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${theme.colors.darkGray};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.lightGray};
    color: ${theme.colors.navy};
  }
`;

const MobileNavSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const MobileNavGroup = styled.div`
  margin-bottom: 32px;
`;

const MobileNavGroupTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.mediumGray};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding-left: 4px;
`;

const MobileNavLink = styled(motion(Link))`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.navy};
  padding: 12px 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  outline: none;
  border: none;
  
  &:hover {
    color: ${theme.colors.green};
    background: ${theme.colors.platinum};
    transform: translateX(4px);
  }
  
  &:focus {
    outline: none;
    border: none;
  }
  
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background: ${theme.colors.green};
    border-radius: 50%;
    margin-right: 12px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
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
  const [navbarData, setNavbarData] = useState(null);

  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/navbar`);
      if (response.ok) {
        const data = await response.json();
        setNavbarData(data);
      }
    } catch (error) {
      console.error('Failed to fetch navbar data:', error);
    }
  };
  
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
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
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
        className="header-container a11y-keep"
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
          <Logo to="/">
            <img src={logo} style={{ height: '60px', width: 'auto' }} alt="Focus Stock Broker Ltd" />
            <img src={logo2} style={{ height: '36px', width: 'auto', marginLeft: '4px' }} alt="" />



          </Logo>
          
          <Nav className="header-nav">
            {navbarData?.mainNavigation?.filter(item => item.isActive).sort((a, b) => a.order - b.order).map((item, index) => (
              <NavLink 
                key={index}
                to={item.href} 
                $isScrolled={isScrolled} 
                $isActive={window.location.pathname === item.href || window.location.hash === item.href}
              >
                {item.text}
              </NavLink>
            ))}
          </Nav>
          
          <ButtonContainer className="header-button">
            {navbarData?.buttons?.openAccount?.isActive && (
              <Link to={navbarData.buttons.openAccount.href} style={{textDecoration: 'none'}}>
                <Button variant="secondary" size="medium">{navbarData.buttons.openAccount.text}</Button>
              </Link>
            )}
            {navbarData?.buttons?.login?.isActive && (
              <DropdownContainer
                onMouseEnter={() => setIsLoginDropdownOpen(true)}
                onMouseLeave={() => setIsLoginDropdownOpen(false)}
              >
                <Button variant="primary" size="medium">{navbarData.buttons.login.text}</Button>
                <AnimatePresence>
                  {isLoginDropdownOpen && (
                    <DropdownMenu
                      $isScrolled={isScrolled}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {navbarData?.loginDropdown?.filter(item => item.isActive).sort((a, b) => a.order - b.order).map((item, index) => (
                        <DropdownItem key={index} href={item.href} $isScrolled={isScrolled}>{item.text}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </DropdownContainer>
            )}
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
          <>
            <MobileMenuOverlay
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <MobileMenuHeader>
                <Logo to="/">
                  <img src={logo} style={{ height: '48px', width: 'auto' }} alt="Focus Stock Broker Ltd" />
                  <img src={logo2} style={{ height: '30px', width: 'auto', marginLeft: '3px' }} alt="" />
                </Logo>
                <CloseButton 
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </CloseButton>
              </MobileMenuHeader>
              
              <MobileNavSection>
                <MobileNavGroup>
                  <MobileNavGroupTitle>Navigation</MobileNavGroupTitle>
                  {navbarData?.mainNavigation?.filter(item => item.isActive).sort((a, b) => a.order - b.order).map((item, index) => (
                    <MobileNavLink 
                      key={index}
                      to={item.href} 
                      variants={mobileNavItemVariants}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.text}
                    </MobileNavLink>
                  ))}
                  {navbarData?.buttons?.openAccount?.isActive && (
                    <MobileNavLink 
                      to={navbarData.buttons.openAccount.href} 
                      variants={mobileNavItemVariants}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navbarData.buttons.openAccount.text}
                    </MobileNavLink>
                  )}
                </MobileNavGroup>
                
                {navbarData?.buttons?.login?.isActive && (
                  <MobileNavGroup>
                    <MobileNavGroupTitle>Login Options</MobileNavGroupTitle>
                    {navbarData?.loginDropdown?.filter(item => item.isActive).sort((a, b) => a.order - b.order).map((item, index) => (
                      <MobileNavLink 
                        key={index}
                        to={item.href} 
                        variants={mobileNavItemVariants}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.text}
                      </MobileNavLink>
                    ))}
                  </MobileNavGroup>
                )}
              </MobileNavSection>
              

            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;