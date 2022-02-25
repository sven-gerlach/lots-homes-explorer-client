import React from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import './App.css';


/**
 * Main app that stores state and manages front-end routes
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<div><h1>Side bar</h1><Outlet /></div>}>
        <Route path={"homes"} element={<div><h1>Homes</h1><Outlet /></div>}>
          <Route path={""} element={<p>Home Modal</p>} />
        </Route>
        <Route path={"lots"} element={<div><h1>Lots</h1><Outlet /></div>}>
          <Route path={""} element={<p>Lot Modal</p>} />
        </Route>
        <Route path={"*"} element={<p>Oops...are you sure you are using the correct url?</p>} />
      </Route>
    </Routes>
  );
}
