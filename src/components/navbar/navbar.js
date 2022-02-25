// import libraries and frameworks
import React from "react";
import { Link } from "react-router-dom";

// import styles
import "./navbar.scss"


/**
 * Navbar with clickable links to homes and lots
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export default function Navbar(props) {
  return (
    <>
      <nav className={"navbar-container"}>
        <Link to={"/homes"}>Home Plans</Link>
        <Link to={"lots"}>Lots</Link>
      </nav>
    </>
  )
}
