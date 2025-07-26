import React, { useRef, useEffect, useState } from 'react';
import { FaApple, FaAmazon, FaEthereum, FaDollarSign, FaBitcoin, FaGoogle, FaMicrosoft, FaPaypal, FaSpotify, FaTwitter } from 'react-icons/fa';
import { SiTesla, SiNetflix, SiNvidia, SiMeta, SiUber } from 'react-icons/si';
import deviceImage from '../../assets/devices.png';


const HeroSection = () => {
  const contentRef = useRef(null);
  const deviceRef = useRef(null);
  const orbitSystemRef = useRef(null);
  const orbitsRef = useRef([]);
  const ringsRef = useRef([]);
  const [scrollY, setScrollY] = useState(0);
  
  // Base configuration for orbiting icons
  const baseOrbitConfigs = [
    { icon: <FaApple />, size: 55, tilt: 15, color: '#007AFF', bgColor: '#ffffff' },
    { icon: <FaAmazon />, size: 50, tilt: -25, color: '#FF9500', bgColor: '#ffffff' },
    { icon: <FaGoogle />, size: 48, tilt: 30, color: '#4285F4', bgColor: '#ffffff' },
    { icon: <FaMicrosoft />, size: 52, tilt: -15, color: '#00A1F1', bgColor: '#ffffff' },
    { icon: <SiTesla />, size: 50, tilt: 25, color: '#CC0000', bgColor: '#ffffff' },
    { icon: <FaEthereum />, size: 58, tilt: 35, color: '#627EEA', bgColor: '#ffffff' },
    { icon: <SiNetflix />, size: 46, tilt: -20, color: '#E50914', bgColor: '#ffffff' },
    { icon: <FaPaypal />, size: 49, tilt: 18, color: '#0070BA', bgColor: '#ffffff' },
    { icon: <FaDollarSign />, size: 45, tilt: -10, color: '#34C759', bgColor: '#ffffff' },
    { icon: <FaBitcoin />, size: 52, tilt: 20, color: '#F7931A', bgColor: '#ffffff' },
    { icon: <SiNvidia />, size: 51, tilt: -28, color: '#76B900', bgColor: '#ffffff' },
    { icon: <SiMeta />, size: 53, tilt: 22, color: '#1877F2', bgColor: '#ffffff' },
    { icon: <FaSpotify />, size: 47, tilt: -18, color: '#1DB954', bgColor: '#ffffff' },
    { icon: <FaTwitter />, size: 44, tilt: 32, color: '#1DA1F2', bgColor: '#ffffff' },
    { icon: <SiUber />, size: 48, tilt: -12, color: '#000000', bgColor: '#ffffff' }
  ];
  
  // Calculate equal spacing to fill complete circle without gaps
  const angleStep = 360 / baseOrbitConfigs.length;
  const orbitConfigs = baseOrbitConfigs.map((config, index) => ({
    ...config,
    radius: index % 2 === 0 ? 220 : 250,
    duration: 30,
    initialOffset: index * (445 / baseOrbitConfigs.length)

  }));
  
  // Ring configurations - electron orbital paths with depth
  const ringConfigs = [
    { radius: 170, width: 2, color: '#E50914', opacity: 0.4, depth: -25 },
    { radius: 175, width: 2, color: '#1DA1F2', opacity: 0.4, depth: 35 },
    { radius: 180, width: 2, color: '#4285F4', opacity: 0.5, depth: -15 },
    { radius: 185, width: 2, color: '#1DB954', opacity: 0.4, depth: 28 },
    { radius: 190, width: 2, color: '#CC0000', opacity: 0.5, depth: -20 },
    { radius: 195, width: 2, color: '#76B900', opacity: 0.4, depth: 22 },
    { radius: 200, width: 3, color: '#FF9500', opacity: 0.6, depth: 20 },
    { radius: 205, width: 2, color: '#1877F2', opacity: 0.4, depth: -18 },
    { radius: 210, width: 2, color: '#0070BA', opacity: 0.5, depth: 25 },
    { radius: 220, width: 2, color: '#00A1F1', opacity: 0.5, depth: -10 },
    { radius: 220, width: 2, color: '#F7931A', opacity: 0.5, depth: 15 },
    { radius: 240, width: 2, color: '#627EEA', opacity: 0.5, depth: 30 },
    { radius: 180, width: 2, color: '#34C759', opacity: 0.5, depth: -12 },
    { radius: 200, width: 2, color: '#007AFF', opacity: 0.5, depth: 18 }
  ];
  
  // Reset refs arrays
  orbitsRef.current = [];
  ringsRef.current = [];
  


  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate content with stagger
    const tl = {
      to: (target, props) => {
        if (!target) return;
        
        const element = target;
        const duration = props.duration || 1;
        const delay = props.delay || 0;
        
        setTimeout(() => {
          element.style.transition = `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          Object.keys(props).forEach(key => {
            if (key !== 'duration' && key !== 'delay') {
              if (key === 'opacity' || key === 'y') {
                if (key === 'opacity') element.style.opacity = props[key];
                if (key === 'y') element.style.transform = `translateY(${props[key]}px)`;
              }
            }
          });
        }, delay * 1000);
      }
    };
    
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.3
    });
    
    tl.to(deviceRef.current, {
      opacity: 1,
      duration: 1.5,
      delay: 0.6
    });
    
    // Enhanced floating animation for device
    let deviceFloatOffset = 0;
    const deviceFloat = () => {
      deviceFloatOffset += 0.015;
      if (deviceRef.current) {
        const floatY = Math.sin(deviceFloatOffset) * 12;
        const floatX = Math.cos(deviceFloatOffset * 0.7) * 4;
        deviceRef.current.style.transform = `translate(${floatX}px, ${floatY}px) translateZ(30px)`;
      }
      requestAnimationFrame(deviceFloat);
    };
    deviceFloat();
    
    // Add subtle 3D rotation to orbit system
    let orbitRotation = 0;
    const rotateOrbitSystem = () => {
      orbitRotation += 0.05;
      if (orbitSystemRef.current) {
        orbitSystemRef.current.style.transform = `translate(-50%, -50%) translateZ(-20px) rotateX(5deg) rotateY(15deg)`;
      }
      requestAnimationFrame(rotateOrbitSystem);
    };
    setTimeout(rotateOrbitSystem, 1000);
    
    // Animate rings with stagger
    ringsRef.current.forEach((ring, index) => {
      setTimeout(() => {
        if (ring) {
          ring.style.transition = 'opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          ring.style.opacity = ringConfigs[index]?.opacity || 0.15;
        }
      }, (800 + index * 150));
    });
    
    // Enhanced 3D orbital animations
    orbitsRef.current.forEach((orbit, index) => {
      const config = orbitConfigs[index];
      
      // Fade in with scale
      setTimeout(() => {
        if (orbit) {
          orbit.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          orbit.style.opacity = '1';
          orbit.style.transform = orbit.style.transform.replace('scale(0)', 'scale(1)');
        }
      }, 1200 + index * 200);
      
      // Start orbital animation after fade in
      setTimeout(() => {
        let angle = config.initialOffset;
        const animate = () => {
          if (!orbit) return;
          
          angle += 360 / (config.duration * 60); // 60fps assumption
          
          // Calculate position on a 3D path
          const radians = (angle * Math.PI) / 180;
          const tiltRadians = (config.tilt * Math.PI) / 180;
          
          // Enhanced 3D effect to path while keeping icons flat
          const x = Math.cos(radians) * config.radius;
          const y = Math.sin(radians) * config.radius * Math.cos(tiltRadians * 0.5);
          const z = Math.sin(radians) * Math.sin(tiltRadians) * 15;
          
          // Fixed scale for consistent 2D appearance
          const finalScale = 1;
          
          // Fixed opacity for consistent visibility
          const finalOpacity = 1;
          
          // Consistent shadow for subtle depth
          const shadowIntensity = 1;
          const finalShadowBlur = 8;
          
          orbit.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${finalScale})`;
          orbit.style.opacity = finalOpacity;
          // Add glow effect matching the brand color
          orbit.style.boxShadow = `0 0 12px ${config.color}50, 0 3px 8px rgba(0, 0, 0, 0.1)`;
          orbit.style.zIndex = z > 0 ? 5 : 15;
          
          requestAnimationFrame(animate);
        };
        animate();
      }, 1800 + index * 200);
    });
  }, []);
  
  // Add orbit icon to refs
  const addToOrbitRefs = (el) => {
    if (el && !orbitsRef.current.includes(el)) {
      orbitsRef.current.push(el);
    }
  };
  
  // Add ring to refs
  const addToRingRefs = (el) => {
    if (el && !ringsRef.current.includes(el)) {
      ringsRef.current.push(el);
    }
  };
  
  return (
    <div 
      style={{
        display: 'flex',
        minHeight: '100vh',
        padding: '5rem 5%',
        // background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #e8f0ff 100%)',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transform: `translateY(${scrollY * 0.05}px)`
      }}>
      {/* Content Section */}
      <div 
        ref={contentRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 2,
          opacity: 0,
          transform: 'translateY(30px)'
        }}
      >
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          color: '#1a2b4e',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          An intelligent way to<br />
          <span style={{
            background: 'linear-gradient(135deg, #3498db 0%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Invest & Trade
          </span>
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#5a6c7d',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '480px'
        }}>
          Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms.
        </p>
        
        <button style={{
          background: 'linear-gradient(135deg, #3498db, #2980b9)',
          color: 'white',
          fontFamily: 'inherit',
          fontWeight: '600',
          fontSize: '1.1rem',
          padding: '0.8rem 2rem',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
          transition: 'all 0.3s ease',
          alignSelf: 'flex-start'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 7px 20px rgba(52, 152, 219, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
        }}>
          Get Started
        </button>
      </div>
      
      {/* Visual Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        perspective: '2000px',
        overflow: 'visible'
      }}>
        <div 
          ref={deviceRef}
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            opacity: 0,
            transform: 'translateZ(30px)'
          }}
        >
          {/* Device Image */}
          <img 
            src={deviceImage}
            alt="Investment platform on devices"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '500px',
              filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.25))',
              transformStyle: 'preserve-3d',
              position: 'relative',
              zIndex: 10
            }}
          />
          
          {/* Enhanced Orbit System */}
          <div 
            ref={orbitSystemRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotateY(${scrollY * 0.05}deg)`,
              transformStyle: 'preserve-3d',
              width: 0,
              height: 0,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Orbit rings with individual tilts */}
            
            
            {/* 2D Brand logos orbiting in 3D paths */}
            {orbitConfigs.map((config, index) => (
              <div 
                key={`icon-${index}`}
                ref={addToOrbitRefs}
                style={{
                  position: 'absolute',
                  width: `${config.size}px`,
                  height: `${config.size}px`,
                  borderRadius: '50%',
                  background: config.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: config.color,
                  fontSize: '1.5rem',
                  transformStyle: 'flat',
                  opacity: 0,
                  transform: `translate(-50%, -50%) scale(0)`,
                  marginLeft: `-${config.size / 2}px`,
                  marginTop: `-${config.size / 2}px`,
                  willChange: 'transform, opacity',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid rgba(52, 152, 219, 0.1)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  // Keep icons flat (2D) while they move in 3D space
                  backfaceVisibility: 'visible'
                }}
                onMouseEnter={(e) => {
                  const currentTransform = e.target.style.transform;
                  e.target.style.transform = currentTransform.replace(/scale\([^)]*\)/, 'scale(1.2)');
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  const currentTransform = e.target.style.transform;
                  e.target.style.transform = currentTransform.replace(/scale\([^)]*\)/, 'scale(1)');
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                {config.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;