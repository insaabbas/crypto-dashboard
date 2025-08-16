import React, { useState } from "react";
import {
  FaChartLine,
  FaChartBar,
  FaBitcoin,
  FaCoins,
  FaDollarSign,
  FaExchangeAlt,
  FaWallet,
  FaBell,
  FaUsers,
  FaBook,
  FaSearch,
  FaShieldAlt,
  FaLightbulb,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaTrophy,
  FaChartPie,
  FaTags,
  FaCogs,
  FaRocket,
  FaDownload,
  FaUpload,
  FaClipboardList,
  FaLayerGroup,
  FaBrain,
  FaTradeFederation,
  FaSignal
} from "react-icons/fa";

// Import images
import chartImgFile from "./assets/price-chart.png";
import alertsImgFile from "./assets/alerts.png";
import glossaryImgFile from "./assets/glossary.png";

export default function Tutorial() {
  const [showGlossary, setShowGlossary] = useState(false);

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    color: "#FFD966",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  };

  const sectionBaseStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    overflow: "hidden",
    color: "#FFD966",
  };

const headingStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  fontSize: "1.4em",
  color: "#D9AB07"  // <-- all h2 text will now be this color
};
  const listStyle = { margin: "0", paddingLeft: "20px" };

  const backToTopStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "10px 15px",
    borderRadius: "50%",
    background: "#FFD966",
    color: "#0f1b2b",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    zIndex: 1000,
  };

  const toggleButtonStyle = {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#FFD966",
    color: "#0f1b2b",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15,27,43,0.85)", // dark overlay for readability
    borderRadius: "15px",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const bgStyle = (img) => ({
    ...sectionBaseStyle,
    backgroundImage: `url(${img})`,
  });

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.7)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.5)";
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2em" }}>
        Crypto Dashboard Tutorial
      </h1>

      {/* How to Read Charts */}
      <div
        style={bgStyle(chartImgFile)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={headingStyle}>
            <FaChartLine color="#4fc3f7" /> How to Read Charts
          </h2>
          <ul style={listStyle}>
          
               <li style={{ color: "#F8EF95" }}><FaBitcoin color="#f7931a" /> Bitcoin Price Chart</li>
            <li style={{ color: "#F8EF95" }}><FaChartBar color="#4dd0e1" /> Price vs Volume Chart</li>
            <li style={{ color: "#F8EF95" }}><FaDollarSign color="#7C059D" /> Hover to see exact values</li>
          </ul>
        </div>
      </div>

      {/* Understanding Alerts & KPIs */}
      <div
        style={bgStyle(alertsImgFile)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={headingStyle}>
            <FaBrain color="#6951A4" /> Understanding Alerts & KPIs
          </h2>
          <ul style={listStyle}>
            <li style={{ color: "#F8EF95" }}> <FaBell color="#ff1744" /> Alerts notify significant price changes</li>
            <li style={{ color: "#F8EF95" }}> <FaWallet color="#E88C9B" /> Key Metrics: price, market cap, volume</li>
            <li style={{ color: "#F8EF95" }}><FaTradeFederation color="#4fc3f7" /> Hover KPI cards for details</li>
          </ul>
        </div>
      </div>

      {/* Crypto Terms Glossary */}
      <div
        style={bgStyle(glossaryImgFile)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={headingStyle}>
            <FaBook color="#ffb74d" /> Crypto Terms Glossary
          </h2>
          <button style={toggleButtonStyle} onClick={() => setShowGlossary(!showGlossary)}>
            {showGlossary ? "Hide Glossary" : "Show Glossary"}
          </button>
          {showGlossary && (
            <ul style={{ ...listStyle, marginTop: "10px" }}>
              <li><FaDollarSign color="#9D7F06" /> <strong>Market Cap:</strong> Total value of crypto</li>
              <li><FaSearch color="#3F69C9" /> <strong>Volume:</strong> Trading amount in 24h</li>
              <li><FaArrowUp color="#4caf50" /> <strong>Price Up:</strong> Positive change</li>
              <li><FaArrowDown color="#f44336" /> <strong>Price Down:</strong> Negative change</li>
              <li><FaBell color="#ff5252" /> <strong>Alert:</strong> Notification for movement</li>
              <li><FaChartBar color="#BD6314" /> <strong>KPI:</strong> Key performance indicator</li>
            </ul>
          )}
        </div>
      </div>

      {/* Back to Top */}
      <div style={backToTopStyle} onClick={scrollToTop}>
        ↑
      </div>
    </div>
  );
}
