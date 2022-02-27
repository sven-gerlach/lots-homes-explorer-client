// import libraries and frameworks
import React from "react";

// import components
import Asset from "../asset/asset";

// import styles
import "./modal.scss"


/**
 * Modal displays all compatible assets
 * @param closeModal
 * @param modalHeader
 * @param modalSubHeader
 * @param assetType
 * @param asset
 * @param favourites
 * @param setFavourites
 * @param getIdKey
 * @return {JSX.Element}
 * @constructor
 */
export default function Modal (
  {
    closeModal,
    modalHeader,
    modalSubHeader,
    assetType,
    asset,
    favourites,
    setFavourites,
    getIdKey
  }) {


  return (
    <>
      <div className={"modal-content"}>
        <p className={"modal-header"}>{modalHeader}</p>
        <p className={"modal-sub-header"}>Compatible {modalSubHeader}</p>
        <div className={"assets-container"}>
          <p>Assets</p>
        </div>
        <div
          className={"close-icon-container"}
          onClick={closeModal}
        >&nbsp;</div>
      </div>
    </>
  )
}
