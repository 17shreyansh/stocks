import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { theme } from '../../styles/theme';

const ServicesSection = styled.section`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 50%, rgba(240, 248, 255, 0.9) 100%);
  padding: 60px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, rgba(52, 152, 219, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 80px 0;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled(motion.h2)`
  color: ${theme.colors.navy};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 54px;
  }
`;

const ViewAllButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.navy};
  text-decoration: none;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const ServicesLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CardsContainer = styled.div`
  width: 100%;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    width: 65.5%;
  }
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 24px;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "card1 card2"
      "card3 card3"
      "card4 card4";
  }
`;

const Card = styled(motion.div)`
  position: relative;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(52, 152, 219, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(52, 152, 219, 0.3);
  }
  
  &:nth-child(1) {
    grid-area: card1;
  }
  
  &:nth-child(2) {
    grid-area: card2;
  }
  
  &:nth-child(3) {
    grid-area: card3;
  }
  
  &:nth-child(4) {
    grid-area: card4;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 28px;
  }
`;

const CardTitle = styled.h4`
  color: ${theme.colors.navy};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  position: relative;
  z-index: 10;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 22px;
    line-height: 1.3;
  }
`;

const CardDescription = styled.div`
  color: ${theme.colors.darkGray};
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  z-index: 10;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 16px;
    line-height: 1.6;
    -webkit-line-clamp: 4;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 24px;
  position: relative;
`;

const SideList = styled(motion.div)`
  width: 100%;
  margin-top: 40px;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    width: 31%;
    margin-top: 0;
  }
`;

const ListItem = styled(motion.div)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(52, 152, 219, 0.3);
  }
`;

const ListItemMeta = styled.div`
  font-size: 10px;
  color: #2C2E35;
  opacity: 0.7;
  margin-bottom: 6px;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 12px;
  }
`;

const ListItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 18px;
  }
  
  a {
    color: ${theme.colors.navy};
    text-decoration: none;
  }
`;

const Tag = styled(motion.div)`
  display: inline-block;
  background: linear-gradient(135deg, #EC4899, #F97316);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 12px;
    padding: 8px 16px;
  }
`;

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true 
  });
  
  // Animation when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Variants for animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  const titleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  const listItemVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  // Services data
  const services = [
    {
      id: 1,
      title: 'Stock Trading Essentials',
      description: 'Advanced trading platform with real-time market data and instant execution. Our platform provides zero brokerage on delivery trades, advanced charting tools, and real-time market data.',
      image: 'https://dj3y4cy58rgft.cloudfront.net/image_33_1_1d57c2f1fd.webp',
      link: '#',
    },
    {
      id: 2,
      title: 'Mutual Fund Investments',
      description: 'Invest in a wide range of mutual funds with zero commission and expert recommendations. Our platform offers SIP automation and portfolio tracking tools.',
      link: '#',
    },
    {
      id: 3,
      title: 'Advisory Services',
      description: 'Personalized investment advice from SEBI registered research analysts. Get personalized portfolio reviews and goal-based investment plans.',
      link: '#',
    },
    {
      id: 4,
      title: 'Sustainable Investing Options',
      description: 'The global investment landscape is witnessing a paradigm shift towards sustainable investing, where individuals seek to align their financial objectives with their environmental and social values.',
      link: '#',
    },
  ];
  
  // Side list data
  const sideListItems = [
    {
      id: 1,
      readTime: '5 minutes read',
      title: 'Unlocking the Power of Stock Scanners: Your Ultimate Guide',
      category: 'Stocks',
      link: '#',
    },
    {
      id: 2,
      readTime: '4 minutes read',
      title: 'Demystifying Demat Accounts: Meaning, Benefits, and How to Open One in India',
      category: 'Investing',
      link: '#',
    },
    {
      id: 3,
      readTime: '4 minutes read',
      title: 'Decoding Trading Myths: 8 Common Misconceptions Demystified',
      category: 'Trading 101',
      link: '#',
    },
  ];
  
  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial="hidden"
            animate={controls}
            variants={titleVariant}
          >
            Learn from the experts
          </SectionTitle>
          <ViewAllButton 
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            All Services
          </ViewAllButton>
        </SectionHeader>
        
        <ServicesLayout>
          <CardsContainer>
            <CardsGrid
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {services.map((service, index) => (
                <Card 
                  key={service.id} 
                  custom={index}
                  variants={cardVariants}
                >
                  <a href={service.link}>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </a>
                  <CardFooter>
                    {service.image && (
                      <motion.img 
                        src={service.image}
                        alt=""
                        width="148"
                        height="50"
                        style={{ 
                          width: '148px', 
                          height: '50px',
                          position: 'relative',
                          zIndex: 20,
                          filter: 'contrast(1.2) brightness(1.1)'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </CardsGrid>
          </CardsContainer>
          
          <SideList
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {sideListItems.map((item, index) => (
              <ListItem 
                key={item.id}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={listItemVariant}
              >
                <ListItemMeta>{item.readTime}</ListItemMeta>
                <ListItemTitle>
                  <a href={item.link}>{item.title}</a>
                </ListItemTitle>
                <Tag
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {item.category}
                </Tag>
              </ListItem>
            ))}
          </SideList>
        </ServicesLayout>
      </Container>
    </ServicesSection>
  );
};

export default Services;