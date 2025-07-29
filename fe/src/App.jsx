import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
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

function App() {
  const [loading, setLoading] = useState(true)
  const [showRiskDisclosure, setShowRiskDisclosure] = useState(false)

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowRiskDisclosure(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <ScrollIndicator />
          <Header />
          <main>
            <HeroSection />
            <AdvancedSlider />
            <ProductGrid />
            <TrustManifesto/>
            <AboutUs />
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
