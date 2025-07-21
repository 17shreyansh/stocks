import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollIndicator />
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <TrustManifesto/>
        <Services />
        <MobileApp />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
        <AttentionInvestors />
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default App
