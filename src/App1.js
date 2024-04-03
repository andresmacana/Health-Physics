import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles0.css";
import Header from "./Header";
import Menu from "./Menu";
import GammaShieldingCalculator from "./GammaShieldingCalculator";
import Decay from "./Decay2";
import HVL from "./HVL";
import Intra from "./Intra";
import IntraLin from "./IntraA";
import CalculationsForm2 from "./IntraB";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div>
          <Menu />
        </div>
        <main className="content">
          <Routes>
            <Route path="/shielding" element={<GammaShieldingCalculator />} />
            <Route path="/activity" element={<Decay />} />
            <Route path="/HVL" element={<HVL />} />
            {/* <Route path="/Intra" element={<Intra />} />
            <Route path="/IntraA" element={<IntraLin />} /> */}
            <Route path="/IntraB" element={<CalculationsForm2 />} />
            <Route
              path="/useful-links"
              element={<h2>Useful Links Section</h2>}
            />
            <Route path="/about" element={<h2>About Section</h2>} />
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
