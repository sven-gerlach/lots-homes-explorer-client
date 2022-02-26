// import libraries and frameworks
import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

// import styles
import "./customLinks.scss"


export default function CustomLink({children, to, ...props}) {
  // resolve current path with linked path and check if paths match; match resolves to an object or null if no match
  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link
      className={match ? "active-link" : ""}
      to={to}
      {...props}
    >
      {children}
    </Link>
  )
}
