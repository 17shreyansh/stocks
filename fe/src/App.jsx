import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import Preloader from './components/Preloader'
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

function App() {
  const [loading, setLoading] = useState(true)

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
            <AboutUs />
            <TrustManifesto/>
            <MobileApp />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
            <AttentionInvestors />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </ThemeProvider>
  )
}

export default App
