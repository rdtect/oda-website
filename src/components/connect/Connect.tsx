import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const ConnectPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen pt-20 section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h1 className="text-6xl md:text-7xl font-light mb-6">Connect</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Let's discuss how we can help transform your business with our
              innovative solutions. Reach out today to start the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Get in Touch</h3>
                <p className="text-gray-300">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/30 backdrop-blur-sm border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-white transition-colors"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors flex items-center space-x-2 rounded group hover-lift"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div
              className={`space-y-10 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href="mailto:connect@on-demandagency.com"
                        className="hover:text-gray-300 transition-colors"
                      >
                        connect@on-demandagency.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <a
                        href="tel:+15551234567"
                        className="hover:text-gray-300 transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p>123 Innovation Street, Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Connect with us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors hover-lift"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors hover-lift"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors hover-lift"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectPage;
