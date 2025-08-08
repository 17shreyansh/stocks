import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// Component Data Constants
const UNDER_CONSTRUCTION_DATA = {
  title: "Under Construction"
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 40px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  text-align: center;
`;

const UnderConstruction = () => {
  return (
    <PageContainer>
      <Title>{UNDER_CONSTRUCTION_DATA.title}</Title>
    </PageContainer>
  );
};

export default UnderConstruction;