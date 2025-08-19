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
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  
  h1 {
    font-size: 56px;
    font-weight: ${theme.typography.fontWeight.ultraBold};
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.medium};
    letter-spacing: -1px;
    
    @media (max-width: 768px) {
      font-size: 42px;
    }
  }
  
  p {
    font-size: 20px;
    color: ${theme.colors.darkGray};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
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
  background: ${theme.colors.white};
  border-radius: 16px;
  padding: ${theme.spacing.large};
  border: 1px solid rgba(0, 0, 0, 0.08);
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  
  &:hover {
    border-color: ${theme.colors.green};
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.green}, ${theme.colors.navy});
    border-radius: 16px 16px 0 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  h3 {
    font-size: 22px;
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.small};
    font-weight: ${theme.typography.fontWeight.bold};
  }
  
  .price {
    font-size: 48px;
    font-weight: ${theme.typography.fontWeight.ultraBold};
    color: ${theme.colors.green};
    margin: ${theme.spacing.medium} 0;
    letter-spacing: -1px;
  }
  
  .description {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.large};
    line-height: 1.6;
    font-size: 16px;
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
  background: ${props => props.$active ? theme.colors.navy : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.navy};
  border: 2px solid ${theme.colors.navy};
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${theme.typography.fontWeight.semiBold};
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.navy};
    color: ${theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 63, 89, 0.3);
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
  border-radius: 16px;
  border: none;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  
  th, td {
    padding: 24px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  th {
    background: ${theme.colors.navy};
    color: ${theme.colors.white};
    font-weight: ${theme.typography.fontWeight.bold};
    font-size: 16px;
  }
  
  tbody tr {
    transition: all 0.3s ease;
  }
  
  tbody tr:hover {
    background: rgba(0, 119, 255, 0.03);
    transform: translateX(4px);
  }
  
  .charge-name {
    font-weight: ${theme.typography.fontWeight.bold};
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
      <div className="container">
        <HeroSection>
          <h1>Our Prices</h1>
          <p>With our scalable packages, you can pay for what you need and leave out what you don't. We will grow with you.</p>
        </HeroSection>

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