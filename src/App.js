// import frameworks and libraries
import React from "react";
import {Routes, Route, Outlet} from "react-router-dom";

// import components
import Navbar from "./components/navbar/navbar";
import Homes from "./components/homes/homes";

// import styles
import './App.css';


/**
 * Main app that stores state and manages front-end routes
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"*"} element={<Homes />}>
          <Route path={"*"} element={<p>Home Modal</p>} />
        </Route>
        <Route path={"lots"} element={<div><h1>Lots</h1><Outlet /></div>}>
          <Route path={""} element={<p>Lot Modal</p>} />
        </Route>
        <Route path={"*"} element={<p>Oops...are you sure you are using the correct url?</p>} />
      </Routes>
    </>
  );
}
