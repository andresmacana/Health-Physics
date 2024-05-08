import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles0.css";
//import { MathJaxContext } from "react-mathjax";
import katex from "katex";
import "katex/dist/katex.min.css";

const CalculationsForm2 = () => {
  const [mA, setmA] = useState("6");
  const [kV, setkV] = useState("70");
  const [distance, setdistance] = useState("30");
  const [distanceSkin, setdistanceSkin] = useState("20");
  const [time1, settime1] = useState("0.1");
  const [exposure1, setexposure1] = useState("");
  const [time2, settime2] = useState("0.16");
  const [exposure2, setexposure2] = useState("");
  const [time3, settime3] = useState("0.20");
  const [exposure3, setexposure3] = useState("");
  const [time4, settime4] = useState("0.32");
  const [exposure4, setexposure4] = useState("");
  const [exposureAl, setexposureAl] = useState("");
  const [length, setlength] = useState("13");
  const [width, setwidth] = useState("5");
  const [bitewing, setbitewing] = useState("");
  const [hvl, sethvl] = useState("");
  const [linearidad1, setlinearidad1] = useState("");
  const [linearidad2, setlinearidad2] = useState("");
  const [linearidad3, setlinearidad3] = useState("");
  const [linearidad4, setlinearidad4] = useState("");
  const [primaryRay, setprimaryRay] = useState("");
  const [CoefficientRange, setCoeffiecientRange] = useState("");
  const [less01percent, setless01percent] = useState("");
  const [skinExposure, setskinExposure] = useState("");
  const [skinExposuremGy, setskinExposuremGy] = useState("");
  const [dosemGy, setdosemGy] = useState("");
  const [standardDeviation, setStandardDeviation] = useState(null);

  useEffect(() => {
    const equationElement1 = document.getElementById("lineality");
    const equationElement2 = document.getElementById("percent");
    const equationElement3 = document.getElementById("CoeffRange");
    const latexEquation = String.raw`\frac{mR}{mA*t}`;
    const percentEq = String.raw`\text{< } 0.1\%`;
    const coeffRangeEq = String.raw`\frac{max-min}{max+min} \leq 0.1\%`;

    try {
      katex.render(latexEquation, equationElement1, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(percentEq, equationElement2, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(coeffRangeEq, equationElement3, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering Katex:", error);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calcular
    const linearidadValues = [];

    const calclinearidad1 = () => {
      const x = exposure1 / (time1 * mA);
      setlinearidad1(x.toFixed(2));
      linearidadValues.push(x);
    };
    calclinearidad1();

    const calclinearidad2 = () => {
      const x = exposure2 / (time2 * mA);
      setlinearidad2(x.toFixed(2));
      linearidadValues.push(x);
    };
    calclinearidad2();

    const calclinearidad3 = () => {
      const x = exposure3 / (time3 * mA);
      setlinearidad3(x.toFixed(2));
      linearidadValues.push(x);
    };
    calclinearidad3();

    const calclinearidad4 = () => {
      const x = exposure4 / (time4 * mA);
      setlinearidad4(x.toFixed(2));
      linearidadValues.push(x);
    };
    calclinearidad4();

    //Coefficient range

    // Find the maximum and minimum values
    const calcCoefficientRange = () => {
      const max = Math.max(...linearidadValues);
      const min = Math.min(...linearidadValues);
      const x = (max - min) / (max + min);
      setCoeffiecientRange(x.toFixed(2));
    };
    calcCoefficientRange();

    const calculateStandardDeviation = () => {
      // Paso 1: Recopilar los valores de exposición en un arreglo
      const data = [
        parseFloat(exposure1),
        parseFloat(exposure2),
        parseFloat(exposure3),
        parseFloat(exposure4),
      ];

      // Paso 2: Calcular la media de los datos
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;

      // Paso 3: Calcular la suma de los cuadrados de las diferencias entre cada valor y la media
      const sumOfSquaredDifferences = data.reduce(
        (acc, val) => acc + Math.pow(val - mean, 2),
        0
      );

      // Paso 4: Calcular la varianza como la suma de los cuadrados de las diferencias dividida por el número de elementos
      const variance = sumOfSquaredDifferences / data.length;

      // Paso 5: Calcular la desviación estándar como la raíz cuadrada de la varianza
      const standardDeviation = Math.sqrt(variance);

      // Paso 6: Retornar la desviación estándar
      setStandardDeviation(standardDeviation.toFixed(2)); // Redondear la desviación estándar a 2 decimales antes de retornarla
    };
    calculateStandardDeviation();

    /* const handleCalculateClick = () => {
      const result = calculateStandardDeviation();
      setStandardDeviation(result); // Establecer la desviación estándar en el estado
    }; */

    // Calcular el primaryRay
    const calcprimaryRay = () => {
      const x = (2 * exposure4 * distance ** 2) / 400; // leak  from 20 cm
      setprimaryRay(x.toFixed(2));
    };
    calcprimaryRay();

    const calcless01percent = () => {
      const x = (0.1 * primaryRay) / 100;
      setless01percent(x.toFixed(2));
    };
    calcless01percent();

    const calchvl = () => {
      const x = (parseFloat(0.693) * 3) / Math.log(exposure4 / exposureAl);
      sethvl(x.toFixed(2));
    };
    calchvl();

    //Skin exposure
    const calcskinExposure = () => {
      const x = (bitewing * distance ** 2) / distanceSkin ** 2;
      setskinExposure(x.toFixed(1));
    };
    calcskinExposure();

    //To mGy units
    const calcskinExposuremGy = () => {
      const x = (bitewing * distance ** 2) / distanceSkin ** 2 / 115;
      setskinExposuremGy(x.toFixed(1));
    };
    calcskinExposuremGy();

    //dose mGy
    const calcdosemGy = () => {
      const x = (length * (width / 10) * bitewing) / 114;
      setdosemGy(x);
    };
    calcdosemGy();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            <h2 className="text-center mb-4">Exposure, others</h2>
            {/* Input fields go here */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="mA">value x-ray tube mA :</label>
                  <input
                    type="number"
                    id="mA"
                    className="form-control"
                    value={mA}
                    onChange={(e) => setmA(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="kV">value x-ray tube kVp :</label>
                  <input
                    type="number"
                    id="kV"
                    className="form-control"
                    value={kV}
                    onChange={(e) => setkV(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="distance">Distance tube to detector:</label>
                  <input
                    type="number"
                    id="distance"
                    className="form-control"
                    value={distance}
                    onChange={(e) => setdistance(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="distanceSkin">Distance to skin:</label>
                  <input
                    type="number"
                    id="distanceSkin"
                    className="form-control"
                    value={distanceSkin}
                    onChange={(e) => setdistanceSkin(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time1">Time #1:</label>
                  <input
                    type="number"
                    id="time1"
                    className="form-control"
                    value={time1}
                    onChange={(e) => settime1(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exposure1">exposure measure #1:</label>
                  <input
                    type="number"
                    id="exposure1"
                    className="form-control"
                    value={exposure1}
                    onChange={(e) => setexposure1(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time2">Time #2:</label>
                  <input
                    type="number"
                    id="time2"
                    className="form-control"
                    value={time2}
                    onChange={(e) => settime2(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exposure2">exposure measure #2:</label>
                  <input
                    type="number"
                    id="exposure2"
                    className="form-control"
                    value={exposure2}
                    onChange={(e) => setexposure2(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time3">Time #3:</label>
                  <input
                    type="number"
                    id="time3"
                    className="form-control"
                    value={time3}
                    onChange={(e) => settime3(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exposure3">exposure measure #3:</label>
                  <input
                    type="number"
                    id="exposure3"
                    className="form-control"
                    value={exposure3}
                    onChange={(e) => setexposure3(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time4">Time #4:</label>
                  <input
                    type="number"
                    id="time4"
                    className="form-control"
                    value={time4}
                    onChange={(e) => settime4(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exposure4">exposure measure #4:</label>
                  <input
                    type="number"
                    id="exposure4"
                    className="form-control"
                    value={exposure4}
                    onChange={(e) => setexposure4(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exposureAl">
                    Exposure Measure with 3 mm Al:
                  </label>
                  <input
                    type="number"
                    id="exposureAl"
                    className="form-control"
                    value={exposureAl}
                    onChange={(e) => setexposureAl(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="length">Length:</label>
                  <input
                    type="number"
                    id="length"
                    className="form-control"
                    value={length}
                    onChange={(e) => setlength(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="width">with:</label>
                  <input
                    type="number"
                    id="width"
                    className="form-control"
                    value={width}
                    onChange={(e) => setwidth(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="bitewing">bitewing:</label>
                  <input
                    type="number"
                    id="bitewing"
                    className="form-control"
                    value={bitewing}
                    onChange={(e) => setbitewing(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Calcular
            </button>
          </form>
          {/* 
          <div id="result1" className="mt-4">
            <h4 className="text-center">Results:</h4>
            <div>
              <p id="lineality"></p>
            </div>
            <p className="text-left">lineality #1: {linearidad1}</p>
            <p className="text-left">lineality #2: {linearidad2}</p>
            <p className="text-left">lineality #3: {linearidad3}</p>
            <p className="text-left">lineality #4: {linearidad4}</p>
            <p className="text-left">Standard Deviation: {standardDeviation}</p>

            <p className="text-left">
              Primary ray:{" "}
              <b>
                <font color="red">{primaryRay} mR</font>
              </b>
            </p>
            <div>
              <p id="CoeffRange"> </p>
            </div>
            <p className="text-left">Coefficient Range: {CoefficientRange}</p>
            <div>
              <p id="percent"></p>
            </div>
            <p className="text-left"> {less01percent}</p>
            <p className="text-left">
              HVL:{" "}
              <b>
                <font color="red">{hvl} mm Al</font>
              </b>
            </p>
            <p className="text-left">
              Skin exposure for bitewing:{" "}
              <b>
                <font color="red">{skinExposure} mR</font>
              </b>
            </p>
            <p className="text-left">
              Exposure:{" "}
              <b>
                <font color="red">{skinExposuremGy} mGy</font>
              </b>
            </p>
          </div> */}

          <div id="result1" className="mt-4">
            <h4 className="text-center">Results:</h4>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <p id="lineality"></p>
                </div>
                <p className="text-left">lineality #1: {linearidad1}</p>
                <p className="text-left">lineality #2: {linearidad2}</p>
                <p className="text-left">lineality #3: {linearidad3}</p>
                <p className="text-left">lineality #4: {linearidad4}</p>
                <p className="text-left">
                  Standard Deviation: {standardDeviation}
                </p>
                <p className="text-left">
                  Primary ray:{" "}
                  <b>
                    <font color="red">{primaryRay} mR</font>
                  </b>
                </p>
              </div>
              <div className="col-md-6">
                <div>
                  <p id="CoeffRange"> </p>
                </div>
                <p className="text-left">
                  Coefficient Range: {CoefficientRange}
                </p>
                <div>
                  <p id="percent"></p>
                </div>
                <p className="text-left"> {less01percent}</p>
                <p className="text-left">
                  HVL:{" "}
                  <b>
                    <font color="red">{hvl} mm Al</font>
                  </b>
                </p>
                <p className="text-left">
                  Skin exposure for bitewing:{" "}
                  <b>
                    <font color="red">{skinExposure} mR</font>
                  </b>
                </p>
                <p className="text-left">
                  Exposure:{" "}
                  <b>
                    <font color="red">{skinExposuremGy} mGy</font>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsForm2;
