import React, {useEffect, useState} from "react";
import {useLocation } from "react-router-dom";
import API from "../../services/api";


export default function ShowInventory(props) {
  const [assetType, setAssetType] = useState(null)
  const [assets, setAssets] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // retrieve asset type (homes, or lots) from the url
    const asset = location.pathname.substring(1)
    setAssetType(asset)
    // eslint-disable-next-line
  }, [location])


  /**
   * Make API call to retrieve all available assets
   */
  useEffect(() => {
    // There is no need for a default case
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        API.getHomePlans()
          .then(res => setAssets(res))
          .catch(console.error)
        break
      case "lots":
        API.getLots()
          .then(res => setAssets(res))
          .catch(console.error)
    }

    // eslint-disable-next-line
  }, [assetType])

  const getCapitalisedAssetType = () => {
    return assetType.charAt(0).toUpperCase() + assetType.substring(1)
  }

  return (
    <>
      <button type={"button"} >Show Saved {assetType && getCapitalisedAssetType()}</button>
    </>
  )
}
