import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Build card component
const Card = () => {
  return <h3>This is a card</h3>;
};

// Build app component
const App = () => {
  return (
    <div>
      <h1>Card</h1>
      <Card></Card>
    </div>
  );
};

export default App;
