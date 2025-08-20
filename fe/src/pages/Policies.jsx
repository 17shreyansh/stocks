import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

import { pageAPI } from '../utils/api';

// Fallback data in case API fails
const FALLBACK_POLICIES_DATA = {
  header: {
    title: "Policies Center",
    subtitle: "Access all company policies and procedures organized by department."
  },
  departments: ["All Departments", "Trading", "Risk Management", "Compliance", "Operations", "IT", "Customer Service", "HR", "Internal Audit"],
  sortOptions: [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name A-Z" }
  ],
  emptyState: {
    title: "No policies found",
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

const PoliciesGrid = styled.div`
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

const PolicyCard = styled.div`
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

const PolicyTitle = styled.h3`
  font-size: ${theme.typography.fontSize.body};
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.navy};
  margin-bottom: ${theme.spacing.micro};
`;

const PolicyDepartment = styled.span`
  display: inline-block;
  background: ${theme.colors.platinum};
  color: ${theme.colors.green};
  padding: 4px ${theme.spacing.micro};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.typography.fontSize.tiny};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.micro};
`;

const PolicyContent = styled.div`
  flex: 1;
`;

const ActionButton = styled.button`
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



const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [pageData, setPageData] = useState(FALLBACK_POLICIES_DATA);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPageData();
    const urlParams = new URLSearchParams(window.location.search);
    const departmentParam = urlParams.get('department');
    if (departmentParam && pageData.departments?.includes(departmentParam)) {
      setSelectedDepartment(departmentParam);
    }
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await pageAPI.getByName('policies');
      if (response.data && Object.keys(response.data).length > 0) {
        setPageData(response.data);
      } else {
        // Only use fallback if no data
        setPageData(FALLBACK_POLICIES_DATA);
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      // Keep existing data instead of resetting to fallback
      // Show error message to user
      // You can add a toast notification here
    }
  };

  const filteredPolicies = useMemo(() => {
    const allPolicies = pageData.policies || [];
    let filtered = allPolicies.filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All Departments' || policy.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'oldest': return new Date(a.lastUpdated) - new Date(b.lastUpdated);
        case 'name': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

    return filtered;
  }, [pageData.policies, searchTerm, selectedDepartment, sortBy]);

  const handleViewPolicy = (policy, event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      // Navigate to policy detail view or open modal
      window.location.href = `/policies/${policy.id}`;
    } catch (error) {
      console.error('Error viewing policy:', error);
      // Show error message to user
      // You can add a toast notification here
    }
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>{pageData.header?.title || FALLBACK_POLICIES_DATA.header.title}</Title>
          <Subtitle>{pageData.header?.subtitle || FALLBACK_POLICIES_DATA.header.subtitle}</Subtitle>
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
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>

            <FilterSelect value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              {(pageData.departments || FALLBACK_POLICIES_DATA.departments).map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </FilterSelect>

            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {(pageData.sortOptions || FALLBACK_POLICIES_DATA.sortOptions).map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FilterSelect>
          </ControlsGrid>
        </ControlsSection>

        <ResultsInfo>
          <ResultsCount>
            Showing {filteredPolicies.length} of {pageData.policies?.length || 0} policies
          </ResultsCount>
          <ViewToggle>
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

        {filteredPolicies.length === 0 ? (
          <EmptyState>
            <h3>{pageData.emptyState?.title || FALLBACK_POLICIES_DATA.emptyState.title}</h3>
            <p>{pageData.emptyState?.message || FALLBACK_POLICIES_DATA.emptyState.message}</p>
          </EmptyState>
        ) : (
          <PoliciesGrid className={viewMode === 'list' ? 'list-view' : ''}>
            {filteredPolicies.map(policy => (
              <PolicyCard 
                key={policy.id}
                className={viewMode === 'list' ? 'list-view' : ''}
                onClick={(e) => handleViewPolicy(policy, e)}
              >
                <PolicyContent>
                  <PolicyDepartment>{policy.department}</PolicyDepartment>
                  <PolicyTitle>{policy.title}</PolicyTitle>
                  <p style={{color: theme.colors.mediumGray, fontSize: theme.typography.fontSize.small, marginBottom: theme.spacing.small}}>
                    {policy.description}
                  </p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: theme.typography.fontSize.tiny, color: theme.colors.mediumGray}}>
                      Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                    </span>
                    <ActionButton onClick={(e) => {
                      e.stopPropagation();
                      handleViewPolicy(policy);
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      View
                    </ActionButton>
                  </div>
                </PolicyContent>
              </PolicyCard>
            ))}
          </PoliciesGrid>
        )}
      </Container>
    </PageContainer>
  );
};

export default Policies;