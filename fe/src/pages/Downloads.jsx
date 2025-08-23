import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { documentAPI } from '../utils/api';
import '../styles/downloads.css';

import { pageAPI } from '../utils/api';

// Fallback data in case API fails
const FALLBACK_DOWNLOADS_DATA = {
  header: {
    title: "Downloads Center",
    subtitle: "Access all your important documents, forms, and resources in one place."
  },
  categories: ["All Categories", "KYC Forms", "Modification Forms", "Legal Documents", "Corporate Forms", "Trading Forms", "Support Forms"],
  sortOptions: [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name A-Z" },
    { value: "size", label: "File Size" }
  ],
  emptyState: {
    title: "No documents found",
    message: "Try adjusting your search terms or filters"
  }
};

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



const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState(['All Categories']);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(FALLBACK_DOWNLOADS_DATA);

  useEffect(() => {
    fetchPageData();
    fetchDocuments();
    fetchCategories();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('downloads');
      const data = response.data?.data || response.data;
      
      if (data && data.downloads) {
        // Use the downloads data structure from the admin
        const downloadsData = {
          header: data.downloads.header || FALLBACK_DOWNLOADS_DATA.header,
          categories: ['All Categories', ...(data.downloads.categories || [])],
          documents: data.downloads.documents || [],
          emptyState: data.downloads.emptyState || FALLBACK_DOWNLOADS_DATA.emptyState,
          sortOptions: FALLBACK_DOWNLOADS_DATA.sortOptions
        };
        setPageData(downloadsData);
        setDocuments(data.downloads.documents || []);
        setCategories(['All Categories', ...(data.downloads.categories || [])]);
      } else {
        setPageData(FALLBACK_DOWNLOADS_DATA);
        setDocuments([]);
        setCategories(FALLBACK_DOWNLOADS_DATA.categories);
      }
    } catch (error) {
      console.error('Error fetching downloads data:', error);
      setPageData(FALLBACK_DOWNLOADS_DATA);
      setDocuments([]);
      setCategories(FALLBACK_DOWNLOADS_DATA.categories);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [searchTerm, selectedCategory, sortBy]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm || undefined,
        category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
        sort: sortBy
      };
      const response = await documentAPI.getAll(params);
      if (response.data && Array.isArray(response.data)) {
        // Only update if we get actual document data from API
        // This allows admin-managed documents to take precedence
        if (response.data.length > 0) {
          setDocuments(response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching documents from API:', error);
      // Keep existing documents from page data
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await documentAPI.getCategories();
      if (response.data && Array.isArray(response.data)) {
        // Merge API categories with page data categories
        const apiCategories = response.data.filter(cat => cat !== 'All Categories');
        const pageCategories = (pageData.categories || []).filter(cat => cat !== 'All Categories');
        const allCategories = ['All Categories', ...new Set([...pageCategories, ...apiCategories])];
        setCategories(allCategories);
      }
    } catch (error) {
      console.error('Error fetching categories from API:', error);
      // Keep existing categories from page data
    }
  };

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
    // Prioritize admin-managed documents from pageData, fallback to API documents
    const allDocuments = (pageData.documents && pageData.documents.length > 0) ? pageData.documents : documents;
    
    return allDocuments.filter(doc => {
      const matchesSearch = !searchTerm || 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All Categories' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest': 
          return new Date(b.lastUpdated || b.createdAt || '1970-01-01') - new Date(a.lastUpdated || a.createdAt || '1970-01-01');
        case 'oldest': 
          return new Date(a.lastUpdated || a.createdAt || '1970-01-01') - new Date(b.lastUpdated || b.createdAt || '1970-01-01');
        case 'name': 
          return a.title.localeCompare(b.title);
        case 'size': 
          return (b.fileSize || 0) - (a.fileSize || 0);
        default: 
          return 0;
      }
    });
  }, [pageData.documents, documents, searchTerm, selectedCategory, sortBy]);

  const handleDownload = async (document, event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      if (document.downloadUrl) {
        // Convert relative URL to absolute URL
        const baseUrl = window.location.origin;
        const fullUrl = document.downloadUrl.startsWith('http') 
          ? document.downloadUrl 
          : `${baseUrl}${document.downloadUrl}`;
        
        window.open(fullUrl, '_blank');
      } else {
        console.warn('No download URL available for document:', document.title);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };



  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_DOWNLOADS_DATA.header.title}</Title>
          <Subtitle>{pageData.header?.subtitle || FALLBACK_DOWNLOADS_DATA.header.subtitle}</Subtitle>
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
              {(pageData.sortOptions || FALLBACK_DOWNLOADS_DATA.sortOptions).map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FilterSelect>
          </ControlsGrid>
        </ControlsSection>

        <ResultsInfo className="downloads-results-info">
          <ResultsCount>
            Showing {filteredDocuments.length} documents
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
            <h3>{pageData.emptyState?.title || FALLBACK_DOWNLOADS_DATA.emptyState.title}</h3>
            <p>{pageData.emptyState?.message || FALLBACK_DOWNLOADS_DATA.emptyState.message}</p>
          </EmptyState>
        ) : (
          <DocumentsGrid className={`downloads-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredDocuments.map(document => (
              <DocumentCard 
                key={document.id} 
                className={`downloads-card ${viewMode === 'list' ? 'list-view' : ''}`}
                onClick={(e) => handleDownload(document, e)}
              >

                <DocumentContent>
                  <DocumentCategory>{document.category}</DocumentCategory>
                  <DocumentTitle>{document.title}</DocumentTitle>
                  <p style={{color: theme.colors.mediumGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.small}}>
                    {document.description}
                  </p>
                  <div className="downloads-meta" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: theme.typography.fontSize.tiny, color: theme.colors.mediumGray}}>
                      {document.fileSize ? 
                        (typeof document.fileSize === 'string' ? document.fileSize : `${(document.fileSize / 1024 / 1024).toFixed(2)} MB`) 
                        : 'N/A'
                      } • {new Date(document.lastUpdated || document.createdAt || Date.now()).toLocaleDateString()}
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