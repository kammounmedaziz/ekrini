import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Fleet from '@/components/Fleet';
import Features from '@/components/Features';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <div className="relative">
          <Navigation />
          <Hero />
          <Fleet />
          <Features />
          <Booking />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
