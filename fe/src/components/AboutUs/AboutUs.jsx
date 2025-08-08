import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AnimatedSection from '../AnimatedSection';

// Mock theme object for demonstration
const theme = {
  spacing: {
    micro: '4px',
    small: '8px',
    medium: '16px',
    large: '32px',
    xl: '64px'
  },
  colors: {
    navy: '#1a365d',
    green: '#38a169',
    white: '#ffffff',
    lightGray: '#e2e8f0',
    mediumGray: '#718096',
    darkGray: '#4a5568'
  },
  typography: {
    fontSize: {
      xs: '12px',
      small: '13px',
      medium: '14px',
      subheader: '16px',
      header: '28px'
    },
    fontWeight: {
      medium: '500',
      bold: '700'
    },
    lineHeight: {
      relaxed: '1.6'
    }
  },
  borderRadius: {
    medium: '8px',
    pill: '50px'
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12)'
  },
  breakpoints: {
    md: '768px'
  }
};

// Mock hook
const useIntersectionObserver = ({ threshold, triggerOnce }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);
  
  return [ref, isInView];
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Component Data Constants
const ABOUT_DATA = {
  title: "Focus Stock Broker Ltd",
  subtitle: "From startup to success story - transforming how India invests since 2018",
  story: {
    title: "Our Story",
    paragraphs: [
      "Since 2018, we've been on a mission to democratize stock market investing in India. What started as a vision to break down barriers has evolved into a comprehensive platform serving thousands of investors nationwide.",
      "Our journey reflects the growth of India's retail investment landscape. From our humble beginnings to becoming a trusted partner for 25,000+ investors, each milestone represents our commitment to innovation, transparency, and customer success."
    ]
  },
  milestones: [
    {
      date: "2018",
      title: "The Beginning",
      description: "Started with a dream to make trading accessible.",
      year: 2018,
      value: 125.50,
      growth: 0
    },
    {
      date: "2019",
      title: "Official Launch",
      description: "SEBI registered and launched zero brokerage platform.",
      year: 2019,
      value: 189.75,
      growth: 51.2
    },
    {
      date: "2020",
      title: "Mobile App",
      description: "Launched mobile app during pandemic for safe trading.",
      year: 2020,
      value: 245.30,
      growth: 29.3
    },
    {
      date: "2021",
      title: "10K Community",
      description: "Built 10,000+ investor community with advisory.",
      year: 2021,
      value: 387.90,
      growth: 58.1
    },
    {
      date: "2022",
      title: "AI Innovation",
      description: "Introduced AI-powered insights and automation.",
      year: 2022,
      value: 456.25,
      growth: 17.6
    },
    {
      date: "2023",
      title: "Trusted Partner",
      description: "25,000+ investors, ₹500+ Crores managed.",
      year: 2023,
      value: 612.80,
      growth: 34.3
    }
  ]
};

const AboutSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 120px 0;
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

const SectionTitle = styled.h2`
  color: ${theme.colors.navy};
  margin-bottom: 16px;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 36px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 20px;
  color: ${theme.colors.mediumGray};
  max-width: 600px;
  margin: 0 auto 60px;
  line-height: 1.6;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
`;

const StoryColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

const JourneyColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

const StoryTitle = styled.h3`
  color: ${theme.colors.navy};
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const StoryText = styled.p`
  color: ${theme.colors.darkGray};
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 16px;
`;



const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.medium};
  margin-top: ${theme.spacing.medium};
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(52, 152, 219, 0.15);
    border-color: #3498db;
  }
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.mediumGray};
  font-weight: 500;
`;

const RegistrationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.micro};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.pill};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.navy};
  margin-top: ${theme.spacing.small};
  
  svg {
    color: ${theme.colors.green};
  }
`;

// Stock Chart Components
const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.2) 0%, transparent 100%);
  margin-top: ${theme.spacing.medium};
  padding-top: ${theme.spacing.small};
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
    margin: ${theme.spacing.small} 0;
    padding: ${theme.spacing.micro};
  }
`;



const GridLines = styled.g`
  stroke: #e2e8f0;
  stroke-width: 0.5;
  opacity: 0.4;
`;



const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.95;
`;

const ChartPath = styled.path`
  fill: none;
  stroke: ${theme.colors.green};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 2px 8px rgba(56, 161, 105, 0.3));
`;

const ChartArea = styled.path`
  fill: url(#gradient);
  opacity: 0.5;
`;

const Marker = styled.circle`
  fill: ${theme.colors.green};
  stroke: #ffffff;
  stroke-width: 3;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 6px rgba(56, 161, 105, 0.4));
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
  
  const chartRef = useRef();
  const pathRef = useRef();
  const areaRef = useRef();
  const markersRef = useRef([]);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  
  const checkpointRefs = useRef([]);
  
  const milestones = ABOUT_DATA.milestones;
  
  // Generate realistic stock chart path
  const generatePath = () => {
    const width = 800;
    const height = 300;
    const padding = 60;
    
    const minValue = Math.min(...milestones.map(m => m.value));
    const maxValue = Math.max(...milestones.map(m => m.value));
    const valueRange = maxValue - minValue;
    
    const points = milestones.map((milestone, index) => {
      const x = padding + (index / (milestones.length - 1)) * (width - 2 * padding);
      const normalizedValue = (milestone.value - minValue) / valueRange;
      const y = height - padding - normalizedValue * (height - 2 * padding);
      return { x, y, ...milestone };
    });
    
    // Create smooth curve with realistic stock market fluctuations
    const pathData = points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x},${point.y}`;
      }
      const prevPoint = points[index - 1];
      const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.4;
      const cpy1 = prevPoint.y + (point.y - prevPoint.y) * 0.1;
      const cpx2 = point.x - (point.x - prevPoint.x) * 0.4;
      const cpy2 = point.y - (point.y - prevPoint.y) * 0.1;
      return `${path} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${point.x},${point.y}`;
    }, '');
    
    const areaData = `${pathData} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;
    
    // Generate grid lines
    const gridLines = [];
    const ySteps = 5;
    const xSteps = milestones.length - 1;
    
    for (let i = 0; i <= ySteps; i++) {
      const y = padding + (i / ySteps) * (height - 2 * padding);
      gridLines.push({ type: 'horizontal', y, value: maxValue - (i / ySteps) * valueRange });
    }
    
    for (let i = 0; i <= xSteps; i++) {
      const x = padding + (i / xSteps) * (width - 2 * padding);
      gridLines.push({ type: 'vertical', x, label: milestones[i]?.year });
    }
    
    return { pathData, areaData, points, gridLines, minValue, maxValue };
  };
  
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
  
  // Enhanced chart animation with ScrollTrigger
  useEffect(() => {
    if (pathRef.current && areaRef.current && chartRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      
      // Set initial state
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });
      
      gsap.set(areaRef.current, { opacity: 0 });
      gsap.set(markersRef.current.slice(0, milestones.length), { scale: 0, opacity: 0 });
      gsap.set(markersRef.current.slice(milestones.length), { opacity: 0 });
      
      // Create main ScrollTrigger for path drawing
      const pathTrigger = ScrollTrigger.create({
        trigger: chartRef.current,
        start: 'top 60%',
        end: 'top 10%',
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Animate path drawing based on scroll
          gsap.set(pathRef.current, {
            strokeDashoffset: pathLength * (1 - progress)
          });
          
          // Animate area fill
          gsap.set(areaRef.current, {
            opacity: progress * 0.6
          });
          
          // Show markers and milestone boxes progressively
          markersRef.current.forEach((element, index) => {
            if (index < milestones.length) {
              // Handle markers
              const markerProgress = (progress * milestones.length) - index;
              const shouldShow = markerProgress > 0;
              const scale = shouldShow ? Math.min(1, markerProgress * 2) : 0;
              
              if (element) {
                gsap.set(element, {
                  scale: scale,
                  opacity: shouldShow ? 1 : 0
                });
              }
            } else {
              // Handle milestone boxes
              const boxIndex = index - milestones.length;
              const boxProgress = (progress * milestones.length) - boxIndex;
              const shouldShow = boxProgress > 0.2;
              
              if (element) {
                gsap.set(element, {
                  opacity: shouldShow ? Math.min(1, (boxProgress - 0.2) * 3) : 0
                });
              }
            }
          });
        }
      });
      
      return () => {
        pathTrigger.kill();
      };
    }
  }, [milestones.length]);
  

  
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
  
  const { pathData, areaData, points, gridLines, minValue, maxValue } = generatePath();
  
  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionHeader>
          <AnimatedSection animation="fade-in" delay={0.2}>
            <SectionTitle>
              {ABOUT_DATA.title}
            </SectionTitle>
          </AnimatedSection>
          <AnimatedSection animation="fade-in" delay={0.4}>
            <SectionSubtitle>
              {ABOUT_DATA.subtitle}
            </SectionSubtitle>
          </AnimatedSection>
        </SectionHeader>
        
        <ContentWrapper
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <AnimatedSection animation="slide-in-left" delay={0.6}>
            <StoryColumn>
              <StoryTitle>{ABOUT_DATA.story.title}</StoryTitle>
              <div>
                {ABOUT_DATA.story.paragraphs.map((paragraph, index) => (
                  <StoryText key={index}>
                    {paragraph}
                  </StoryText>
                ))}
              </div>
            

            
            {/* <RegistrationBadge>
              <ShieldIcon />
              SEBI Registered Stock Broker
            </RegistrationBadge> */}
            
              {/* <StatsContainer>
                <StatCard className="hover-lift">
                  <StatNumber className="counter-value" data-target="25000">0</StatNumber>
                  <StatLabel>Active Investors</StatLabel>
                </StatCard>
                <StatCard className="hover-lift">
                  <StatNumber className="counter-value" data-target="500">0</StatNumber>
                  <StatLabel>Crores Managed</StatLabel>
                </StatCard>
              </StatsContainer> */}
            </StoryColumn>
          </AnimatedSection>
          
          {/* <AnimatedSection animation="slide-in-right" delay={0.8}> */}
            <JourneyColumn>
            
            <ChartContainer ref={chartRef}>

              
              <ChartSvg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet" style={{
                transform: window.innerWidth <= 768 ? 'scale(1.2)' : 'scale(1)'
              }}>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.colors.green} stopOpacity="0.3" />
                    <stop offset="30%" stopColor={theme.colors.green} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={theme.colors.green} stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid Lines */}
                <GridLines>
                  {gridLines.map((line, index) => 
                    line.type === 'vertical' ? (
                      <line key={index} x1={line.x} y1="60" x2={line.x} y2="240" />
                    ) : null
                  )}
                </GridLines>
                
                <ChartArea ref={areaRef} d={areaData} />
                <ChartPath ref={pathRef} d={pathData} />
                
                {points.map((point, index) => {
                  const isEven = index % 2 === 0;
                  const boxY = isEven ? point.y - 40 : point.y + 15;
                  
                  return (
                    <g key={index}>
                      <Marker
                        ref={el => markersRef.current[index] = el}
                        cx={point.x}
                        cy={point.y}
                        r="6"
                      />
                      {/* Checkpoint Box */}
                      <g ref={el => markersRef.current[index + milestones.length] = el}>
                        <rect
                          x={point.x - (window.innerWidth <= 768 ? 70 : 60)}
                          y={boxY}
                          width={window.innerWidth <= 768 ? "140" : "120"}
                          height={window.innerWidth <= 768 ? "40" : "35"}
                          fill="rgba(255, 255, 255, 0.98)"
                          stroke={theme.colors.green}
                          strokeWidth="1.5"
                          rx="6"
                          filter="drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
                        />
                        <text
                          x={point.x}
                          y={boxY + 10}
                          textAnchor="middle"
                          fontSize={window.innerWidth <= 768 ? "11" : "9"}
                          fill={theme.colors.green}
                          fontWeight="600"
                        >
                          {point.date}
                        </text>
                        <text
                          x={point.x}
                          y={boxY + 22}
                          textAnchor="middle"
                          fontSize={window.innerWidth <= 768 ? "12" : "10"}
                          fill="#1e293b"
                          fontWeight="600"
                        >
                          {point.title}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </ChartSvg>
              

            </ChartContainer>
            </JourneyColumn>
          {/* </AnimatedSection> */}
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default AboutUs;