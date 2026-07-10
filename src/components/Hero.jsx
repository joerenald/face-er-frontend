import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  BrainCircuit,
  Sparkles,
  ImageIcon,
} from "lucide-react";

const Hero = () => {
  const [displayImage, setDisplayImage] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
const [progress, setProgress] = useState(0);
  const [emotion, setEmotion] = useState("Ready");
  const [confidence, setConfidence] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
const [resultImage, setResultImage] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedFile(file);

  const imageUrl = URL.createObjectURL(file);

  setImage(imageUrl);
setDisplayImage(imageUrl);
  setResultImage(null);
  setEmotion("Ready");
  setConfidence(0);
};
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
      alert("Unable to access webcam.");
    }
  };

  const stopWebcam = () => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => track.stop());

    streamRef.current = null;
  };
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageData = canvas.toDataURL("image/png");

    setImage(imageData);
setDisplayImage(imageData);
    setResultImage(null);
    canvas.toBlob((blob) => {
  const file = new File(
    [blob],
    "capture.png",
    {
      type: "image/png",
    }
  );

  setSelectedFile(file);
});

    stopWebcam();

    setActiveTab("upload");
  };

  const detectEmotion = async () => {

  if (!selectedFile) {
    alert("Please upload or capture an image first.");
    return;
  }

  setLoading(true);
setProgress(10);
setLoadingMessage("Loading DeepFace AI Engine...");
  const formData = new FormData();
  formData.append("image", selectedFile);
await new Promise(resolve => setTimeout(resolve, 500));

setProgress(35);
setLoadingMessage("Scanning Human Face...");
  try {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/detect`, {
        method: "POST",
        body: formData,
      }
    );
setProgress(70);
setLoadingMessage("Extracting Facial Landmarks...");
    const data = await response.json();
await new Promise(resolve => setTimeout(resolve, 400));

setProgress(90);
setLoadingMessage("Running Emotion Classification...");
    if (data.success) {
      setEmotion(data.emotion);
      setConfidence(data.confidence);
      const backendImage = data.image + "?t=" + Date.now();

const img = new Image();

img.onload = () => {
    setResultImage(backendImage);
    setDisplayImage(backendImage);
};

img.src = backendImage;
    } else {
      alert(data.message);
    }

  } catch (error) {

    console.error(error);

    alert("Unable to connect to backend.");

  } finally {
setProgress(100);
setLoadingMessage("Emotion Successfully Detected!");

await new Promise(resolve => setTimeout(resolve, 400));
    setLoading(false);

  }
};

  useEffect(() => {
    if (activeTab === "webcam") {
      startWebcam();
    } else {
      stopWebcam();
    }

    return () => stopWebcam();
  }, [activeTab]);
const emotionEmojis = {
  Happy: "😄",
  Sad: "😢",
  Angry: "😠",
  Fear: "😨",
  Surprise: "😲",
  Disgust: "🤢",
  Neutral: "😊",
  Ready: "😊",
};
const emotionColors = {
  Happy: "#22c55e",
  Sad: "#3b82f6",
  Angry: "#ef4444",
  Fear: "#8b5cf6",
  Surprise: "#f59e0b",
  Disgust: "#84cc16",
  Neutral: "#06b6d4",
  Ready: "#22c55e",
};
const currentColor =
  emotionColors[emotion] || "#22c55e";
  return (
    <section className="hero-app">
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>

      <div className="hero-container">

        <motion.div
          className="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="hero-badge">
            <Sparkles size={15} />
            AI Powered Emotion Analysis
          </div>

          <h1>
            Facial Emotion
            <span> Recognition</span>
          </h1>

          <p>
            Upload an image or use your webcam to detect
            human emotions instantly.
          </p>
        </motion.div>

        <motion.div
          className="hero-workspace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            hidden
          />

          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
          />

          <div className="tab-container">
            <button
              className={`tab-btn ${
                activeTab === "upload"
                  ? "active-tab"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("upload");
                fileInputRef.current?.click();
              }}
            >
              <Upload size={18} />
              Upload Image
            </button>

            <button
              className={`tab-btn ${
                activeTab === "webcam"
                  ? "active-tab"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("webcam")
              }
            >
              <Camera size={18} />
              Live Webcam
            </button>
          </div>

          <div className="preview-container">
            {activeTab === "upload" ? (
              image ? (
               <div
  className="image-frame"
  style={{
    border: `2px solid ${currentColor}`,
    boxShadow: `0 0 25px ${currentColor}66`,
  }}
>
                <img
    src={displayImage}
    alt="Preview"
    className="preview-image"
/>
                </div>
              ) : (
                <div
                  className="preview-placeholder"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  <ImageIcon size={80} />
                  <h3>Upload Image</h3>
                  <p>Click here to select an image</p>
                </div>
              )
            ) : (
              <div className="webcam-wrapper">
              <div
  className="webcam-container"
  style={{
    border: `2px solid ${currentColor}`,
    boxShadow: `0 0 25px ${currentColor}66`,
  }}
>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="webcam-video"
                  />
                </div>

                <button
                  className="capture-btn"
                  onClick={capturePhoto}
                >
                  📸 Capture Photo
                </button>
                <div className="preview-divider"></div>
              </div>
            )}
          </div>

        {!loading ? (

<button
className="detect-btn"
onClick={detectEmotion}
>

<BrainCircuit size={20}/>

Detect Emotion

</button>

) : (

<div className="loading-card">

<motion.div
className="ai-loader"
animate={{
rotate:[0,15,-15,0],
scale:[1,1.15,1]
}}
transition={{
repeat:Infinity,
duration:1
}}
>

🧠

</motion.div>

<h3>{loadingMessage}</h3>

<div className="progress-bar">

<div
className="progress-fill"
style={{
width:`${progress}%`
}}
></div>

</div>

<p>{progress}%</p>

</div>

)}

          <div className="result-container">
           <motion.div
className="emotion-emoji"

key={emotion}

initial={{
scale:0,
rotate:-30,
opacity:0
}}

animate={{
scale:[1,1.18,1],
y:[0,-10,0],
rotate:[0,8,-8,0],
opacity:1
}}

transition={{
duration:1.2,
repeat:Infinity,
repeatDelay:1
}}
>

{emotionEmojis[emotion]}

</motion.div>

          <h2
  style={{
    color: currentColor,
    transition: "0.4s",
  }}
>
  {emotion}
</h2>

            <p>
              Confidence: {confidence}%
            </p>

            <div className="confidence-bar">
             <div
  className="confidence-fill"
  style={{
    width: `${confidence}%`,
    background: currentColor,
  }}
/>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;