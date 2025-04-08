import React, { memo } from "react";
import {
  Hero,
  CreativeModel,
  StaffingSolutions,
  Differentiators,
} from "./index";
import { Footer } from "../shared";

// Type definition for Home component props
interface HomeProps {
  onNavigate?: (page: string) => void;
}

// Using memo to prevent unnecessary re-renders
const Home: React.FC<HomeProps> = memo(({ onNavigate }) => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <div className="snap-start h-screen w-full">
        <Hero />
      </div>
      <div className="snap-start h-screen w-full">
        <CreativeModel />
      </div>
      <div className="snap-start h-screen w-full">
        <StaffingSolutions />
      </div>
      <div className="snap-start h-screen w-full">
        <Differentiators />
      </div>
      <div className="snap-start w-full">
        <Footer onNavigate={onNavigate || (() => {})} />
      </div>
    </div>
  );
});

// Add display name for better debugging
Home.displayName = "Home";

export default Home;
