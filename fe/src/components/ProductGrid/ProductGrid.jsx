import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from '../../utils/axios'

// Component Data Constants
const PRODUCT_GRID_DATA = {
  header: {
    title: "Our Product Suite",
    subtitle: "Comprehensive financial solutions designed to empower your investment journey"
  },
  products: [
    { id: 1, title: 'Equity Trading', description: 'Buy and sell stocks with advanced charting tools and real-time market data for informed investment decisions', type: 'trading', link: '/products' },
    { id: 2, title: 'Derivatives Trading', description: 'Trade futures and options with professional risk management tools', type: 'analytics', link: '/products' },
    { id: 3, title: 'IPO Investment', description: 'Apply for IPOs with seamless ASBA process and instant updates', type: 'research', link: '/products' },
    { id: 4, title: 'Research Reports', description: 'Expert stock recommendations and detailed market analysis', type: 'mobile', link: '/products' },
    { id: 5, title: 'Portfolio & SIP', description: 'Monitor investments with detailed P&L analysis and start SIP with as low as ₹500 per month', type: 'advisory', link: '/products' },
    { id: 6, title: 'Mutual Funds', description: 'Diversified portfolio investments with expert fund selection', type: 'portfolio', link: '/products' }
  ]
};

const GridSection = styled.section`
  padding: 80px 40px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.platinum} 0%, ${({ theme }) => theme.colors.white} 100%);
  margin: 40px 20px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    margin: 20px 16px;
    padding: 60px 24px;
    border-radius: 20px;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h2 {
      font-size: 48px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.navy};
      margin-bottom: 16px;
      letter-spacing: -0.02em;
      
      @media (max-width: 768px) {
        font-size: 36px;
      }
    }
    
    p {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.darkGray};
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
  
  .product-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border-color: ${({ theme }) => theme.colors.green};
    }
    
    .card-content {
      h3 {
        font-size: 24px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.navy};
        margin-bottom: 16px;
        line-height: 1.2;
      }
      
      p {
        font-size: 16px;
        color: ${({ theme }) => theme.colors.darkGray};
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .card-cta {
        display: inline-flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.green};
        font-weight: 600;
        font-size: 16px;
        text-decoration: none;
        
        &::after {
          content: '→';
          margin-left: 8px;
          transition: transform 0.2s ease;
        }
        
        &:hover::after {
          transform: translateX(4px);
        }
      }
    }
  }
  

`



const ProductGrid = ({ data: propData }) => {
  const [productGridData, setProductGridData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const gridData = productGridData || propData || PRODUCT_GRID_DATA;

  useEffect(() => {
    fetchProductGridData();
  }, []);

  const fetchProductGridData = async () => {
    try {
      const response = await axios.get('/productGrid/homepage');
      if (response.data.success && response.data.data) {
        setProductGridData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch product grid data:', error);
    } finally {
      setLoading(false);
    }
  };
  const ProductCard = ({ product }) => {
    const uniqueLink = product.link.includes('#') ? product.link : `${product.link}#service-${product.id}`;
    return (
      <div className="product-card">
        <div className="card-content">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <a href={uniqueLink} className="card-cta" aria-label={`Services for ${product.title}`}>Learn More</a>
        </div>
      </div>
    );
  }

  return (
    <GridSection>
      <div className="section-header">
        <h2>{gridData.header.title}</h2>
        <p>{gridData.header.subtitle}</p>
      </div>
      
      <div className="products-grid">
        {gridData.products.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </GridSection>
  )
}

export default ProductGrid