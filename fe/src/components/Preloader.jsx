import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'

const fadeInOut = keyframes`
  0% { 
    transform: translateY(-30px);
    opacity: 0;
  }
  25% { 
    transform: translateY(0);
    opacity: 1;
  }
  75% { 
    transform: translateY(0);
    opacity: 1;
  }
  100% { 
    transform: translateY(-30px);
    opacity: 0;
  }
`

const fadeInOnly = keyframes`
  0% { 
    transform: translateY(-30px);
    opacity: 0;
  }
  25% { 
    transform: translateY(0);
    opacity: 1;
  }
  100% { 
    transform: translateY(0);
    opacity: 1;
  }
`

const fadeOut = keyframes`
  to { 
    opacity: 0;
    visibility: hidden;
  }
`

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${theme.colors.darkNavy};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${theme.zIndex.modal};
  animation: ${props => props.fadeOut ? fadeOut : 'none'} 0.4s ease-out forwards;
  
  ${media.lg} {
    justify-content: flex-start;
    padding-left: ${theme.spacing.medium};
  }
`

const TextSlide = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.subheader};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.white};
  text-align: center;
  animation: ${props => props.isLast ? fadeInOnly : fadeInOut} 2s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  
  ${media.lg} {
    font-size: ${theme.typography.fontSize.header};
    text-align: left;
    max-width: 600px;
  }
`

const texts = [
  "Welcome to Focus Stock Brokers",
  "Your Trusted Trading Partner",
  "Let's Begin Your Journey"
]

const Preloader = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => {
        if (prev < texts.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 400)
          }, 600)
          return prev
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [onComplete])

  if (currentText >= texts.length) return null

  return (
    <PreloaderContainer fadeOut={fadeOut}>
      <TextSlide key={currentText} isLast={currentText === texts.length - 1}>
        {texts[currentText]}
      </TextSlide>
    </PreloaderContainer>
  )
}

export default Preloader