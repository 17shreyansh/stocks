import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const API_BASE_URL = 'http://localhost:5000/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 90px 0 40px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border-left: 6px solid ${theme.colors.green};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${theme.colors.navy};
  margin: 0 0 8px 0;
`;

const Breadcrumb = styled.p`
  color: ${theme.colors.mediumGray};
  font-size: 14px;
  margin: 0;
`;

const Content = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.navy};
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid ${theme.colors.green};
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 12px 0;
`;

const List = styled.ul`
  margin: 0 0 12px 0;
  padding-left: 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  margin-bottom: 6px;
  padding-left: 20px;
  position: relative;
  list-style: none;
  
  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${theme.colors.green};
    font-weight: bold;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  font-size: 13px;
`;

const Th = styled.th`
  background: ${theme.colors.green};
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  vertical-align: top;
  
  &:first-child {
    text-align: center;
    font-weight: 600;
    width: 60px;
    background: #f8fafc;
    color: ${theme.colors.navy};
  }
  
  &.has-pdf {
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: #f0f9ff;
      color: ${theme.colors.green};
    }
  }
`;

const PDFIcon = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: ${theme.colors.green};
  font-size: 12px;
`;

const InvestorCharter = () => {
  const [pageData, setPageData] = useState({
    title: 'Investor Charter',
    breadcrumb: 'Home › Investor Charter',
    sections: [],
    tables: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/content/investor-charter`);
      if (response.ok) {
        const data = await response.json();
        setPageData({
          title: data.title || 'Investor Charter',
          breadcrumb: data.breadcrumb || 'Home › Investor Charter',
          sections: data.sections || [],
          tables: data.tables || []
        });
      } else {
        // Use default data if not found
        setPageData({
          title: 'Investor Charter',
          breadcrumb: 'Home › Investor Charter',
          sections: [
            {
              id: 'vision',
              title: 'Vision',
              type: 'text',
              content: 'To follow highest standards of ethics and compliances while facilitating the trading by clients in securities in a fair and transparent manner, so as to contribute in creation of wealth for investors.'
            }
          ],
          tables: [
            {
              id: 'complaint-details',
              title: 'Annexure C - INVESTOR COMPLAINT DETAILS',
              headers: ['Month', 'Equity', 'F&O', 'DP'],
              rows: [['July 2025', '-', '-', '-']]
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching investor charter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePDFDownload = (pdfUrl) => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = '';
      link.click();
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
          <Title>{pageData.title}</Title>
          <Breadcrumb>{pageData.breadcrumb}</Breadcrumb>
        </Header>

        <Content>
          {pageData.sections?.map((section) => (
            <Section key={section.id}>
              <SectionTitle>{section.title}</SectionTitle>
              {section.type === 'text' && (
                <Text>{section.content}</Text>
              )}
              {section.type === 'list' && Array.isArray(section.content) && (
                <List>
                  {section.content.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </List>
              )}
            </Section>
          ))}

          {pageData.tables?.map((table) => (
            <Section key={table.id}>
              <SectionTitle>{table.title}</SectionTitle>
              <Table>
                <thead>
                  <tr>
                    {table.headers?.map((header, index) => (
                      <Th key={index}>{header}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => {
                        const cellData = typeof cell === 'object' ? cell : { text: cell };
                        const hasPDF = cellData.pdfUrl;
                        
                        return (
                          <Td 
                            key={cellIndex}
                            className={hasPDF ? 'has-pdf' : ''}
                            onClick={hasPDF ? () => handlePDFDownload(cellData.pdfUrl) : undefined}
                            title={hasPDF ? 'Click to download PDF' : undefined}
                          >
                            {hasPDF ? '' : (cellData.text || cell)}
                            {hasPDF && <PDFIcon>📄</PDFIcon>}
                          </Td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>
          ))}
        </Content>
      </Container>
    </PageContainer>
  );
};

export default InvestorCharter;