// Dashboard.jsx

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Bar
} from "recharts";
import { io } from "socket.io-client";

export default function Dashboard() {
  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
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
const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) setShowButton(true);
    else setShowButton(false);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
{showButton && (
  <div style={backToTopStyle} onClick={scrollToTop}>
    ↑
  </div>
)}

  const [cryptoData, setCryptoData] = useState([]);
  const [stats, setStats] = useState({
    price: 0,
    change: 0,
    marketCap: 0,
    highest: 0,
    lowest: 0,
    volume: 0,
  });
  const [currency, setCurrency] = useState("usd");
  const [alerts, setAlerts] = useState([]);
  const [marketShareData, setMarketShareData] = useState([]);
  const [top5ChangeData, setTop5ChangeData] = useState([]);

  const marketColors = [
    "#99791a",
    "#FFB300",
    "#FFD600",
    "#FFEB3B",
    "#FFF9C4",
  ];

  useEffect(() => {
    fetchData(currency);
    fetchMarketShare();

    const socket = io("http://localhost:4000");
    socket.on("cryptoData", (newData) => updateWithNewData(newData));

    const interval = setInterval(fetchMarketShare, 60000);
    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [currency]);

  const fetchData = async (curr) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${curr}&days=1`
      );
      const data = await res.json();
      const formatted = formatData(data);
      updateStats(formatted, data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const formatData = (data) =>
    data.prices
      .map(([timestamp, price], i) => ({
        time: new Date(timestamp).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }),
        rawTime: timestamp,
        price: parseFloat(price.toFixed(2)),
        volume: data.total_volumes[i]
          ? parseFloat(data.total_volumes[i][1].toFixed(2))
          : 0
      }))
      .sort((a, b) => a.rawTime - b.rawTime);

  const formatBigNumber = (num) => {
    if (!num) return 0;
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toLocaleString();
  };

  const updateStats = (formatted, data) => {
    const latestPrice = formatted[formatted.length - 1].price;
    const firstPrice = formatted[0].price;
    const change = (((latestPrice - firstPrice) / firstPrice) * 100).toFixed(2);
    const highestPrice = Math.max(...formatted.map((d) => d.price));
    const lowestPrice = Math.min(...formatted.map((d) => d.price));
    const totalVolume = data.total_volumes
      ? data.total_volumes.reduce((sum, [, v]) => sum + v, 0)
      : 0;

    setCryptoData(formatted);
    setStats({
      price: latestPrice,
      change,
      marketCap: (Math.random() * 500_000_000_000).toFixed(0),
      highest: highestPrice,
      lowest: lowestPrice,
      volume: totalVolume,
    });

    const newAlerts = [];
    if (change >= 5) newAlerts.push("Price rose more than 5% today! ");
    if (change <= -5) newAlerts.push("Price dropped more than 5% today! 🔻");
    setAlerts(newAlerts);
  };

  const updateWithNewData = (newData) => {
    const updated = [...cryptoData, ...newData].sort(
      (a, b) => new Date(a.rawTime) - new Date(b.rawTime)
    );
    setCryptoData(updated);
  };

  const fetchMarketShare = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      );
      const coins = await res.json();
      const formatted = coins.map((coin) => ({
        name: coin.name,
        value: coin.market_cap,
        change: coin.price_change_percentage_24h,
      }));
      setMarketShareData(formatted);
      setTop5ChangeData(formatted);
    } catch (err) {
      console.error("Error fetching market share:", err);
    }
  };

  const containerStyle = {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f1b2b, #1a2638)",
    fontFamily: "Arial, sans-serif",
    color: "#FFD700",
  };

  const sectionHeaderStyle = {
    fontSize: "1.6em",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#FFD700",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#FFD700" }}>
        Real-Time Crypto Dashboard
      </h1>

      {/* Currency Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px", justifyContent: "center" }}>
        <select
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
          style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="btc">BTC</option>
          <option value="inr">INR</option>
          <option value="pkr">PKR</option>
        </select>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: "20px", color: "#0f1b2b", padding: "15px", borderRadius: "10px", background: "#FFD700" }}>
          {alerts.map((a, i) => <div key={i}>{a}</div>)}
        </div>
      )}

      {/* KPI Cards */}
      <div style={sectionHeaderStyle}>Key Metrics</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}>
        <Card title="Current Price" value={`${currency.toUpperCase()} ${formatBigNumber(stats.price)}`} />
        <Card title="24h Change" value={`${stats.change}%`} change={stats.change} />
        <Card title="Market Cap" value={`${currency.toUpperCase()} ${formatBigNumber(stats.marketCap)}`} />
        <Card title="Highest (24h)" value={`${currency.toUpperCase()} ${formatBigNumber(stats.highest)}`} />
        <Card title="Lowest (24h)" value={`${currency.toUpperCase()} ${formatBigNumber(stats.lowest)}`} />
        <Card title="24h Volume" value={`${currency.toUpperCase()} ${formatBigNumber(stats.volume)}`} large />
      </div>

      {/* Price Chart */}
      <div style={sectionHeaderStyle}>Price Chart (24h)</div>
      <div style={{
        background: "rgba(20,40,60,0.85)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        marginBottom: "40px"
      }}>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={cryptoData} syncId="cryptoSync" margin={{ top: 10, right: 30, left: 0, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis
              dataKey="time"
              stroke="#FFD700"
              angle={-45}
              textAnchor="end"
              interval={Math.floor(cryptoData.length / 10)}
              height={60}
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#FFD700" />
            <Tooltip
              formatter={(value) => `${currency.toUpperCase()} ${formatBigNumber(value)}`}
              contentStyle={{ backgroundColor: "#1a2638", border: "none", color: "#FFD700" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FFD700"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Price vs Volume Chart */}
<div style={sectionHeaderStyle}>Price vs Volume (24h)</div>
<div style={{
  background: "rgba(20,40,60,0.85)",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  marginBottom: "40px"
}}>
  <ResponsiveContainer width="100%" height={400}>
    <ComposedChart data={cryptoData} syncId="cryptoSync" margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
      <XAxis dataKey="time" stroke="#FFD700" angle={-45} textAnchor="end" height={60} style={{ fontSize: "12px" }} />
      
      {/* Price axis */}
      <YAxis yAxisId="left" stroke="#FFD700" />
      
      {/* Volume axis with K, M, B formatting */}
      <YAxis
        yAxisId="right"
        orientation="right"
        stroke="#FFD700"
        tickFormatter={(value) => {
          if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
          if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
          if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
          return value;
        }}
      />

      <Tooltip
        formatter={(value, name) =>
          name === "Price"
            ? `${currency.toUpperCase()} ${formatBigNumber(value)}`
            : `${currency.toUpperCase()} ${formatBigNumber(value)}`
        }
        contentStyle={{ backgroundColor: "#1a2638", border: "none", color: "#FFD700" }}
      />

      {/* Yellow volume bars */}
      <Bar yAxisId="right" dataKey="volume" fill="#FFD700" barSize={20} name="Volume" />

      {/* Yellow price line */}
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="price"
        stroke="#FFD700"
        strokeWidth={2}
        dot={false}
        name="Price"
      />
    </ComposedChart>
  </ResponsiveContainer>
</div>

      {/* Recent Prices */}
      <div style={sectionHeaderStyle}>Recent Prices</div>
      <div style={{
        background: "rgba(20,40,60,0.85)",
        padding: "15px",
        borderRadius: "15px",
        marginBottom: "40px"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#FFD700" }}>
          <thead>
            <tr style={{ background: "#1a2638" }}>
              <th style={{ padding: "10px" }}>Time</th>
              <th style={{ padding: "10px" }}>Price</th>
              <th style={{ padding: "10px" }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.slice(-10).map((d, idx, arr) => {
              const globalIdx = cryptoData.length - 10 + idx;
              const start = Math.max(0, globalIdx - 4);
              const miniChartData = cryptoData.slice(start, globalIdx + 1);
              return (
                <tr key={idx}>
                  <td style={{ padding: "10px" }}>{d.time}</td>
                  <td style={{ padding: "10px" }}>
                    {currency.toUpperCase()} {formatBigNumber(d.price)} {d.price >= cryptoData[globalIdx - 1]?.price ? "▲" : "▼"}
                  </td>
                  <td style={{ padding: "10px", width: "120px" }}>
                    <ResponsiveContainer width="100%" height={30}>
                      <LineChart data={miniChartData}>
                        <Line type="monotone" dataKey="price" stroke="#FFD700" dot={false} isAnimationActive animationDuration={500} />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Market Share & 24h Change */}
      <div style={{ marginTop: "50px" }}>
        <div style={sectionHeaderStyle}>Top 5 Crypto Market Share & 24h Change</div>

        {/* Donut Chart */}
        <div style={{
          background: "rgba(15,27,43,0.85)",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          marginBottom: "40px"
        }}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={marketShareData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={marketColors[index % marketColors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${formatBigNumber(value)}`}
                contentStyle={{ backgroundColor: "#1a2638", border: "none", color: "#FFD700" }}
                itemStyle={{ color: "#FFD700" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 24h Change Line Chart */}
        <div style={{
          background: "rgba(15,27,43,0.85)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={top5ChangeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#FFD700" />
              <YAxis tickFormatter={(val) => val.toFixed(1) + "%"} stroke="#FFD700" />
              <Tooltip
                formatter={(val) => val.toFixed(2) + "%"}
                contentStyle={{ backgroundColor: "#1a2638", border: "none", color: "#FFD700" }}
                itemStyle={{ color: "#FFD700" }}
              />
              <Line
                type="monotone"
                dataKey="change"
                stroke="#FFD700"
                strokeWidth={3}
                dot={{ r: 5 }}
                isAnimationActive
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
      </div>
      <div style={backToTopStyle} onClick={scrollToTop}>
  ↑
</div>
    </div>
  );
}

// KPI Card Component
function Card({ title, value, change, large }) {
  return (
    <div style={{
      background: "rgba(20,40,60,0.85)",
      padding: large ? "40px 25px" : "30px 20px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      transition: "all 0.7s ease-in-out",
      minHeight: large ? "140px" : "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#FFD700"
    }}>
      <h3 style={{ margin: 0, fontSize: large ? "1.3em" : "1.1em", fontWeight: "bold" }}>{title}</h3>
    <p style={{ fontSize: large ? "2em" : "1.8em", fontWeight: "bold" }}>
  {value}{" "}
  {change && (
    <span style={{ color: change >= 0 ? "green" : "red" }}>
      {change >= 0 ? "▲" : "▼"}
    </span>
  )}
</p>

      
    </div>
    
  );
}  

