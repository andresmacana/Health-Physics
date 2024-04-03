import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles0.css";

const IntraLin = () => {
  const [data, setData] = useState({
    A1: "",
    B1: "",
    C1: "",
    D1: "",
    E1: "",
    A2: "",
    B2: "",
    C2: "",
    D2: "",
    E2: "",
    A3: "",
    B3: "",
    C3: "",
    D3: "",
    E3: "",
    A4: "",
    B4: "",
    C4: "",
    D4: "",
    E4: "",
    A5: "",
    B5: "",
    C5: "",
    D5: "",
    E5: "",
    A6: "",
    B6: "",
    C6: "",
    D6: "",
    E6: "",
    A7: "",
    B7: "",
    C7: "",
    D7: "",
    E7: "",
    A8: "",
    B8: "",
    C8: "",
    D8: "",
    E8: "",
    A9: "",
    B9: "",
    C9: "",
    D9: "",
    E9: "",
  });
  const [Lineality, setLineality] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const calculateLineality = () => {
    const x = 55;
    setLineality(x);
  };

  /* const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = id === "A1" ? parseFloat(value) * 1000 : value;
    setData((prevData) => ({
      ...prevData,
      [id]: updatedValue,
    }));
  }; */

  /* useEffect(() => {
    const diff = parseFloat(data.A1) - parseFloat(data.A2);
    setData((prevData) => ({
      ...prevData,
      A3: isNaN(diff) ? "" : diff.toString(),
      B3: isNaN(diff) ? "" : diff.toString(),
      C3: isNaN(diff) ? "" : diff.toString(),
      D3: isNaN(diff) ? "" : diff.toString(),
      E3: isNaN(diff) ? "" : diff.toString(),
    }));
  }, [data.A2, data.B2]); */

  useEffect(() => {
    const diff = {};
    for (let col of ["A", "B", "C", "D", "E"]) {
      const diffValue =
        parseFloat(data[`${col}2`]) - parseFloat(data[`${col}5`]);
      diff[`${col}8`] = isNaN(diffValue) ? "" : diffValue.toString();
    }
    setData((prevData) => ({
      ...prevData,
      ...diff,
    }));
  }, [
    data.A2,
    data.A5,
    data.B2,
    data.B5,
    data.C2,
    data.C5,
    data.D2,
    data.D5,
    data.E2,
    data.E5,
  ]);

  useEffect(() => {
    const toms = {};
    for (let col of ["A", "B", "C", "D", "E"]) {
      const tomsValue = parseFloat(data[`${col}1`]) * 1000;
      toms[`${col}2`] = isNaN(tomsValue) ? "" : tomsValue.toString();
    }
    setData((prevData) => ({
      ...prevData,
      ...toms,
    }));
  }, [
    data.A1,
    data.A2,
    data.B1,
    data.B2,
    data.C1,
    data.C2,
    data.D1,
    data.D2,
    data.E1,
    data.E2,
  ]);

  useEffect(() => {
    const pulse = {};
    for (let col of ["A", "B", "C", "D", "E"]) {
      const pulseValue = parseFloat(data[`${col}1`]) / 60;
      pulse[`${col}3`] = isNaN(pulseValue) ? "" : pulseValue.toString();
    }
    setData((prevData) => ({
      ...prevData,
      ...pulse,
    }));
  }, [
    data.A1,
    data.A2,
    data.B1,
    data.B2,
    data.C1,
    data.C2,
    data.D1,
    data.D2,
    data.E1,
    data.E2,
  ]);

  return (
    <div className="container">
      <div className="col-md-6">
        <h2>Kilo Voltage kVp</h2>
        <table className="table">
          <tbody>
            <tr scope="row">kVp Reference</tr>
            <td>
              <input
                type="text"
                id="kV0"
                value={data.kV0}
                onChange={handleChange}
              ></input>
            </td>
            <tr scope="row">kVp measured</tr>
            <td>
              <input
                type="text"
                id="kV1"
                value={data.kV1}
                onChange={handleChange}
              ></input>
            </td>
            <td>
              <input
                type="text"
                id="kV2"
                value={data.kV2}
                onChange={handleChange}
              ></input>
            </td>
            <td>
              <input
                type="text"
                id="kV3"
                value={data.kV3}
                onChange={handleChange}
              ></input>
            </td>
            <td>
              <input
                type="text"
                id="kV4"
                value={data.kV4}
                onChange={handleChange}
              ></input>
            </td>
            <tr scope="row"></tr>
            <td>
              <input
                type="text"
                id="kV5"
                value={data.kV5}
                onChange={handleChange}
              ></input>
            </td>
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        <h2>Intra calculations 2</h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Time (s)</th>
              <td>
                <input
                  type="text"
                  id="A1"
                  value={data.A1}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B1"
                  value={data.B1}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C1"
                  value={data.C1}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D1"
                  value={data.D1}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E1"
                  value={data.E1}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Time (ms)</th>
              <td>
                <input
                  type="text"
                  id="A2"
                  value={data.A2}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B2"
                  value={data.B2}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C2"
                  value={data.C2}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D2"
                  value={data.D2}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E2"
                  value={data.E2}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Time (pulse)</th>
              <td>
                <input
                  type="text"
                  id="A3"
                  value={data.A3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B3"
                  value={data.B3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C3"
                  value={data.C3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D3"
                  value={data.D3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E3"
                  value={data.E3}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th scope="row">Time measured (ms)</th>
              <td>
                <input
                  type="text"
                  id="A5"
                  value={data.A5}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B5"
                  value={data.B5}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C5"
                  value={data.C5}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D5"
                  value={data.D5}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E5"
                  value={data.E5}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th scope="row">Time measured (pulse)</th>
              <td>
                <input
                  type="text"
                  id="A6"
                  value={data.A6}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B6"
                  value={data.B6}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C6"
                  value={data.C6}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D6"
                  value={data.D6}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E6"
                  value={data.E6}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th scope="row">Gap (pulse)</th>
              <td>
                <input
                  type="text"
                  id="A7"
                  value={data.A7}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B7"
                  value={data.B7}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C7"
                  value={data.C7}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D7"
                  value={data.D7}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E7"
                  value={data.E7}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th scope="row">Gap (ms)</th>
              <td>
                <input
                  type="text"
                  id="A8"
                  value={data.A8}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B8"
                  value={data.B8}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C8"
                  value={data.C8}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D8"
                  value={data.D8}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E8"
                  value={data.E8}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th scope="row">Exposure (mR)</th>
              <td>
                <input
                  type="text"
                  id="A9"
                  value={data.A9}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="B9"
                  value={data.B9}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="C9"
                  value={data.C9}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="D9"
                  value={data.D9}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="E9"
                  value={data.E9}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <button
              type="button"
              className="btn btn-primary"
              onClick={calculateLineality}
            >
              Calculate
            </button>
            {Lineality !== "" && <p>Lineality (X) = {Lineality.toFixed(2)} </p>}
            <div>
              <p id="equation"></p>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntraLin;
