import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Percentage of element visibility to trigger callback (0-1)
 * @param {string} options.root - Element that is used as the viewport for checking visibility
 * @param {string} options.rootMargin - Margin around the root element
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, isInView] - Ref to attach to element and boolean indicating if element is in view
 */
const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
} = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef(null);
  
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting;
        
        setIsInView(isElementInView);
        
        // If element is in view and triggerOnce is true, unobserve
        if (isElementInView && triggerOnce && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      },
      { threshold, root, rootMargin }
    );
    
    // Observe element if it exists
    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }
    
    // Cleanup
    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);
  
  return [ref, isInView];
};

export default useIntersectionObserver;