// Import libraries and frameworks
import React, {useEffect, useState} from "react";
import {useLocation } from "react-router-dom";

// import components
import Asset from "../asset/asset";

// import styles
import "./showInventory.scss"

// import utils
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
  const [favourites, setFavourites] = useState({homes: {}, lots: {}})
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
          // simulate delayed API response
          .then(res => setTimeout(() => setAssets(res), 1000))
          .catch(console.error)
        break
      case "lots":
        API.getLots()
          // simulate delayed API response
          .then(res => setTimeout(() => setAssets(res), 1000))
          .catch(console.error)
    }

    // eslint-disable-next-line
  }, [assetType])

  const getCapitalisedAssetType = () => {
    return assetType.charAt(0).toUpperCase() + assetType.substring(1)
  }

  return (
    <>
      <section className={"main-section"}>
        <div className={"assets-container"}>
          <div className={"button-container"}>
            <button type={"button"} >Show Saved {assetType && getCapitalisedAssetType()}</button>
          </div>
          <div className={"break-line"}></div>
          {assets?.map((asset, key) => {
            return (
              <Asset
                key={key}
                assetType={assetType}
                asset={asset}
                favourites={favourites}
                setFavourites={setFavourites}
              />)
          })
          }
        </div>
      </section>
    </>
  )
}
