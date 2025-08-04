import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AnimatedSection = ({ 
  children, 
  animation = 'fade-in', 
  delay = 0, 
  className = '',
  style = {},
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const animationStyles = {
    'fade-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
    },
    'slide-in-left': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
    },
    'slide-in-right': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
    },
    'scale-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.9)',
      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
    },
    'slide-up': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...animationStyles[animation],
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;