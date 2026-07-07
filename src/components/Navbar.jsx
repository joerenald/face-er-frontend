import React from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar-premium">

        <div className="navbar-logo">
          <div className="logo-glow"></div>

          <div className="logo-icon">
            <BrainCircuit size={24} />
          </div>

          <div className="logo-content">
            <h2>EmotionAI</h2>
            <p>Facial Emotion Recognition</p>
          </div>
        </div>

        <div className="navbar-status">
          <Sparkles size={16} />
          <span>AI Detection Ready</span>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;