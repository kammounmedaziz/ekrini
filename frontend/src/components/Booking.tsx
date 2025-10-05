import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, MapPin, Car, Apple, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Booking = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-input',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.store-badge',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badgesRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Book your luxury experience in three simple steps
          </p>
        </div>

        <div ref={formRef} className="glass-morphic p-8 md:p-12 rounded-3xl space-y-6">
          {/* Pick-up Location */}
          <div className="booking-input space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Pick-up Location
            </label>
            <Input
              placeholder="Enter your location"
              className="glass-morphic border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 text-lg py-6"
            />
          </div>

          {/* Date & Time */}
          <div className="booking-input grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                Pick-up Date
              </label>
              <Input
                type="date"
                className="glass-morphic border-secondary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/50 text-lg py-6"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Return Date
              </label>
              <Input
                type="date"
                className="glass-morphic border-accent/30 focus:border-accent focus:ring-2 focus:ring-accent/50 text-lg py-6"
              />
            </div>
          </div>

          {/* Car Selection */}
          <div className="booking-input space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Car className="w-4 h-4 text-primary" />
              Select Your Car
            </label>
            <select className="w-full glass-morphic border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/50 text-lg py-6 px-4 rounded-lg bg-background/50">
              <option>Luxury Sedan</option>
              <option>Sports Car</option>
              <option>SUV Premium</option>
              <option>Electric Performance</option>
            </select>
          </div>

          {/* Book Now Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-lg py-7 rounded-full glow-cyan hover:glow-purple hover:scale-105 transition-all duration-300 group"
          >
            <span className="font-semibold">Book Now</span>
          </Button>
        </div>

        {/* App Store Badges removed as requested */}
      </div>
    </section>
  );
};

export default Booking;