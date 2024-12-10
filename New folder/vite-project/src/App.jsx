import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <header className="app-header">
          <h1>Welcome to the Ultimate Quiz Game!</h1>
          <img src="logo.png" alt="Quiz Game Logo" />
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/quiz" className="nav-link">Quiz</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<RulesPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
