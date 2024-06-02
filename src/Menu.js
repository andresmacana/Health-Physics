import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
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
          <Link className="nav-link" to="/HVL">
            HVL - CDA
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Intra">
            Intra Calculations
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/IntraA">
            Intra Calculations 2
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/IntraB">
            x-ray tube Calculations
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/shieldingXray">
            Structural shielding design
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
  );
}

export default Menu;
