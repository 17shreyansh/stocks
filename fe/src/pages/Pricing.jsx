import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import { pageAPI } from '../utils/api';

const PricingContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: linear-gradient(180deg, ${theme.colors.platinum} 0%, ${theme.colors.white} 50%, ${theme.colors.platinum} 100%);
`;

const HeroSection = styled(AnimatedSection)`
  background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.darkNavy} 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  
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
`;

const AccountOpeningSection = styled(AnimatedSection)`
  padding: ${theme.spacing.xl} 0;

  h2 {
    text-align: center;
    font-size: 36px;
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.large};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.large};
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const PricingCard = styled(motion.div)`
  background: white;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    border-color: ${theme.colors.green};
    box-shadow: 0 4px 16px rgba(0, 119, 255, 0.08);
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    color: ${theme.colors.navy};
    margin-bottom: 16px;
  }
  
  .price {
    font-size: 48px;
    font-weight: ${theme.typography.fontWeight.ultraBold};
    color: ${theme.colors.green};
    margin: 24px 0;
    letter-spacing: -1px;
  }
  
  .description {
    color: ${theme.colors.darkGray};
    margin-bottom: 32px;
    line-height: 1.6;
    font-size: 16px;
    flex-grow: 1;
  }
`;



const CostBreakdownSection = styled(AnimatedSection)`
  padding: ${theme.spacing.xl} 0;
  
  h2 {
    text-align: center;
    font-size: 36px;
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.large};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

const TabContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  
  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const TabButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  transition: all ${theme.transitions.medium};
  gap: ${theme.spacing.micro};
  font-size: ${theme.typography.fontSize.body};
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.medium};
  
  ${props => props.$active ? `
    background: linear-gradient(135deg, ${theme.colors.green} 0%, ${theme.colors.success} 100%);
    color: ${theme.colors.white};
    border: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.success} 0%, #0a2d5c 100%);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
      
      &::before {
        left: 100%;
      }
    }
  ` : `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%);
    color: ${theme.colors.navy};
    border: 2px solid rgba(52, 152, 219, 0.3);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${theme.colors.navy} 0%, ${theme.colors.green} 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      color: ${theme.colors.white};
      border-color: ${theme.colors.green};
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
  `}
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
`;

const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.small};
  overflow-x: auto;
  
  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.medium};
  }
`;

const PricingTable = styled.table`
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  border-collapse: collapse;
  overflow: hidden;
  
  th, td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.lightGray};
    
    @media (max-width: 768px) {
      padding: 16px 12px;
      font-size: 14px;
    }
  }
  
  th {
    background: ${theme.colors.navy};
    color: ${theme.colors.white};
    font-weight: 600;
    font-size: 16px;
    border-bottom: none;
  }
  
  tbody tr {
    transition: all 0.2s ease;
  }
  
  tbody tr:hover {
    background: ${theme.colors.platinum};
  }
  
  tbody tr:last-child td {
    border-bottom: none;
  }
  
  .charge-name {
    font-weight: 600;
    color: ${theme.colors.navy};
  }
`;

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('equity');
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpenAccount = () => {
    navigate('/contact-us');
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/pricing`);
      const data = await response.json();
      console.log('API Response:', data);
      if (data.data?.pricing) {
        setPricingData(data.data.pricing);
      } else if (data.pricing) {
        setPricingData(data.pricing);
      }
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data
  const fallbackData = {
    hero: {
      title: "Our Prices",
      subtitle: "With our scalable packages, you can pay for what you need and leave out what you don't. We will grow with you."
    },
    accountOpening: {
      title: "Account Opening Charges",
      plans: [
        { title: "Non Resident Indian", price: "₹500", description: "Unlocking Limitless Trading Potential" },
        { title: "Corporate & Business Entities", price: "₹1000", description: "For LLP, Partnership Firms, Public Companies & HUF" }
      ]
    },
    costBreakdown: {
      title: "Cost Breakdown",
      tabs: [
        {
          id: 'equity',
          label: 'Equity',
          columnHeaders: ['Charge Type', 'Delivery', 'Intraday', 'Futures', 'Options'],
          charges: [
            { col_0: "STT/CTT", col_1: "0.1% on buy & sell", col_2: "0.025% on the sell side", col_3: "0.0125% on the sell side", col_4: "0.125% of intrinsic value on exercised options" }
          ]
        }
      ]
    }
  };

  const currentData = (pricingData && Object.keys(pricingData).length > 0) ? pricingData : fallbackData;

  console.log('Pricing data:', pricingData);
  console.log('Current data:', currentData);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PricingContainer>
      <HeroSection>
        <h1>{currentData.hero?.title}</h1>
        <p>{currentData.hero?.subtitle}</p>
      </HeroSection>
      
      <div className="container">

        <AccountOpeningSection>
          <h2>{currentData.accountOpening?.title}</h2>
          <PricingGrid>
            {currentData.accountOpening?.plans?.map((plan, index) => (
              <PricingCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{plan.title}</h3>
                <div className="price">{plan.price}</div>
                <p className="description">{plan.description}</p>
                <Button variant="primary" size="medium" onClick={handleOpenAccount}>Open Account</Button>
              </PricingCard>
            ))}
          </PricingGrid>
        </AccountOpeningSection>

        <CostBreakdownSection>
          <h2>{currentData.costBreakdown?.title}</h2>
          <TabContainer>
            <TabButtons>
              {currentData.costBreakdown?.tabs?.map((tab) => (
                <TabButton 
                  key={tab.id}
                  $active={activeTab === tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </TabButtons>
            
            <TableContainer>
              <PricingTable>
                <thead>
                  <tr>
                    {currentData.costBreakdown?.tabs?.find(tab => tab.id === activeTab)?.columnHeaders?.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.costBreakdown?.tabs?.find(tab => tab.id === activeTab)?.charges?.map((row, index) => (
                    <tr key={index}>
                      {currentData.costBreakdown?.tabs?.find(tab => tab.id === activeTab)?.columnHeaders?.map((_, colIndex) => (
                        <td key={colIndex} className={colIndex === 0 ? "charge-name" : ""}>
                          {row[`col_${colIndex}`] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </PricingTable>
            </TableContainer>
          </TabContainer>
        </CostBreakdownSection>
      </div>
    </PricingContainer>
  );
};

export default Pricing;