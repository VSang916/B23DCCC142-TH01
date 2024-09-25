import React, { useState, useEffect } from "react";
import "./styles.css"; // Đảm bảo bạn có file CSS này

const RandomColorApp = () => {
  const [color, setColor] = useState("#ffffff");
  const [history, setHistory] = useState([]);
  const [autoChange, setAutoChange] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    setHistory((prevHistory) => [...prevHistory, newColor]);
  };

  const undoColor = () => {
    if (history.length > 1) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.pop();
        setColor(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  };

  const toggleAutoChange = () => {
    setAutoChange((prev) => !prev);
  };

  useEffect(() => {
    if (autoChange) {
      changeColor();
      const id = setInterval(changeColor, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [autoChange]);

  return (
    <div className="card">
      <span></span>
      <div className="content">
        <h1>Random Color</h1>
        <div className="buttons">
          <button className="button type1" onClick={changeColor}>
            <span className="btn-txt">Change Color</span>
          </button>
          <button className="button type1" onClick={undoColor} disabled={history.length <= 1}>
            <span className="btn-txt">Undo</span>
          </button>
          <button className="button type1" onClick={toggleAutoChange}>
            <span className="btn-txt">{autoChange ? "Stop Auto" : "Start Auto"}</span>
          </button>
        </div>
        <div className="color-info">
          <div className="current-color">
            <h2>Current Color:</h2>
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: color,
                borderRadius: 5,
              }}
            ></div>
          </div>
          <div className="color-history">
            <h2>Color History:</h2>
            <ul>
              {history.map((col, index) => (
                <li key={index} style={{ color: col }}>
                  {col}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomColorApp;
