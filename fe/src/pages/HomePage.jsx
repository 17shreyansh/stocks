import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import RiskDisclosure from '../components/RiskDisclosure';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
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

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showRiskDisclosure, setShowRiskDisclosure] = useState(false);
  const [startHeaderAnimation, setStartHeaderAnimation] = useState(false);
  
  // JSON data for components
  const pageData = {
    hero: {
      title: "The Future of Stock Trading Starts Here.",
      subtitle: "Professional Trading Solutions for Modern Investors",
      description: "Experience seamless trading with our cutting-edge platform",
      ctaButton: { text: "Start Investing", link: "/open-account" },
      marketData: [
        { name: "NIFTY 50", value: "22,631.75", change: "+267.80", percentage: "+1.2%", trend: "positive" },
        { name: "SENSEX", value: "74,671.28", change: "+671.30", percentage: "+0.9%", trend: "positive" },
        { name: "NASDAQ", value: "16,315.70", change: "-48.12", percentage: "-0.3%", trend: "negative" }
      ],
      scrollText: "Scroll to Explore"
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
      }
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Real stories from real investors who trust Focus Stock Broker Ltd",
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
            <HeroSection data={pageData.hero} />
            <TrustManifesto/>
            <AboutUs data={pageData.about} />
            <AdvancedSlider />
            <ProductGrid />
            <MobileApp />
            <WhyChooseUs />
            <Testimonials data={pageData.testimonials} />
            <Contact data={pageData.contact} />
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