import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

const GridSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.medium}`};
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  
  .section-header {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    
    h2 {
      font-family: ${({ theme }) => theme.typography.fontFamily.primary};
      font-size: ${({ theme }) => theme.typography.fontSize.header};
      font-weight: ${({ theme }) => theme.typography.fontWeight.ultraBold};
      color: ${({ theme }) => theme.colors.navy};
      margin-bottom: ${({ theme }) => theme.spacing.small};
    }
    
    p {
      font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
      font-size: ${({ theme }) => theme.typography.fontSize.body};
      color: ${({ theme }) => theme.colors.darkGray};
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(10, 2fr);
    gap: ${({ theme }) => theme.spacing.small};
    min-height: 100vh;
    max-width: 1600px;
    margin: 0 auto;
    
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(7, 200px);
    }
  }
  
  .product-card {
    border-radius: ${({ theme }) => theme.borderRadius.large};
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    will-change: transform;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: ${({ theme }) => theme.shadows.xl};
    }
    
    &:nth-child(1) { grid-area: 1 / 1 / 7 / 10; }
    &:nth-child(2) { grid-area: 7 / 1 / 15 / 13; }
    &:nth-child(3) { grid-area: 1 / 10 / 4 / 21; }
    &:nth-child(4) { grid-area: 4 / 10 / 7 / 21; }
    &:nth-child(5) { grid-area: 7 / 13 / 18 / 21; }
    &:nth-child(6) { grid-area: 15 / 1 / 18 / 13; }
    
    .card-content {
      width: 100%;
      height: 100%;
      padding: ${({ theme }) => theme.spacing.medium};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      &.trading { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.navy}); }
      &.analytics { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.green}); }
      &.portfolio { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.success}); }
      &.research { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.gold}); }
      &.mobile { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.info}); }
      &.advisory { background: linear-gradient(135deg, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.warning}); }
      
      .card-icon {
        width: 60px;
        height: 60px;
        background: ${({ theme }) => theme.colors.navy};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: ${({ theme }) => theme.spacing.small};
        
        &::after {
          content: '';
          width: 24px;
          height: 24px;
          background: ${({ theme }) => theme.colors.white};
          border-radius: 4px;
        }
      }
      
      h3 {
        font-family: ${({ theme }) => theme.typography.fontFamily.primary};
        font-size: clamp(1.2rem, 3vw, 1.8rem);
        font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
        color: ${({ theme }) => theme.colors.navy};
        margin-bottom: ${({ theme }) => theme.spacing.micro};
      }
      
      p {
        font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
        font-size: clamp(0.9rem, 2vw, 1rem);
        color: ${({ theme }) => theme.colors.darkGray};
        line-height: 1.4;
        margin-bottom: ${({ theme }) => theme.spacing.small};
        flex: 1;
      }
      
      .card-cta {
        display: inline-flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.navy};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
        font-size: clamp(0.9rem, 2vw, 1rem);
        text-decoration: none;
        transition: ${({ theme }) => theme.transitions.medium};
        
        &:hover {
          color: ${({ theme }) => theme.colors.darkNavy};
          transform: translateX(4px);
        }
        
        &::after {
          content: '→';
          margin-left: 8px;
          transition: ${({ theme }) => theme.transitions.medium};
        }
      }
    }
  }
  
  @media (max-width: 767px) {
    padding: ${({ theme }) => `${theme.spacing.large} ${theme.spacing.small}`};
    
    .section-header h2 { font-size: 2rem; }
    .product-card:nth-child(n) { grid-area: auto; }
  }
`

const PRODUCTS = [
  { id: 1, title: 'Equity Trading', description: 'Buy and sell stocks with advanced charting tools and real-time market data for informed investment decisions', type: 'trading', link: '#equity' },
  { id: 2, title: 'Derivatives Trading', description: 'Trade futures and options with professional risk management tools', type: 'analytics', link: '#derivatives' },
  { id: 3, title: 'IPO Investment', description: 'Apply for IPOs with seamless ASBA process and instant updates', type: 'research', link: '#ipo' },
  { id: 4, title: 'Research Reports', description: 'Expert stock recommendations and detailed market analysis', type: 'mobile', link: '#research' },
  { id: 5, title: 'Portfolio & SIP', description: 'Monitor investments with detailed P&L analysis and start SIP with as low as ₹500 per month', type: 'advisory', link: '#portfolio-sip' },
  { id: 6, title: 'Mutual Funds', description: 'Diversified portfolio investments with expert fund selection', type: 'portfolio', link: '#mutualfunds' }
]

const ProductGrid = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  const animationConfig = useMemo(() => ({
    header: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 },
      trigger: { start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
    },
    cards: {
      from: { opacity: 0, scale: 0.8, y: 60 },
      to: { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: { amount: 1.2, from: 'random' } },
      trigger: { start: 'top 85%', end: 'bottom 15%', toggleActions: 'play none none reverse' }
    }
  }), [])

  const setupHoverAnimations = useCallback(() => {
    cardsRef.current.forEach(card => {
      if (!card) return
      
      const icon = card.querySelector('.card-icon')
      const content = card.querySelector('.card-content')
      
      const handleMouseEnter = () => {
        gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(content, { y: -5, duration: 0.3, ease: 'power2.out' })
      }
      
      const handleMouseLeave = () => {
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' })
        gsap.to(content, { y: 0, duration: 0.3, ease: 'power2.out' })
      }
      
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const { header, cards } = animationConfig
      
      gsap.fromTo(headerRef.current.children, header.from, {
        ...header.to,
        scrollTrigger: { trigger: headerRef.current, ...header.trigger }
      })

      gsap.fromTo(cardsRef.current, cards.from, {
        ...cards.to,
        scrollTrigger: { trigger: '.products-grid', ...cards.trigger }
      })

      setupHoverAnimations()
    }, sectionRef)

    return () => ctx.revert()
  }, [animationConfig, setupHoverAnimations])

  const ProductCard = ({ product, index }) => (
    <div 
      className="product-card"
      ref={el => cardsRef.current[index] = el}
    >
      <div className={`card-content ${product.type}`}>
        <div className="card-icon" />
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <a href={product.link} className="card-cta">Learn More</a>
        </div>
      </div>
    </div>
  )

  return (
    <GridSection ref={sectionRef}>
      <div className="section-header" ref={headerRef}>
        <h2>Our Product Suite</h2>
        <p>Comprehensive financial solutions designed to empower your investment journey</p>
      </div>
      
      <div className="products-grid">
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </GridSection>
  )
}

export default ProductGrid