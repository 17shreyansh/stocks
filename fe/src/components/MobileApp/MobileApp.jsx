import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';
import axios from '../../utils/axios';

gsap.registerPlugin(ScrollTrigger);

// Component Data Constants
const MOBILE_APP_DATA = {
  trading: {
    title: "Trading App",
    description: "Professional trading platform with real-time market data, advanced charting, and instant execution.",
    features: [
      { title: 'Real-time Charts', description: 'Advanced technical analysis with live market data' },
      { title: 'Quick Trading', description: 'One-tap buy/sell with instant order execution' },
      { title: 'Dark Mode UI', description: 'Glassmorphism design optimized for trading' },
      { title: 'Portfolio Tracking', description: 'Real-time P&L and position monitoring' }
    ],
    rating: "4.8 • 50K+ downloads",
    downloadTitle: "Download Now"
  },
  mutualFunds: {
    title: "Mutual Funds App",
    description: "Simplified investing with curated mutual funds, SIP automation, and educational resources.",
    features: [
      { title: 'SIP Automation', description: 'Set up systematic investment plans effortlessly' },
      { title: 'Portfolio Overview', description: 'Clean dashboard with performance insights' },
      { title: 'Educational Cards', description: 'Learn investing basics with interactive content' },
      { title: 'Goal Planning', description: 'Plan investments for life goals' }
    ],
    rating: "4.9 • 75K+ downloads",
    downloadTitle: "Download Now"
  },
  storeButtons: [
    { type: 'apple', text: 'Download on the', name: 'App Store' },
    { type: 'google', text: 'Get it on', name: 'Google Play' }
  ]
};

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const AppSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 25%, #f0f8ff 50%, #e6f3ff 75%, #f5f9ff 100%);
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: auto;
    min-height: 90vh;
  }
`;

const MobileNavbar = styled.div`
  display: none;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    gap: ${theme.spacing.small};
    padding: ${theme.spacing.medium};
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: ${theme.borderRadius.large};
    margin: ${theme.spacing.medium};
    box-shadow: ${theme.shadows.medium};
    position: sticky;
    top: 80px;
    z-index: 10;
  }
`;

const NavButton = styled.button`
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border: 2px solid ${props => props.$active ? theme.colors.green : theme.colors.lightGray};
  background: ${props => props.$active ? theme.colors.green : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.navy};
  border-radius: ${theme.borderRadius.pill};
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  flex: 1;
  
  &:hover {
    border-color: ${theme.colors.green};
    background: ${props => props.$active ? theme.colors.green : theme.colors.platinum};
  }
`;

const ParallaxContainer = styled.div`
  position: sticky;
  top: 0;
  height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    position: relative;
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    padding: 60px 0;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 200vw;
  height: 90vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100vw;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, ${theme.colors.green} 20%, ${theme.colors.navy} 50%, ${theme.colors.gold} 80%, transparent 100%);
    z-index: 1;
    opacity: 0.3;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    width: 100vw;
    height: auto;
    gap: ${theme.spacing.xl};
    
    &::before {
      display: none;
    }
  }
`;

const AppSlide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing.medium};
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    height: auto;
    min-height: 90vh;
    padding: ${theme.spacing.large} ${theme.spacing.small};
  }
`;

const AppContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
  
  &.reverse {
    flex-direction: row-reverse;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column !important;
    gap: ${theme.spacing.large};
    text-align: center;
  }
`;

const PhoneMockup = styled.div`
  position: relative;
  width: 280px;
  height: 580px;
  flex-shrink: 0;
  z-index: 3;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 260px;
    height: 540px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 240px;
    height: 500px;
  }
`;

const PhoneFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 42px;
  padding: 8px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 38px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    pointer-events: none;
  }
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 34px;
  overflow: hidden;
  position: relative;
  background: #000;
`;

const TradingScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
`;

const MutualFundsScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
`;

const TradingHeader = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TradingChart = styled.div`
  height: 35%;
  margin: ${theme.spacing.small};
  background: rgba(0, 119, 255, 0.1);
  border-radius: ${theme.borderRadius.medium};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${shimmer} 2s infinite;
  }
  
  &::after {
    content: '📈';
    font-size: 48px;
    opacity: 0.3;
  }
`;

const TradingStats = styled.div`
  padding: ${theme.spacing.small};
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.micro};
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.medium};
  margin: ${theme.spacing.micro};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.micro};
`;

const TradingButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.micro};
  padding: ${theme.spacing.small};
  position: absolute;
  bottom: ${theme.spacing.small};
  left: ${theme.spacing.small};
  right: ${theme.spacing.small};
`;

const TradingButton = styled(motion.div)`
  flex: 1;
  padding: ${theme.spacing.small};
  background: ${props => props.type === 'buy' ? '#10b981' : '#ef4444'};
  color: white;
  text-align: center;
  border-radius: ${theme.borderRadius.medium};
  font-weight: ${theme.typography.fontWeight.bold};
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-size: 14px;
`;

const MutualFundsHeader = styled.div`
  background: linear-gradient(135deg, ${theme.colors.navy}, ${theme.colors.green});
  padding: ${theme.spacing.medium};
  color: white;
  text-align: center;
`;

const PortfolioCard = styled.div`
  background: white;
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.medium};
`;

const SIPSection = styled.div`
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
`;

const WatchlistSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin: ${theme.spacing.micro};
  padding: ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.medium};
`;

const StockItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding: 2px 0;
`;

const RecommendationCard = styled.div`
  background: linear-gradient(135deg, #fff7ed, #fed7aa);
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.medium};
  border-left: 3px solid ${theme.colors.gold};
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 24px;
  opacity: 0.1;
  animation: floatIcon 8s ease-in-out infinite;
  
  @keyframes floatIcon {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(5deg); }
    50% { transform: translateY(-5px) rotate(-3deg); }
    75% { transform: translateY(-15px) rotate(3deg); }
  }
  
  &:nth-child(2) {
    animation-delay: -2s;
  }
  
  &:nth-child(3) {
    animation-delay: -4s;
  }
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 28px;
  background-color: #000;
  border-radius: 0 0 16px 16px;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #333;
    border-radius: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: #333;
    border-radius: 50%;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  position: relative;
  z-index: 3;
  
  
  &.reverse {
    flex-direction: row-reverse;
  }
    
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
  font-size: 28px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(26, 54, 93, 0.1);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.subheader};
  }
`;

const SectionDescription = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.small};
  font-size: 14px;
  line-height: 1.4;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.small};
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.small};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.micro};
  margin-bottom: ${theme.spacing.micro};
  padding: 4px;
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.medium};
  
  &:hover {
    background: rgba(0, 119, 255, 0.05);
    transform: translateX(5px);
  }
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.green};
    filter: drop-shadow(0 2px 4px rgba(0, 119, 255, 0.2));
    margin-top: 2px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
    text-align: left;
  }
`;

const FeatureTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: 2px;
  font-size: 12px;
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.darkGray};
  font-size: 10px;
  line-height: 1.3;
`;

const DownloadSection = styled.div`
  margin-top: ${theme.spacing.small};
`;

const DownloadTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
  font-size: 14px;
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

const StoreButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  background: #000000;
  color: ${theme.colors.white};
  border-radius: 8px;
  padding: 8px 16px;
  text-decoration: none;
  transition: all ${theme.transitions.medium};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  font-size: ${theme.typography.fontSize.tiny};
  min-width: 140px;
  height: 40px;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const StoreIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StoreText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  text-align: left;
`;

const StoreSubtext = styled.span`
  font-size: 9px;
  opacity: 0.9;
  font-weight: 400;
`;

const StoreName = styled.span`
  font-weight: ${theme.typography.fontWeight.semiBold};
  font-size: 12px;
  margin-top: 1px;
`;

const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, ${theme.colors.platinum}, ${theme.colors.white});
  border-radius: ${theme.borderRadius.pill};
  padding: 4px 8px;
  font-size: 10px;
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00004 1.33334L10.06 5.50668L14.6667 6.18001L11.3334 9.42668L12.12 14.0133L8.00004 11.8467L3.88004 14.0133L4.66671 9.42668L1.33337 6.18001L5.94004 5.50668L8.00004 1.33334Z" fill="#FFB800" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeatureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="white"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg width="20" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#EA4335"/>
    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#FBBC04"/>
    <path d="M20.16 10.81C20.5 11.08 20.5 12.92 20.16 13.19L17.89 14.5L15.46 12.07L17.89 9.64L20.16 10.81Z" fill="#4285F4"/>
    <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="#34A853"/>
  </svg>
);

const MobileApp = ({ data: propData }) => {
  const sectionRef = useRef();
  const sliderRef = useRef();
  const [activeApp, setActiveApp] = useState('trading');
  const [mobileAppData, setMobileAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const appData = mobileAppData || propData || MOBILE_APP_DATA;

  useEffect(() => {
    fetchMobileAppData();
  }, []);

  const fetchMobileAppData = async () => {
    try {
      const response = await axios.get('/mobileApp/homepage');
      if (response.data.success && response.data.data) {
        setMobileAppData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch mobile app data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || !appData) return;
    
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        gsap.to(sliderRef.current, {
          x: "-100vw",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true
          }
        });

        gsap.to(".trading-phone", {
          y: -30,
          rotation: 3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "50% top",
            scrub: 2
          }
        });

        gsap.to(".mutual-phone", {
          y: 30,
          rotation: -3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "50% bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, appData]);

  const buttonTap = {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.02 }
  };



  return (
    <AppSection ref={sectionRef}>
      <MobileNavbar>
        <NavButton 
          $active={activeApp === 'trading'} 
          onClick={() => setActiveApp('trading')}
        >
          Trading App
        </NavButton>
        <NavButton 
          $active={activeApp === 'mutual'} 
          onClick={() => setActiveApp('mutual')}
        >
          Mutual Funds
        </NavButton>
      </MobileNavbar>
      <ParallaxContainer>
        <SliderWrapper ref={sliderRef}>
          <AppSlide>
            <AppContent>
              <PhoneMockup className="trading-phone">
                <PhoneFrame>
                  <PhoneNotch />
                  <PhoneScreen>
                    <TradingScreen>
                      <TradingHeader>
                        <div style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>NIFTY 50</div>
                        <div style={{ color: '#10b981', fontSize: '10px', fontWeight: 'bold' }}>+1.2%</div>
                      </TradingHeader>
                      <TradingChart />
                      <WatchlistSection>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>Watchlist</div>
                        <StockItem>
                          <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.8)' }}>RELIANCE</span>
                          <span style={{ fontSize: '9px', color: '#10b981' }}>+2.1%</span>
                        </StockItem>
                        <StockItem>
                          <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.8)' }}>TCS</span>
                          <span style={{ fontSize: '9px', color: '#ef4444' }}>-0.8%</span>
                        </StockItem>
                        <StockItem>
                          <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.8)' }}>HDFC</span>
                          <span style={{ fontSize: '9px', color: '#10b981' }}>+1.5%</span>
                        </StockItem>
                      </WatchlistSection>
                      <TradingStats>
                        <StatRow>
                          <span style={{ fontSize: '10px', opacity: 0.9, color: 'rgba(255, 255, 255, 0.8)' }}>Portfolio Value</span>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>₹2,45,680</span>
                        </StatRow>
                        <StatRow>
                          <span style={{ fontSize: '10px', opacity: 0.9, color: 'rgba(255, 255, 255, 0.8)' }}>Today's P&L</span>
                          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>+₹3,240</span>
                        </StatRow>
                        <StatRow>
                          <span style={{ fontSize: '10px', opacity: 0.9, color: 'rgba(255, 255, 255, 0.8)' }}>Holdings</span>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>12 stocks</span>
                        </StatRow>
                      </TradingStats>
                      <TradingButtons>
                        <TradingButton type="buy" {...buttonTap}>BUY</TradingButton>
                        <TradingButton type="sell" {...buttonTap}>SELL</TradingButton>
                      </TradingButtons>
                    </TradingScreen>
                  </PhoneScreen>
                </PhoneFrame>
              </PhoneMockup>

              <FloatingElements>
                <FloatingIcon style={{ top: '10%', right: '20%' }}>📊</FloatingIcon>
                <FloatingIcon style={{ top: '30%', right: '10%' }}>💹</FloatingIcon>
                <FloatingIcon style={{ bottom: '20%', right: '15%' }}>🚀</FloatingIcon>
              </FloatingElements>
              <ContentColumn className="trading-content">
                <SectionTitle className="trading-title">{appData.trading.title}</SectionTitle>
                <SectionDescription className="trading-desc">{appData.trading.description}</SectionDescription>
                
                <FeaturesList className="trading-features">
                  {appData.trading.features.map((feature, index) => (
                    <FeatureItem key={index} className="feature-item">
                      <FeatureIcon />
                      <div>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                      </div>
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <RatingBadge className="trading-rating">
                  <StarIcon />
                  {appData.trading.rating}
                </RatingBadge>

                <DownloadSection className="trading-download">
                  <DownloadTitle>{appData.trading.downloadTitle}</DownloadTitle>
                  <StoreButtons>
                    <StoreButton href={appData.trading.appleLink || "#"} className="store-button">
                      <StoreIcon className="store-icon"><AppleIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Download on the</StoreSubtext>
                        <StoreName>App Store</StoreName>
                      </StoreText>
                    </StoreButton>
                    <StoreButton href={appData.trading.googleLink || "#"} className="store-button">
                      <StoreIcon className="store-icon"><GooglePlayIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Get it on</StoreSubtext>
                        <StoreName>Google Play</StoreName>
                      </StoreText>
                    </StoreButton>
                  </StoreButtons>
                </DownloadSection>
              </ContentColumn>
            </AppContent>
          </AppSlide>

          <AppSlide>
            <AppContent className="reverse">
              <PhoneMockup className="mutual-phone">
                <PhoneFrame>
                  <PhoneNotch />
                  <PhoneScreen>
                    <MutualFundsScreen>
                      <MutualFundsHeader>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Your Portfolio</div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>₹1,25,450</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.9)' }}>+8.5% this year</div>
                      </MutualFundsHeader>
                      <PortfolioCard>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: theme.colors.navy }}>Top Performing Fund</div>
                        <div style={{ fontSize: '10px', color: theme.colors.darkGray, marginBottom: '4px' }}>Axis Bluechip Fund</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.green }}>+12.3%</div>
                      </PortfolioCard>
                      <SIPSection>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: theme.colors.navy }}>Active SIPs</div>
                        <div style={{ fontSize: '10px', color: theme.colors.darkGray, marginBottom: '8px' }}>3 SIPs • ₹15,000/month</div>
                        <motion.div 
                          style={{ 
                            background: theme.colors.navy, 
                            color: 'white', 
                            padding: '6px 12px', 
                            borderRadius: '6px', 
                            textAlign: 'center', 
                            fontSize: '10px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                          {...buttonTap}
                        >
                          Start New SIP
                        </motion.div>
                      </SIPSection>
                      <RecommendationCard>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', color: theme.colors.navy }}>Recommended</div>
                        <div style={{ fontSize: '9px', color: theme.colors.darkGray, marginBottom: '2px' }}>Mirae Asset Large Cap</div>
                        <div style={{ fontSize: '8px', color: theme.colors.green }}>★★★★★ 5 Year Return: 14.2%</div>
                      </RecommendationCard>
                    </MutualFundsScreen>
                  </PhoneScreen>
                </PhoneFrame>
              </PhoneMockup>

              <FloatingElements>
                <FloatingIcon style={{ top: '15%', left: '10%' }}>💰</FloatingIcon>
                <FloatingIcon style={{ top: '35%', left: '5%' }}>📈</FloatingIcon>
                <FloatingIcon style={{ bottom: '25%', left: '12%' }}>🎯</FloatingIcon>
              </FloatingElements>
              <ContentColumn className="mutual-content">
                <SectionTitle className="mutual-title">{appData.mutualFunds.title}</SectionTitle>
                <SectionDescription className="mutual-desc">{appData.mutualFunds.description}</SectionDescription>
                
                <FeaturesList className="mutual-features">
                  {appData.mutualFunds.features.map((feature, index) => (
                    <FeatureItem key={index} className="feature-item">
                      <FeatureIcon />
                      <div>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                      </div>
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <RatingBadge className="mutual-rating">
                  <StarIcon />
                  {appData.mutualFunds.rating}
                </RatingBadge>

                <DownloadSection className="mutual-download">
                  <DownloadTitle>{appData.mutualFunds.downloadTitle}</DownloadTitle>
                  <StoreButtons>
                    <StoreButton href={appData.mutualFunds.appleLink || "#"} className="store-button">
                      <StoreIcon className="store-icon"><AppleIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Download on the</StoreSubtext>
                        <StoreName>App Store</StoreName>
                      </StoreText>
                    </StoreButton>
                    <StoreButton href={appData.mutualFunds.googleLink || "#"} className="store-button">
                      <StoreIcon className="store-icon"><GooglePlayIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Get it on</StoreSubtext>
                        <StoreName>Google Play</StoreName>
                      </StoreText>
                    </StoreButton>
                  </StoreButtons>
                </DownloadSection>
              </ContentColumn>
            </AppContent>
          </AppSlide>
        </SliderWrapper>
      </ParallaxContainer>
    </AppSection>
  );
};

export default MobileApp;