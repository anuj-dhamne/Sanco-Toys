import React from 'react'
import Navbar from '../components/common/Header'
import FAQSection from "../components/common/FAQSection";
import TestimonialSection from "../components/common/TestimonialSection";
import Footer from "../components/common/Footer";
import InfoBanner from "../components/common/InfoBanner";
import HeroSection from "../components/common/HeroSection";
import HeroInfoCards from "../components/common/HeroInfoCards";
import WhyChooseSanco from '../components/common/WhytoChoose';

function Home() {
  return (
    <div className=''>
      {/* <Navbar /> */}
      <HeroSection />
      <InfoBanner />
      <HeroInfoCards />
      <WhyChooseSanco />
      <TestimonialSection />
      <div className=''>
      <FAQSection />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Home