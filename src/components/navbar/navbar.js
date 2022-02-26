// import libraries and frameworks
import React from "react";

// import components
import CustomLink from "../links/customLinks";

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
        <CustomLink to={"/homes"}>Home Plans</CustomLink>
        <CustomLink to={"/lots"}>Lots</CustomLink>
      </nav>
    </>
  )
}
