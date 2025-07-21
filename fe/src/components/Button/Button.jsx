import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

// Button variants
const variants = {
  primary: css`
    background-color: ${theme.colors.green};
    color: ${theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${theme.colors.success};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium};
    }
    
    &:active {
      transform: translateY(0);
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${theme.colors.navy};
    border: 2px solid ${theme.colors.navy};
    
    &:hover {
      background-color: ${theme.colors.navy};
      color: ${theme.colors.white};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium};
    }
    
    &:active {
      transform: translateY(0);
    }
  `,
  tertiary: css`
    background-color: transparent;
    color: ${theme.colors.navy};
    border: none;
    padding: ${theme.spacing.micro} ${theme.spacing.small};
    
    &:hover {
      color: ${theme.colors.green};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `,
  gold: css`
    background-color: ${theme.colors.gold};
    color: ${theme.colors.navy};
    border: none;
    
    &:hover {
      background-color: #E5C158;
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.medium};
    }
    
    &:active {
      transform: translateY(0);
    }
  `,
};

// Button sizes
const sizes = {
  small: css`
    font-size: ${theme.typography.fontSize.small};
    padding: 8px 16px;
    border-radius: ${theme.borderRadius.small};
  `,
  medium: css`
    font-size: ${theme.typography.fontSize.body};
    padding: 12px 24px;
    border-radius: ${theme.borderRadius.medium};
  `,
  large: css`
    font-size: ${theme.typography.fontSize.subheader};
    padding: 16px 32px;
    border-radius: ${theme.borderRadius.medium};
  `,
};

const StyledButton = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  transition: all ${theme.transitions.medium};
  gap: ${theme.spacing.micro};
  
  /* Apply variant styles */
  ${props => variants[props.$variant]}
  
  /* Apply size styles */
  ${props => sizes[props.$size]}
  
  /* Full width option */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Focus state for accessibility */
  &:focus {
    outline: 2px solid ${theme.colors.green};
    outline-offset: 2px;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;