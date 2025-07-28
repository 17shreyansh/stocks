import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

gsap.registerPlugin(ScrollTrigger);

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const AppSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: auto;
    min-height: 90vh;
  }
`;

const ParallaxContainer = styled.div`
  position: sticky;
  top: 0;
  height: 90vh;
  display: flex;
  align-items: center;
  // background: linear-gradient(180deg, ${theme.colors.white} 0%, ${theme.colors.platinum} 100%);
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 119, 255, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: pulse 4s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
    50% { transform: translateX(-50%) scale(1.1); opacity: 0.6; }
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    position: relative;
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    padding: ${theme.spacing.large} 0;
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
  width: 260px;
  height: 70vh;
  flex-shrink: 0;
  z-index: 3;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 240px;
    height: 460px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 220px;
    height: 440px;
  }
`;

const PhoneFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, ${theme.colors.navy}, ${theme.colors.darkNavy});
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 20px 40px rgba(26, 54, 93, 0.3);
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
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
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background-color: ${theme.colors.navy};
  border-radius: 0 0 12px 12px;
  z-index: 10;
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
  background: linear-gradient(135deg, ${theme.colors.navy}, ${theme.colors.darkNavy});
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  text-decoration: none;
  transition: all ${theme.transitions.medium};
  box-shadow: 0 4px 15px rgba(26, 54, 93, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  font-size: ${theme.typography.fontSize.tiny};
  
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
  
  &:hover::before {
    left: 100%;
  }
`;

const StoreIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const StoreText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const StoreSubtext = styled.span`
  font-size: 8px;
  opacity: 0.8;
`;

const StoreName = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: 10px;
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
  <svg width="16" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 0C15.5 0 16.5 0.5 17.25 1C18 1.5 18.5 2 19 3C17.5 4 16.5 5.5 16.5 7C16.5 8.5 17 10 18.5 11C19.5 11.5 20 12.5 20 13.5C20 14.5 19.5 15.5 19 16.5C18.5 17.5 18 18.5 17 19C16 19.5 15.5 20 14.5 20C13.5 20 13 19.5 12 19.5C11 19.5 10.5 20 9.5 20C8.5 20 8 19.5 7 19C6 18.5 5.5 17.5 5 16.5C4.5 15.5 4 14 4 12.5C4 11 4.5 9.5 5.5 8.5C6.5 7.5 7.5 7 9 7C10 7 10.5 7.5 11.5 7.5C12.5 7.5 13 7 14 7C14.5 7 15 6.5 15.5 6C15 4 14 2 12.5 0.5C13 0.5 13.5 0 14.5 0ZM9.5 6C9.5 4.5 10 3 11 2C10 2.5 9 3.5 8.5 4.5C8 5.5 7.5 6.5 7.5 8C7.5 8.5 7.5 8.5 7.5 9C8 9 8.5 8.5 9 8C9.5 7.5 9.5 6.5 9.5 6Z" fill="white"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg width="16" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0.5C1 0.5 0.5 1 0.5 1.5V20.5C0.5 21 1 21.5 1.5 21.5L11.5 11L1.5 0.5ZM14.5 8L3.5 2L11.5 10L14.5 8ZM3.5 20L14.5 14L11.5 12L3.5 20ZM16.5 13.5C16.5 13 16.5 13 16 12.5L15 11.5L13.5 13L15 14.5L16 13.5C16.5 13.5 16.5 13.5 16.5 13.5Z" fill="white"/>
  </svg>
);

const MobileApp = () => {
  const sectionRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
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
  }, []);

  const buttonTap = {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.02 }
  };

  const tradingFeatures = [
    { title: 'Real-time Charts', description: 'Advanced technical analysis with live market data' },
    { title: 'Quick Trading', description: 'One-tap buy/sell with instant order execution' },
    { title: 'Dark Mode UI', description: 'Glassmorphism design optimized for trading' },
    { title: 'Portfolio Tracking', description: 'Real-time P&L and position monitoring' }
  ];

  const mutualFundsFeatures = [
    { title: 'SIP Automation', description: 'Set up systematic investment plans effortlessly' },
    { title: 'Portfolio Overview', description: 'Clean dashboard with performance insights' },
    { title: 'Educational Cards', description: 'Learn investing basics with interactive content' },
    { title: 'Goal Planning', description: 'Plan investments for life goals' }
  ];

  return (
    <AppSection ref={sectionRef}>
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
                <SectionTitle className="trading-title">Trading App</SectionTitle>
                <SectionDescription className="trading-desc">Professional trading platform with real-time market data, advanced charting, and instant execution.</SectionDescription>
                
                <FeaturesList className="trading-features">
                  {tradingFeatures.map((feature, index) => (
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
                  4.8 • 50K+ downloads
                </RatingBadge>

                <DownloadSection className="trading-download">
                  <DownloadTitle>Download Now</DownloadTitle>
                  <StoreButtons>
                    <StoreButton href="#" className="store-button">
                      <StoreIcon className="store-icon"><AppleIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Download on the</StoreSubtext>
                        <StoreName>App Store</StoreName>
                      </StoreText>
                    </StoreButton>
                    <StoreButton href="#" className="store-button">
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
                <SectionTitle className="mutual-title">Mutual Funds App</SectionTitle>
                <SectionDescription className="mutual-desc">Simplified investing with curated mutual funds, SIP automation, and educational resources.</SectionDescription>
                
                <FeaturesList className="mutual-features">
                  {mutualFundsFeatures.map((feature, index) => (
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
                  4.9 • 75K+ downloads
                </RatingBadge>

                <DownloadSection className="mutual-download">
                  <DownloadTitle>Download Now</DownloadTitle>
                  <StoreButtons>
                    <StoreButton href="#" className="store-button">
                      <StoreIcon className="store-icon"><AppleIcon /></StoreIcon>
                      <StoreText>
                        <StoreSubtext>Download on the</StoreSubtext>
                        <StoreName>App Store</StoreName>
                      </StoreText>
                    </StoreButton>
                    <StoreButton href="#" className="store-button">
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