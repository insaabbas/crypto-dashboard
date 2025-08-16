import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=crypto&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`
      );
      const data = await res.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  // Styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    color: "#FFD966",
  };

  const cardStyle = {
    background: "rgba(15,27,43,0.95)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
  };

  const titleStyle = {
    fontSize: "1.2em",
    marginBottom: "10px",
    color: "#91740C",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    color: "#D2C87C",
    fontSize: "0.95em",
    fontFamily: "Verdana, Geneva, sans-serif",
    lineHeight: "1.5",
  };

  const linkStyle = {
    color: "#FFD966",
    textDecoration: "underline",
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#FFD700",
  };

  const dateStyle = {
    fontSize: "0.8em",
    marginTop: "5px",
    color: "#D2C87C",
    fontFamily: "Verdana, Geneva, sans-serif",
    lineHeight: "1.4",
  };

  // State to track hovered links
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2em" }}>
        Latest Crypto News
      </h1>

      {news.length === 0 && (
        <p style={{ textAlign: "center", ...paragraphStyle }}>Loading news...</p>
      )}

      {news.map((article, idx) => (
        <div
          key={idx}
          style={cardStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
          )}
          <h3 style={titleStyle}>{article.title}</h3>
          <p style={paragraphStyle}>{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={hoveredLink === idx ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
            onMouseEnter={() => setHoveredLink(idx)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Read More
          </a>
          <p style={dateStyle}>{new Date(article.publishedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
