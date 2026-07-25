import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import RiskDisclosure from '../components/RiskDisclosure';
import Header from '../components/Header';
import MobileApp from '../components/MobileApp';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AttentionInvestors from '../components/AttentionInvestors';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollIndicator from '../components/ScrollToTop/ScrollIndicator';
import TrustManifesto from '../components/TrustManifesto';
import HeroSection from '../components/HeroSection';
import AdvancedSlider from '../components/AdvancedSlider';
import ProductGrid from '../components/ProductGrid';
import FloatingElements from '../components/FloatingElements';
import { pageAPI } from '../utils/api';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showRiskDisclosure, setShowRiskDisclosure] = useState(false);
  const [startHeaderAnimation, setStartHeaderAnimation] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [startTime] = useState(Date.now());
  
  // Fallback data in case API fails
  const fallbackData = {
    hero: {
      title: { main: "An intelligent way to", highlight: "Invest & Trade" },
      description: "Experience the future of investing with AI-powered insights and real-time market analysis across multiple platforms.",
      buttons: [
        { text: "Get Started", type: "primary" },
        { text: "Learn More", type: "secondary" }
      ],
      scrollText: "Scroll Down",
      orbitConfigs: [
        { icon: 'FaApple', size: 55, tilt: 15, color: '#007AFF', bgColor: '#ffffff' },
        { icon: 'FaAmazon', size: 50, tilt: -25, color: '#FF9500', bgColor: '#ffffff' },
        { icon: 'FaGoogle', size: 48, tilt: 30, color: '#4285F4', bgColor: '#ffffff' },
        { icon: 'FaMicrosoft', size: 52, tilt: -15, color: '#00A1F1', bgColor: '#ffffff' },
        { icon: 'SiTesla', size: 50, tilt: 25, color: '#CC0000', bgColor: '#ffffff' },
        { icon: 'FaEthereum', size: 58, tilt: 35, color: '#627EEA', bgColor: '#ffffff' },
        { icon: 'SiNetflix', size: 46, tilt: -20, color: '#E50914', bgColor: '#ffffff' },
        { icon: 'FaPaypal', size: 49, tilt: 18, color: '#0070BA', bgColor: '#ffffff' },
        { icon: 'FaDollarSign', size: 45, tilt: -10, color: '#34C759', bgColor: '#ffffff' },
        { icon: 'FaBitcoin', size: 52, tilt: 20, color: '#F7931A', bgColor: '#ffffff' },
        { icon: 'SiNvidia', size: 51, tilt: -28, color: '#76B900', bgColor: '#ffffff' },
        { icon: 'SiMeta', size: 53, tilt: 22, color: '#1877F2', bgColor: '#ffffff' },
        { icon: 'FaSpotify', size: 47, tilt: -18, color: '#1DB954', bgColor: '#ffffff' },
        { icon: 'FaTwitter', size: 44, tilt: 32, color: '#1DA1F2', bgColor: '#ffffff' },
        { icon: 'SiUber', size: 48, tilt: -12, color: '#000000', bgColor: '#ffffff' }
      ]
    },
    about: {
      title: "Focus Stock Broker Ltd",
      subtitle: "From startup to success story - transforming how India invests since 2018",
      story: {
        title: "Our Story",
        paragraphs: [
          "Since 2018, we've been on a mission to democratize stock market investing in India. What started as a vision to break down barriers has evolved into a comprehensive platform serving thousands of investors nationwide.",
          "Our journey reflects the growth of India's retail investment landscape. From our humble beginnings to becoming a trusted partner for 25,000+ investors, each milestone represents our commitment to innovation, transparency, and customer success."
        ]
      },
      milestones: [
        {
          date: "2018",
          title: "The Beginning",
          description: "Started with a dream to make trading accessible.",
          year: 2018,
          value: 125.50,
          growth: 0
        },
        {
          date: "2019",
          title: "Official Launch",
          description: "SEBI registered and launched zero brokerage platform.",
          year: 2019,
          value: 189.75,
          growth: 51.2
        },
        {
          date: "2020",
          title: "Mobile App",
          description: "Launched mobile app during pandemic for safe trading.",
          year: 2020,
          value: 245.30,
          growth: 29.3
        },
        {
          date: "2021",
          title: "10K Community",
          description: "Built 10,000+ investor community with advisory.",
          year: 2021,
          value: 387.90,
          growth: 58.1
        },
        {
          date: "2022",
          title: "AI Innovation",
          description: "Introduced AI-powered insights and automation.",
          year: 2022,
          value: 456.25,
          growth: 17.6
        },
        {
          date: "2023",
          title: "Trusted Partner",
          description: "25,000+ investors, ₹500+ Crores managed.",
          year: 2023,
          value: 612.80,
          growth: 34.3
        }
      ]
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real stories from real investors who trust Focus Stock Broker Ltd',
      testimonials: [
        {
          id: 1,
          name: 'Rajesh Sharma',
          role: 'IT Professional',
          quote: 'Focus Stock Broker Ltd has transformed my investment journey. The platform is clean and reliable; zero brokerage on delivery trades improved my net returns.',
          result: '23% returns in 8 months',
          rating: 5,
        },
        {
          id: 2,
          name: 'Priya Patel',
          role: 'Business Owner',
          quote: 'As a busy entrepreneur, I needed speed and clarity. Focus Stock Broker Ltd delivers both, and support is responsive when it actually matters.',
          result: '18% portfolio growth',
          rating: 5,
        },
        {
          id: 3,
          name: 'Amit Verma',
          role: 'Retired Professor',
          quote: 'Their research notes are concise and decision‑oriented. It helped me structure a disciplined retirement portfolio.',
          result: 'Consistent 15% annual returns',
          rating: 5,
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Ready to start your investment journey? Our team of experts is here to help you make informed decisions.",
      form: {
        submitText: "Submit Inquiry",
        successMessage: "Thank you for contacting us! We'll get back to you shortly.",
        socialProof: "Join 500+ investors who contacted us this month"
      },
      contactInfo: {
        title: "Contact Information",
        description: "Our team of experts is ready to assist you with any questions about our services or how to get started with investing.",
        details: [
          { icon: "location", text: "Focus Tower, 123 Financial District, Mumbai 400001, India" },
          { icon: "phone", text: "+91 22 1234 5678" },
          { icon: "email", text: "support@focusstockbroker.com" },
          { icon: "clock", text: "Monday - Friday: 9:00 AM - 6:00 PM" }
        ]
      },
      team: {
        title: "Meet Our Team",
        members: [
          { name: "Rahul Kumar", role: "Senior Investment Advisor", initials: "RK" },
          { name: "Sanjay Mehta", role: "Client Relationship Manager", initials: "SM" },
          { name: "Anita Patel", role: "Research Analyst", initials: "AP" },
          { name: "Vikram Gupta", role: "Technical Support", initials: "VG" }
        ]
      }
    },
    whyChooseUs: {
      title: "Why Choose Focus Stock Broker Ltd",
      subtitle: "Our competitive advantages that set us apart in the industry",
      advantages: [
        {
          id: 1,
          title: 'Lightning Fast',
          value: '<0.1s',
          description: 'Order execution speed, faster than industry average for seamless trading experience.',
        },
        {
          id: 2,
          title: 'Reliable Platform',
          value: '99.9%',
          description: 'Uptime guarantee with robust infrastructure to ensure uninterrupted trading.',
        },
        {
          id: 3,
          title: 'Expert Support',
          value: '24/7',
          description: 'Customer support availability with dedicated relationship managers for premium clients.',
        },
        {
          id: 4,
          title: 'Full Transparency',
          value: '0',
          description: 'Zero hidden charges with clear fee structure and transparent pricing policy.',
        }
      ]
    },
    mobileApp: {
      trading: {
        title: "Trading App",
        description: "Professional trading platform with real-time market data, advanced charting, and instant execution.",
        features: [
          { title: 'Real-time Charts', description: 'Advanced technical analysis with live market data' },
          { title: 'Quick Trading', description: 'One-tap buy/sell with instant order execution' },
          { title: 'Dark Mode UI', description: 'Glassmorphism design optimized for trading' },
          { title: 'Portfolio Tracking', description: 'Real-time P&L and position monitoring' }
        ],
        rating: "4.8 • 50K+ downloads",
        downloadTitle: "Download Now"
      },
      mutualFunds: {
        title: "Mutual Funds App",
        description: "Simplified investing with curated mutual funds, SIP automation, and educational resources.",
        features: [
          { title: 'SIP Automation', description: 'Set up systematic investment plans effortlessly' },
          { title: 'Portfolio Overview', description: 'Clean dashboard with performance insights' },
          { title: 'Educational Cards', description: 'Learn investing basics with interactive content' },
          { title: 'Goal Planning', description: 'Plan investments for life goals' }
        ],
        rating: "4.9 • 75K+ downloads",
        downloadTitle: "Download Now"
      },
      storeButtons: [
        { type: 'apple', text: 'Download on the', name: 'App Store' },
        { type: 'google', text: 'Get it on', name: 'Google Play' }
      ]
    },
    productGrid: {
      header: {
        title: "Our Product Suite",
        subtitle: "Comprehensive financial solutions designed to empower your investment journey"
      },
      products: [
        { id: 1, title: 'Equity Trading', description: 'Buy and sell stocks with advanced charting tools and real-time market data for informed investment decisions', type: 'trading', link: '#equity' },
        { id: 2, title: 'Derivatives Trading', description: 'Trade futures and options with professional risk management tools', type: 'analytics', link: '#derivatives' },
        { id: 3, title: 'IPO Investment', description: 'Apply for IPOs with seamless ASBA process and instant updates', type: 'research', link: '#ipo' },
        { id: 4, title: 'Research Reports', description: 'Expert stock recommendations and detailed market analysis', type: 'mobile', link: '#research' },
        { id: 5, title: 'Portfolio & SIP', description: 'Monitor investments with detailed P&L analysis and start SIP with as low as ₹500 per month', type: 'advisory', link: '#portfolio-sip' },
        { id: 6, title: 'Mutual Funds', description: 'Diversified portfolio investments with expert fund selection', type: 'portfolio', link: '#mutualfunds' }
      ]
    },
    trustManifesto: {
      manifestoStatements: [
        { text: "Traditional brokers complicate." },
        { text: "We simplify." },
        { text: "Traditional brokers hide fees." },
        { text: "We reveal everything." },
        { text: "Traditional brokers use old technology." },
        { text: "We built the future." }
      ]
    },
    advancedSlider: {
      header: {
        title: "Our Financial Services",
        subtitle: "Comprehensive solutions tailored for your investment success"
      },
      slides: [
        {
          id: 1,
          background: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
          title: 'Portfolio Management',
          subtitle: 'Professional portfolio analysis and optimization',
          cta: 'Learn More',
          ctaLink: '#portfolio'
        },
        {
          id: 2,
          background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
          title: 'Trading Platform',
          subtitle: 'Advanced tools for professional trading',
          cta: 'Start Trading',
          ctaLink: '#trading'
        },
        {
          id: 3,
          background: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
          title: 'Market Analysis',
          subtitle: 'Real-time market insights and research',
          cta: 'View Reports',
          ctaLink: '#analysis'
        },
        {
          id: 4,
          background: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
          title: 'Investment Advisory',
          subtitle: 'Expert guidance for your financial goals',
          cta: 'Get Advice',
          ctaLink: '#advisory'
        },
        {
          id: 5,
          background: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
          title: 'Wealth Management',
          subtitle: 'Comprehensive wealth planning services',
          cta: 'Explore',
          ctaLink: '#wealth'
        }
      ]
    },
    attentionInvestors: {
      title: "Attention Investors",
      bulletPoints: [
        "Stock market investments are subject to market risks. Read all scheme related documents carefully before investing.",
        "Registration granted by SEBI, membership of BSE/NSE and registration of the ARN with AMFI does not guarantee protection of investors' interests or ensure quality of service.",
        "There is no guarantee or assurance of returns or capital protection in any of our services.",
        "Past performance is not indicative of future returns.",
        "Investors should make investment decisions based on their financial goals, risk tolerance and investment horizon.",
        "Investors should note that the NAV of the schemes may go up or down depending upon the factors and forces affecting the securities market."
      ],
      disclaimer: "Focus Stock Broker Ltd is a SEBI registered stock broker with Registration No: INZ000123456. All disputes are subject to the exclusive jurisdiction of courts in Mumbai, India."
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      // Components now fetch their own data individually
      setPageData(fallbackData);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setPageData(fallbackData);
    } finally {
      // Ensure minimum loading time of 8 seconds
      const elapsed = Date.now() - startTime;
      const minLoadTime = 8000;
      const remainingTime = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    }
  };

  useEffect(() => {
    if (!loading) {
      setStartHeaderAnimation(true);
      setShowRiskDisclosure(true);
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <FloatingElements />
          <ScrollIndicator />
          <Header startAnimation={startHeaderAnimation} />
          <main>
            <HeroSection />
            <TrustManifesto/>

            <AdvancedSlider />
            <ProductGrid />
            <MobileApp />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
            <AttentionInvestors />
          </main>
          <Footer />
          <ScrollToTop />
          {showRiskDisclosure && (
            <RiskDisclosure onClose={() => setShowRiskDisclosure(false)} />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;