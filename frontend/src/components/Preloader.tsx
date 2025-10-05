import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      },
    });

    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)',
      }
    );
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl floating-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl floating-orb" style={{ animationDelay: '1s' }} />
      
      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-gradient tracking-tighter">
          VELOCITY
        </h1>
      </div>

      {/* Progress bar container */}
      <div className="w-80 md:w-96">
        <div className="glass-morphic rounded-full h-2 overflow-hidden mb-4">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent glow-cyan"
            style={{ width: '0%' }}
          />
        </div>
        <div className="text-center text-muted-foreground">
          <span ref={percentRef} className="text-2xl font-light">0%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;