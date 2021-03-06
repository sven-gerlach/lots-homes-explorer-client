// import libraries and frameworks
import React from "react";


/**
 * High-level description comprised of number of beds, baths and size for homes and acres and sqft for lots.
 * @param assetType
 * @param asset
 * @return {JSX.Element}
 * @constructor
 */
export default function AssetStats({assetType, asset}) {
  const getAssetStats = () => {
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        const beds = `${asset.numBeds} beds`
        const baths = `${asset.numBaths} baths`
        const size = `${asset.sqft.toLocaleString()} sqft`
        return `${beds} - ${baths} - ${size}`
      case "lots":
        const acres = asset.acres
        const sqft = Math.round(acres * 43560).toLocaleString()
        return `${acres} acres - ${sqft} sqft`
    }
  }

  return (
    <>
      <p className={"asset-stats"}>
        {getAssetStats()}
      </p>
    </>
  )
}
