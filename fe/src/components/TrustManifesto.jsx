import React, { useEffect, useRef, useState } from 'react';
import styles from './TrustManifesto.module.css';

const TrustManifesto = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  
  const manifestoStatements = [
    { text: "Traditional brokers complicate." },
    { text: "We simplify." },
    { text: "Traditional brokers hide fees." },
    { text: "We reveal everything." },
    { text: "Traditional brokers use old technology." },
    { text: "We built the future." }
  ];
  
  useEffect(() => {
    // Function to change to the next statement
    const changeStatement = () => {
      // First fade out
      setIsVisible(false);
      
      // After fade out, change the statement and fade in
      timeoutRef.current = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % manifestoStatements.length);
        setIsVisible(true);
      }, 600);
    };
    
    // Set timeout for next statement change
    const timer = setTimeout(changeStatement, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, manifestoStatements.length]);
  
  // Determine background color based on index
  const backgroundColor = activeIndex % 2 === 0 ? 'var(--color-white)' : 'var(--color-pearl)';
  
  // Determine text style based on index
  const isWeStatement = activeIndex % 2 === 1;

  return (
    <section 
      className={styles.trustManifesto} 
      id="manifesto"
      style={{ backgroundColor }}
    >
      <div className={styles.statementsContainer}>
        <div className={styles.statement}>
          <h2 
            className={`${styles.statementText} ${isWeStatement ? styles.weStatement : ''}`}
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            {manifestoStatements[activeIndex].text}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default TrustManifesto;

