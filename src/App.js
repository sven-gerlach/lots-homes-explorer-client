// import frameworks and libraries
import React from "react";
import {Routes, Route} from "react-router-dom";

// import components
import Navbar from "./views/navbar/navbar";
import NoMatch from "./views/noMatch/noMatch";
import ShowInventory from "./views/inventory/showInventory"

// import styles
import './App.scss';


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
        {/* use the path to fetch data from the API */}
        <Route path={"/:assetType"} element={<ShowInventory />} />
        <Route path={"*"} element={<NoMatch />} />
      </Routes>
    </>
  );
}
