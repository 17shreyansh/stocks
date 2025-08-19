import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { pageAPI } from '../utils/api';

const FALLBACK_DISCLAIMER_DATA = {
  header: {
    title: "Disclaimer",
    lastUpdated: "Last updated: January 15, 2024"
  },
  content: {
    general: {
      title: "General Disclaimer",
      text: "The information provided on this website and trading platform is for general informational purposes only. Focus Stock Broker Ltd does not guarantee the accuracy, completeness, or reliability of any information presented."
    },
    investment: {
      title: "Investment Risk Disclaimer", 
      text: "All investments in securities market are subject to market risks. Past performance is not indicative of future results. Investors should carefully consider their investment objectives and risk tolerance before making any investment decisions."
    },
    trading: {
      title: "Trading Disclaimer",
      text: "Trading in stocks, derivatives, and other financial instruments involves substantial risk and may not be suitable for all investors. You may lose all or more than your initial investment. Only trade with money you can afford to lose."
    },
    advice: {
      title: "No Financial Advice",
      text: "The content on this platform does not constitute financial, investment, or trading advice. We recommend consulting with qualified financial advisors before making investment decisions."
    },
    liability: {
      title: "Limitation of Liability", 
      text: "Focus Stock Broker Ltd shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or reliance on information provided."
    },
    regulatory: {
      title: "Regulatory Compliance",
      text: "Focus Stock Broker Ltd is regulated by SEBI. All trading activities are subject to applicable laws and regulations. Clients are responsible for understanding and complying with relevant tax obligations."
    }
  }
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 100px 0 60px;
  
  @media (max-width: 768px) {
    padding: 80px 0 40px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  color: ${theme.colors.mediumGray};
  font-size: 14px;
  background: ${theme.colors.white};
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ContentCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Section = styled.section`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.navy};
  margin-bottom: 12px;
`;

const SectionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin: 0;
`;

const Disclaimer = () => {
  const [pageData, setPageData] = useState(FALLBACK_DISCLAIMER_DATA);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('disclaimer');
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPageData(FALLBACK_DISCLAIMER_DATA);
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_DISCLAIMER_DATA.header.title}</Title>
          <LastUpdated>{pageData.header?.lastUpdated || FALLBACK_DISCLAIMER_DATA.header.lastUpdated}</LastUpdated>
        </Header>

        <ContentCard>
          {Object.entries(pageData.content || FALLBACK_DISCLAIMER_DATA.content).map(([key, section]) => (
            <Section key={key}>
              <SectionTitle>{section.title}</SectionTitle>
              <SectionText>{section.text}</SectionText>
            </Section>
          ))}
        </ContentCard>
      </Container>
    </PageContainer>
  );
};

export default Disclaimer;