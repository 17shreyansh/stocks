import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { gsap } from 'gsap'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SliderContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
  
  .slide-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    max-width: 800px;
    padding: 0 2rem;
  }
  
  .slide-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.1;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  
  .slide-subtitle {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.4;
  }
  
  .slide-cta {
    display: inline-block;
    padding: 1rem 2.5rem;
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    transition: all 0.3s ease;
    
    &:after {
      font-size: 20px;
    }
    
    &:hover {
      background: rgba(255,255,255,0.2);
      transform: scale(1.1);
    }
  }
  
  .swiper-pagination {
    bottom: 30px;
    
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background: rgba(255,255,255,0.5);
      opacity: 1;
      margin: 0 8px;
      transition: all 0.3s ease;
      
      &.swiper-pagination-bullet-active {
        background: #ff6b35;
        transform: scale(1.3);
      }
    }
  }
  
  @media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 50px;
      height: 50px;
      margin-top: -25px;
      
      &:after {
        font-size: 16px;
      }
    }
  }
`

const slides = [
  {
    id: 1,
    background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Trade with Confidence',
    subtitle: 'Advanced trading platform with real-time analytics and professional tools',
    cta: 'Start Trading',
    ctaLink: '#trading'
  },
  {
    id: 2,
    background: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Smart Investment Solutions',
    subtitle: 'Diversify your portfolio with our expert-curated investment opportunities',
    cta: 'Explore Investments',
    ctaLink: '#investments'
  },
  {
    id: 3,
    background: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Market Intelligence',
    subtitle: 'Stay ahead with cutting-edge market analysis and insights',
    cta: 'Learn More',
    ctaLink: '#insights'
  }
]

const HeroSlider = () => {
  const swiperRef = useRef(null)
  const contentRefs = useRef([])

  const animateSlideIn = (slideIndex) => {
    const content = contentRefs.current[slideIndex]
    if (!content) return

    const title = content.querySelector('.slide-title')
    const subtitle = content.querySelector('.slide-subtitle')
    const cta = content.querySelector('.slide-cta')

    gsap.set([title, subtitle, cta], { opacity: 0, y: 50 })
    
    const tl = gsap.timeline()
    tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2')
  }

  const animateSlideOut = (slideIndex) => {
    const content = contentRefs.current[slideIndex]
    if (!content) return

    const elements = content.querySelectorAll('.slide-title, .slide-subtitle, .slide-cta')
    gsap.to(elements, { 
      opacity: 0, 
      y: -30, 
      duration: 0.4, 
      ease: 'power2.in',
      stagger: 0.1
    })
  }

  useEffect(() => {
    // Animate first slide on mount
    setTimeout(() => animateSlideIn(0), 500)
  }, [])

  const handleSlideChange = (swiper) => {
    const { activeIndex, previousIndex } = swiper
    
    if (previousIndex !== undefined) {
      animateSlideOut(previousIndex)
    }
    
    setTimeout(() => animateSlideIn(activeIndex), 300)
  }

  return (
    <SliderContainer>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <div className="slide-overlay" />
            <div 
              className="slide-content"
              ref={el => contentRefs.current[index] = el}
            >
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <a href={slide.ctaLink} className="slide-cta">
                {slide.cta}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  )
}

export default HeroSlider