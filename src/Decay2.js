import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";
import katex from "katex";
import "katex/dist/katex.min.css";

function Decay() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeUnit, setTimeUnit] = useState("years");
  const [Thalf, setThalf] = useState(31.0);
  const [initialActivity, setInitialActivity] = useState("100.0");
  const [chart, setChart] = useState(null);
  const [finalActivity, setFinalActivity] = useState(null);

  const calculateDecay = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const t = [];
    const A = [];

    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
      let timeDiff = 0;

      if (timeUnit === "years") {
        timeDiff = year - start.getFullYear();
      } else if (timeUnit === "months") {
        timeDiff =
          (year - start.getFullYear()) * 12 + (12 - start.getMonth()) + 1;
      } else if (timeUnit === "days") {
        const oneDay = 24 * 60 * 60 * 1000;
        timeDiff = Math.round((new Date(year, 0, 1) - start) / oneDay);
      }

      t.push(year);
      A.push(
        parseFloat(initialActivity) *
          Math.exp((-0.693 * timeDiff) / parseFloat(Thalf))
      );
    }

    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById("decayChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: t,
        datasets: [
          {
            label: "Activity",
            data: A,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Years",
            },
          },
          y: {
            title: {
              display: true,
              text: "Activity",
            },
            ticks: {
              callback: function (value) {
                return value + "Ci"; // Format the tick values as percentages
              },
              stepSize: 25, // Set the step size between ticks
              min: 0,
              max: 100,
              values: [0, 25, 50, 75, 100], // Set the tick values explicitly
            },
          },
        },
      },
    });

    setChart(newChart);

    const finalActivityValue = A[A.length - 1];
    setFinalActivity(finalActivityValue.toFixed(3));
  };

  useEffect(() => {
    const equationElement = document.getElementById("equation");
    const latexEquation = String.raw`A = A_{0}e^{-\lambda T_{1/2}}`;
    try {
      katex.render(latexEquation, equationElement, {
        throwOnError: false,
        displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering Katex:", error);
    }
  }, [initialActivity, finalActivity, Thalf, startDate, endDate]);

  return (
    <div className="container mt-5">
      <h1>Radioactive Decay</h1>
      <label htmlFor="startDate">Select Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate">Select End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <label htmlFor="initialActivity">Enter Initial Activity:</label>
      <input
        type="text"
        id="initialActivity"
        className="number-input"
        value={initialActivity}
        onChange={(e) => setInitialActivity(e.target.value)}
      />
      <label htmlFor="Thalf">Enter Thalf Value:</label>
      <input
        type="text"
        id="Thalf"
        className="number-input"
        value={Thalf}
        onChange={(e) => setThalf(e.target.value)}
      />

      <select
        id="timeUnit"
        value={timeUnit}
        onChange={(e) => setTimeUnit(e.target.value)}
      >
        <option value="years">Years</option>
        <option value="months">Months</option>
        <option value="days">Days</option>
      </select>
      <button className="btn btn-primary mt-2" onClick={calculateDecay}>
        Calculate Decay
      </button>
      <div className="mt-3">
        <canvas id="decayChart"></canvas>
      </div>
      {finalActivity !== null && (
        <div className="mt-3">
          <h2>Final Calculated Activity:</h2>
          <p>A = {finalActivity}</p>
        </div>
      )}
      <div>
        <p id="equation"></p>
      </div>
    </div>
  );
}

export default Decay;
