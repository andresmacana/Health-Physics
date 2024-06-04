import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const dataPrimary = {
  lead_alpha: [5.369, 3.067, 2.5, 2.219, 1.757, 2.283, 2.389, 2.346, 2.264],
  lead_beta: [23.49, 18.83, 15.28, 7.923, 5.177, 10.74, 14.26, 15.9, 13.08],
  lead_gamma: [
    0.5881, 0.7726, 0.7557, 0.5386, 0.3156, 0.637, 0.5948, 0.4982, 0.56,
  ],
  concrete_alpha: [
    0.05087, 0.04228, 0.03925, 0.03502, 0.03243, 0.03622, 0.03717, 0.03626,
    0.03552,
  ],
  concrete_beta: [
    0.1696, 0.1137, 0.08567, 0.07113, 0.08599, 0.07766, 0.1087, 0.1429, 0.1177,
  ],
  concrete_gamma: [
    0.3847, 0.469, 0.4273, 0.6974, 1.467, 0.5404, 0.4879, 0.4932, 0.6007,
  ],
  gypsum_alpha: [
    0.02302, 0.01633, 0.01466, 0.01192, 0.0103, 0.01286, 0.01409, 0.0142,
    0.01278,
  ],
  gypsum_beta: [
    0.07163, 0.05039, 0.04171, 0.02863, 0.02198, 0.03505, 0.04814, 0.05781,
    0.04848,
  ],
  gypsum_gamma: [
    0.7299, 0.8585, 0.8939, 0.9684, 1.013, 0.9356, 0.8419, 0.7445, 0.8609,
  ],
};

const dataSecondary = {
  lead_alpha: [5.369, 2.507, 2.233, 2.354, 2.288, 2.298, 2.256],
  lead_beta: [23.49, 15.33, 7.888, 14.94, 9.848, 17.38, 13.8],
  lead_gamma: [0.5883, 0.9124, 0.7295, 0.7481, 1.054, 0.6193, 0.8837],
  concrete_alpha: [0.0509, 0.0395, 0.0351, 0.0371, 0.0364, 0.0361, 0.0356],
  concrete_beta: [0.1697, 0.0844, 0.066, 0.1067, 0.0659, 0.1433, 0.1079],
  concrete_gamma: [0.3849, 0.5191, 0.7832, 0.5733, 0.7543, 0.56, 0.7705],
  gypsum_alpha: [0.023, 0.0147, 0.012, 0.0139, 0.013, 0.0138, 0.0127],
  gypsum_beta: [0.0716, 0.04, 0.0267, 0.0464, 0.0297, 0.057, 0.0445],
  gypsum_gamma: [0.73, 0.9752, 1.079, 0.9185, 1.195, 0.7937, 1.049],
};

const indicesPrimary = [
  "70",
  "90",
  "100",
  "125",
  "150",
  "Chest room",
  "Cardiac Angiography",
  "Rad Room (all barriers)",
  "Rad Room (chest bucky)",
];
const indicesSecondary = [
  "70",
  "100",
  "125",
  "Cardiac Angiography",
  "Chest room",
  "Rad Room (all barriers)",
  "Rad Room (chest bucky)",
];

const xpre = {
  lead_wall: 0.85,
  lead_cross_table: 0.3,
  wall_concrete: 72,
  cross_table_concrete: 30,
  wall_steel: 7,
  cross_table_steel: 2,
};

function AppShield() {
  const [Dp, setDp] = useState("");
  const [d, setD] = useState("");
  const [pat, setPat] = useState("");
  const [barrierType, setBarrierType] = useState("primary");
  const [materialType, setMaterialType] = useState("lead");

  const [index, setIndex] = useState("");
  const [constant, setConstant] = useState("lead_wall");

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const data = barrierType === "primary" ? dataPrimary : dataSecondary;
    const indices =
      barrierType === "primary" ? indicesPrimary : indicesSecondary;

    if (!indices.includes(index)) {
      alert("Invalid index selected!");
      return;
    }

    const idx = indices.indexOf(index);
    const material = `${materialType}_`;

    const alpha = data[`${material}alpha`][idx];
    const beta = data[`${material}beta`][idx];
    const gamma = data[`${material}gamma`][idx];

    /* const lead_alpha = data.lead_alpha[idx];
    const lead_beta = data.lead_beta[idx];
    const lead_gamma = data.lead_gamma[idx]; */

    const K = (Dp * pat) / d ** 2;
    const B = 0.02 / K;

    const xpri =
      (1 / (alpha * gamma)) *
      Math.log(((1 / B) ** gamma + beta / alpha) / (1 + beta / alpha));
    const xpriWithConstant = Math.round((xpri + xpre[constant]) * 10) / 10;
    const xpriMinusxpre = parseFloat(xpri - xpre[constant]).toFixed(2);

    /* const xpri =
      (1 / lead_alpha) *
      lead_gamma *
      Math.log(
        (1 / B) ** lead_gamma +
          lead_beta / lead_alpha / (1 + lead_beta / lead_alpha)
      ); */

    setResult({
      Kerma: parseFloat(K.toFixed(2)),
      Transmission: parseFloat(B.toFixed(4)),
      xpri: parseFloat(xpri.toFixed(2)), // rounding to 1 decimal place
      xpriWithConstant: xpriWithConstant,
      xpriMinusxpre: xpriMinusxpre,
    });
  };

  return (
    <Container>
      <h1 className="my-4">
        Structural Shielding Design for Medical X-Ray Imaging Facilities
      </h1>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Dose/patient
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={Dp}
              onChange={(e) => setDp(e.target.value)}
              placeholder="Enter Dp"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            distance
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              placeholder="Enter d"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Patients
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              placeholder="Enter Pat"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Barrier Type
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={barrierType}
              onChange={(e) => setBarrierType(e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Material Type
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="lead">Lead</option>
              <option value="concrete">Concrete</option>
              <option value="gypsum">Gypsum</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Index
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            >
              <option value="">Select an Index</option>
              {(barrierType === "primary"
                ? indicesPrimary
                : indicesSecondary
              ).map((idx) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Constant
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={constant}
              onChange={(e) => setConstant(e.target.value)}
            >
              {Object.keys(xpre).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Button variant="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </Form>

      {result && (
        <div className="mt-4">
          <h2>Results</h2>
          <p>
            <strong>Kerma K mGy/week:</strong> {result.Kerma}
          </p>
          <p>
            <strong>Transmission B:</strong> {result.Transmission}
          </p>
          <p>
            <strong>x_barrier:</strong> {result.xpri}
          </p>
          <p>
            <strong>x_barrier + x_pre:</strong> {result.xpriWithConstant}
          </p>
          <p>
            <strong>x_barrier - x_pre:</strong> {result.xpriMinusxpre}
          </p>
        </div>
      )}
    </Container>
  );
}

export default AppShield;
