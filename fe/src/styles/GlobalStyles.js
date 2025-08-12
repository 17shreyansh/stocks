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
    background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 25%, #f0f8ff 50%, #e6f3ff 75%, #f5f9ff 100%);
    background-attachment: fixed;
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
    outline: none;
  }
  
  /* Buttons */
  button {
    cursor: pointer;
    font-family: ${theme.typography.fontFamily.primary};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
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
    position: relative;
    
    @media (min-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.xl} 0;
    }
    
    /* Subtle section separators */
    &:not(:first-child)::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(52, 152, 219, 0.3), transparent);
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
  
  /* Animation utilities */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .slide-in-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.visible {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.visible {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .scale-in {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.visible {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Interactive hover effects */
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  }
  
  .hover-glow {
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 0 30px rgba(52, 152, 219, 0.3);
    }
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #3498db, #2980b9);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #2980b9, #1f5f8b);
  }
`;

export default GlobalStyles;