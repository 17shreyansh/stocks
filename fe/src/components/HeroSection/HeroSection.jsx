import React, { useRef, useEffect, useState } from 'react';
import deviceImage from '../../assets/devices.png';
import axios from '../../utils/axios';

// Component Data Constants
const HERO_DATA = {
  title: {
    main: "An intelligent way to",
    highlight: "Invest & Trade"
  },
  description: "Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms.",
  buttons: [
    { text: "Get Started", type: "primary", link: "/contact-us" },
    { text: "Learn More", type: "secondary", link: "/about" }
  ],
  scrollText: "Scroll Down",
  orbitConfigs: [
    { logo: 'https://logo.clearbit.com/tcs.com', text: 'TCS', size: 55, tilt: 15, color: '#0066CC', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/infosys.com', text: 'INFY', size: 50, tilt: -25, color: '#1F4E79', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/wipro.com', text: 'WIPRO', size: 48, tilt: 30, color: '#007CC3', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/hcltech.com', text: 'HCL', size: 52, tilt: -15, color: '#004C8F', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/ril.com', text: 'RIL', size: 50, tilt: 25, color: '#8B4513', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/hdfcbank.com', text: 'HDFC', size: 58, tilt: 35, color: '#FF6B35', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/icicibank.com', text: 'ICICI', size: 46, tilt: -20, color: '#2E8B57', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/sbi.co.in', text: 'SBI', size: 49, tilt: 18, color: '#DC143C', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/itc.in', text: 'ITC', size: 45, tilt: -10, color: '#4169E1', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/larsentoubro.com', text: 'L&T', size: 52, tilt: 20, color: '#32CD32', bgColor: '#ffffff' },
    // { logo: 'https://logo.clearbit.com/axisbank.com', text: 'AXIS', size: 51, tilt: -28, color: '#FFD700', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/bajajfinserv.in', text: 'BAJAJ', size: 53, tilt: 22, color: '#FF4500', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/marutisuzuki.com', text: 'MARUTI', size: 47, tilt: -18, color: '#8A2BE2', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/ntpc.co.in', text: 'NTPC', size: 44, tilt: 32, color: '#228B22', bgColor: '#ffffff' },
    { logo: 'https://logo.clearbit.com/ongcindia.com', text: 'ONGC', size: 48, tilt: -12, color: '#006400', bgColor: '#ffffff' }
  ]
};


const HeroSection = ({ data: propData }) => {
  const contentRef = useRef(null);
  const deviceRef = useRef(null);
  const orbitSystemRef = useRef(null);
  const orbitsRef = useRef([]);
  const ringsRef = useRef([]);
  const [scrollY, setScrollY] = useState(0);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  
  const baseOrbitConfigs = HERO_DATA.orbitConfigs;
  
  // Calculate equal spacing to fill complete circle without gaps
  const angleStep = 360 / baseOrbitConfigs.length;
  const orbitConfigs = baseOrbitConfigs.map((config, index) => ({
    ...config,
    radius: index % 2 === 0 ? 220 : 250,
    mobileRadius: index % 2 === 0 ? 100 : 120,
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
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await axios.get('/hero/homepage');
      if (response.data.success && response.data.data) {
        setHeroData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
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
          
          // Use mobile radius on small screens
          const currentRadius = window.innerWidth <= 768 ? config.mobileRadius : config.radius;
          
          // Enhanced 3D effect to path while keeping icons flat
          const x = Math.cos(radians) * currentRadius;
          const y = Math.sin(radians) * currentRadius * Math.cos(tiltRadians * 0.5);
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
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
            }
            50% {
              box-shadow: 0 8px 30px rgba(52, 152, 219, 0.6);
            }
          }
        `}
      </style>
      <div 
        className="hero-container"
        style={{
          display: 'flex',
          minHeight: '100vh',
          padding: '120px 5% 80px',
          background: 'linear-gradient(135deg, rgba(248, 250, 255, 0.9) 0%, rgba(232, 244, 253, 0.8) 25%, rgba(240, 248, 255, 0.9) 50%, rgba(230, 243, 255, 0.8) 75%, rgba(245, 249, 255, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          transform: `translateY(${scrollY * 0.05}px)`,
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
        }}>
      {/* Visual Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        perspective: '2000px',
        overflow: 'visible',
        order: window.innerWidth <= 768 ? 1 : 2
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
            alt=""
            role="presentation"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: window.innerWidth <= 768 ? '300px' : '500px',
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
            {/* 2D Brand logos orbiting in 3D paths */}
            {orbitConfigs.map((config, index) => (
              <div 
                key={`icon-${index}`}
                ref={addToOrbitRefs}
                aria-hidden="true"
                role="presentation"
                style={{
                  position: 'absolute',
                  width: `${window.innerWidth <= 768 ? config.size * 0.7 : config.size}px`,
                  height: `${window.innerWidth <= 768 ? config.size * 0.7 : config.size}px`,
                  borderRadius: '50%',
                  background: config.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: config.color,
                  fontSize: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                  transformStyle: 'flat',
                  opacity: 0,
                  transform: `translate(-50%, -50%) scale(0)`,
                  marginLeft: `-${(window.innerWidth <= 768 ? config.size * 0.7 : config.size) / 2}px`,
                  marginTop: `-${(window.innerWidth <= 768 ? config.size * 0.7 : config.size) / 2}px`,
                  willChange: 'transform, opacity',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(52, 152, 219, 0.1)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  backfaceVisibility: 'visible'
                }}
                onMouseEnter={(e) => {
                  const currentTransform = e.target.style.transform;
                  e.target.style.transform = currentTransform.replace(/scale\([^)]*\)/, 'scale(1.3)');
                  e.target.style.boxShadow = `0 12px 30px ${config.color}40, 0 0 20px ${config.color}30`;
                  e.target.style.zIndex = '100';
                  e.target.style.filter = 'brightness(1.2)';
                }}
                onMouseLeave={(e) => {
                  const currentTransform = e.target.style.transform;
                  e.target.style.transform = currentTransform.replace(/scale\([^)]*\)/, 'scale(1)');
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                  e.target.style.zIndex = '15';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                <img 
                  src={config.logo} 
                  alt={config.text}
                  style={{ 
                    width: '70%', 
                    height: '70%', 
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.outerHTML = `<span style="font-size: 10px; font-weight: 600;">${config.text}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
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
          transform: 'translateY(30px)',
          order: window.innerWidth <= 768 ? 2 : 1
        }}
      >
        <h1 className="hero-title" style={{
          fontSize: window.innerWidth <= 768 ? '2.5rem' : '3.5rem',
          fontWeight: '700',
          color: '#1a2b4e',
          marginBottom: '1.5rem',
          lineHeight: '1.2',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          cursor: 'default',
          background: 'linear-gradient(135deg, #1a2b4e 0%, #3498db 50%, #2980b9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'slideInUp 1s ease-out',
          textAlign: window.innerWidth <= 768 ? 'center' : 'left'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.02)';
          e.target.style.transition = 'transform 0.3s ease';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}>
          {propData?.title?.main || heroData?.title?.main || HERO_DATA.title.main}<br />
          <span style={{
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 50%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease-in-out infinite'
          }}>
            {propData?.title?.highlight || heroData?.title?.highlight || HERO_DATA.title.highlight}
          </span>
        </h1>
        
        <p className="hero-text" style={{
          fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem',
          color: '#5a6c7d',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          maxWidth: '480px',
          transition: 'all 0.3s ease',
          animation: 'slideInUp 1s ease-out 0.3s both',
          textAlign: window.innerWidth <= 768 ? 'center' : 'left'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#3498db';
          e.target.style.transform = 'translateX(5px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#5a6c7d';
          e.target.style.transform = 'translateX(0)';
        }}>
          {propData?.description || heroData?.description || HERO_DATA.description}
        </p>
        
        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start' }}>
          {(propData?.buttons || heroData?.buttons || HERO_DATA.buttons).map((button, index) => {
            const ButtonComponent = button.link ? 'a' : 'button';
            const buttonProps = button.link ? { href: button.link } : {};
            
            return (
              <ButtonComponent
                key={index}
                {...buttonProps}
                aria-label={button.text}
                style={{
                  background: button.type === 'primary' ? 'linear-gradient(135deg, #3498db, #2980b9)' : 'transparent',
                  color: button.type === 'primary' ? 'white' : '#3498db',
                  fontFamily: 'inherit',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  padding: '0.8rem 2rem',
                  border: button.type === 'primary' ? 'none' : '2px solid #3498db',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  boxShadow: button.type === 'primary' ? '0 4px 15px rgba(52, 152, 219, 0.3)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: button.type === 'primary' ? 'fadeInScale 1s ease-out 0.6s both, glow 2s ease-in-out infinite' : 'fadeInScale 1s ease-out 0.6s both',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  if (button.type === 'primary') {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 10px 25px rgba(52, 152, 219, 0.4)';
                  } else {
                    e.target.style.background = '#3498db';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (button.type === 'primary') {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                  } else {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#3498db';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {button.text}
              </ButtonComponent>
            );
          })}
        </div>
        
        {/* Floating Stats */}
        {/* <div className="hero-stats" style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
        }}>
          {[
            { label: '25K+', desc: 'Active Users' },
            { label: '₹500Cr+', desc: 'Assets Managed' },
            { label: '99.9%', desc: 'Uptime' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 255, 0.8))',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(52, 152, 219, 0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#3498db' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.desc}</div>
            </div>
          ))}
        </div> */}
      </div>


      
      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      role="button"
      tabIndex={0}
      aria-label="Scroll to next section"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}>
        <div style={{
          width: '2px',
          height: '30px',
          background: 'linear-gradient(to bottom, #3498db, transparent)',
          borderRadius: '1px',
          animation: 'bounce 2s infinite'
        }}></div>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontWeight: '500'
        }}>{propData?.scrollText || heroData?.scrollText || HERO_DATA.scrollText}</div>
      </div>
    </div>
    </>
  );
};

export default HeroSection;