import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import constructionImage from '../assets/UC.jpg';


const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 40px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.navy};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.gray};
  margin-bottom: 2rem;
  max-width: 500px;
`;

const BackButton = styled.button`
  background: ${theme.colors.navy};
  color: ${theme.colors.white};
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.darkNavy || '#1a365d'};
    transform: translateY(-2px);
  }
`;

const UnderConstruction = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <PageContainer>
      <ImageContainer>
        <Image src={constructionImage} alt="Under Construction" />
      </ImageContainer>
      <Title>Under Construction</Title>
      <Subtitle>
        We're working hard to bring you something amazing. This page is currently under development.
      </Subtitle>
      <BackButton onClick={handleGoBack}>
        Go Back
      </BackButton>
    </PageContainer>
  );
};

export default UnderConstruction;