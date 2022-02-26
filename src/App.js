// import frameworks and libraries
import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";

// import components
import Navbar from "./components/navbar/navbar";
import NoMatch from "./components/noMatch/noMatch";
import ShowInventory from "./components/inventory/showInventory"
import Modal from "./components/modal/modal";

// import styles
import './App.scss';


/**
 * Main app that stores state and manages front-end routes
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  // due to the absence of a landing page, redirect user to the /homes route when user lands on root path
  const navigate = useNavigate()
  // redirect as a side effect after the first render only
  useEffect(() => {
    navigate("/homes")
    // disabling next line because this function is supposed to run only once after the first rendering
    // eslint-disable-next-line
  }, [])

  return (

    <>
      <Navbar />
      <Routes>
        {/* use the path to fetch data from the API */}
        <Route path={"/:assetType"} element={<ShowInventory />} />
        {/*<Route path={"/homes"} element={<Modal />} />*/}
        {/* In the absence of a landing page, this catch-all route is currently inactive and all unmatched routes
        are redirected to /homes */}
        <Route path={"*"} element={<NoMatch />} />
      </Routes>
    </>
  );
}
