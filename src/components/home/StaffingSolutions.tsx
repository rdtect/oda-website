import React, { useState, useEffect } from "react";

const StaffingSolutions: React.FC = () => {
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

    const target = document.getElementById("staffing-solutions");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section
      id="staffing-solutions"
      className="section-bg min-h-screen flex flex-col justify-center py-16"
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-6xl md:text-7xl mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          OnDemand Staffing Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20">
          <div className="space-y-12">
            <p
              className={`text-sm text-gray-400 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              Our Commitment
            </p>
            <div className="space-y-8">
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                1. Top-tier{" "}
                <span className="italic text-gray-500">creative pros.</span>
              </h3>
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                2. Curated to your{" "}
                <span className="italic text-gray-500">brief.</span>
              </h3>
            </div>
          </div>
          <div className="space-y-12">
            <div className="h-8 md:block hidden"></div>
            <div className="space-y-8">
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-900 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                3. Built to fit{" "}
                <span className="italic text-gray-500">your workflow.</span>
              </h3>
              <h3
                className={`text-3xl md:text-4xl transition-all duration-700 delay-1100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                4. Plug-and-play{" "}
                <span className="italic text-gray-500">on cue.</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffingSolutions;
