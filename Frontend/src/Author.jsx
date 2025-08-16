import React from "react";
import authorPic from "./assets/pic.png"; // adjust path if needed
import { FaReact, FaJs, FaCss3Alt, FaHtml5, FaChartLine, FaFigma, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Author() {
  const containerStyle = {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    background: "linear-gradient(to right, #0f1b2b, #1a2638)",
    color: "#FFD966",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardStyle = {
    background: "#1a2638",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    maxWidth: "700px",
    textAlign: "center",
    marginBottom: "30px",
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "3px solid #FFD966",
  };

  const sectionHeaderStyle = {
    fontSize: "1.5em",
    marginBottom: "20px",
    color: "#FFD966",
    borderBottom: "1px solid #FFD966",
    paddingBottom: "5px",
  };

  const skillGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    marginTop: "15px",
  };

  const skillItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100px",
    padding: "15px",
    borderRadius: "12px",
    background: "#0f1b2b",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    cursor: "default",
  };

  const skillIconStyle = {
    fontSize: "2em",
    marginBottom: "10px",
  };

  const skillNameStyle = {
    fontSize: "1em",
    textAlign: "center",
  };

  const socialLinkStyle = {
    marginRight: "15px",
    color: "#FFD966",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "2.5em", marginBottom: "20px", textAlign: "center" }}>About the Author</h1>
      <img src={authorPic} alt="Author" style={avatarStyle} />

      <div style={cardStyle}>
        <p>
          Hello! I am <strong>Insa Abbas</strong>, a passionate developer and UI/UX enthusiast. 
          I design and develop interactive dashboards, web applications, and visualizations that are both functional and visually appealing.
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>Skills & Expertise</h2>
        <div style={skillGridStyle}>
          <div style={skillItemStyle} className="skill-hover"><FaReact style={{...skillIconStyle, color: "#61DBFB"}} /><span style={skillNameStyle}>React</span></div>
          <div style={skillItemStyle} className="skill-hover"><FaJs style={{...skillIconStyle, color: "#F7DF1E"}} /><span style={skillNameStyle}>JavaScript</span></div>
          <div style={skillItemStyle} className="skill-hover"><FaHtml5 style={{...skillIconStyle, color: "#E34F26"}} /><span style={skillNameStyle}>HTML</span></div>
          <div style={skillItemStyle} className="skill-hover"><FaCss3Alt style={{...skillIconStyle, color: "#1572B6"}} /><span style={skillNameStyle}>CSS</span></div>
          <div style={skillItemStyle} className="skill-hover"><FaChartLine style={{...skillIconStyle, color: "#FFD700"}} /><span style={skillNameStyle}>Data Viz</span></div>
          <div style={skillItemStyle} className="skill-hover"><FaFigma style={{...skillIconStyle, color: "#F24E1E"}} /><span style={skillNameStyle}>UI/UX</span></div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={sectionHeaderStyle}>Contact & Social</h2>
        <p>Email: <strong>insaabbas675@gmail.com</strong></p>
        <div>
          <a href="https://github.com/insaabbas" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}><FaGithub /> GitHub</a>
          <a href="https://www.linkedin.com/in/insa-abbas-796040313/" target="_blank" rel="noopener noreferrer" style={socialLinkStyle}><FaLinkedin /> LinkedIn</a>
        </div>
      </div>

      <h3 style={{ fontSize: "1.5em", marginTop: "20px", textAlign: "center" }}>Thanks for visiting!</h3>

      {/* Inline hover effect */}
      <style>{`
        .skill-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}
