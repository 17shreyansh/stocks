import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../styles/theme'
import axios from '../utils/axios'

const ProductPageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  padding-top: 120px;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.darkNavy} 100%);
  color: white;
  padding: 100px 40px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
  
  h1 {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    
    @media (max-width: 768px) {
      font-size: 36px;
    }
  }
  
  p {
    font-size: 20px;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    opacity: 0.9;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`

const Section = styled.section`
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    h2 {
      font-size: 42px;
      font-weight: 700;
      color: ${theme.colors.navy};
      margin-bottom: 16px;
      
      @media (max-width: 768px) {
        font-size: 32px;
      }
    }
    
    p {
      font-size: 18px;
      color: ${theme.colors.darkGray};
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
`

const ServiceCard = styled.div`
  background: white;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${theme.colors.green};
    box-shadow: 0 4px 16px rgba(0, 119, 255, 0.08);
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    color: ${theme.colors.navy};
    margin-bottom: 16px;
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background: ${theme.colors.green};
      border-radius: 2px;
    }
  }
  
  .service-description {
    font-size: 16px;
    color: ${theme.colors.darkGray};
    line-height: 1.6;
    margin-bottom: 24px;
  }
  
  .service-features {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 8px 0;
      color: ${theme.colors.darkGray};
      position: relative;
      padding-left: 24px;
      
      &::before {
        content: '•';
        color: ${theme.colors.green};
        font-weight: bold;
        position: absolute;
        left: 0;
        font-size: 16px;
      }
    }
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const ProductCard = styled.div`
  background: ${theme.colors.platinum};
  border-radius: 16px;
  padding: 32px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: ${theme.colors.green};
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }
  
  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${theme.colors.navy};
    margin-bottom: 12px;
  }
  
  .product-description {
    font-size: 15px;
    color: ${theme.colors.darkGray};
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .product-features {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 6px 0;
      color: ${theme.colors.darkGray};
      font-size: 14px;
      position: relative;
      padding-left: 20px;
      
      &::before {
        content: '?';
        color: ${theme.colors.green};
        font-weight: bold;
        position: absolute;
        left: 0;
        font-size: 12px;
      }
    }
  }
`



const ProductPage = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get('/pages/product');
      setPageData(response.data.data?.product);
    } catch (error) {
      console.error('Error fetching product page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '200px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!pageData) {
    return <div style={{ padding: '200px', textAlign: 'center' }}>Error loading page</div>;
  }

  const services = pageData.services || [
    {
      title: 'Equity Trading – NSE & BSE',
      description: 'Buy and sell shares seamlessly across India\'s two leading stock exchanges. Whether you\'re an active trader or a long-term investor, we provide you with research-driven ideas and a smooth execution experience.',
      features: []
    },
    {
      title: 'Derivatives (F&O) Trading',
      description: 'Access futures and options across indices and stocks. Get margin benefit, hedging strategies, and real-time support from our experienced team.',
      features: []
    },
    {
      title: 'Depository Services – CDSL',
      description: 'We are registered Depository Participants with CDSL, enabling safe and secure electronic storage of your investments.',
      features: [
        'Demat Account Opening',
        'Share Transfers',
        'Pledge/Unpledge',
        'Corporate Action Tracking'
      ]
    },
    {
      title: 'Mutual Fund Distribution',
      description: 'We offer access to over 35 AMCs, across SIPs, lump sum investments, NFOs, and more — with personalized curation based on your risk appetite and goals.',
      features: [
        'Select the right schemes',
        'Monitor your portfolio',
        'Switch from underperforming funds',
        'Track ELSS lock-ins'
      ]
    },
    {
      title: 'IPO Investments',
      description: 'Invest in upcoming IPOs directly through your trading account. We provide alerts, issue analysis, and fast ASBA-based application support.',
      features: []
    },
    {
      title: 'Margin Trading Facility (MTF)',
      description: 'Enhance your buying power with our MTF product. Regulated and safe leverage, with transparent interest rates and regular updates.',
      features: []
    },
    {
      title: 'Portfolio Review & Research Ideas',
      description: 'We offer long-term investment recommendations with detailed rationales and exit strategies.',
      features: [
        'Quarterly flat fee OR',
        'Profit-sharing model for eligible clients',
        '(Minimum ?1 lakh per stock idea)'
      ]
    },
    {
      title: 'Client-first Support',
      description: 'We take pride in being accessible and responsive. Clients can reach us anytime via Call, WhatsApp, Email, or In-person meetings. Our personalized service is what sets us apart in a world full of algorithmic, impersonal brokers.',
      features: [
        'Call',
        'WhatsApp',
        'Email',
        'In-person meetings, if preferred'
      ]
    }
  ]

  const products = pageData.products || [
    {
      title: 'Equity (Cash & F&O)',
      description: 'Complete equity trading solutions with advanced tools and strategies.',
      features: [
        'Shares, ETFs, and Index-based trading',
        'Intraday and delivery trades',
        'Futures and Options with smart margin strategies'
      ]
    },
    {
      title: 'Currency Derivatives',
      description: 'Trade in USD-INR, EUR-INR, and other pairs via NSE/BSE. Ideal for exporters/importers and arbitragers.',
      features: []
    },
    {
      title: 'Mutual Funds',
      description: 'Comprehensive mutual fund investment platform with professional guidance.',
      features: [
        'Direct and Regular plans',
        'ELSS (Tax-saving)',
        'Debt, Hybrid, Equity & Thematic funds',
        'Portfolio rebalancing support'
      ]
    },
    {
      title: 'IPOs & NFOs',
      description: 'Participate in primary market opportunities with ease. Pre-issue insights, application tracking, and post-listing guidance.',
      features: []
    },
    {
      title: 'Fixed Income Products',
      description: 'Stable income generating investment options for conservative investors.',
      features: [
        'Corporate Bonds',
        'Government Securities (G-Secs)',
        'Tax-Free Bonds',
        'High-Yield NCDs'
      ]
    },
    {
      title: 'Margin Products & Pledging Services',
      description: 'Efficient pledging, with real-time margin utilization updates and support for trading in MTF or F&O segments.',
      features: []
    }
  ]

  return (
    <ProductPageContainer>
      <HeroSection>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {pageData.hero?.title || 'Our Services'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {pageData.hero?.subtitle || 'At Focus Stock Brokers Ltd., we believe in providing more than just a trading platform — we offer end-to-end financial solutions under one roof.'}
        </motion.p>
      </HeroSection>

      <Section>
        <div className="section-header">
          <h2>{pageData.servicesSection?.title || 'Complete Financial Solutions'}</h2>
          <p>{pageData.servicesSection?.subtitle || 'Everything you need for your investment journey, backed by expert guidance and personalized service.'}</p>
        </div>
        
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>
            {service.features.length > 0 && (
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
          </ServiceCard>
        ))}
      </Section>

      <Section>
        <div className="section-header">
          <h2>{pageData.productsSection?.title || 'Products We Deal In'}</h2>
          <p>{pageData.productsSection?.subtitle || 'We provide a curated list of financial products, focusing on quality, reliability, and long-term value creation.'}</p>
        </div>
        
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard key={index}>
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              {product.features.length > 0 && (
                <ul className="product-features">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
            </ProductCard>
          ))}
        </ProductsGrid>
      </Section>


    </ProductPageContainer>
  )
}

export default ProductPage