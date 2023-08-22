import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
//import { MathJaxContext } from "react-mathjax";
import katex from "katex";
import "katex/dist/katex.min.css"; // Import Katex CSS

const GammaShieldingCalculator = () => {
  const [exposureRate, setExposureRate] = useState("");
  const [initialExposure, setInitialExposure] = useState("");
  const [muOverRho, setMuOverRho] = useState("0.11");
  const [density, setDensity] = useState("11.3");
  const [shieldingThickness, setShieldingThickness] = useState("");

  const calculateThickness = () => {
    const x =
      -Math.log(exposureRate / initialExposure) /
      (parseFloat(muOverRho) * parseFloat(density));
    setShieldingThickness(x);
  };

  useEffect(() => {
    const equationElement = document.getElementById("equation");
    const latexEquation = String.raw`X = -\frac{\ln\left(\frac{I}{I_o}\right)}{\left(\frac{\mu}{\rho}\right) \cdot \rho}`;
    try {
      katex.render(latexEquation, equationElement, {
        throwOnError: false,
        displayMode: true, // Render in display mode (centered)
      });
    } catch (error) {
      console.error("Error rendering Katex:", error);
    }
  }, [exposureRate, initialExposure, muOverRho, density]);

  return (
    <div className="container">
      <div className="col-md-6">
        <h2>Gamma Ray Shielding Calculator</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exposureRate" className="form-label">
              Exposure Rate (I mR/h):
            </label>
            <input
              type="text"
              className="form-control"
              id="exposureRate"
              value={exposureRate}
              onChange={(e) => setExposureRate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="initialExposure" className="form-label">
              Initial Exposure (Io (mR/h)):
            </label>
            <input
              type="text"
              className="form-control"
              id="initialExposure"
              value={initialExposure}
              onChange={(e) => setInitialExposure(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="muOverRho" className="form-label">
              Mass Attenuation Coefficient (μ/ρ):
            </label>
            <input
              type="text"
              className="form-control"
              id="muOverRho"
              value={muOverRho}
              onChange={(e) => setMuOverRho(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="density" className="form-label">
              Density (ρ):
            </label>
            <input
              type="text"
              className="form-control"
              id="density"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={calculateThickness}
          >
            Calculate
          </button>
        </form>
        {shieldingThickness !== "" && (
          <p>
            Shielding Thickness (X) = {shieldingThickness.toFixed(2)}{" "}
            centimeters
          </p>
        )}
        <div>
          <p id="equation"></p>
        </div>
      </div>
    </div>
  );
};

export default GammaShieldingCalculator;
