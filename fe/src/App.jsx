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

function App() {
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
