import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      headlineRef.current,
      {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        splineContainerRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=1'
      );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    // Scroll-driven video control
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let ticking = false;

    const onScroll = () => {
      if (!splineContainerRef.current) return;
      const rect = splineContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Estimate progress of element through viewport (0..1)
      const elementHeight = rect.height;
      const top = rect.top;
      const visibleStart = Math.max(0, -top + 0);
      const visible = Math.max(0, Math.min(elementHeight, viewportHeight - Math.max(0, top)));
      let progress = 0;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // simple normalized progress: how far element top moved through viewport
        progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + elementHeight)));
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // scrub video based on progress
          if (videoEl.duration && isFinite(videoEl.duration)) {
            const time = Math.max(0, Math.min(1, progress)) * videoEl.duration;
            try {
              videoEl.currentTime = time;
            } catch (e) {
              // ignore if not seekable yet
            }
          }

          // play/pause depending on visibility
          const isVisible = rect.top < viewportHeight && rect.bottom > 0;
          if (isVisible) {
            if (videoEl.paused) videoEl.play().catch(() => {});
          } else {
            if (!videoEl.paused) videoEl.pause();
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="hero-orb absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="hero-orb absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="hero-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <h1
              ref={headlineRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter"
            >
              Experience{' '}
              <span className="text-gradient block">Premium Mobility</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-muted-foreground max-w-xl"
            >
              Drive the world's most exclusive vehicles. Luxury, performance, and
              elegance at your fingertips.
            </p>

            <div ref={ctaRef}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 rounded-full glow-cyan hover:glow-purple transition-all duration-300"
              >
                Browse Fleet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right - Background Video (plays/scrubs with scroll). Video file should be placed in frontend/public */}
          <div ref={splineContainerRef} className="relative h-[500px] lg:h-[600px]">
            <div className="glass-morphic rounded-3xl w-full h-full flex items-center justify-center overflow-hidden relative">
              {/* Background video */}
              <video
                ref={(el) => {
                  videoRef.current = el;
                }}
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                src="/car-video.mp4"
              />

              {/* Foreground content sits above the video */}
              <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 z-10 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse-glow" />
                    <p className="text-muted-foreground">Video Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;