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
  const [isFavouritesDisplayed, setIsFavouritesDisplayed] = useState(false)
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
   * If a user views all saved assets and switches to another asset class, the new view should show all assets and
   * not just saved ones. This function resets isFavouritesDisplayed boolean to false.
   */
  useEffect(() => {
    setIsFavouritesDisplayed(false)
  }, [assetType])

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

  /**
   * Since the idKey inside the API response objects is different between homes and lots, this function returns the
   * correct key needed to access the asset id
   * @return {string}
   */
  const getIdKey = () => {
    let idKey = ""
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        idKey = "homePlanId"
        break
      case "lots":
        idKey = "lotId"
    }
    return idKey
  }

  /**
   * O(n) time | O(n) space where n = total number of assets returned by the API The filter method iterates over n
   * elements but retrieving the asset id and checking if that id is in the hash-table are constant time operations.
   * The current linear time complexity could be improved to O(log n) if we employed a binary search or a quick search
   * but that would require a sorted array by IDs. Whilst both search methods are done in place the space complexity
   * for a filter would not change as we would still need to create a new sub-array.
   * I suspect that the size of n is unlikely to reach a level at Atmos where the additional overhead of ensuring order
   * is a worthwhile trade-off. Hence, I will use the linear implementation.
   * @return {unknown}
   */
  const getRelevantAssets = () => {
    if (isFavouritesDisplayed) {
      return assets?.filter(asset => {
        const assetId = asset[getIdKey()]
        const assetTypeFavourites = favourites[assetType]
        // assetId must be a key in favourites[assetType] and the value of that key must evaluate to true
        return assetTypeFavourites[assetId]
      })
    }
    return assets
  }

  const handleShowFavourites = (e) => {
    setIsFavouritesDisplayed(prevState => !prevState)
  }

  const getCapitalisedAssetType = () => {
    return assetType.charAt(0).toUpperCase() + assetType.substring(1)
  }

  return (
    <>
      <section className={"main-section"}>
        <div className={"button-container"}>
          <button
            type={"button"}
            onClick={handleShowFavourites}
          >
            Show {isFavouritesDisplayed ? "All" : "Saved"} {assetType && getCapitalisedAssetType()}
          </button>
        </div>
        <div className={"assets-container"}>
          {getRelevantAssets()?.map((asset, key) => {
            return (
              <Asset
                key={key}
                assetType={assetType}
                asset={asset}
                favourites={favourites}
                setFavourites={setFavourites}
                getIdKey={getIdKey}
              />)
          })
          }
        </div>
      </section>
    </>
  )
}
