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
import { Downloads, HomePage, Pricing, ContactUs, AboutUsPage } from './pages'
import Policies from './pages/Policies'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Disclaimer from './pages/Disclaimer'
import UnderConstruction from './pages/UnderConstruction'
import ProductPage from './pages/ProductPage'
import InvestorCharter from './pages/InvestorCharter'
import Logo from './pages/Logo'
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
              <main id="main-content">
                <Downloads />
              </main>
              <Footer />
            </>
          } />
          <Route path="/policies" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <Policies />
              </main>
              <Footer />
            </>
          } />
          <Route path="/privacy-policy" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <PrivacyPolicy />
              </main>
              <Footer />
            </>
          } />
          <Route path="/disclaimer" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <Disclaimer />
              </main>
              <Footer />
            </>
          } />
          <Route path="/open-account" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <UnderConstruction />
              </main>
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <ProductPage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/investor-charter" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <InvestorCharter />
              </main>
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <Pricing />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact-us" element={
            <>
              <Header startAnimation={true} />
              <main id="main-content">
                <ContactUs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/logo" element={<Logo />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </AccessibilityProvider>
  )
}

export default App
