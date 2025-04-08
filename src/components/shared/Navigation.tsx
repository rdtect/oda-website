import React, { useState, useEffect, useCallback, memo } from "react";
import Logo from "./Logo";

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

// Using memo to prevent unnecessary re-renders when parent components change
const Navigation: React.FC<NavigationProps> = memo(
  ({ onNavigate, currentPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Throttled scroll handler for better performance
    useEffect(() => {
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
              setScrolled(isScrolled);
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [scrolled]);

    // Memoize handlers to prevent re-creation on each render
    const toggleMobileMenu = useCallback(() => {
      setMobileMenuOpen((prev) => !prev);
    }, []);

    const handleNavClick = useCallback(
      (page: string) => {
        onNavigate(page);
        setMobileMenuOpen(false);
      },
      [onNavigate]
    );

    // Close mobile menu when escape key is pressed (accessibility)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [mobileMenuOpen]);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [mobileMenuOpen]);

    return (
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md py-4"
            : "bg-black/50 backdrop-blur-sm py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => handleNavClick("home")}
            className="text-3xl font-bold hover:text-gray-300 transition-colors flex items-center"
            aria-label="Go to home page"
          >
            <Logo className="hover-lift" />
          </button>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <NavLink
              onClick={() => handleNavClick("about")}
              isActive={currentPage === "about"}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("work-with-us")}
              isActive={currentPage === "work-with-us"}
            >
              Work With Us
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("connect")}
              isActive={currentPage === "connect"}
            >
              Connect
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col space-y-1.5 p-1"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 transform ${
            mobileMenuOpen
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink
              onClick={() => handleNavClick("about")}
              isActive={currentPage === "about"}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("work-with-us")}
              isActive={currentPage === "work-with-us"}
            >
              Work With Us
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("connect")}
              isActive={currentPage === "connect"}
            >
              Connect
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
);

interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

// Memoize NavLink component to prevent unnecessary re-renders
const NavLink: React.FC<NavLinkProps> = memo(
  ({ children, onClick, isActive }) => {
    return (
      <button
        onClick={onClick}
        className={`relative group overflow-hidden ${
          isActive ? "text-white" : "text-gray-400"
        }`}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
      >
        <span className="transition-colors hover:text-white block">
          {children}
        </span>
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 transform ${
            isActive ? "bg-white scale-x-100" : "bg-gray-400 scale-x-0"
          } group-hover:bg-white group-hover:scale-x-100 origin-left`}
        ></span>
      </button>
    );
  }
);

// Add display names for better debugging
Navigation.displayName = "Navigation";
NavLink.displayName = "NavLink";

export default Navigation;
