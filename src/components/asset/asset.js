// import libraries and frameworks
import React from "react";

// import components
import AssetStats from "./assetStats/assetStats";

// import styles
import blackHeart from "../../assets/heart-black.png"
import redHeart from "../../assets/heart-red.png"


/**
 * Display summarised representation of the asset, including an image, name, description, size, tags.
 * @param assetType
 * @param asset
 * @param favourites
 * @constructor
 */
export default function Asset({assetType, asset, favourites}) {
  const getAltImgText = () => {
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        return `${asset.sqft}sqft property with ${asset.sumBeds} bed and ${asset.sumBaths}`
      case "lots":
        return `${asset.acres} acres of land`
    }
  }

  const getImgSrc = () => {
    let idKey = ""
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        idKey = "homePlanId"
        break
      case "lots":
        idKey = "lotId"
    }

    return asset[idKey] in favourites
      ? redHeart
      : blackHeart
  }

  return (
    <article className={"asset-container"}>
      <section className={"image-container"}>
        <img src={asset.image} alt={getAltImgText()} />
        <div className={"favourite-icon-container"}>
          <img src={getImgSrc()} alt={"a heart"} />
        </div>
      </section>
      <section className={"asset-description-container"}>
        <p className={"asset-title"}>{asset.name || asset.address}</p>
        <AssetStats assetType={assetType} asset={asset} />
        <div className={"asset-tags"}>
          {asset?.tags?.map((tag, key) => {
            return <p key={key}>{tag}</p>
          })}
        </div>
        <p className={"asset-description"}>{asset.description}</p>
      </section>
    </article>
  )
}
