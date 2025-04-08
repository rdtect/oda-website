import React, { useState, useEffect } from "react";

const Differentiators: React.FC = () => {
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

    const target = document.getElementById("differentiators");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section
      id="differentiators"
      className="section-bg min-h-screen flex flex-col justify-center py-16"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-6xl md:text-7xl mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Built different. Designed to deliver.
        </h2>
        <p
          className={`text-xl text-gray-400 mb-24 max-w-3xl italic transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Nimble in approach, bold in capability. A scalable, modern solution
          <br />
          made for creative momentum.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20">
          <div className="space-y-12">
            <p
              className={`text-sm text-gray-400 transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              What sets us apart
            </p>
            <div className="space-y-8">
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                1. Speed when{" "}
                <span className="italic text-gray-500">it matters most</span>
              </h3>
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-900 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                2. Smart,{" "}
                <span className="italic text-gray-500">
                  efficient delivery.
                </span>
              </h3>
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-1100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                3. Creative capacity that{" "}
                <span className="italic text-gray-500">grows with you.</span>
              </h3>
            </div>
          </div>
          <div className="space-y-12">
            <div className="h-8 md:block hidden"></div>
            <div className="space-y-8">
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-1300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                4. Flexibility without{" "}
                <span className="italic text-gray-500">compromise.</span>
              </h3>
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-1500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                5. Trusted by global brands and teams{" "}
                <span className="italic text-gray-500">
                  efficient delivery.
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
