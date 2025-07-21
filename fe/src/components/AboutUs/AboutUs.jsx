import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutSection = styled.section`
  background-color: ${theme.colors.platinum};
  padding: ${theme.spacing.large} 0;
  
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const SectionTitle = styled(motion.h2)`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.subheader};
  color: ${theme.colors.mediumGray};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
  
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
    border-left: 1px solid ${theme.colors.lightGray};
  }
`;

const StoryTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
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
`;

const StatNumber = styled.div`
  font-size: ${theme.typography.fontSize.header};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
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
    background-color: ${theme.colors.lightGray};
  }
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
    background-color: ${theme.colors.green};
    transform: translateX(-50%);
  }
`;

const TimelineDate = styled.div`
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
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
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.pill};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  margin-top: ${theme.spacing.small};
  
  svg {
    color: ${theme.colors.green};
  }
`;

// SVG Icons
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
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true 
  });
  
  // Animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Counter animation
  useEffect(() => {
    if (isInView) {
      const counters = document.querySelectorAll('.counter-value');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2;
        
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function() {
              counter.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
            }
          }
        );
      });
    }
  }, [isInView]);
  
  // Variants for animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            About Focus Stock Brokers
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            Building trust through transparency and technology since 2018
          </SectionSubtitle>
        </SectionHeader>
        
        <ContentWrapper
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <StoryColumn variants={itemVariants}>
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
          
          <TimelineColumn variants={itemVariants}>
            <StoryTitle>Our Journey</StoryTitle>
            
            <Timeline>
              <TimelineItem>
                <TimelineDate>2018</TimelineDate>
                <TimelineTitle>Company Founded</TimelineTitle>
                <TimelineDescription>
                  Focus Stock Brokers was established with a vision to revolutionize stock trading in India.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDate>2019</TimelineDate>
                <TimelineTitle>SEBI Registration</TimelineTitle>
                <TimelineDescription>
                  Received official SEBI registration and launched our first trading platform.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDate>2020</TimelineDate>
                <TimelineTitle>Mobile App Launch</TimelineTitle>
                <TimelineDescription>
                  Launched our mobile trading app, bringing the market to our customers' fingertips.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDate>2021</TimelineDate>
                <TimelineTitle>10,000 Customers</TimelineTitle>
                <TimelineDescription>
                  Reached the milestone of 10,000 active customers and expanded our advisory team.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDate>2022</TimelineDate>
                <TimelineTitle>Advanced Analytics</TimelineTitle>
                <TimelineDescription>
                  Introduced AI-powered market analytics and personalized investment recommendations.
                </TimelineDescription>
              </TimelineItem>
              
              <TimelineItem>
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