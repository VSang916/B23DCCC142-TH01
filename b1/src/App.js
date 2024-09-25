import React from "react";
import Todo from "./TodoList";
import "./styles.css";
import SearchImage from "./SearchImage";
import RandomColor from "./RandomColor";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
      <div style={{ width: "30%" }}>
        <Todo />
      </div>
      <div style={{ width: "30%" }}>
        <SearchImage />
      </div>
      <div style={{ width: "30%" }}>
        <RandomColor />
      </div>
    </div>
  );
};

export default App;
