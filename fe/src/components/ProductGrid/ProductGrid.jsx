import React from 'react'
import styled from 'styled-components'

const GridSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.medium}`};
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  overflow: hidden;
  
  .section-header {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    
    h2 {
      font-family: ${({ theme }) => theme.typography.fontFamily.primary};
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 700;
      background: linear-gradient(135deg, #1e293b, #334155);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: ${({ theme }) => theme.spacing.medium};
      letter-spacing: -0.02em;
    }
    
    p {
      font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
      font-size: 1.125rem;
      color: #64748b;
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(10, 2fr);
    gap: 24px;
    min-height: 100vh;
    max-width: 1600px;
    margin: 0 auto;
    
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(7, 280px);
      gap: 20px;
    }
  }
  
  .product-card {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    background: white;
    
    &.mutual-funds {
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-color: #cbd5e1;
      }
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
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: white;
      
      h3 {
        font-family: ${({ theme }) => theme.typography.fontFamily.primary};
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 16px;
        letter-spacing: -0.025em;
        line-height: 1.1;
      }
      
      p {
        font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
        font-size: clamp(1rem, 2vw, 1.125rem);
        color: #475569;
        line-height: 1.7;
        margin-bottom: auto;
      }
      
      .card-cta {
        display: inline-flex;
        align-items: center;
        color: #0f172a;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        margin-top: 32px;
        
        &::after {
          content: '→';
          margin-left: 8px;
          font-size: 1.1em;
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
  const ProductCard = ({ product, index }) => (
    <div className={`product-card ${product.type === 'portfolio' ? 'mutual-funds' : ''}`}>
      <div className={`card-content ${product.type}`}>
        {product.type === 'portfolio' ? (
          <a href={product.link} className="card-cta" style={{ margin: 'auto', fontSize: '1.5rem' }}>Learn More</a>
        ) : (
          <>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </>
        )}
      </div>
    </div>
  )

  return (
    <GridSection>
      <div className="section-header">
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