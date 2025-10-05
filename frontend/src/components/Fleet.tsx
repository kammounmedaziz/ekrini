import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Zap, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Fleet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carModelRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in with blur
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Car model animation
      gsap.fromTo(
        carModelRef.current,
        { opacity: 0, x: -100, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carModelRef.current,
            start: 'top 80%',
          },
        }
      );

      // Specs stagger animation
      gsap.fromTo(
        '.spec-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: specsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { icon: Gauge, label: 'Model', value: 'S-Class Performance' },
    { icon: Zap, label: 'Power', value: '621 HP' },
    { icon: TrendingUp, label: '0-60 MPH', value: '3.1s' },
    { icon: Shield, label: 'Top Speed', value: '186 MPH' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Elite <span className="text-gradient">Fleet</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Engineered for perfection, designed for luxury
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - 3D Car Model */}
          <div ref={carModelRef} className="relative">
            <div className="glass-morphic rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden group">
              {/* Circular glowing frame */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 glow-cyan group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-4 rounded-full border-2 border-secondary/20 glow-purple" />
                
                {/* Embedded interactive 3D model (Spline) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <iframe
                    title="Interactive 3D Car Model"
                    src="https://my.spline.design/carastonmartinanimation-PAbQOnEKVTCpmuvgIthG5kNV/"
                    frameBorder="0"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Specifications */}
          <div ref={specsRef} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={index}
                    className="spec-card glass-morphic p-6 rounded-2xl hover:glow-cyan transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {spec.label}
                        </p>
                        <p className="text-xl font-semibold">{spec.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass-morphic p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                Premium Features
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full glow-cyan" />
                  Advanced driver assistance systems
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full glow-purple" />
                  Luxury interior with ambient lighting
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full glow-pink" />
                  State-of-the-art entertainment system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;