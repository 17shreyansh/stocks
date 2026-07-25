import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const PageContainer = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 120px 0 60px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
`;

const Introduction = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin-bottom: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid ${theme.colors.green};
`;

const Section = styled.section`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.navy};
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin-bottom: 16px;
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
  color: ${theme.colors.darkGray};
  margin-bottom: 8px;
`;

const PrivacyPolicy = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/privacy-policy`);
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      setPageData({
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: January 15, 2024',
        introduction: 'Focus Stock Brokers is committed to protecting your privacy.',
        sections: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div>Loading...</div>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData?.title || 'Privacy Policy'}</Title>
          <LastUpdated>{pageData?.lastUpdated || 'Last updated: January 15, 2024'}</LastUpdated>
        </Header>

        <ContentCard>
          {pageData?.introduction && (
            <Introduction>{pageData.introduction}</Introduction>
          )}

          {pageData?.sections?.map((section, index) => (
            <Section key={section.id || index}>
              <SectionTitle>{section.title}</SectionTitle>
              {section.content?.map((content, contentIndex) => (
                <div key={contentIndex}>
                  {content.type === 'paragraph' ? (
                    <Paragraph>{content.text}</Paragraph>
                  ) : content.type === 'list' ? (
                    <List>
                      {content.items?.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>{item}</ListItem>
                      ))}
                    </List>
                  ) : null}
                </div>
              ))}
            </Section>
          ))}
        </ContentCard>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPolicy;