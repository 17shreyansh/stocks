import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced keyframes for background effects
const pulse = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.2);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
  }
`;

const AboutSection = styled.section`
  background-color: ${theme.colors.platinum};
  padding: ${theme.spacing.large} 0;
  position: relative;
  overflow: hidden;
  
  // Background gradient orbs with animation
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(20, 83, 45, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
    animation: ${pulse} 8s ease-in-out infinite alternate;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(59, 88, 151, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
    animation: ${pulse} 8s ease-in-out infinite alternate-reverse;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
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
  position: relative;
  z-index: 2;
  padding: ${theme.spacing.medium} 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.green}, ${theme.colors.navy});
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
`;

const SectionTitle = styled(motion.h2)`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.green}, ${theme.colors.navy});
    border-radius: 20px;
    opacity: 0.7;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.subheader};
  color: ${theme.colors.mediumGray};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
  position: relative;
  z-index: 2;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const StoryColumn = styled(motion.div)`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-right: ${theme.spacing.medium};
  }
`;

const TimelineColumn = styled(motion.div)`
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing.medium};
    border-left: 2px solid transparent;
    border-image: linear-gradient(to bottom, ${theme.colors.green}, ${theme.colors.navy}) 1;
  }
`;

const StoryTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  background: linear-gradient(90deg, ${theme.colors.navy}, ${theme.colors.green});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const StoryText = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: ${theme.spacing.medium};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.medium};
`;

const ValueItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
  
  svg {
    flex-shrink: 0;
    margin-top: 4px;
    color: ${theme.colors.green};
    filter: drop-shadow(0 0 3px rgba(34, 197, 94, 0.3));
  }
`;

const ValueTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const ValueDescription = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSize.small};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.medium};
  margin-top: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.medium};
  box-shadow: ${theme.shadows.small};
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 60%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${theme.shadows.medium}, 0 0 20px rgba(34, 197, 94, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const StatNumber = styled.div`
  font-size: ${theme.typography.fontSize.header};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(90deg, ${theme.colors.navy}, ${theme.colors.green});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: ${theme.spacing.micro};
  display: inline-block;
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: ${theme.spacing.medium};
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, ${theme.colors.green}, ${theme.colors.navy});
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 0;
  top: 8px;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, ${theme.colors.green}, ${theme.colors.navy});
  z-index: 2;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  transform: translateX(-0.5px);
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${theme.spacing.medium};
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -${theme.spacing.medium};
    top: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.navy});
    transform: translateX(-50%);
    box-shadow: 0 0 0 4px ${theme.colors.platinum}, 0 0 10px rgba(34, 197, 94, 0.4);
    z-index: 3;
    animation: ${glow} 2s ease-in-out infinite;
    animation-delay: ${props => props.$index * 0.2}s;
  }
`;

const TimelineDate = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
  background-color: ${theme.colors.white};
  display: inline-block;
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border-radius: ${theme.borderRadius.small};
  box-shadow: ${theme.shadows.small};
`;

const TimelineTitle = styled.h4`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const TimelineDescription = styled.p`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.darkGray};
`;

const RegistrationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  background-color: ${theme.colors.white};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.pill};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  margin-top: ${theme.spacing.small};
  background-image: linear-gradient(${theme.colors.white}, ${theme.colors.white}), 
                    linear-gradient(45deg, ${theme.colors.green}, ${theme.colors.navy});
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
  }
  
  svg {
    color: ${theme.colors.green};
    filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.3));
  }
`;

// SVG Icons (unchanged)
const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00002 14.6667C8.00002 14.6667 13.3334 12 13.3334 8.00001V3.33334L8.00002 1.33334L2.66669 3.33334V8.00001C2.66669 12 8.00002 14.6667 8.00002 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AboutUs = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Animation when section comes into view
  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
      
      // Animate counters
      const counters = sectionRef.current?.querySelectorAll('.counter-value');
      
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current).toLocaleString();
            setTimeout(updateCounter, 10);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        
        updateCounter();
      });
    }
  }, [controls, isVisible]);
  
  // Variants for framer-motion animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <AboutSection id="about" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            About Focus Stock Brokers
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building trust through transparency and technology since 2018
          </SectionSubtitle>
        </SectionHeader>
        
        <ContentWrapper
          as={motion.div}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <StoryColumn 
            variants={itemVariants}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <StoryTitle>Our Story</StoryTitle>
            <StoryText>
              Founded in 2018, Focus Stock Brokers was established with a clear mission: to make stock market investing accessible, transparent, and rewarding for every Indian. We believe that financial freedom should not be limited by complexity or high costs.
            </StoryText>
            <StoryText>
              Our team of experienced financial experts and technology innovators work together to provide a seamless trading experience that combines cutting-edge technology with personalized service.
            </StoryText>
            
            <ValuesList>
              <ValueItem>
                <CheckCircleIcon />
                <div>
                  <ValueTitle>Customer First</ValueTitle>
                  <ValueDescription>
                    Every decision we make prioritizes our customers' financial well-being and experience.
                  </ValueDescription>
                </div>
              </ValueItem>
              <ValueItem>
                <CheckCircleIcon />
                <div>
                  <ValueTitle>Transparency</ValueTitle>
                  <ValueDescription>
                    We believe in clear communication and no hidden charges in all our services.
                  </ValueDescription>
                </div>
              </ValueItem>
              <ValueItem>
                <CheckCircleIcon />
                <div>
                  <ValueTitle>Innovation</ValueTitle>
                  <ValueDescription>
                    Continuously improving our technology to provide the best trading experience.
                  </ValueDescription>
                </div>
              </ValueItem>
            </ValuesList>
            
            <RegistrationBadge>
              <ShieldIcon />
              SEBI Registered Stock Broker
            </RegistrationBadge>
            
            <StatsContainer>
              <StatCard>
                <StatNumber className="counter-value" data-target="25000">0</StatNumber>
                <StatLabel>Active Investors</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber className="counter-value" data-target="500">0</StatNumber>
                <StatLabel>Crores Managed</StatLabel>
              </StatCard>
            </StatsContainer>
          </StoryColumn>
          
          <TimelineColumn
            variants={itemVariants}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <StoryTitle>Our Journey</StoryTitle>
            
            <Timeline>
              <TimelineLine ref={timelineLineRef} />
              
              <TimelineItem $index={0}>
                <TimelineDate>2018</TimelineDate>
                <TimelineTitle>Company Founded</TimelineTitle>
                <TimelineDescription>
                  Focus Stock Brokers was established with a vision to revolutionize stock trading in India.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem $index={1}>
                <TimelineDate>2019</TimelineDate>
                <TimelineTitle>SEBI Registration</TimelineTitle>
                <TimelineDescription>
                  Received official SEBI registration and launched our first trading platform.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem $index={2}>
                <TimelineDate>2020</TimelineDate>
                <TimelineTitle>Mobile App Launch</TimelineTitle>
                <TimelineDescription>
                  Launched our mobile trading app, bringing the market to our customers' fingertips.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem $index={3}>
                <TimelineDate>2021</TimelineDate>
                <TimelineTitle>10,000 Customers</TimelineTitle>
                <TimelineDescription>
                  Reached the milestone of 10,000 active customers and expanded our advisory team.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem $index={4}>
                <TimelineDate>2022</TimelineDate>
                <TimelineTitle>Advanced Analytics</TimelineTitle>
                <TimelineDescription>
                  Introduced AI-powered market analytics and personalized investment recommendations.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem $index={5}>
                <TimelineDate>2023</TimelineDate>
                <TimelineTitle>25,000 Customers</TimelineTitle>
                <TimelineDescription>
                  Crossed 25,000 active customers and ₹500 Crores in assets under management.
                </TimelineDescription>
              </TimelineItem>
            </Timeline>
          </TimelineColumn>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default AboutUs;