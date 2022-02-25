import React from "react";


/**
 * Default component for any unmatched routes.
 * Note, this route has no effect as long as the user is being re-directed automatically to /homes (see useEffect in
 * App)
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export default function NoMatch(props) {
  return (
    <>
      <p>Oops...are you sure you are using the correct url?</p>
    </>
  )
}
