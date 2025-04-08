import { useState, useEffect } from "react";
import Founders from "./Founders";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="min-h-screen pt-20 snap-start section-bg relative">
        {/* Content wrapper with grayscale effect */}
        <div className="grayscale-wrapper w-full h-full filter grayscale">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl space-y-12 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h1 className="text-6xl md:text-7xl font-light">About Us</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We are a modern creative agency that combines strategic thinking
                with cutting-edge technology to deliver exceptional results. Our
                approach is rooted in understanding your business challenges and
                crafting solutions that drive real impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
                <div
                  className={`transition-all duration-1000 delay-300 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-12"
                  }`}
                >
                  <h3 className="text-2xl mb-4 font-semibold">Our Vision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To be the catalyst for transformative digital experiences
                    that shape the future of brands and businesses.
                  </p>
                </div>
                <div
                  className={`transition-all duration-1000 delay-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-12"
                  }`}
                >
                  <h3 className="text-2xl mb-4 font-semibold">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Delivering innovative, scalable solutions that empower
                    businesses to thrive in the digital age through a perfect
                    blend of creativity and technology.
                  </p>
                </div>
              </div>

              <div
                className={`mt-8 pt-8 border-t border-gray-800 transition-all duration-1000 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-light mb-6">
                  Our Approach
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-black/50 transition-all">
                    <h3 className="text-xl font-semibold mb-3">Strategic</h3>
                    <p className="text-gray-300">
                      We develop comprehensive strategies aligned with your
                      business objectives.
                    </p>
                  </div>
                  <div className="p-6 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-black/50 transition-all">
                    <h3 className="text-xl font-semibold mb-3">Creative</h3>
                    <p className="text-gray-300">
                      Our creative teams deliver innovative solutions that stand
                      out in the market.
                    </p>
                  </div>
                  <div className="p-6 bg-black/30 rounded-lg backdrop-blur-sm hover:bg-black/50 transition-all">
                    <h3 className="text-xl font-semibold mb-3">Data-Driven</h3>
                    <p className="text-gray-300">
                      We leverage data and analytics to optimize performance and
                      drive results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for the image hover effect */}
        <style>{`
          .grayscale-wrapper {
            position: relative;
          }

          /* Apply the hover effect to all images in the about section */
          .grayscale-wrapper img {
            transition: all 0.5s ease;
            cursor: pointer;
          }
          
          .grayscale-wrapper img:hover {
            filter: grayscale(0) brightness(1.1) saturate(1.2);
            transform: scale(1.02);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
        `}</style>
      </section>
      <div className="snap-start section-bg">
        <Founders />
      </div>
    </div>
  );
};

export default AboutPage;
