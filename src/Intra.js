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
  const [Lineality, setLineality] = useState("");
  const [mA, setmA] = useState("");
  const [Time, setTime] = useState("");

  const calculateLineality = () => {
    const x = initialExposure / (mA * Time);
    setLineality(x);
  };

  useEffect(() => {
    const equationElement = document.getElementById("equation");
    const latexEquation = String.raw`X = \frac{mR}{mA*t }`;
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
        <h2>Intra calculations</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="initialExposure" className="form-label">
              Initial Exposure (mR):
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
            <label htmlFor="mA" className="form-label">
              mili Amperage (mA):
            </label>
            <input
              type="text"
              className="form-control"
              id="mA"
              value={mA}
              onChange={(e) => setmA(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Time" className="form-label">
              Exposure Time (t):
            </label>
            <input
              type="text"
              className="form-control"
              id="time"
              value={Time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={calculateLineality}
          >
            Calculate
          </button>
        </form>
        {Lineality !== "" && <p>Lineality (X) = {Lineality.toFixed(2)} </p>}
        <div>
          <p id="equation"></p>
        </div>
      </div>
    </div>
  );
};

export default GammaShieldingCalculator;
