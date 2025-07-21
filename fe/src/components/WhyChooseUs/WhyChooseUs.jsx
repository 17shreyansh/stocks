import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { theme } from '../../styles/theme';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const Section = styled.section`
  background-color: ${theme.colors.white};
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

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AdvantageCard = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all ${theme.transitions.medium};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.large};
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.platinum};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.small};
  color: ${theme.colors.navy};
`;

const AdvantageTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const AdvantageValue = styled.div`
  font-size: ${theme.typography.fontSize.header};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.green};
  margin-bottom: ${theme.spacing.small};
`;

const AdvantageDescription = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSize.small};
`;

// SVG Icons
const SpeedIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4C20 5.10457 16.4183 6 12 6C7.58172 6 4 5.10457 4 4M20 4C20 2.89543 16.4183 2 12 2C7.58172 2 4 2.89543 4 4M20 4V20C20 21.1046 16.4183 22 12 22C7.58172 22 4 21.1046 4 20V4M20 12C20 13.1046 16.4183 14 12 14C7.58172 14 4 13.1046 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TransparencyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WhyChooseUs = () => {
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
  
  // Variants for animations
  const headerVariants = {
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
  
  // Advantages data
  const advantages = [
    {
      id: 1,
      icon: <SpeedIcon />,
      title: 'Lightning Fast',
      value: '<0.1s',
      description: 'Order execution speed, faster than industry average for seamless trading experience.',
    },
    {
      id: 2,
      icon: <ServerIcon />,
      title: 'Reliable Platform',
      value: '99.9%',
      description: 'Uptime guarantee with robust infrastructure to ensure uninterrupted trading.',
    },
    {
      id: 3,
      icon: <SupportIcon />,
      title: 'Expert Support',
      value: '24/7',
      description: 'Customer support availability with dedicated relationship managers for premium clients.',
    },
    {
      id: 4,
      icon: <TransparencyIcon />,
      title: 'Full Transparency',
      value: '0',
      description: 'Zero hidden charges with clear fee structure and transparent pricing policy.',
    },
  ];
  
  return (
    <Section id="why-choose-us" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            Why Choose Focus Stock
          </SectionTitle>
          <SectionSubtitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            Our competitive advantages that set us apart in the industry
          </SectionSubtitle>
        </SectionHeader>
        
        <AdvantagesGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.id} variants={itemVariants}>
              <IconWrapper>{advantage.icon}</IconWrapper>
              <AdvantageTitle>{advantage.title}</AdvantageTitle>
              <AdvantageValue>{advantage.value}</AdvantageValue>
              <AdvantageDescription>{advantage.description}</AdvantageDescription>
            </AdvantageCard>
          ))}
        </AdvantagesGrid>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;