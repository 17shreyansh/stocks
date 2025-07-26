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
  padding: ${theme.spacing.large} 0;
  overflow: hidden;
  
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

const AppRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xxl};
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.large};
  
  &:nth-child(even) {
    @media (min-width: ${theme.breakpoints.md}) {
      flex-direction: row-reverse;
    }
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`;

const PhoneMockup = styled.div`
  position: relative;
  width: 280px;
  height: 570px;
  margin: 0 auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    margin: 0;
    width: 320px;
    height: 650px;
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
  box-shadow: ${theme.shadows.xl};
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
  height: 200px;
  margin: ${theme.spacing.small};
  background: rgba(0, 119, 255, 0.1);
  border-radius: ${theme.borderRadius.medium};
  position: relative;
  overflow: hidden;
  
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
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 119, 255, 0.1), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

const SIPSection = styled.div`
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  margin: ${theme.spacing.small};
  padding: ${theme.spacing.small};
  border-radius: ${theme.borderRadius.medium};
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 24px;
  background-color: ${theme.colors.navy};
  border-radius: 0 0 12px 12px;
  z-index: 10;
`;

const ContentColumn = styled.div`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing.large};
  }
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.header};
`;

const SectionDescription = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.medium};
  max-width: 500px;
  font-size: ${theme.typography.fontSize.body};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.medium};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
  
  svg {
    flex-shrink: 0;
    color: ${theme.colors.green};
  }
`;

const FeatureTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSize.small};
`;

const DownloadSection = styled.div`
  margin-top: ${theme.spacing.medium};
`;

const DownloadTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
`;

const StoreButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  flex-wrap: wrap;
`;

const StoreButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  background-color: ${theme.colors.navy};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  text-decoration: none;
  transition: all ${theme.transitions.medium};
  
  &:hover {
    background-color: ${theme.colors.darkNavy};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const StoreIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoreText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreSubtext = styled.span`
  font-size: 10px;
  opacity: 0.8;
`;

const StoreName = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
`;

const QRCode = styled.div`
  display: none;
  width: 100px;
  height: 100px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  margin-top: ${theme.spacing.small};
  position: relative;
  
  &:after {
    content: 'QR Code';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${theme.typography.fontSize.small};
    color: ${theme.colors.navy};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  background-color: ${theme.colors.platinum};
  border-radius: ${theme.borderRadius.pill};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  margin-top: ${theme.spacing.small};
  margin-right: ${theme.spacing.small};
`;

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00004 1.33334L10.06 5.50668L14.6667 6.18001L11.3334 9.42668L12.12 14.0133L8.00004 11.8467L3.88004 14.0133L4.66671 9.42668L1.33337 6.18001L5.94004 5.50668L8.00004 1.33334Z" fill="#FFB800" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeatureIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 0C15.5 0 16.5 0.5 17.25 1C18 1.5 18.5 2 19 3C17.5 4 16.5 5.5 16.5 7C16.5 8.5 17 10 18.5 11C19.5 11.5 20 12.5 20 13.5C20 14.5 19.5 15.5 19 16.5C18.5 17.5 18 18.5 17 19C16 19.5 15.5 20 14.5 20C13.5 20 13 19.5 12 19.5C11 19.5 10.5 20 9.5 20C8.5 20 8 19.5 7 19C6 18.5 5.5 17.5 5 16.5C4.5 15.5 4 14 4 12.5C4 11 4.5 9.5 5.5 8.5C6.5 7.5 7.5 7 9 7C10 7 10.5 7.5 11.5 7.5C12.5 7.5 13 7 14 7C14.5 7 15 6.5 15.5 6C15 4 14 2 12.5 0.5C13 0.5 13.5 0 14.5 0ZM9.5 6C9.5 4.5 10 3 11 2C10 2.5 9 3.5 8.5 4.5C8 5.5 7.5 6.5 7.5 8C7.5 8.5 7.5 8.5 7.5 9C8 9 8.5 8.5 9 8C9.5 7.5 9.5 6.5 9.5 6Z" fill="white"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0.5C1 0.5 0.5 1 0.5 1.5V20.5C0.5 21 1 21.5 1.5 21.5L11.5 11L1.5 0.5ZM14.5 8L3.5 2L11.5 10L14.5 8ZM3.5 20L14.5 14L11.5 12L3.5 20ZM16.5 13.5C16.5 13 16.5 13 16 12.5L15 11.5L13.5 13L15 14.5L16 13.5C16.5 13.5 16.5 13.5 16.5 13.5Z" fill="white"/>
  </svg>
);

const MobileApp = () => {
  const sectionRef = useRef();
  const tradingPhoneRef = useRef();
  const mutualPhoneRef = useRef();
  const tradingContentRef = useRef();
  const mutualContentRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trading app animations
      gsap.fromTo(tradingPhoneRef.current, 
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tradingPhoneRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(tradingContentRef.current.children,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tradingContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Mutual funds app animations
      gsap.fromTo(mutualPhoneRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mutualPhoneRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(mutualContentRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mutualContentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const buttonTap = {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 }
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
      <Container>
        <AppRow>
          <AppWrapper>
            <PhoneMockup ref={tradingPhoneRef}>
              <PhoneFrame>
                <PhoneNotch />
                <PhoneScreen>
                  <TradingScreen>
                    <TradingHeader>
                      <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 'bold' }}>NIFTY 50</div>
                      <div style={{ color: '#10b981', fontSize: '12px' }}>+1.2%</div>
                    </TradingHeader>
                    <TradingChart />
                    <div style={{ padding: '16px', color: 'white' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', opacity: 0.7 }}>Portfolio Value</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>₹2,45,680</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', opacity: 0.7 }}>Today's P&L</span>
                        <span style={{ fontSize: '14px', color: '#10b981' }}>+₹3,240</span>
                      </div>
                    </div>
                    <TradingButtons>
                      <TradingButton type="buy" {...buttonTap}>BUY</TradingButton>
                      <TradingButton type="sell" {...buttonTap}>SELL</TradingButton>
                    </TradingButtons>
                  </TradingScreen>
                </PhoneScreen>
              </PhoneFrame>
            </PhoneMockup>

            <ContentColumn ref={tradingContentRef}>
              <SectionTitle>Trading App</SectionTitle>
              <SectionDescription>Professional trading platform with real-time market data, advanced charting, and instant execution.</SectionDescription>
              
              <FeaturesList>
                {tradingFeatures.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon />
                    <div>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </div>
                  </FeatureItem>
                ))}
              </FeaturesList>

              <RatingBadge>
                <StarIcon />
                4.8 • 50K+ downloads
              </RatingBadge>

              <DownloadSection>
                <DownloadTitle>Download Now</DownloadTitle>
                <StoreButtons>
                  <StoreButton href="#" {...buttonTap}>
                    <StoreIcon><AppleIcon /></StoreIcon>
                    <StoreText>
                      <StoreSubtext>Download on the</StoreSubtext>
                      <StoreName>App Store</StoreName>
                    </StoreText>
                  </StoreButton>
                  <StoreButton href="#" {...buttonTap}>
                    <StoreIcon><GooglePlayIcon /></StoreIcon>
                    <StoreText>
                      <StoreSubtext>Get it on</StoreSubtext>
                      <StoreName>Google Play</StoreName>
                    </StoreText>
                  </StoreButton>
                </StoreButtons>
                <QRCode />
              </DownloadSection>
            </ContentColumn>
          </AppWrapper>

          <AppWrapper>
            <PhoneMockup ref={mutualPhoneRef}>
              <PhoneFrame>
                <PhoneNotch />
                <PhoneScreen>
                  <MutualFundsScreen>
                    <MutualFundsHeader>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Your Portfolio</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹1,25,450</div>
                      <div style={{ fontSize: '12px', opacity: 0.9 }}>+8.5% this year</div>
                    </MutualFundsHeader>
                    <PortfolioCard>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: theme.colors.navy }}>Top Performing Fund</div>
                      <div style={{ fontSize: '12px', color: theme.colors.darkGray, marginBottom: '4px' }}>Axis Bluechip Fund</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: theme.colors.green }}>+12.3%</div>
                    </PortfolioCard>
                    <SIPSection>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: theme.colors.navy }}>Active SIPs</div>
                      <div style={{ fontSize: '12px', color: theme.colors.darkGray }}>3 SIPs • ₹15,000/month</div>
                      <motion.div 
                        style={{ 
                          background: theme.colors.navy, 
                          color: 'white', 
                          padding: '8px 16px', 
                          borderRadius: '8px', 
                          textAlign: 'center', 
                          marginTop: '8px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                        {...buttonTap}
                      >
                        Start New SIP
                      </motion.div>
                    </SIPSection>
                  </MutualFundsScreen>
                </PhoneScreen>
              </PhoneFrame>
            </PhoneMockup>

            <ContentColumn ref={mutualContentRef}>
              <SectionTitle>Mutual Funds App</SectionTitle>
              <SectionDescription>Simplified investing with curated mutual funds, SIP automation, and educational resources.</SectionDescription>
              
              <FeaturesList>
                {mutualFundsFeatures.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon />
                    <div>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </div>
                  </FeatureItem>
                ))}
              </FeaturesList>

              <RatingBadge>
                <StarIcon />
                4.9 • 75K+ downloads
              </RatingBadge>

              <DownloadSection>
                <DownloadTitle>Download Now</DownloadTitle>
                <StoreButtons>
                  <StoreButton href="#" {...buttonTap}>
                    <StoreIcon><AppleIcon /></StoreIcon>
                    <StoreText>
                      <StoreSubtext>Download on the</StoreSubtext>
                      <StoreName>App Store</StoreName>
                    </StoreText>
                  </StoreButton>
                  <StoreButton href="#" {...buttonTap}>
                    <StoreIcon><GooglePlayIcon /></StoreIcon>
                    <StoreText>
                      <StoreSubtext>Get it on</StoreSubtext>
                      <StoreName>Google Play</StoreName>
                    </StoreText>
                  </StoreButton>
                </StoreButtons>
                <QRCode />
              </DownloadSection>
            </ContentColumn>
          </AppWrapper>
        </AppRow>
      </Container>
    </AppSection>
  );
};

export default MobileApp;