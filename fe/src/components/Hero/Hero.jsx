import React, { useEffect, useRef } from 'react';
import styles from './HeroSymphony.module.css';
import gsap from 'gsap';

const HeroSymphony = ({ startAnimation = true }) => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize particles immediately
    initParticles();
    
    // Start floating animations immediately for brand orbit effect
    cardsRef.current.forEach((card, index) => {
      // Immediate floating animation without delay
      gsap.to(card, {
        y: '+=10',
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Animate hero elements
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      heroRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    );
    
    // Animate headline characters
    const headlineText = headlineRef.current;
    const chars = headlineText.innerText.split('');
    headlineText.innerHTML = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      headlineText.appendChild(span);
      
      tl.to(span, { 
        opacity: 1, 
        y: 0, 
        duration: 0.05, 
        delay: index * 0.03 
      }, 0.5);
    });
    
    // Animate floating cards appearance
    cardsRef.current.forEach((card, index) => {
      tl.fromTo(
        card,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: index * 0.2 },
        1
      );
    });
    
    // Scroll indicator animation
    tl.fromTo(
      '.scrollIndicator',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 },
      2
    );
    
    // Pulse animation for scroll indicator
    gsap.to('.scrollIndicator', {
      y: '+=10',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Initialize particle system
  const initParticles = () => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  };
  
  // Mouse parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(particlesRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: "power1.out"
    });
    
    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        x: xPos * (index * 0.2 + 0.5),
        rotateY: xPos * 0.2,
        rotateX: -yPos * 0.2,
        duration: 1,
        ease: "power1.out"
      });
    });
  };

  return (
    <section className={styles.heroSection} ref={heroRef} onMouseMove={handleMouseMove}>
      <canvas ref={particlesRef} className={styles.particles}></canvas>
      
      <div className={styles.heroContent}>
        
        
        <h1 className={styles.headline} ref={headlineRef}>
          The Future of Stock Trading Starts Here.
        </h1>
        
        <div className={styles.cardsContainer}>
          {/* Market Preview Cards */}
          <div 
            className={`${styles.card} ${styles.card1}`}
            ref={el => cardsRef.current[0] = el}
          >
            <div className={styles.cardHeader}>
              <h3>NIFTY 50</h3>
              <span className={styles.positive}>+1.2%</span>
            </div>
            <div className={styles.chart}>
              <svg viewBox="0 0 100 30" className={styles.chartLine}>
                <path d="M0,15 L10,10 L20,20 L30,15 L40,25 L50,20 L60,30 L70,25 L80,15 L90,20 L100,10" />
              </svg>
            </div>
            <div className={styles.cardFooter}>
              <span>22,631.75</span>
              <span className={styles.positive}>+267.80</span>
            </div>
          </div>
          
          <div 
            className={`${styles.card} ${styles.card2}`}
            ref={el => cardsRef.current[1] = el}
          >
            <div className={styles.cardHeader}>
              <h3>SENSEX</h3>
              <span className={styles.positive}>+0.9%</span>
            </div>
            <div className={styles.chart}>
              <svg viewBox="0 0 100 30" className={styles.chartLine}>
                <path d="M0,20 L10,15 L20,25 L30,20 L40,10 L50,15 L60,5 L70,10 L80,15 L90,5 L100,10" />
              </svg>
            </div>
            <div className={styles.cardFooter}>
              <span>74,671.28</span>
              <span className={styles.positive}>+671.30</span>
            </div>
          </div>
          
          <div 
            className={`${styles.card} ${styles.card3}`}
            ref={el => cardsRef.current[2] = el}
          >
            <div className={styles.cardHeader}>
              <h3>NASDAQ</h3>
              <span className={styles.negative}>-0.3%</span>
            </div>
            <div className={styles.chart}>
              <svg viewBox="0 0 100 30" className={styles.chartLine}>
                <path d="M0,10 L10,15 L20,10 L30,20 L40,15 L50,25 L60,20 L70,25 L80,20 L90,25 L100,30" />
              </svg>
            </div>
            <div className={styles.cardFooter}>
              <span>16,315.70</span>
              <span className={styles.negative}>-48.12</span>
            </div>
          </div>
        </div>
        
        <button className={styles.ctaButton}>
          Start Investing
          <span className={styles.buttonArrow}>→</span>
        </button>
        
        <div className={styles.scrollIndicator}>
          <span>Scroll to Explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSymphony;