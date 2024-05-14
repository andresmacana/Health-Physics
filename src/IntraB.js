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
  const [distancePan, setdistancePan] = useState("50");
  const [distanceLeak, setdistanceLeak] = useState("20");
  const [time1, settime1] = useState("0.1");
  const [exposure1, setexposure1] = useState("");
  const [time2, settime2] = useState("0.16");
  const [exposure2, setexposure2] = useState("");
  const [time3, settime3] = useState("0.20");
  const [exposure3, setexposure3] = useState("");
  const [time4, settime4] = useState("0.32");
  const [exposure4, setexposure4] = useState("");
  const [exposureRep1, setexposureRep1] = useState("");
  const [exposureRep2, setexposureRep2] = useState("");
  const [exposureRep3, setexposureRep3] = useState("");
  const [exposureRep4, setexposureRep4] = useState("");
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
  const [primaryRayPan, setprimaryRayPan] = useState("");
  const [CoefficientRange, setCoeffiecientRange] = useState("");
  const [CoeffVariation, setCoeffVariation] = useState(0);
  const [less01percent, setless01percent] = useState("");
  const [less01percentPan, setless01percentPan] = useState("");
  const [skinExposure, setskinExposure] = useState("");
  const [skinExposuremGy, setskinExposuremGy] = useState("");
  const [skinExposuremGyPan, setskinExposuremGyPan] = useState("");
  const [dosemGy, setdosemGy] = useState("");
  const [dosemGyPan, setdosemGyPan] = useState("");
  const [standardDeviation, setStandardDeviation] = useState(0);
  const [mean, setmean] = useState(0);
  const [maxOverMin, setmaxOverMin] = useState("");

  useEffect(() => {
    const equationElement1 = document.getElementById("lineality");
    const equationElement2 = document.getElementById("percent");
    const equationElement3 = document.getElementById("varCoeff");
    const equationElement4 = document.getElementById("kermamGy");
    const equationElement5 = document.getElementById("kermamGyPan");
    const equationElement6 = document.getElementById("exposureToKerma");
    const equationElement7 = document.getElementById("exposureToKerma2");
    const latexEquation = String.raw`\frac{X_{max}+X_{min}}{X_{max}-X_{min}} \leq 0.1`; /* String.raw`\frac{mR}{mA*t} \leq 0.1`; */
    const percentEq = String.raw`X=\frac{mR}{mA\cdot t}`;
    const varCoeffEq = String.raw`\frac{\sigma}{\bar{x}} \lt 5\%`;
    const kermamGyEq = String.raw`K_{bitewing}=\frac{E_{mR}\cdot{d_{1}^2}}{d_{2}^2\cdot{115}}`;
    const kermamGyPanEq = String.raw`K_{mGy}=\frac{E_{mR}\cdot(L\cdot W)}{115}`;
    const exposureToKerma = String.raw`1 Gy \approx 115 R \ or \ 1 mGy \approx 115 mGy`;
    const exposureToKerma2 = String.raw`1 R \approx 8.73 \ mGy \ or \ 1 mR \approx 8.73 \mu Gy`;

    try {
      katex.render(latexEquation, equationElement1, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(percentEq, equationElement2, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(varCoeffEq, equationElement3, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(kermamGyEq, equationElement4, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(kermamGyPanEq, equationElement5, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(exposureToKerma, equationElement6, {
        throwOnError: false,
        displayMode: true,
      });
      katex.render(exposureToKerma2, equationElement7, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering Katex:", error);
    }
  }, []);

  useEffect(() => {
    // Your useEffect code for rendering Katex equations
  }, []);

  useEffect(() => {
    // Your useEffect code for calculating mean and standard deviation
    const calcMean = () => {
      const data = [
        parseFloat(exposureRep1),
        parseFloat(exposureRep2),
        parseFloat(exposureRep3),
        parseFloat(exposureRep4),
      ];
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      setmean(mean.toFixed(2));
    };
    calcMean();

    const calculateStandardDeviation = () => {
      // Paso 1: Recopilar los valores de exposición en un arreglo
      const data = [
        parseFloat(exposureRep1),
        parseFloat(exposureRep2),
        parseFloat(exposureRep3),
        parseFloat(exposureRep4),
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
  }, [exposureRep1, exposureRep2, exposureRep3, exposureRep4]);

  useEffect(() => {
    // Calculate CoeffVariation once both mean and standardDeviation are available
    if (mean !== 0 && standardDeviation !== 0) {
      const x = (standardDeviation / mean) * 100;
      setCoeffVariation(x.toFixed(2));
    }
  }, [mean, standardDeviation]);

  useEffect(() => {
    // Calculate CoeffVariation once both mean and standardDeviation are available
    const max = Math.max(
      exposureRep1,
      exposureRep2,
      exposureRep3,
      exposureRep4
    );
    const min = Math.min(
      exposureRep1,
      exposureRep2,
      exposureRep3,
      exposureRep4
    );
    const x = max / min;
    setmaxOverMin(x.toFixed(2));
  }, [exposureRep1, exposureRep2, exposureRep3, exposureRep4]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calcular
    const linearidadValues = [];
    const reproductibilityValues = [];

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

    /* const calcMean = () => {
      const data = [
        parseFloat(exposureRep1),
        parseFloat(exposureRep2),
        parseFloat(exposureRep3),
        parseFloat(exposureRep4),
      ];
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      setmean(mean.toFixed(1));
    };
    calcMean(); */

    /* const calculateStandardDeviation = () => {
      // Paso 1: Recopilar los valores de exposición en un arreglo
      const data = [
        parseFloat(exposureRep1),
        parseFloat(exposureRep2),
        parseFloat(exposureRep3),
        parseFloat(exposureRep4),
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
    calculateStandardDeviation(); */

    /* const CoeffVariation = () => {
      if (mean !== 0 && standardDeviation !== 0) {
        const x = (standardDeviation / mean) * 100;
        setCoeffVariation(x.toFixed(2));
      }
    };
    CoeffVariation(); */

    /* const handleCalculateClick = () => {
      const result = calculateStandardDeviation();
      setStandardDeviation(result); // Establecer la desviación estándar en el estado
    }; */

    // Calcular el primaryRay
    const calcprimaryRay = () => {
      const x = (2 * exposure4 * distance ** 2) / distanceSkin ** 2; // leak  from 20 cm
      setprimaryRay(x.toFixed(2));
    };
    calcprimaryRay();

    const calcprimaryRayPan = () => {
      const x = (2 * exposure4 * distancePan ** 2) / distanceLeak ** 2; // leak  from 20 cm
      setprimaryRayPan(x.toFixed(2));
    };
    calcprimaryRayPan();

    const calcless01percent = () => {
      const x = (0.1 * primaryRay) / 100;
      setless01percent(x.toFixed(2));
    };
    calcless01percent();

    const calcless01percentPan = () => {
      const x = (0.1 * primaryRayPan) / 100;
      setless01percentPan(x.toFixed(2));
    };
    calcless01percentPan();

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
      const x = (((length * width) / 100) * bitewing) / 115;
      setdosemGy(x);
    };
    calcdosemGy();

    const calcskinExposureGyPan = () => {
      const x = (length * width * exposure4) / 11500;
      setskinExposuremGyPan(x.toFixed(1));
    };
    calcskinExposureGyPan();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            <h2 className="text-center mb-4">X-Ray verification</h2>
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
                  <label htmlFor="distance">
                    Distance tube to detector - intra:
                  </label>
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
                  <label htmlFor="distancePan">
                    Distance tube to detector - Pan:
                  </label>
                  <input
                    type="number"
                    id="distancePan"
                    className="form-control"
                    value={distancePan}
                    onChange={(e) => setdistancePan(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="distanceLeak">
                    Distance tube to detector - leak:
                  </label>
                  <input
                    type="number"
                    id="distanceLeak"
                    className="form-control"
                    value={distanceLeak}
                    onChange={(e) => setdistanceLeak(e.target.value)}
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
                  <label htmlFor="exposureRep">
                    exposure reproductibility:
                  </label>
                  <input
                    type="number"
                    id="exposureRep1"
                    className="form-control"
                    value={exposureRep1}
                    onChange={(e) => setexposureRep1(e.target.value)}
                  />
                  <input
                    type="number"
                    id="exposureRep2"
                    className="form-control"
                    value={exposureRep2}
                    onChange={(e) => setexposureRep2(e.target.value)}
                  />
                  <input
                    type="number"
                    id="exposureRep3"
                    className="form-control"
                    value={exposureRep3}
                    onChange={(e) => setexposureRep3(e.target.value)}
                  />
                  <input
                    type="number"
                    id="exposureRep4"
                    className="form-control"
                    value={exposureRep4}
                    onChange={(e) => setexposureRep4(e.target.value)}
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
                  <label htmlFor="length">Length (mm):</label>
                  <input
                    type="number"
                    id="length"
                    className="form-control"
                    value={length}
                    onChange={(e) => setlength(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="width">with (mm):</label>
                  <input
                    type="number"
                    id="width"
                    className="form-control"
                    value={width}
                    onChange={(e) => setwidth(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="bitewing">bitewing (mR):</label>
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
          {/* 
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
          </div> */}

          <div id="result1" className="mt-4">
            <h4 className="text-center">Results:</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lineality">Linearity:</label>

                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad1}</font>
                    </b>
                  </p>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad2}</font>
                    </b>
                  </p>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad3}</font>
                    </b>
                  </p>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad4}</font>
                    </b>
                  </p>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="linearidad1">Lineality #1:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad1}</font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="linearidad2">Lineality #2:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad2}</font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="linearidad3">Lineality #3:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad3}</font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="linearidad4">Lineality #4:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{linearidad4}</font>
                    </b>
                  </p>
                </div> */}
                <div className="form-group">
                  <label htmlFor="standardDeviation">
                    Standard Deviation and mean:
                  </label>
                  <p className="text-left">
                    <b>
                      <font color="red">
                        std : {standardDeviation} -- mean : {mean}
                      </font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="CoeffVariation">
                    Variation Coefficient &le; 5% :
                  </label>

                  <input
                    type="text"
                    id="exposure4"
                    className="form-control"
                    value={CoeffVariation + "%"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />

                  {/* <p className="text-left">
                    <b>
                      <font color="red">{CoeffVariation}</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="maxOverMin">Max/Min &le; 1:</label>

                  <input
                    type="text"
                    id="maxOverMin"
                    className="form-control"
                    value={maxOverMin}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="primaryRay">Primary ray:</label>
                  <input
                    type="text"
                    id="primaryRay"
                    className="form-control"
                    value={primaryRay + " mR"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{primaryRay} mR</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="primaryRayPan">Primary ray Pan:</label>
                  <input
                    type="text"
                    id="primaryPan"
                    className="form-control"
                    value={primaryRayPan + " mR"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{primaryRayPan} mR</font>
                    </b>
                  </p> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="CoeffRange">
                    Coefficient Range &le; 0.1:
                  </label>
                  <input
                    type="text"
                    id="CoeffRange"
                    className="form-control"
                    value={CoefficientRange}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p id="CoeffRange"></p> */}
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{CoefficientRange}</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="percent">Less than 0.1% intra:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{less01percent}</font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="percentPan">Less than 0.1% Pan:</label>
                  <p className="text-left">
                    <b>
                      <font color="red">{less01percentPan}</font>
                    </b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="hvl">HVL:</label>
                  <input
                    type="text"
                    id="hvl"
                    className="form-control"
                    value={hvl + " mmAL"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{hvl} mm Al</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="skinExposure">
                    Skin exposure for bitewing:
                  </label>
                  <input
                    type="text"
                    id="skinExposure"
                    className="form-control"
                    value={skinExposure + " mR"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{skinExposure} mR</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="skinExposuremGy">Exposure:</label>
                  <input
                    type="text"
                    id="skinExposuremGy"
                    className="form-control"
                    value={skinExposuremGy + " mGy"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{skinExposuremGy} mGy</font>
                    </b>
                  </p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="skinExposuremGyPan">Exposure Pan:</label>
                  <input
                    type="text"
                    id="skinExposuremGyPan"
                    className="form-control"
                    value={skinExposuremGyPan + " mGy"}
                    readOnly
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                  {/* <p className="text-left">
                    <b>
                      <font color="red">{skinExposuremGyPan} mGy</font>
                    </b>
                  </p> */}
                </div>
              </div>
            </div>
            <div>
              <h3>Equations</h3>
              <p>Coefficient Range:</p>
              <p id="lineality"></p>
              <p>Where X is:</p>
              <p id="percent"></p>
              <p>Variation Coefficient:</p>
              <p id="varCoeff"></p>
              <p>Kerma for bitewing</p>
              <p id="kermamGy"></p>
              <p>Kerma for Panoramic</p>
              <p id="kermamGyPan"></p>
              <p>Exposure</p>
              <p>
                The air kerma (in gray, Gy) replaces the exposure (in roentgen,
                R) as the measure of exposure.
              </p>
              <p id="exposureToKerma"></p>
              <p id="exposureToKerma2"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsForm2;
