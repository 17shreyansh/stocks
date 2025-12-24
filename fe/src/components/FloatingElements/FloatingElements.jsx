import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const float1 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-180deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(90deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const getAnimation = (animationName) => {
  switch(animationName) {
    case 'float1': return float1;
    case 'float2': return float2;
    case 'float3': return float3;
    default: return float1;
  }
};

const FloatingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.$gradient};
  opacity: 0.1;
  ${props => css`
    animation: ${getAnimation(props.$animationName)} ${props.$duration}s ease-in-out infinite;
    animation-delay: ${props.$delay}s;
  `}
`;

const FloatingShape = styled.div`
  position: absolute;
  opacity: 0.05;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const Triangle = styled(FloatingShape)`
  width: 0;
  height: 0;
  border-left: ${props => props.$size}px solid transparent;
  border-right: ${props => props.$size}px solid transparent;
  border-bottom: ${props => props.$size * 1.5}px solid #3498db;
`;

const Square = styled(FloatingShape)`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transform: rotate(45deg);
`;

const Circle = styled(FloatingShape)`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb, #f5576c);
`;

const FloatingElements = () => {
  const containerRef = useRef(null);

  const elements = [
    {
      size: 60,
      top: '10%',
      left: '5%',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      animationName: 'float1',
      duration: 6,
      delay: 0
    },
    {
      size: 40,
      top: '20%',
      right: '10%',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      animationName: 'float2',
      duration: 8,
      delay: 1
    },
    {
      size: 80,
      top: '60%',
      left: '8%',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      animationName: 'float3',
      duration: 10,
      delay: 2
    },
    {
      size: 50,
      top: '70%',
      right: '15%',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      animationName: 'float1',
      duration: 7,
      delay: 3
    },
    {
      size: 35,
      top: '40%',
      left: '85%',
      gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
      animationName: 'float2',
      duration: 9,
      delay: 1.5
    }
  ];

  const shapes = [
    { type: 'triangle', size: 30, top: '15%', left: '75%', delay: 0 },
    { type: 'square', size: 25, top: '45%', left: '5%', delay: 2 },
    { type: 'circle', size: 35, top: '80%', left: '70%', delay: 4 },
    { type: 'triangle', size: 20, top: '25%', left: '25%', delay: 1 },
    { type: 'square', size: 40, top: '65%', left: '90%', delay: 3 }
  ];

  return (
    <FloatingContainer ref={containerRef}>
      {elements.map((element, index) => (
        <FloatingElement
          key={`element-${index}`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            top: element.top,
            left: element.left,
            right: element.right
          }}
          $gradient={element.gradient}
          $animationName={element.animationName}
          $duration={element.duration}
          $delay={element.delay}
        />
      ))}
      
      {shapes.map((shape, index) => {
        const ShapeComponent = shape.type === 'triangle' ? Triangle : 
                             shape.type === 'square' ? Square : Circle;
        
        return (
          <ShapeComponent
            key={`shape-${index}`}
            $size={shape.size}
            $delay={shape.delay}
            style={{
              top: shape.top,
              left: shape.left
            }}
          />
        );
      })}
    </FloatingContainer>
  );
};

export default FloatingElements;