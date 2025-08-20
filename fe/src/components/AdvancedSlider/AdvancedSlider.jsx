import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { gsap } from 'gsap'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

// Component Data Constants
const SLIDER_DATA = {
  header: {
    title: "Our Financial Services",
    subtitle: "Comprehensive solutions tailored for your investment success"
  },
  slides: [
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
};

const SliderSection = styled.section`
  position: relative;
  min-height: auto;
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
  padding: 60px 0 40px 0;
  overflow: visible;
  
  .swiper {
    width: 100%;
    height: 60vh;
    padding: 40px 0 60px 0;
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
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(45,63,89,0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(45,63,89,0.8) 0%, transparent 50%, rgba(45,63,89,0.9) 100%);
      z-index: 1;
    }
    
    &.swiper-slide-active {
      transform: scale(1.05);
      box-shadow: 0 20px 40px rgba(45,63,89,0.2);
    }
  }
  
  .slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    z-index: 2;
    color: white;
    background: linear-gradient(transparent, rgba(0,0,0,0.6));
  }
  
  .slide-title {
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-size: 1.8rem;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin-bottom: 0.5rem;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    opacity: 1;
    transform: translateY(0);
  }
  
  .slide-subtitle {
    font-family: ${props => props.theme.typography.fontFamily.secondary};
    font-size: 1rem;
    font-weight: ${props => props.theme.typography.fontWeight.regular};
    opacity: 1;
    margin-bottom: 1.5rem;
    line-height: 1.4;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
    transform: translateY(0);
  }
  
  .slide-cta {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    opacity: 1;
    transform: translateY(0) scale(1);
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
      background: linear-gradient(135deg, #2980b9, #1f5f8b);
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    background: linear-gradient(135deg, #3498db, #2980b9);
    border-radius: 12px;
    width: 50px;
    height: 50px;
    top: 50%;
    margin-top: -25px;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    transition: all 0.2s ease;
    
    &:after {
      font-size: 16px;
      font-weight: 700;
    }
    
    &:hover {
      background: linear-gradient(135deg, #2980b9, #1f5f8b);
      transform: scale(1.1);
    }
  }
  
  .swiper-pagination {
    display: none;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.large};
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h2 {
      font-size: 48px;
      font-weight: 700;
      color: #1a2b4e;
      margin-bottom: 16px;
      letter-spacing: -1px;
      
      @media (max-width: 768px) {
        font-size: 36px;
      }
    }
    
    p {
      font-size: 20px;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto 60px;
      line-height: 1.6;
      
      @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 40px;
      }
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
    
    gsap.set([title, subtitle, cta], { opacity: 1, y: 0, scale: 1 })
  }

  const handleSlideChange = (swiper) => {
    contentRefs.current.forEach(content => {
      if (content) {
        const title = content.querySelector('.slide-title')
        const subtitle = content.querySelector('.slide-subtitle')
        const cta = content.querySelector('.slide-cta')
        gsap.set([title, subtitle, cta], { opacity: 1, y: 0, scale: 1 })
      }
    })
  }

  return (
    <SliderSection ref={sectionRef}>
      <div className="section-header" ref={headerRef}>
        <h2>{SLIDER_DATA.header.title}</h2>
        <p>{SLIDER_DATA.header.subtitle}</p>
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
        speed={600}
        onSlideChange={handleSlideChange}
      >
        {SLIDER_DATA.slides.map((slide, index) => (
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