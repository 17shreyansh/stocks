import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { theme } from '../../styles/theme';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const TestimonialsSection = styled.section`
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

const TestimonialsWrapper = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TestimonialSlider = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.small} 0;
`;

const TestimonialTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.medium};
  padding: ${theme.spacing.medium};
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${theme.spacing.medium};
  }
`;

const TestimonialImageColumn = styled.div`
  margin-bottom: ${theme.spacing.small};
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex: 0 0 150px;
    margin-bottom: 0;
  }
`;

const TestimonialImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${theme.colors.lightGray};
  overflow: hidden;
  margin: 0 auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
    margin: 0;
  }
  
  /* Placeholder for actual image */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.navy};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const TestimonialContentColumn = styled.div`
  flex: 1;
`;

const QuoteIcon = styled.div`
  color: ${theme.colors.green};
  margin-bottom: ${theme.spacing.small};
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const TestimonialQuote = styled.blockquote`
  font-size: ${theme.typography.fontSize.body};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.medium};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  margin-bottom: ${theme.spacing.micro};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
`;

const TestimonialRole = styled.div`
  font-size: ${theme.typography.fontSize.small};
  color: ${theme.colors.mediumGray};
  margin-bottom: ${theme.spacing.small};
`;

const TestimonialResult = styled.div`
  display: inline-block;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.small};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border-radius: ${theme.borderRadius.pill};
`;

const TestimonialRating = styled.div`
  display: flex;
  gap: 2px;
  margin-top: ${theme.spacing.small};
  color: #FFB800;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.small};
  margin-top: ${theme.spacing.medium};
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.medium};
  color: ${theme.colors.navy};
  
  &:hover {
    background-color: ${theme.colors.navy};
    color: ${theme.colors.white};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background-color: ${theme.colors.white};
      color: ${theme.colors.navy};
    }
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.micro};
  margin-top: ${theme.spacing.medium};
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? theme.colors.navy : theme.colors.lightGray};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all ${theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.$active ? theme.colors.navy : theme.colors.mediumGray};
  }
`;

// SVG Icons
const QuoteIconSvg = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.33333 14.6667H4V9.33334H9.33333V14.6667ZM9.33333 22.6667H4V17.3333H9.33333V22.6667ZM17.3333 14.6667H12V9.33334H17.3333V14.6667ZM17.3333 22.6667H12V17.3333H17.3333V22.6667ZM25.3333 14.6667H20V9.33334H25.3333V14.6667ZM25.3333 22.6667H20V17.3333H25.3333V22.6667Z" fill="currentColor"/>
  </svg>
);

const StarIconFilled = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00004 1.33334L10.06 5.50668L14.6667 6.18001L11.3334 9.42668L12.12 14.0133L8.00004 11.8467L3.88004 14.0133L4.66671 9.42668L1.33337 6.18001L5.94004 5.50668L8.00004 1.33334Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const controls = useAnimation();
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: true 
  });
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: 'IT Professional',
      quote: 'Focus Stock Brokers has transformed my investment journey. Their platform is intuitive, and the zero brokerage on delivery trades has significantly improved my returns.',
      result: '23% returns in 8 months',
      rating: 5,
      image: 'rajesh.jpg',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Business Owner',
      quote: 'As a busy entrepreneur, I needed a trading platform that was both powerful and easy to use. Focus Stock delivers exactly that, with excellent customer support whenever I need assistance.',
      result: '18% portfolio growth',
      rating: 5,
      image: 'priya.jpg',
    },
    {
      id: 3,
      name: 'Amit Verma',
      role: 'Retired Professor',
      quote: 'The advisory services at Focus Stock have been invaluable for my retirement planning. Their research team provides insights that have helped me make informed decisions.',
      result: 'Consistent 15% annual returns',
      rating: 4,
      image: 'amit.jpg',
    },
  ];
  
  // Animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Handle slide change
  useEffect(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -currentIndex * 100 + '%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [currentIndex]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
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
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <TestimonialsSection id="testimonials" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            What Our Clients Say
          </SectionTitle>
          <SectionSubtitle
            initial="hidden"
            animate={controls}
            variants={headerVariants}
          >
            Real stories from real investors who trust Focus Stock Brokers
          </SectionSubtitle>
        </SectionHeader>
        
        <TestimonialsWrapper>
          <TestimonialSlider>
            <TestimonialTrack
              ref={trackRef}
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  style={{ width: `${100 / testimonials.length}%` }}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <TestimonialImageColumn>
                    <TestimonialImage>
                      {testimonial.name.charAt(0)}
                    </TestimonialImage>
                  </TestimonialImageColumn>
                  
                  <TestimonialContentColumn>
                    <QuoteIcon>
                      <QuoteIconSvg />
                    </QuoteIcon>
                    
                    <TestimonialQuote>
                      {testimonial.quote}
                    </TestimonialQuote>
                    
                    <TestimonialAuthor>{testimonial.name}</TestimonialAuthor>
                    <TestimonialRole>{testimonial.role}</TestimonialRole>
                    
                    <TestimonialResult>{testimonial.result}</TestimonialResult>
                    
                    <TestimonialRating>
                      {[...Array(5)].map((_, i) => (
                        <StarIconFilled key={i} />
                      ))}
                    </TestimonialRating>
                  </TestimonialContentColumn>
                </TestimonialCard>
              ))}
            </TestimonialTrack>
          </TestimonialSlider>
          
          <NavigationButtons>
            <NavButton onClick={handlePrev} aria-label="Previous testimonial">
              <ArrowLeftIcon />
            </NavButton>
            <NavButton onClick={handleNext} aria-label="Next testimonial">
              <ArrowRightIcon />
            </NavButton>
          </NavigationButtons>
          
          <Indicators>
            {testimonials.map((_, index) => (
              <Indicator
                key={index}
                $active={index === currentIndex}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </Indicators>
        </TestimonialsWrapper>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;