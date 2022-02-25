import React from "react";
import {Outlet} from "react-router-dom";


export default function Homes(props) {
  return (
    <section className={"main-section"} >
      <h1>Homes</h1>
      <Outlet />
    </section>
  )
}
