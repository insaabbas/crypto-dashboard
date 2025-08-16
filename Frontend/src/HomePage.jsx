import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import coinGif from "./assets/coin.gif"; // import GIF directly

export default function Home() {
  const navigate = useNavigate();
  const [miniData, setMiniData] = useState([]);
  const [top5, setTop5] = useState([]);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    fetchMiniChart();
    fetchTop5();
  }, []);

  const fetchMiniChart = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
      );
      const data = await res.json();
      const formatted = data.prices
        .slice(-20)
        .map(([t, price]) => ({
          time: new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          price: parseFloat(price.toFixed(2)),
        }));
      setMiniData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTop5 = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      );
      const coins = await res.json();
      setTop5(coins);
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #0f1b2b, #1a2638)",
    color: "#FFD966",
  };

  const sidebarStyle = {
    width: "200px",
    background: "#1a2638",
    padding: "30px 15px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "100vh",
    boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
  };

  const sidebarButton = (page) => ({
    padding: "12px 15px",
    borderRadius: "10px",
    border: "none",
    background: activePage === page ? "#FFD966" : "#0f1b2b",
    color: activePage === page ? "#0f1b2b" : "#FFD966",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "left",
    transition: "all 0.3s ease",
  });

  const mainContentStyle = {
    flex: 1,
    padding: "30px",
    position: "relative",
    overflowY: "auto",
  };

  const cardStyle = {
    background: "#1a2638",
    color: "#FFD966",
    padding: "15px",
    borderRadius: "12px",
    minWidth: "120px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  };

  const giphyStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.15,
    pointerEvents: "none",
    zIndex: 0,
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <button style={sidebarButton("home")} onClick={() => { setActivePage("home"); navigate("/"); }}>Home</button>
        <button style={sidebarButton("dashboard")} onClick={() => { setActivePage("dashboard"); navigate("/dashboard"); }}>Dashboard</button>
        <button style={sidebarButton("tutorial")} onClick={() => { setActivePage("tutorial"); navigate("/tutorial"); }}>Tutorial</button>
        <button style={sidebarButton("news")} onClick={() => { setActivePage("news"); navigate("/news"); }}>News</button>
        <button style={sidebarButton("about")} onClick={() => { setActivePage("about"); navigate("/about"); }}>About Dashboard</button>
        <button
          style={{ ...sidebarButton("author"), display: "flex", alignItems: "center", gap: "10px" }}
          onClick={() => { setActivePage("author"); navigate("/author"); }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/223380640?u=36ff9e7d95619d7e94d632e2c49a5e62bcd4c2f3&v=4"
            alt="Author"
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          />
          Author
        </button>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Background GIF */}
        <img src={coinGif} alt="Animated Background" style={giphyStyle} />

        <h1 style={{ fontSize: "2em", textAlign: "center", marginBottom: "20px", position: "relative", zIndex: 1 }}>
          Welcome to Crypto Dashboard
        </h1>
        <p style={{ fontSize: "1.3em", textAlign: "center", maxWidth: "700px", color: "#FFD966", margin: "0 auto", position: "relative", zIndex: 1 }}>
          Track real-time Bitcoin prices, market trends, top cryptos, and 24h changes all in one place.
          Stay updated and make smarter crypto decisions.
        </p>

        {/* Mini Bitcoin Chart */}
        <div style={{ width: "100%", marginTop: "50px", background: "#0f1b2b", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", position: "relative", zIndex: 1 }}>
          <h2 style={{ marginBottom: "15px", textAlign: "center", color: "#FFD966" }}>Bitcoin Price (24h Preview)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={miniData}>
              <XAxis dataKey="time" stroke="#FFD966" />
              <YAxis domain={["auto", "auto"]} stroke="#FFD966" />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="price" stroke="#FFD966" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Cryptos */}
        <div style={{ marginTop: "50px", width: "100%", position: "relative", zIndex: 1 }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#FFD966" }}>Top 5 Cryptos by Market Cap</h2>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
            {top5.map((coin) => (
              <div key={coin.id} style={cardStyle}>
                <img src={coin.image} alt={coin.name} style={{ width: "40px", marginBottom: "10px" }} />
                <h3 style={{ margin: 0 }}>{coin.symbol.toUpperCase()}</h3>
                <p style={{ margin: "5px 0" }}>${coin.market_cap.toLocaleString()}</p>
                <p style={{ color: coin.price_change_percentage_24h >= 0 ? "#4caf50" : "#f44336", margin: 0 }}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
