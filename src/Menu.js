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
