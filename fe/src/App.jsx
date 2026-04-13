import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import './styles/responsive.css'
import './styles/animations.css'
import './styles/accessibility.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Downloads, HomePage, Pricing, ContactUs } from './pages'
import Policies from './pages/Policies'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Disclaimer from './pages/Disclaimer'
import UnderConstruction from './pages/UnderConstruction'
import ProductPage from './pages/ProductPage'
import InvestorCharter from './pages/InvestorCharter'
import AdminApp from './admin/AdminApp'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { AccessibilityPanel, AccessibilityButton } from './components/Accessibility'

function App() {
  // Check if current path is admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <AccessibilityProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AccessibilityButton />
        <AccessibilityPanel />
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/downloads" element={
            <>
              <Header startAnimation={true} />
              <Downloads />
              <Footer />
            </>
          } />
          <Route path="/policies" element={
            <>
              <Header startAnimation={true} />
              <Policies />
              <Footer />
            </>
          } />
          <Route path="/privacy-policy" element={
            <>
              <Header startAnimation={true} />
              <PrivacyPolicy />
              <Footer />
            </>
          } />
          <Route path="/disclaimer" element={
            <>
              <Header startAnimation={true} />
              <Disclaimer />
              <Footer />
            </>
          } />
          <Route path="/open-account" element={
            <>
              <Header startAnimation={true} />
              <UnderConstruction />
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Header startAnimation={true} />
              <ProductPage />
              <Footer />
            </>
          } />
          <Route path="/investor-charter" element={
            <>
              <Header startAnimation={true} />
              <InvestorCharter />
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Header startAnimation={true} />
              <Pricing />
              <Footer />
            </>
          } />
          <Route path="/contact-us" element={
            <>
              <Header startAnimation={true} />
              <ContactUs />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
    </AccessibilityProvider>
  )
}

export default App
