import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
// Optional theme. Falls back if missing.
import { theme as importedTheme } from '../../styles/theme';
import axios from '../../utils/axios';

/* =========================
   Theme / Helpers
   ========================= */
const DEFAULT_THEME = {
  colors: {
    primary: '#53aae4',
    secondary: '#3572bd', 
    navy: '#2d3f59ff',
    darkNavy: '#0F2A4A',
    text: '#2d3f59ff',
    subtext: '#475569',
    border: '#E2E8F0',
    softBg: '#F5F7FA',
    gold: '#D4AF37',
    white: '#FFFFFF',
    platinum: '#F5F7FA',
  },
};

const colors =
  importedTheme && importedTheme.colors ? { ...DEFAULT_THEME.colors, ...importedTheme.colors } : DEFAULT_THEME.colors;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================
   Styled
   ========================= */
const Section = styled.section`
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
  padding: 80px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(52, 152, 219, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 56px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -1px;
  font-weight: 700;
  color: #1a2b4e;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const TitleUnderline = styled.div`
  width: 80px;
  height: 3px;
  margin: 20px auto 0;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  border-radius: 999px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: ${colors.gold};
    border-radius: 50%;
    box-shadow: 0 0 0 2px ${colors.white};
  }
`;

const Subtitle = styled.p`
  margin: 16px auto 0;
  font-size: 20px;
  line-height: 1.6;
  color: #64748b;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 10px;
    
    .testimonial-nav-button {
      display: none;
    }
  }
`;

const Slider = styled.section`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 255, 0.9));
  border: 1px solid rgba(52, 152, 219, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(20px);
`;

const CardShell = styled.div`
  position: relative;
  min-height: 400px;
  background: transparent;
  
  @media (max-width: 768px) {
    min-height: 350px;
    position: static;
  }
  
  @media (max-width: 480px) {
    min-height: 320px;
  }
`;

const Card = styled.article`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 48px 52px;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 30px 20px;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px;
    gap: 15px;
  }
`;

const AvatarWrap = styled.div`
  flex: 0 0 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
  }
`;

const Avatar = styled.figure`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #3498db, #667eea);
  border: 4px solid white;
  box-shadow: 0 15px 35px rgba(52, 152, 219, 0.2);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: white;
  font-size: 2rem;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    font-size: 1.2rem;
  }
`;

const Stars = styled.span`
  display: flex;
  gap: 6px;
  margin-top: 12px;

  svg {
    display: block;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Quote = styled.blockquote`
  margin: 0 0 28px;
  font-size: 1.25rem;
  line-height: 1.75;
  color: ${colors.text};
  font-weight: 400;
  letter-spacing: 0.01em;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -12px;
    left: -16px;
    font-size: 4rem;
    color: ${colors.primary};
    opacity: 0.2;
    line-height: 1;
  }
  
  p {
    margin: 0;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
    
    &::before {
      font-size: 3rem;
      top: -8px;
      left: -12px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    
    &::before {
      font-size: 2.5rem;
      top: -6px;
      left: -10px;
    }
  }
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const AuthorMeta = styled.div`
  min-width: 0;
`;

const AuthorName = styled.h3`
  margin: 0 0 6px;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.navy};
  font-family: 'Georgia', serif;
`;

const AuthorRole = styled.p`
  margin: 0;
  color: ${colors.subtext};
  font-size: 1rem;
  font-style: italic;
  font-family: 'Georgia', serif;
`;

const ResultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
`;

const Navigation = styled.nav`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  padding: 0 -80px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #3498db;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  pointer-events: all;

  &:hover {
    transform: scale(1.1);
    background: #3498db;
    color: white;
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Dots = styled.div`
  display: none;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 2px solid ${({ $active }) => ($active ? colors.primary : colors.border)};
  background: ${({ $active }) => ($active ? colors.primary : colors.white)};
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  position: relative;

  &:hover { 
    transform: scale(1.3); 
    border-color: ${colors.primary};
  }
  &:focus-visible { 
    box-shadow: 0 0 0 3px ${colors.primary}40; 
  }
  
  ${({ $active }) => $active && `
    &::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid ${colors.primary}30;
    }
  `}
`;

const ProgressBarTrack = styled.span`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 4px;
  background: ${colors.border};
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.gold}, ${colors.secondary});
  transition: none;
  position: relative;
  
  &.running {
    animation: progressFill ${props => props.$duration || 6000}ms linear;
  }
  
  @keyframes progressFill {
    from { width: 0%; }
    to { width: 100%; }
  }
`;

const SrOnly = styled.span`
  position: absolute !important;
  height: 1px; width: 1px; overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`;

/* =========================
   Icons
   ========================= */
const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3 6.5 7 1-5 4.5 1.5 7L12 17.5 5.5 21 7 14 2 9.5l7-1L12 2z" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.5" />
  </svg>
);

const ArrowIcon = ({ dir = 'left' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={dir === 'left' ? 'M19 12H5M12 19L5 12L12 5' : 'M5 12H19M12 5L19 12L12 19'}
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   Defaults
   ========================= */
// Component Data Constants
const TESTIMONIALS_DATA = {
  title: 'What Our Clients Say',
  subtitle: 'Real stories from real investors who trust Focus Stock Broker Ltd',
  testimonials: [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: 'IT Professional',
      quote:
        'Focus Stock Broker Ltd has transformed my investment journey. The platform is clean and reliable; zero brokerage on delivery trades improved my net returns.',
      result: '23% returns in 8 months',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Business Owner',
      quote:
        'As a busy entrepreneur, I needed speed and clarity. Focus Stock Broker Ltd delivers both, and support is responsive when it actually matters.',
      result: '18% portfolio growth',
      rating: 5,
    },
    {
      id: 3,
      name: 'Amit Verma',
      role: 'Retired Professor',
      quote:
        'Their research notes are concise and decision‑oriented. It helped me structure a disciplined retirement portfolio.',
      result: 'Consistent 15% annual returns',
      rating: 5,
    },
  ]
};

/* =========================
   Component
   ========================= */
const Testimonials = ({
  data: propData,
  autoPlay = true,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  showProgress = true,
  loop = true,
  startIndex = 0,
  ariaLabel = 'Testimonials carousel',
}) => {
  const [testimonialsData, setTestimonialsData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const testimonials = propData?.testimonials || testimonialsData?.testimonials || TESTIMONIALS_DATA.testimonials;
  const title = propData?.title || testimonialsData?.title || TESTIMONIALS_DATA.title;
  const subtitle = propData?.subtitle || testimonialsData?.subtitle || TESTIMONIALS_DATA.subtitle;
  const [currentIndex, setCurrentIndex] = useState(() =>
    clamp(startIndex, 0, Math.max(0, testimonials.length - 1))
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => autoPlay && !prefersReducedMotion());
  const [progress, setProgress] = useState(0);

  const count = testimonials.length;
  const current = testimonials[currentIndex] || {};

  const sliderRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const keyScopeRef = useRef(null);
  const rAF = useRef(null);
  const timer = useRef({ last: 0, acc: 0 });

  useEffect(() => {
    fetchTestimonialsData();
  }, []);

  const fetchTestimonialsData = async () => {
    try {
      const response = await axios.get('/testimonials/homepage');
      if (response.data.success && response.data.data) {
        setTestimonialsData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials data:', error);
    } finally {
      setLoading(false);
    }
  };

  const headingId = useMemo(
    () => `ts-heading-${Math.random().toString(36).slice(2, 8)}`,
    []
  );
  const regionId = useMemo(
    () => `ts-region-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  const goto = useCallback(
    (idx) => {
      const next = loop ? (idx + count) % count : clamp(idx, 0, count - 1);
      setCurrentIndex(next);
      setProgress(0);
      timer.current.acc = 0;
      timer.current.last = 0;
    },
    [count, loop]
  );

  const next = useCallback(() => goto(currentIndex + 1), [goto, currentIndex]);
  const prev = useCallback(() => goto(currentIndex - 1), [goto, currentIndex]);

  // Card entrance animation with GSAP
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [currentIndex]);

  // Progress / autoplay via rAF (smoother than setInterval)
  useEffect(() => {
    if (!isAutoPlaying || count <= 1) return;

    const step = (now) => {
      if (!timer.current.last) timer.current.last = now;
      const delta = now - timer.current.last;
      timer.current.last = now;
      timer.current.acc += delta;

      const pct = clamp((timer.current.acc / autoPlayInterval) * 100, 0, 100);
      setProgress(pct);

      if (pct >= 100) {
        timer.current.acc = 0;
        goto(currentIndex + 1);
      }
      rAF.current = requestAnimationFrame(step);
    };

    rAF.current = requestAnimationFrame(step);
    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
      rAF.current = null;
      timer.current.last = 0;
    };
  }, [isAutoPlaying, autoPlayInterval, goto, currentIndex, count]);

  // Update progress bar with CSS animation
  useEffect(() => {
    if (!showProgress || !progressRef.current) return;
    
    if (isAutoPlaying) {
      progressRef.current.className = 'running';
      progressRef.current.style.animationDuration = `${autoPlayInterval}ms`;
    } else {
      progressRef.current.className = '';
      progressRef.current.style.width = `${progress}%`;
    }
  }, [isAutoPlaying, autoPlayInterval, progress, showProgress, currentIndex]);

  // Hover/focus pause
  const pause = useCallback(() => pauseOnHover && setIsAutoPlaying(false), [pauseOnHover]);
  const resume = useCallback(() => {
    if (autoPlay && !prefersReducedMotion()) {
      setIsAutoPlaying(true);
      setProgress(0);
      timer.current.acc = 0;
      timer.current.last = 0;
    }
  }, [autoPlay]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      const within = keyScopeRef.current && keyScopeRef.current.contains(document.activeElement);
      if (!within) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); setIsAutoPlaying((v) => !v); setProgress(0); }
      else if (e.key === 'Escape') { setIsAutoPlaying(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Touch swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; pause(); };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    resume();
  };

  // Stars
  const stars = Array.from({ length: clamp(Math.round(current.rating || 0), 0, 5) });

  return (
    <Section aria-labelledby={headingId}>
      <Container>
        <Header>
          <Title id={headingId}>{title}</Title>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </Header>

        <SliderContainer>
          <Slider
            className="testimonial-slider"
            ref={keyScopeRef}
            role="region"
            id={regionId}
            aria-label={ariaLabel}
            aria-live="polite"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <CardShell>
              <Card
                className="testimonial-card"
                ref={cardRef}
                key={current.id ?? currentIndex}
                aria-label={`Slide ${currentIndex + 1} of ${count}`}
              >
                <AvatarWrap>
                  <Avatar role="img" aria-label={`${current.name} avatar`}>
                    {current.avatarUrl ? (
                      <img src={current.avatarUrl} alt={`${current.name} avatar`} />
                    ) : (
                      <span>
                        {(current.initials && current.initials.trim()) ||
                          (current.name ? current.name.trim().charAt(0).toUpperCase() : '?')}
                      </span>
                    )}
                  </Avatar>
                  {stars.length > 0 && (
                    <Stars role="img" aria-label={`Rating: ${stars.length} out of 5`}>
                      {stars.map((_, i) => <StarIcon key={i} />)}
                    </Stars>
                  )}
                </AvatarWrap>

                <Content>
                  <Quote>
                    <p>{current.quote}</p>
                  </Quote>

                  <AuthorRow>
                    <AuthorMeta>
                      <AuthorName>{current.name}</AuthorName>
                      {current.role ? <AuthorRole>{current.role}</AuthorRole> : null}
                    </AuthorMeta>

                    {current.result ? (
                      <ResultBadge>
                        <span aria-hidden="true">📈</span> {current.result}
                      </ResultBadge>
                    ) : null}
                  </AuthorRow>
                </Content>
              </Card>
            </CardShell>

            {showProgress && count > 1 && (
              <ProgressBarTrack aria-hidden="true">
                <ProgressBarFill ref={progressRef} $duration={autoPlayInterval} />
              </ProgressBarTrack>
            )}
          </Slider>

          {count > 1 && (
            <Navigation className="testimonial-navigation" aria-controls={regionId} aria-label="Carousel controls">
              <NavButton className="testimonial-nav-button magnetic hover-glow" type="button" onClick={prev} aria-label="Previous testimonial" title="Previous" style={{ marginLeft: '-80px' }}>
                <ArrowIcon dir="left" />
              </NavButton>
              <NavButton className="testimonial-nav-button magnetic hover-glow" type="button" onClick={next} aria-label="Next testimonial" title="Next" style={{ marginRight: '-80px' }}>
                <ArrowIcon dir="right" />
              </NavButton>
            </Navigation>
          )}

          <SrOnly>
            {isAutoPlaying
              ? 'Autoplay is on. Press space to pause. Escape also pauses.'
              : 'Autoplay is off. Press space to resume.'}
          </SrOnly>
        </SliderContainer>
      </Container>
    </Section>
  );
};

export default Testimonials;