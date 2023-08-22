import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import GammaShieldingCalculator from "./GammaShieldingCalculator";

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Health Physics</h1>
        </header>
        <nav className="menu">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/shielding">
                Shielding
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activity">
                Activity
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/useful-links">
                Useful Links
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/shielding" element={<GammaShieldingCalculator />} />
            <Route path="/activity" element={<h2>Decay</h2>} />
            <Route
              path="/useful-links"
              element={<h2>Useful Links Section</h2>}
            />
            <Route path="/about" element={<h2>About</h2>} />
          </Routes>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Jorge Macana</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
