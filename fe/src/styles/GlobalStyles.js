import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  /* Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.body};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.navy};
    background-color: ${theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
  }
  
  h1 {
    font-size: ${theme.typography.fontSize.hero};
    font-weight: ${theme.typography.fontWeight.ultraBold};
    letter-spacing: -0.02em;
  }
  
  h2 {
    font-size: ${theme.typography.fontSize.header};
    font-weight: ${theme.typography.fontWeight.semiBold};
    letter-spacing: -0.01em;
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.subheader};
    font-weight: ${theme.typography.fontWeight.medium};
  }
  
  p {
    margin-bottom: ${theme.spacing.small};
  }
  
  a {
    color: ${theme.colors.navy};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.green};
    }
  }
  
  /* Lists */
  ul, ol {
    padding-left: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.small};
  }
  
  /* Focus States */
  :focus {
    outline: 2px solid ${theme.colors.green};
    outline-offset: 2px;
  }
  
  /* Buttons */
  button {
    cursor: pointer;
    font-family: ${theme.typography.fontFamily.primary};
  }
  
  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Container */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.small};
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: 0 ${theme.spacing.medium};
    }
  }
  
  /* Section Spacing */
  section {
    padding: ${theme.spacing.large} 0;
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.xl} 0;
    }
  }
  
  /* Utility Classes */
  .text-center {
    text-align: center;
  }
  
  .text-right {
    text-align: right;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .justify-between {
    justify-content: space-between;
  }
  
  .gap-micro {
    gap: ${theme.spacing.micro};
  }
  
  .gap-small {
    gap: ${theme.spacing.small};
  }
  
  .gap-medium {
    gap: ${theme.spacing.medium};
  }
  
  .w-full {
    width: 100%;
  }
  
  .h-full {
    height: 100%;
  }
`;

export default GlobalStyles;