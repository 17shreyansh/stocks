import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'

const PreloaderContainer = styled(motion.div)`
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
  
  ${media.lg} {
    justify-content: flex-start;
    padding-left: ${theme.spacing.medium};
  }
`

const TextSlide = styled(motion.div)`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.subheader};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.white};
  text-align: center;
  position: absolute;
  
  ${media.lg} {
    font-size: ${theme.typography.fontSize.header};
    text-align: left;
    max-width: 600px;
  }
`

const texts = [
  "Welcome to Focus Stock Broker Ltd",
  "Your Trusted Trading Partner",
  "Let's Begin Your Journey"
]

const Preloader = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => {
        if (prev < texts.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 800)
          }, 2500)
          return prev
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [onComplete])

  const containerVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const textVariants = {
    initial: { 
      y: 30, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: currentText === texts.length - 1 ? {} : {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <PreloaderContainer
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence mode="wait">
            <TextSlide
              key={currentText}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {texts[currentText]}
            </TextSlide>
          </AnimatePresence>
        </PreloaderContainer>
      )}
    </AnimatePresence>
  )
}

export default Preloader