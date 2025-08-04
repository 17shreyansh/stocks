import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'

const fadeInOut = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.9);
  }
  20% { 
    opacity: 1;
    transform: scale(1);
  }
  80% { 
    opacity: 1;
    transform: scale(1);
  }
  100% { 
    opacity: 0;
    transform: scale(0.9);
  }
`

const fadeInOnly = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.9);
  }
  20% { 
    opacity: 1;
    transform: scale(1);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
  }
`

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
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
  background: linear-gradient(135deg, #0f1419 0%, #1a202c 50%, #2d3748 100%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5%;
  z-index: ${theme.zIndex.modal};
  animation: ${props => props.$fadeOut ? fadeOut : 'none'} 0.3s ease-out forwards;
`

const TextSlide = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: white;
  text-align: left;
  animation: ${props => props.$isLast ? fadeInOnly : fadeInOut} 1.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  max-width: 800px;
  text-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
  
  @media (max-width: 768px) {
    font-size: 36px;
    padding: 0 20px;
  }
  
  &.typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid #3498db;
    animation: ${typewriter} 2.5s steps(40, end), blink-caret 0.75s step-end infinite, float 3s ease-in-out infinite;
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: #3498db; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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
            setTimeout(onComplete, 300)
          }, 600)
          return prev
        }
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [onComplete])

  if (currentText >= texts.length) return null

  return (
    <PreloaderContainer $fadeOut={fadeOut}>
      <TextSlide 
        key={currentText} 
        $isLast={currentText === texts.length - 1}
        className={currentText === texts.length - 1 ? 'typewriter' : ''}
      >
        {texts[currentText]}
      </TextSlide>
    </PreloaderContainer>
  )
}

export default Preloader