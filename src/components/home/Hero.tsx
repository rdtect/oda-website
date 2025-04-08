import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  // Setup intersection observer with useEffect cleanup
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );

    const target = document.getElementById("hero-section");
    if (target && observerRef.current) {
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Optimize mouse move handler with throttling via requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position relative to container
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  // Memoize computed values to prevent recalculations on each render
  const { moveX, moveY, rotateX, rotateY } = useMemo(
    () => ({
      moveX: (mousePosition.x - 0.5) * 40,
      moveY: (mousePosition.y - 0.5) * 40,
      rotateX: (mousePosition.y - 0.5) * 10,
      rotateY: (mousePosition.x - 0.5) * -10,
    }),
    [mousePosition.x, mousePosition.y]
  );

  // Memoize hover handlers to prevent recreation on each render
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Precompute visibility classes once for better performance
  const headerVisibilityClass = useMemo(
    () =>
      `space-y-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
      }`,
    [isVisible]
  );

  const paragraphVisibilityClass = useMemo(
    () =>
      `text-xl text-gray-300 max-w-2xl transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`,
    [isVisible]
  );

  const buttonVisibilityClass = useMemo(
    () =>
      `pt-4 transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`,
    [isVisible]
  );

  const rightSideVisibilityClass = useMemo(
    () =>
      `w-full lg:w-6/12 h-[500px] mt-16 lg:mt-0 transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
      }`,
    [isVisible]
  );

  // Precompute video container style for better performance
  const videoContainerStyle = useMemo(
    () => ({
      transform: `perspective(1000px) rotateX(${rotateX * 0.3}deg) rotateY(${
        rotateY * 0.3
      }deg)`,
      transition: "transform 0.2s ease-out",
    }),
    [rotateX, rotateY]
  );

  // Precompute video style for better performance
  const videoStyle = useMemo(
    () => ({
      filter: `brightness(${1 + (mousePosition.y - 0.5) * 0.2})`,
      transition: "filter 0.3s ease-out",
    }),
    [mousePosition.y]
  );

  const generateParticles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.7,
            transform: `translate(${moveX * (0.5 + Math.random())}px, ${
              moveY * (0.5 + Math.random())
            }px)`,
            animation: `float ${3 + Math.random() * 7}s infinite ease-in-out`,
          }}
        ></div>
      )),
    [moveX, moveY]
  );

  const centerReflectiveStyle = useMemo(
    () => ({
      transform: `translate(${moveX * 0.7}px, ${
        moveY * 0.7
      }px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
      boxShadow: isHovering
        ? `0 0 30px 5px rgba(255,255,255,0.2), inset 0 0 20px 5px rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,${
            0.1 + mousePosition.x * 0.2
          })`
        : `0 0 20px 0 rgba(255,255,255,0.1), inset 0 0 10px 0 rgba(255,255,255,0.05)`,
    }),
    [moveX, moveY, rotateX, rotateY, isHovering, mousePosition.x]
  );

  const innerRingStyle = useMemo(
    () => ({
      animation: isHovering ? "pulse 3s infinite ease-in-out" : "none",
      transform: `rotate(${moveX * -2}deg)`,
    }),
    [isHovering, moveX]
  );

  const innerCircleStyle = useMemo(
    () => ({
      transform: `scale(${
        isHovering ? 1.1 + Math.sin(Date.now() / 1000) * 0.05 : 1
      })`,
      transition: "transform 0.3s ease",
    }),
    [isHovering]
  );

  const decorativeElementStyle1 = useMemo(
    () => ({
      transform: `translate(${-moveX * 1.2}px, ${
        -moveY * 1.2
      }px) rotate(${moveX}deg)`,
      transition: "transform 0.15s ease-out, opacity 0.3s ease",
      boxShadow: isHovering ? "0 0 15px 2px rgba(255,255,255,0.15)" : "none",
    }),
    [moveX, moveY, isHovering]
  );

  const decorativeElementStyle2 = useMemo(
    () => ({
      transform: `translate(${moveX * 1.5}px, ${-moveY * 1.5}px)`,
      transition: "transform 0.15s ease-out, opacity 0.3s ease",
      boxShadow: isHovering ? "0 0 15px 2px rgba(255,255,255,0.15)" : "none",
    }),
    [moveX, moveY, isHovering]
  );

  const decorativeElementStyle3 = useMemo(
    () => ({
      transform: `translate(${moveX * 0.4}px, ${moveY * 0.4}px) scale(${
        isHovering ? 1.05 : 1
      })`,
      transition: "transform 0.2s ease-out",
    }),
    [moveX, moveY, isHovering]
  );

  const decorativeElementStyle4 = useMemo(
    () => ({
      transform: `translate(${-moveX * 1.3}px, ${moveY * 1.3}px) rotate(${
        moveY * 10
      }deg)`,
      transition: "transform 0.2s ease-out",
      animation: "float 8s infinite ease-in-out",
    }),
    [moveX, moveY]
  );

  return (
    <section
      id="hero-section"
      className="section-bg min-h-screen relative overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full lg:w-6/12 lg:pr-8">
            <div className={headerVisibilityClass}>
              <h1 className="text-6xl md:text-7xl font-light leading-tight">
                Speed. + Adaptability.
                <br />
                Strategy. + Creativity.
                <br />
                Scalable solutions —{" "}
                <span className="italic text-gray-400">powered by AI.</span>
              </h1>
              <p className={paragraphVisibilityClass}>
                Delivering ondemand future-forward, scalable solutions &<br />
                ecosystems that grow with your business
              </p>
              <div className={buttonVisibilityClass}>
                <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors hover-lift">
                  Explore Our Services
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Video & Graphics */}
          <div
            ref={containerRef}
            className={rightSideVisibilityClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-full w-full">
              {/* Video container */}
              <div
                className="relative overflow-hidden rounded-2xl w-full h-full backdrop-blur-sm bg-black/20 border border-white/10"
                style={videoContainerStyle}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute w-full h-full object-cover mix-blend-overlay opacity-80"
                  style={videoStyle}
                  poster="/bg.png"
                >
                  <source src="/bgHero.mp4" type="video/mp4" />
                </video>

                {/* Particles effect */}
                <div className="absolute inset-0 overflow-hidden opacity-40">
                  {generateParticles}
                </div>

                {/* Overlay content with mouse tracking */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  {/* Center reflective surface with enhanced interaction */}
                  <div
                    className={`w-64 h-64 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border-2 border-white/20 shadow-lg transition-all duration-300 ${
                      isHovering ? "scale-105" : "scale-100"
                    }`}
                    style={centerReflectiveStyle}
                  >
                    {/* Inner ring for depth effect with pulse animation */}
                    <div
                      className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center"
                      style={innerRingStyle}
                    >
                      <div
                        className="w-32 h-32 rounded-full bg-black/20 backdrop-blur-sm"
                        style={innerCircleStyle}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements with enhanced mouse tracking */}
                <div
                  className="absolute top-8 right-8 w-16 h-16 backdrop-blur-md bg-white/10 rounded-lg cursor-pointer"
                  style={decorativeElementStyle1}
                ></div>
                <div
                  className="absolute bottom-12 left-8 w-12 h-12 backdrop-blur-md bg-white/10 rounded-full cursor-pointer"
                  style={decorativeElementStyle2}
                ></div>
                <div
                  className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-white/20 animate-[spin_40s_linear_infinite]"
                  style={decorativeElementStyle3}
                ></div>

                {/* Additional floating element */}
                <div
                  className="absolute bottom-1/4 right-1/4 w-20 h-20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/15 rounded-lg"
                  style={decorativeElementStyle4}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
