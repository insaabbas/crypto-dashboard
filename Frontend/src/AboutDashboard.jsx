import React from "react";
import { FaChartLine, FaCoins, FaPercentage, FaMousePointer, FaMobileAlt } from "react-icons/fa";
import chartGif from "./assets/chart.gif"; // import the GIF

export default function AboutDashboard() {
  const containerStyle = {
    minHeight: "100vh",
    fontFamily: "Verdana, Geneva, sans-serif",
    padding: "30px",
    background: "linear-gradient(to right, #0f1b2b, #1a2638)",
    color: "#FFD966",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative", // needed for GIF positioning
  };

  const cardStyle = {
    background: "#1a2638",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    maxWidth: "800px",
    textAlign: "left",
    lineHeight: "1.8em",
    transition: "transform 0.3s, box-shadow 0.3s",
    fontFamily: "Georgia, serif",
    position: "relative",
    zIndex: 1, // content above GIF
  };

  const bubbleText = {
    textAlign: "center",
    marginTop: "30px",
    fontStyle: "italic",
    color: "#531064",
    display: "inline-block",
    animation: "jump 2s infinite",
    fontFamily: "'Comic Sans MS', 'Arial Rounded MT Bold', cursive",
    fontSize: "1.5em",
    fontWeight: "light",
    padding: "10px 20px",
    borderRadius: "7px",
    textShadow: "1px 1px 2px #FFB6C1, -1px -1px 2px #FFB6C1",
  };

  const featureStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 0",
    borderBottom: "1px solid #333",
    transition: "background 0.3s, transform 0.3s",
  };

  const iconStyles = [
    { color: "#4fc3f7", fontSize: "1.5em", minWidth: "30px" },
    { color: "#f7931a", fontSize: "1.5em", minWidth: "30px" },
    { color: "#76ff03", fontSize: "1.5em", minWidth: "30px" },
    { color: "#ff5252", fontSize: "1.5em", minWidth: "30px" },
    { color: "#600C91", fontSize: "1.5em", minWidth: "30px" },
  ];

  const headingStyle = {
    fontFamily: "Geneva, sans-serif",
    color: "#FFD966",
    marginTop: "25px",
    marginBottom: "15px",
    fontSize: "1.6em",
  };

  const lightText = { color: "#FFD966" };
  const darkText = { color: "#978911" };

  const jumpText = {
    textAlign: "center",
    marginTop: "30px",
    fontStyle: "italic",
    color: "#FF69B4",
    display: "inline-block",
    animation: "jump 1s infinite",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "1.2em",
  };

  const giphyStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.15, // light opacity
    pointerEvents: "none", // click through
    zIndex: 0, // behind content
  };

  return (
    <div style={containerStyle}>
      {/* Background GIF */}
      <img src={chartGif} alt="Animated Background" style={giphyStyle} />

      <style>
        {`
          @keyframes jump {
            0% { transform: translateY(0); }
            25% { transform: translateY(-10px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <h1 style={{ fontSize: "2.5em", marginBottom: "30px", textAlign: "center", fontFamily: "Verdana, Geneva, sans-serif", position: "relative", zIndex: 1 }}>
        About This Dashboard
      </h1>

      <div style={cardStyle}>
        <p style={darkText}>
          The <strong style={lightText}>Crypto Dashboard</strong> is a professional, real-time tracking platform designed to provide users with essential cryptocurrency data in an intuitive and interactive format.
        </p>

        <h2 style={headingStyle}>Features:</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={featureStyle}>
            <FaChartLine style={iconStyles[0]} />
            <span style={lightText}>Live Bitcoin price chart (24h) with historical data.</span>
          </div>
          <div style={featureStyle}>
            <FaCoins style={iconStyles[1]} />
            <span style={lightText}>Top 5 cryptocurrencies by market capitalization.</span>
          </div>
          <div style={featureStyle}>
            <FaPercentage style={iconStyles[2]} />
            <span style={lightText}>Price change percentages over 24 hours.</span>
          </div>
          <div style={featureStyle}>
            <FaMousePointer style={iconStyles[3]} />
            <span style={lightText}>Interactive charts and tooltips for better visualization.</span>
          </div>
          <div style={featureStyle}>
            <FaMobileAlt style={iconStyles[4]} />
            <span style={lightText}>Responsive design and sidebar navigation for easy access.</span>
          </div>
        </div>

        <p style={{ marginTop: "25px", ...lightText }}>
          The dashboard fetches data from the <strong style={lightText}>CoinGecko API</strong> and updates automatically.
          It is built using <strong style={lightText}>React</strong> and <strong style={lightText}>Recharts</strong> for dynamic, professional data visualization.
        </p>

        <p style={{ ...jumpText, ...bubbleText }}>
          <i>Stay informed, track your crypto, and make smarter financial decisions!</i>
        </p>
      </div>
    </div>
  );
}
