import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import './styles/responsive.css'
import './styles/animations.css'
import Preloader from './components/Preloader'
import RiskDisclosure from './components/RiskDisclosure'
import Header from './components/Header'
import AboutUs from './components/AboutUs'
import MobileApp from './components/MobileApp'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import AttentionInvestors from './components/AttentionInvestors'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollIndicator from './components/ScrollToTop/ScrollIndicator'
import TrustManifesto from './components/TrustManifesto'
import HeroSection from './components/HeroSection'
import AdvancedSlider from './components/AdvancedSlider'
import ProductGrid from './components/ProductGrid'
import FloatingElements from './components/FloatingElements'

function App() {
  const [loading, setLoading] = useState(true)
  const [showRiskDisclosure, setShowRiskDisclosure] = useState(false)

  useEffect(() => {
    if (!loading) {
      setShowRiskDisclosure(true)
    }
  }, [loading])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <FloatingElements />
          <ScrollIndicator />
          <Header />
          <main>
            <HeroSection />
            <TrustManifesto/>
            <AboutUs />
            <AdvancedSlider />
            <ProductGrid />
            <MobileApp />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
            <AttentionInvestors />
          </main>
          <Footer />
          <ScrollToTop />
          {showRiskDisclosure && (
            <RiskDisclosure onClose={() => setShowRiskDisclosure(false)} />
          )}
        </>
      )}
    </ThemeProvider>
  )
}

export default App
