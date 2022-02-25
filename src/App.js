// import frameworks and libraries
import React, {useEffect} from "react";
import {Routes, Route, Outlet, useNavigate} from "react-router-dom";

// import components
import Navbar from "./components/navbar/navbar";
import Homes from "./components/homes/homes";
import NoMatch from "./components/noMatch/noMatch";

// import styles
import './App.css';


/**
 * Main app that stores state and manages front-end routes
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  // due to the absence of a landing page, redirect user to the /homes route when user lands on root path
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/homes")
    // disabling next line because this function is supposed to run only once after the first rendering
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homes />}>
          <Route path={""} element={<p>Home Modal</p>} />
        </Route>
        <Route path={"/homes"} element={<Homes />}>
          <Route path={""} element={<p>Home Modal</p>} />
        </Route>
        <Route path={"lots"} element={<div><h1>Lots</h1><Outlet /></div>}>
          <Route path={""} element={<p>Lot Modal</p>} />
        </Route>
        <Route path={"*"} element={<NoMatch />} />
      </Routes>
    </>
  );
}
