import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import './styles/responsive.css'
import './styles/animations.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Downloads, HomePage } from './pages'
import Policies from './pages/Policies'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import GrievancePolicy from './pages/GrievancePolicy'
import UnderConstruction from './pages/UnderConstruction'
import ProductPage from './pages/ProductPage'
import AdminApp from './admin/AdminApp'

function App() {
  // Check if current path is admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
          <Route path="/terms-of-service" element={
            <>
              <Header startAnimation={true} />
              <TermsOfService />
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
          <Route path="/refund-policy" element={
            <>
              <Header startAnimation={true} />
              <RefundPolicy />
              <Footer />
            </>
          } />
          <Route path="/grievance-policy" element={
            <>
              <Header startAnimation={true} />
              <GrievancePolicy />
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
