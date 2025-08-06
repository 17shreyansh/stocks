import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import '../styles/downloads.css';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 120px 0 40px;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.medium};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.hero};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.small};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 42px;
  }
  
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.body};
  color: ${theme.colors.darkGray};
  max-width: 600px;
  margin: 0 auto;
`;

const ControlsSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.large};
  box-shadow: ${theme.shadows.medium};
  border: 1px solid ${theme.colors.lightGray};
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.medium};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  @media (max-width: 480px) {
    gap: ${theme.spacing.small};
  }
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.small} ${theme.spacing.small} ${theme.spacing.small} 48px;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  transition: ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.small};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.mediumGray};
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.medium};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.small};
    align-items: flex-start;
  }
`;

const ResultsCount = styled.p`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSize.small};
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 4px;
  background: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  padding: 4px;
`;

const ViewButton = styled.button`
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border: none;
  border-radius: ${theme.borderRadius.small};
  background: ${props => props.active ? theme.colors.green : 'transparent'};
  color: ${props => props.active ? theme.colors.white : theme.colors.darkGray};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-size: ${theme.typography.fontSize.small};
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.small};
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.typography.fontSize.body};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.green};
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
  }
`;

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.medium};
  
  &.list-view {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing.small};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DocumentCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.medium};
  box-shadow: ${theme.shadows.medium};
  border: 1px solid ${theme.colors.lightGray};
  transition: ${theme.transitions.medium};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.large};
    border-color: ${theme.colors.green};
  }
  
  &.list-view {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.medium};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.small};
    }
  }
  
  @media (max-width: 480px) {
    padding: ${theme.spacing.small};
  }
`;



const DocumentContent = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.h3`
  font-size: ${theme.typography.fontSize.body};
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const DocumentCategory = styled.span`
  display: inline-block;
  background: ${theme.colors.platinum};
  color: ${theme.colors.green};
  padding: 4px ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.typography.fontSize.tiny};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.micro};
`;

const DownloadButton = styled.button`
  background: ${theme.colors.green};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.micro} ${theme.spacing.small};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.typography.fontSize.small};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: #0056cc;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.mediumGray};
  
  h3 {
    color: ${theme.colors.navy};
    margin-bottom: ${theme.spacing.small};
  }
`;

// Mock data with comprehensive stock broker documents
const mockDocuments = [
  { id: 1, title: "Individual KYC Application Form", category: "KYC Forms", description: "Complete KYC application form for individual account opening with all required fields", fileSize: "2.3 MB", lastUpdated: "2024-01-15" },
  { id: 2, title: "Account Modification Form", category: "Modification Forms", description: "Form for modifying existing account details, contact information, and trading preferences", fileSize: "1.8 MB", lastUpdated: "2024-01-10" },
  { id: 3, title: "Risk Disclosure Document", category: "Legal Documents", description: "Important risk disclosure information for equity and derivative trading", fileSize: "3.1 MB", lastUpdated: "2024-01-08" },
  { id: 4, title: "Client Master Agreement", category: "Legal Documents", description: "Standard client agreement terms and conditions for trading services", fileSize: "2.7 MB", lastUpdated: "2024-01-05" },
  { id: 5, title: "NRI Account Opening Form", category: "KYC Forms", description: "Specialized form for Non-Resident Indian account opening with FEMA compliance", fileSize: "2.9 MB", lastUpdated: "2024-01-03" },
  { id: 6, title: "Corporate Account Application", category: "Corporate Forms", description: "Application form for corporate trading accounts with board resolution requirements", fileSize: "3.5 MB", lastUpdated: "2024-01-01" },
  { id: 7, title: "Margin Trading Agreement", category: "Trading Forms", description: "Agreement for margin trading facility with terms and risk factors", fileSize: "2.1 MB", lastUpdated: "2023-12-28" },
  { id: 8, title: "Commodity Trading Authorization", category: "Trading Forms", description: "Form for commodity trading account activation and risk acknowledgment", fileSize: "1.9 MB", lastUpdated: "2023-12-25" },
  { id: 9, title: "HUF Account Opening Kit", category: "KYC Forms", description: "Hindu Undivided Family account opening documentation with Karta details", fileSize: "2.4 MB", lastUpdated: "2023-12-20" },
  { id: 10, title: "Grievance Redressal Form", category: "Support Forms", description: "Form for filing complaints and grievances with SEBI escalation matrix", fileSize: "1.5 MB", lastUpdated: "2023-12-15" },
  { id: 11, title: "Power of Attorney Form", category: "Legal Documents", description: "Limited power of attorney for trading operations and fund transfers", fileSize: "1.7 MB", lastUpdated: "2023-12-10" },
  { id: 12, title: "Bank Account Change Form", category: "Modification Forms", description: "Form for changing primary bank account for fund settlements", fileSize: "1.3 MB", lastUpdated: "2023-12-05" },
  { id: 13, title: "Nomination Form", category: "Legal Documents", description: "Nomination form for securities and funds in case of unforeseen circumstances", fileSize: "1.6 MB", lastUpdated: "2023-12-01" },
  { id: 14, title: "Partnership Firm Account Form", category: "Corporate Forms", description: "Account opening form for partnership firms with partner details", fileSize: "2.8 MB", lastUpdated: "2023-11-28" },
  { id: 15, title: "Options Trading Agreement", category: "Trading Forms", description: "Specialized agreement for options trading with strategy guidelines", fileSize: "2.2 MB", lastUpdated: "2023-11-25" }
];

const categories = ["All Categories", "KYC Forms", "Modification Forms", "Legal Documents", "Corporate Forms", "Trading Forms", "Support Forms"];

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Handle URL parameters for direct category access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const categoryMap = {
        'kyc': 'KYC Forms',
        'modification': 'Modification Forms',
        'legal': 'Legal Documents',
        'corporate': 'Corporate Forms',
        'trading': 'Trading Forms',
        'support': 'Support Forms'
      };
      if (categoryMap[categoryParam]) {
        setSelectedCategory(categoryMap[categoryParam]);
      }
    }
  }, []);

  const filteredDocuments = useMemo(() => {
    let filtered = mockDocuments.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'oldest': return new Date(a.lastUpdated) - new Date(b.lastUpdated);
        case 'name': return a.title.localeCompare(b.title);
        case 'size': return parseFloat(b.fileSize) - parseFloat(a.fileSize);
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleDownload = (document) => {
    console.log('Downloading:', document.title);
  };



  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>Downloads Center</Title>
          <Subtitle>Access all your important documents, forms, and resources in one place.</Subtitle>
        </Header>

        <ControlsSection>
          <ControlsGrid>
            <SearchBox>
              <SearchIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchIcon>
              <SearchInput
                className="downloads-search-input"
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>

            <FilterSelect className="downloads-filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>

            <FilterSelect className="downloads-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="size">File Size</option>
            </FilterSelect>
          </ControlsGrid>
        </ControlsSection>

        <ResultsInfo className="downloads-results-info">
          <ResultsCount>
            Showing {filteredDocuments.length} of {mockDocuments.length} documents
          </ResultsCount>
          <ViewToggle className="downloads-view-toggle">
            <ViewButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              Grid
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'} 
              onClick={() => setViewMode('list')}
            >
              List
            </ViewButton>
          </ViewToggle>
        </ResultsInfo>

        {filteredDocuments.length === 0 ? (
          <EmptyState>
            <h3>No documents found</h3>
            <p>Try adjusting your search terms or filters</p>
          </EmptyState>
        ) : (
          <DocumentsGrid className={`downloads-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredDocuments.map(document => (
              <DocumentCard 
                key={document.id} 
                className={`downloads-card ${viewMode === 'list' ? 'list-view' : ''}`}
                onClick={() => handleDownload(document)}
              >

                <DocumentContent>
                  <DocumentCategory>{document.category}</DocumentCategory>
                  <DocumentTitle>{document.title}</DocumentTitle>
                  <p style={{color: theme.colors.mediumGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.small}}>
                    {document.description}
                  </p>
                  <div className="downloads-meta" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: theme.typography.fontSize.tiny, color: theme.colors.mediumGray}}>
                      {document.fileSize} • {new Date(document.lastUpdated).toLocaleDateString()}
                    </span>
                    <DownloadButton className="downloads-button" onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(document);
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download
                    </DownloadButton>
                  </div>
                </DocumentContent>
              </DocumentCard>
            ))}
          </DocumentsGrid>
        )}
      </Container>
    </PageContainer>
  );
};

export default Downloads;