// Import libraries and frameworks
import React, {useEffect, useState} from "react";
import {useLocation } from "react-router-dom";

// import components
import Asset from "../asset/asset";

// import styling
import API from "../../services/api";


/**
 * This component checks the route path [/homes | /lots] and returns a button and a flexbox container containing all
 * available assets in the inventory and associated with that route path. It also returns a button that, if pushed,
 * limits the view to display only those assets stored in favourites.
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export default function ShowInventory(props) {
  const [assetType, setAssetType] = useState(null)
  const [assets, setAssets] = useState(null)
  const [favourites, setFavourites] = useState({})
  const location = useLocation()

  /**
   * get the asset type currently displayed from the browser url
   */
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
      <div className={"assets-container"}>
        <button type={"button"} >Show Saved {assetType && getCapitalisedAssetType()}</button>
        {assets?.map((asset, key) => {
          return (
            <Asset
              key={key}
              assetType={assetType}
              asset={asset}
              favourites={favourites}
            />)
        })
        }
      </div>
    </>
  )
}
