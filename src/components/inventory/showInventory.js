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
  const [homes, setHomes] = useState(null)
  const [lots, setLots] = useState(null)
  const [compatibilityCombinations, setCompatibilityCombinations] = useState(null)
  const [compatibleHomesHash, setCompatibleHomesHash] = useState({})
  const [compatibleLotsHash, setCompatibleLotsHash] = useState(null)
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
   * Make API call to retrieve all available assets and compatibility data
   */
  useEffect(() => {
    // There is no need for a default case
    // eslint-disable-next-line
    API.getHomePlans()
      // simulate delayed API response
      .then(res => setTimeout(() => setHomes(res), 1000))
      .catch(console.error)
    API.getLots()
      // simulate delayed API response
      .then(res => setTimeout(() => setLots(res), 1000))
      .catch(console.error)
    API.getCombinations()
      .then(res => setTimeout(() => setCompatibilityCombinations(res), 1000))
      .catch(console.error)

    // eslint-disable-next-line
  }, [assetType])


  /**
   * Asymptotically, it is conceivable that with n homes and k lots there could be n x k combinations. Whilst the
   * sample data set is small, if k and n are in the many hundreds or few thousands, the combinations could conceivably
   * run into the millions. Filtering an unordered data set would then have linear time complexity. Doing that every
   * time a user views assets and their compatible matches would be expensive. Whilst in this distribute scenario it is
   * perhaps less important but this would become very important if we created an API end-point for combinations of a
   * specific asset. Hence, I am iterating over the array to store the matches for each home and lot ID in a hash table
   * as that will allow for constant time lookup of all pairings.
   */
  useEffect(() => {
    setCompatibleHomesHash(getHashTable("homes"))
    setCompatibleLotsHash(getHashTable("lots"))
    // eslint-disable-next-line
  }, [compatibilityCombinations])

  /**
   * Return hash table for either homes or lots
   * @param asset
   * @return {{}}
   */
  const getHashTable = (asset) => {
    let hashTable = {}
    compatibilityCombinations?.forEach(combination => {
      const key = asset === "homes" ? combination.homePlanId : combination.lotId
      const value = asset === "homes" ? combination.lotId : combination.homePlanId

      if (key in hashTable) {
        hashTable = {...hashTable, [key]: [...hashTable[key], value]}
      }
      else {
        hashTable = {...hashTable, [key]: [value]}
      }
    })
    return hashTable
  }

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
    const assets = assetType === "homes" ? homes : lots
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
          })}
        </div>
      </section>
    </>
  )
}
