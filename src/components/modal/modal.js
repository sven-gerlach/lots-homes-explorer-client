// import libraries and frameworks
import React, {useEffect} from "react";

// import components
import Asset from "../asset/asset";

// import styles
import "./modal.scss"


export default function Modal ({closeModal}) {
  return (
    <>
      <div className={"modal-content"}>
        <p className={"modal-header"}>Modal</p>
        <p className={"modal-sub-header"}>Compatible Lots / Homes</p>
        <div className={"assets-container"}>
          <p>Asset</p>
          <p>Asset</p>
          <p>Asset</p>
        </div>
        <div
          className={"close-icon-container"}
          onClick={closeModal}
        >&nbsp;</div>
      </div>
    </>
  )
}
