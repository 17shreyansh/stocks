import React from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';

const AboutUsPage = () => {
  return (
    <>
      <FloatingElements />
      <Header startAnimation={true} />
      <main style={{ paddingTop: '80px' }}>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
