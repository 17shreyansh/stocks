import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';

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

  const accountOpeningPlans = [
    {
      title: "Non Resident Indian",
      price: "₹500",
      description: "Unlocking Limitless Trading Potential"
    },
    {
      title: "Corporate & Business Entities",
      price: "₹1000",
      description: "For LLP, Partnership Firms, Public Companies & HUF"
    }
  ];

  const equityCharges = [
    {
      charge: "STT/CTT",
      delivery: "0.1% on buy & sell",
      intraday: "0.025% on the sell side",
      futures: "0.0125% on the sell side",
      options: "0.125% of intrinsic value on exercised options"
    },
    {
      charge: "Transaction charges",
      delivery: "NSE: 0.00325% / BSE: 0.00375%",
      intraday: "NSE: 0.00325% / BSE: 0.00375%",
      futures: "NSE: 0.0019% / BSE: 0",
      options: "NSE: 0.05% (on premium) / BSE: 0.005% (on premium)"
    },
    {
      charge: "GST",
      delivery: "18% on (brokerage + SEBI charges + transaction charges)",
      intraday: "18% on (brokerage + SEBI charges + transaction charges)",
      futures: "18% on (brokerage + SEBI charges + transaction charges)",
      options: "18% on (brokerage + SEBI charges + transaction charges)"
    },
    {
      charge: "SEBI charges",
      delivery: "₹10 / crore",
      intraday: "₹10 / crore",
      futures: "₹10 / crore",
      options: "₹10 / crore"
    },
    {
      charge: "Stamp charges",
      delivery: "0.015% or ₹1500 / crore on buy side",
      intraday: "0.003% or ₹300 / crore on buy side",
      futures: "0.002% or ₹200 / crore on buy side",
      options: "0.003% or ₹300 / crore on buy side"
    }
  ];

  const currencyCharges = [
    {
      charge: "STT/CTT",
      futures: "No STT",
      options: "No STT"
    },
    {
      charge: "Transaction charges",
      futures: "NSE: 0.0009% / BSE: 0.00025%",
      options: "NSE: 0.035% / BSE: 0.001%"
    },
    {
      charge: "GST",
      futures: "18% on (brokerage + SEBI charges + transaction charges)",
      options: "18% on (brokerage + SEBI charges + transaction charges)"
    },
    {
      charge: "SEBI charges",
      futures: "₹10 / crore",
      options: "₹10 / crore"
    },
    {
      charge: "Stamp charges",
      futures: "0.0001% or ₹10 / crore on buy side",
      options: "0.0001% or ₹10 / crore on buy side"
    }
  ];

  return (
    <PricingContainer>
      <HeroSection>
        <h1>Our Prices</h1>
        <p>With our scalable packages, you can pay for what you need and leave out what you don't. We will grow with you.</p>
      </HeroSection>
      
      <div className="container">

        <AccountOpeningSection>
          <h2>Account Opening Charges</h2>
          <PricingGrid>
            {accountOpeningPlans.map((plan, index) => (
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
                <Button variant="primary" size="medium">Open Account</Button>
              </PricingCard>
            ))}
          </PricingGrid>
        </AccountOpeningSection>

        <CostBreakdownSection>
          <h2>Cost Breakdown</h2>
          <TabContainer>
            <TabButtons>
              <TabButton 
                $active={activeTab === 'equity'} 
                onClick={() => setActiveTab('equity')}
              >
                Equity
              </TabButton>
              <TabButton 
                $active={activeTab === 'currency'} 
                onClick={() => setActiveTab('currency')}
              >
                Currency
              </TabButton>
            </TabButtons>
            
            <TableContainer>
              <PricingTable>
                <thead>
                  <tr>
                    <th>Charges</th>
                    {activeTab === 'equity' ? (
                      <>
                        <th>Equity delivery</th>
                        <th>Equity intraday</th>
                        <th>F&O - Futures</th>
                        <th>F&O - Options</th>
                      </>
                    ) : (
                      <>
                        <th>Currency futures</th>
                        <th>Currency options</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'equity' ? equityCharges : currencyCharges).map((row, index) => (
                    <tr key={index}>
                      <td className="charge-name">{row.charge}</td>
                      {activeTab === 'equity' ? (
                        <>
                          <td>{row.delivery}</td>
                          <td>{row.intraday}</td>
                          <td>{row.futures}</td>
                          <td>{row.options}</td>
                        </>
                      ) : (
                        <>
                          <td>{row.futures}</td>
                          <td>{row.options}</td>
                        </>
                      )}
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