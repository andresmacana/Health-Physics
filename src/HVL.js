import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles0.css";
//import { MathJaxContext } from "react-mathjax";
import katex from "katex";
import "katex/dist/katex.min.css";

const GammaShieldingCalculator = () => {
  const [exposureRate, setExposureRate] = useState("");
  const [initialExposure, setInitialExposure] = useState("");
  const [muOverRho, setMuOverRho] = useState("0.11");
  const [density, setDensity] = useState("11.3");
  const [HVL, setHVL] = useState("");

  const calculateHVL = () => {
    const x =
      (parseFloat(0.693) * 3) / Math.log(initialExposure / exposureRate);
    setHVL(x);
  };

  useEffect(() => {
    const equationElement = document.getElementById("equation");
    const latexEquation = String.raw`X = \frac{\ln(2)*3mm}{\left(\frac{I0}{I3}\right) }`;
    try {
      katex.render(latexEquation, equationElement, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering Katex:", error);
    }
  }, [exposureRate, initialExposure, muOverRho, density]);

  return (
    <div className="container">
      <div className="col-md-6">
        <h2>HVL Calculator</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="initialExposure" className="form-label">
              Initial Exposure I<sub>0mmAL</sub> (mR):
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
            <label htmlFor="exposureRate" className="form-label">
              Exposure Rate (I<sub>3mmAl</sub> mR):
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
            onClick={calculateHVL}
          >
            Calculate
          </button>
        </form>
        {HVL !== "" && <p>HVL (X) = {HVL.toFixed(2)} milimeters</p>}
        <div>
          <p id="equation"></p>
        </div>
      </div>
    </div>
  );
};

export default GammaShieldingCalculator;
