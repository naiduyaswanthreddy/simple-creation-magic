import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthHandler from "./AuthHandler";  // 🔥 NEW COMPONENT for handling auth logic

function App() {
  return (
    <Router>
      <AuthHandler />
    </Router>
  );
}

export default App;
