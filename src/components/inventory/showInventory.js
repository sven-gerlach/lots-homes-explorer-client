import React from "react";
import {useLocation } from "react-router-dom";


export default function ShowInventory(props) {
  // retrieve asset type (homes, or lots) from the url
  const location = useLocation()
  const assetType = location.pathname.substring(1)

  const getCapitalisedAssetType = () => {
    return assetType.charAt(0).toUpperCase() + assetType.substring(1)
  }

  return (
    <>
      <button type={"button"} >Show Saved {getCapitalisedAssetType()}</button>
    </>
  )
}
