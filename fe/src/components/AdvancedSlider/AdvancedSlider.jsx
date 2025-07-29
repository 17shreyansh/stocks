import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { gsap } from 'gsap'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const SliderSection = styled.section`
  position: relative;
  min-height: 100vh;
  // background: ${props => props.theme.colors.platinum};
  padding: ${props => props.theme.spacing.xl} 0;
  overflow: visible;
  
  .swiper {
    width: 100%;
    height: 75vh;
    padding: 80px 0 120px 0;
    overflow: visible;
  }
  
  .swiper-wrapper {
    overflow: visible;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 600px;
    height: 400px;
    border-radius: ${props => props.theme.borderRadius.large};
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(45,63,89,0.15);
    transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(45,63,89,0.8) 0%, transparent 50%, rgba(45,63,89,0.9) 100%);
      z-index: 1;
      transition: all 1s ease;
    }
    
    &.swiper-slide-active {
      transform: scale(1.05) translateZ(0);
      box-shadow: 0 20px 60px rgba(45,63,89,0.25), 0 8px 25px rgba(45,63,89,0.15);
      
      &::before {
        background: linear-gradient(135deg, rgba(45,63,89,0.5) 0%, transparent 50%, rgba(45,63,89,0.6) 100%);
      }
    }
  }
  
  .slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    z-index: 2;
    color: ${props => props.theme.colors.white};
    background: linear-gradient(transparent, rgba(0,0,0,0.4));
    backdrop-filter: blur(2px);
  }
  
  .slide-title {
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-size: 1.8rem;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin-bottom: 0.5rem;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    transform: translateY(0);
  }
  
  .slide-subtitle {
    font-family: ${props => props.theme.typography.fontFamily.secondary};
    font-size: 1rem;
    font-weight: ${props => props.theme.typography.fontWeight.regular};
    opacity: 0.95;
    margin-bottom: 1.5rem;
    line-height: 1.4;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
    transform: translateY(0);
  }
  
  .slide-cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: ${props => props.theme.colors.green};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    border-radius: ${props => props.theme.borderRadius.pill};
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-weight: ${props => props.theme.typography.fontWeight.semiBold};
    font-size: 0.9rem;
    transition: ${props => props.theme.transitions.medium};
    box-shadow: ${props => props.theme.shadows.medium};
    transform: translateY(0);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.large};
      background: ${props => props.theme.colors.success};
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: ${props => props.theme.colors.navy};
    background: ${props => props.theme.colors.white};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    box-shadow: ${props => props.theme.shadows.medium};
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    
    &:after {
      font-size: 20px;
      font-weight: 900;
    }
    
    &:hover {
      background: ${props => props.theme.colors.navy};
      color: ${props => props.theme.colors.white};
      transform: scale(1.1);
      box-shadow: ${props => props.theme.shadows.large};
    }
  }
  
  .swiper-pagination {
    bottom: 30px;
    
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background: ${props => props.theme.colors.mediumGray};
      opacity: 1;
      margin: 0 8px;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      
      &.swiper-pagination-bullet-active {
        background: ${props => props.theme.colors.green};
        transform: scale(1.3);
      }
    }
  }
  
  .section-header {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.large};
    
    h2 {
      font-family: ${props => props.theme.typography.fontFamily.primary};
      font-size: ${props => props.theme.typography.fontSize.header};
      font-weight: ${props => props.theme.typography.fontWeight.ultraBold};
      color: ${props => props.theme.colors.navy};
      margin-bottom: ${props => props.theme.spacing.small};
      line-height: ${props => props.theme.typography.lineHeight.tight};
    }
    
    p {
      font-family: ${props => props.theme.typography.fontFamily.secondary};
      font-size: ${props => props.theme.typography.fontSize.body};
      color: ${props => props.theme.colors.darkGray};
      max-width: 600px;
      margin: 0 auto;
      line-height: ${props => props.theme.typography.lineHeight.normal};
    }
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.medium} 0;
    min-height: 80vh;
    
    .swiper {
      height: 50vh;
      padding: 40px 0 60px 0;
    }
    
    .swiper-slide {
      width: 280px;
      height: 200px;
      box-shadow: 0 4px 15px rgba(45,63,89,0.2);
      
      &.swiper-slide-active {
        transform: scale(1.02) translateZ(0);
        box-shadow: 0 8px 25px rgba(45,63,89,0.3);
      }
    }
    
    .slide-content {
      padding: 1rem;
    }
    
    .slide-title {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
    
    .slide-subtitle {
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    
    .slide-cta {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
    
    .swiper-button-next,
    .swiper-button-prev {
      width: 40px;
      height: 40px;
      margin-top: -20px;
      
      &:after {
        font-size: 14px;
      }
    }
    
    .swiper-pagination {
      bottom: 15px;
      
      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        margin: 0 4px;
      }
    }
    
    .section-header {
      margin-bottom: ${props => props.theme.spacing.medium};
      padding: 0 1rem;
      
      h2 {
        font-size: 1.8rem;
      }
      
      p {
        font-size: 0.9rem;
      }
    }
  }
`

const slides = [
  {
    id: 1,
    background: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Portfolio Management',
    subtitle: 'Professional portfolio analysis and optimization',
    cta: 'Learn More',
    ctaLink: '#portfolio'
  },
  {
    id: 2,
    background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Trading Platform',
    subtitle: 'Advanced tools for professional trading',
    cta: 'Start Trading',
    ctaLink: '#trading'
  },
  {
    id: 3,
    background: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Market Analysis',
    subtitle: 'Real-time market insights and research',
    cta: 'View Reports',
    ctaLink: '#analysis'
  },
  {
    id: 4,
    background: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Investment Advisory',
    subtitle: 'Expert guidance for your financial goals',
    cta: 'Get Advice',
    ctaLink: '#advisory'
  },
  {
    id: 5,
    background: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Wealth Management',
    subtitle: 'Comprehensive wealth planning services',
    cta: 'Explore',
    ctaLink: '#wealth'
  }
]

const AdvancedSlider = () => {
  const swiperRef = useRef(null)
  const contentRefs = useRef([])
  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const tl = gsap.timeline()
    
    tl.fromTo(headerRef.current.children, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    )
    .fromTo(sectionRef.current.querySelector('.swiper'), 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.5'
    )
    
    setTimeout(() => animateSlideContent(0), 1200)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const animateSlideContent = (index) => {
    const content = contentRefs.current[index]
    if (!content) return

    const title = content.querySelector('.slide-title')
    const subtitle = content.querySelector('.slide-subtitle')
    const cta = content.querySelector('.slide-cta')
    
    const tl = gsap.timeline()
    tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo(cta, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
  }

  const handleSlideChange = (swiper) => {
    contentRefs.current.forEach(content => {
      if (content) {
        gsap.set(content.querySelector('.slide-title'), { opacity: 0, y: 30 })
        gsap.set(content.querySelector('.slide-subtitle'), { opacity: 0, y: 20 })
        gsap.set(content.querySelector('.slide-cta'), { opacity: 0, scale: 0.8 })
      }
    })
    
    setTimeout(() => animateSlideContent(swiper.activeIndex), 300)
  }

  return (
    <SliderSection ref={sectionRef}>
      <div className="section-header" ref={headerRef}>
        <h2>Our Financial Services</h2>
        <p>Comprehensive solutions tailored for your investment success</p>
      </div>
      
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}

        coverflowEffect={{
          rotate: isMobile ? 15 : 20,
          stretch: isMobile ? -20 : -50,
          depth: isMobile ? 100 : 200,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={isMobile ? 1.3 : 1.8}
        spaceBetween={isMobile ? 15 : 30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <div 
              className="slide-content"
              ref={el => contentRefs.current[index] = el}
            >
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <a href={slide.ctaLink} className="slide-cta">
                {slide.cta}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderSection>
  )
}

export default AdvancedSlider