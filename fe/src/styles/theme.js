/**
 * Focus Stock Brokers Design System
 * Based on Apple's UI/UX principles applied to financial services
 */

export const theme = {
  // Color Psychology Application
  colors: {
    white: '#FFFFFF',      // Trust, cleanliness, professionalism
    platinum: '#F5F7FA',   // Subtle sophistication, premium feel
    navy: '#2d3f59ff',       // Authority, stability, confidence
    green: '#0077ffff',      // Growth, success, positive action
    gold: '#D4AF37',       // Premium positioning, exclusivity
    darkNavy: '#0F2A4A',   // Deeper version of navy for contrast
    lightGray: '#E2E8F0',  // Subtle separators and borders
    mediumGray: '#94A3B8', // Secondary text
    darkGray: '#475569',   // Tertiary text
    error: '#E53E3E',      // Error states
    success: '#0f329aff',    // Success states
    warning: '#F6AD55',    // Warning states
    info: '#63B3ED',       // Information states
  },

  // Typography System
  typography: {
    // Font families
    fontFamily: {
      primary: "'Georgia', 'Times New Roman', Times, serif", // Classic, professional serif look
      secondary: "'Merriweather', Georgia, serif",           // Modern readable serif
      mono: "'Courier New', Courier, monospace",             // Classic monospace for code or data
    },

    // Font sizes
    fontSize: {
      hero: '64px',       // Level 1: Hero Headlines
      header: '42px',     // Level 2: Section Headers
      subheader: '24px',  // Level 3: Sub-headers
      body: '18px',       // Level 4: Body Text
      small: '14px',      // Level 5: Supporting Text
      tiny: '12px',       // Footnotes, legal text
    },

    // Font weights
    fontWeight: {
      ultraBold: 800,     // Hero headlines
      bold: 700,          // Headers
      semiBold: 600,      // Sub-headers
      medium: 500,        // Emphasized body text
      regular: 400,       // Body text
      light: 300,         // Supporting text
    },

    // Line heights
    lineHeight: {
      tight: 1.1,         // Headlines
      normal: 1.5,        // Body text
      relaxed: 1.75,      // Supporting text
    },
  },

  // Spacing System (8px Grid)
  spacing: {
    micro: '8px',         // Element padding, small gaps
    small: '16px',        // Card spacing, form fields
    medium: '32px',       // Section internal spacing
    large: '64px',        // Between major sections
    xl: '96px',           // Hero section breathing room
    xxl: '128px',         // Major layout divisions
  },

  // Border Radius
  borderRadius: {
    small: '4px',         // Small elements like buttons
    medium: '8px',        // Cards, form fields
    large: '16px',        // Modal windows, larger cards
    pill: '9999px',       // Pill-shaped elements
  },

  // Shadows
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.07)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },

  // Transitions
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },

  // Z-index scale
  zIndex: {
    base: 0,
    above: 1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
};

// Helper functions
export const media = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  xxl: `@media (min-width: ${theme.breakpoints.xxl})`,
};