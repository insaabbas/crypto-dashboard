import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import Home from "./HomePage";
import Dashboard from "./Dashboard";
import Author from "./Author";
import AboutDashboard from "./AboutDashboard";
import Tutorial from "./Tutorial";
import News from "./News";

export default function App() {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #0f1b2b, #1a2638)",
    minHeight: "100vh",
    padding: "20px",
    color: "#FFD700",
  };

  const dashboardWrapperStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#0f1b2b",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  };

  const Header = () => {
    const location = useLocation();
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return <h1 style={{ textAlign: "center", color: "#FFD700", marginBottom: "30px" }}></h1>;
    }
    return null; // No header on other pages
  };

  const Nav = () => (
    <nav style={{ display: "flex", gap: "20px", marginBottom: "20px", justifyContent: "center", flexWrap: "wrap" }}>
      <Link to="/" style={{ color: "#FFD700", textDecoration: "none" }}>Home</Link>
      <Link to="/dashboard" style={{ color: "#FFD700", textDecoration: "none" }}>Dashboard</Link>
      <Link to="/tutorial" style={{ color: "#FFD700", textDecoration: "none" }}>Tutorial</Link>
      <Link to="/news" style={{ color: "#FFD700", textDecoration: "none" }}>News</Link>
      <Link to="/about" style={{ color: "#FFD700", textDecoration: "none" }}>About</Link>
      <Link to="/author" style={{ color: "#FFD700", textDecoration: "none" }}>Author</Link>
    </nav>
  );

  return (
    <Router>
      <div style={containerStyle}>
        <Nav />
        <Header />
        <div style={dashboardWrapperStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/author" element={<Author />} />
            <Route path="/about" element={<AboutDashboard />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
