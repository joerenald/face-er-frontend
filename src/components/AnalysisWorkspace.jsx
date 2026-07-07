import React from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  BrainCircuit,
  Activity,
  Sparkles,
} from "lucide-react";

const AnalysisWorkspace = () => {
  return (
    <section className="workspace-section">

      <div className="workspace-header">
        <span>AI Analysis Lab</span>

        <h2>
          Emotion Recognition
          <span> Workspace</span>
        </h2>

        <p>
          Upload an image or start your webcam to analyze
          facial expressions and predict emotions instantly.
        </p>
      </div>

      <div className="workspace-grid">

        {/* Image Preview */}

        <motion.div
          className="workspace-card"
          whileHover={{ y: -6 }}
        >
          <div className="workspace-title">
            <ImageIcon size={22} />
            <h3>Image Preview</h3>
          </div>

          <div className="preview-box">
            <ImageIcon size={60} />
            <p>No Image Selected</p>
          </div>
        </motion.div>

        {/* Result */}

        <motion.div
          className="workspace-card"
          whileHover={{ y: -6 }}
        >
          <div className="workspace-title">
            <BrainCircuit size={22} />
            <h3>Prediction Result</h3>
          </div>

          <div className="result-box">

            <div className="emotion-icon">
              😊
            </div>

            <h2>Happy</h2>

            <div className="confidence">
              <div className="confidence-header">
                <span>Confidence</span>
                <span>96%</span>
              </div>

              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: "96%" }}
                ></div>
              </div>
            </div>

            <div className="emotion-details">

              <div>
                <Activity size={18} />
                <span>Real-Time Detection</span>
              </div>

              <div>
                <Sparkles size={18} />
                <span>AI Prediction Complete</span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default AnalysisWorkspace;