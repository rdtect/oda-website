import React, { useState, useEffect } from "react";

const Founders = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const target = document.getElementById("founders-section");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section
      id="founders-section"
      className="section-bg min-h-screen flex flex-col justify-center py-20"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-6xl md:text-7xl mb-16 font-light transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Meet Our Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <FounderCard
            name="Kaushik Srinivasan"
            role="Founder & CEO"
            bio="Visionary leader with 15+ years experience in digital innovation."
            imgSrc="https://images.unsplash.com/photo-1560250097-0b93528c311a"
            delay={300}
            isVisible={isVisible}
          />

          <FounderCard
            name="Jeff Sautter"
            role="Founder & CTO"
            bio="Technology expert specializing in scalable architecture and AI solutions."
            imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
            delay={500}
            isVisible={isVisible}
          />

          <FounderCard
            name="Nileema Srinivasan"
            role="Founder & CCO"
            bio="Creative strategist with a passion for transformative brand experiences."
            imgSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
            delay={700}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
};

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  imgSrc: string;
  delay: number;
  isVisible: boolean;
}

const FounderCard: React.FC<FounderCardProps> = ({
  name,
  role,
  bio,
  imgSrc,
  delay,
  isVisible,
}) => {
  return (
    <div
      className={`space-y-6 transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-square overflow-hidden rounded-xl shadow-lg group">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-gray-300">{role}</p>
        <p className="text-gray-400 text-sm">{bio}</p>
        <button className="mt-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Founders;
