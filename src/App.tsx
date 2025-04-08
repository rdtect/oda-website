import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { Navigation, Footer } from "./components/shared";

// Use React.lazy for code splitting to improve initial load time
const Home = lazy(() =>
  import("./components/home").then((module) => ({ default: module.Home }))
);
const About = lazy(() =>
  import("./components/about").then((module) => ({ default: module.About }))
);
const Careers = lazy(() =>
  import("./components/careers").then((module) => ({ default: module.Careers }))
);
const Connect = lazy(() =>
  import("./components/connect").then((module) => ({ default: module.Connect }))
);

// Page type definition for strong typing
type PageType = "home" | "about" | "work-with-us" | "connect";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets with a shorter delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Type guard function to validate page type
  const isValidPageType = useCallback((page: string): page is PageType => {
    return ["home", "about", "work-with-us", "connect"].includes(page);
  }, []);

  // Handle page navigation with smoother scrolling behavior
  const handleNavigate = useCallback(
    (page: string) => {
      // Type guard to ensure we only set valid page types
      if (isValidPageType(page)) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isValidPageType, setCurrentPage]
  );

  // Loading screen component memoized to prevent unnecessary re-renders
  const LoadingScreen = useMemo(
    () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-white text-xl">Loading experience...</p>
        </div>
      </div>
    ),
    []
  );

  // Use memoization for current page rendering to prevent unnecessary re-renders
  const currentPageContent = useMemo(() => {
    if (loading) return LoadingScreen;

    // Fallback component for suspense
    const SuspenseFallback = (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
      </div>
    );

    switch (currentPage) {
      case "home":
        return (
          <Suspense fallback={SuspenseFallback}>
            <Home onNavigate={handleNavigate} />
          </Suspense>
        );
      case "about":
        return (
          <Suspense fallback={SuspenseFallback}>
            <About />
            <Footer onNavigate={handleNavigate} />
          </Suspense>
        );
      case "work-with-us":
        return (
          <Suspense fallback={SuspenseFallback}>
            <Careers />
            <Footer onNavigate={handleNavigate} />
          </Suspense>
        );
      case "connect":
        return (
          <Suspense fallback={SuspenseFallback}>
            <Connect />
            <Footer onNavigate={handleNavigate} />
          </Suspense>
        );
      default:
        return null;
    }
  }, [currentPage, loading, LoadingScreen, handleNavigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      <main>{currentPageContent}</main>
    </div>
  );
};

export default App;
