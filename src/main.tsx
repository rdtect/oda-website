import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get root element and handle missing element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create root with error handling
const root = createRoot(rootElement);

// Render app with React Strict Mode for better development experience
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
