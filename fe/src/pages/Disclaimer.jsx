import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const PageContainer = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
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
  color: #d32f2f;
  margin-bottom: 16px;
`;

const LastUpdated = styled.p`
  color: ${theme.colors.darkGray};
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
  border: 2px solid #ffebee;
`;

const WarningBanner = styled.div`
  background: linear-gradient(135deg, #ff5722 0%, #d32f2f 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const Introduction = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.colors.darkGray};
  margin-bottom: 32px;
  padding: 20px;
  background: #fff3e0;
  border-radius: 12px;
  border-left: 4px solid #ff5722;
`;

const Section = styled.section`
  margin-bottom: 32px;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #ffcdd2;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #d32f2f;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '⚠️';
    font-size: 1.2rem;
  }
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
  
  &::marker {
    content: '⚠️ ';
  }
`;

const Disclaimer = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/disclaimer`);
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching disclaimer:', error);
      setPageData({
        title: 'Disclaimer',
        lastUpdated: 'Last updated: January 15, 2024',
        introduction: 'Please read the following disclaimers carefully before using our services.',
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
          <Title>{pageData?.title || 'Disclaimer'}</Title>
          <LastUpdated>{pageData?.lastUpdated || 'Last updated: January 15, 2024'}</LastUpdated>
        </Header>

        <ContentCard>
          <WarningBanner>
            ⚠️ IMPORTANT LEGAL NOTICE - Please read all disclaimers carefully before proceeding
          </WarningBanner>

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

export default Disclaimer;