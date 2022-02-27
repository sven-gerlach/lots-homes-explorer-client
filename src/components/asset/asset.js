// import libraries and frameworks
import React, {useEffect, useState} from "react";

// import components
import AssetStats from "./assetStats/assetStats";

// import styles
import "./asset.scss"
import blackHeart from "../../assets/heart-black.png"
import redHeart from "../../assets/heart-red.png"


/**
 * Display summarised representation of the asset, including an image, name, description, size, tags.
 * @param assetType
 * @param asset
 * @param favourites
 * @param setFavourites
 * @param getIdKey
 * @param compatibleLots
 * @param compatibleHomes
 * @param homes
 * @param lots
 * @param handleAssetClick
 * @param isClickable
 * @return {JSX.Element}
 * @constructor
 */
export default function Asset(
  {
    assetType,
    asset,
    favourites,
    setFavourites,
    getIdKey,
    compatibleLots,
    compatibleHomes,
    homes,
    lots,
    handleAssetClick=null,
    isClickable=false
  }) {
  const [imageSource, setImageSource] = useState("")

  /**
   * Every time the favourites or the asset state changes, update the image source used for the favourites / heart
   * emoticon
   */
  useEffect(() => {
    setImageSource(getImgSrc())
    // eslint-disable-next-line
  }, [favourites, asset])

  /**
   * Returns the string for the alt attribute associated with the asset img
   * @return {String}
   */
  const getAltImgText = () => {
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        return `${asset.sqft}sqft property with ${asset.sumBeds} bed and ${asset.sumBaths}`
      case "lots":
        return `${asset.acres} acres of land`
    }
  }

  /**
   * Return the image src based in the current asset's id key and whether the current asset is a favourite item
   * @return {*}
   */
  const getImgSrc = () => {
    const idKey = getIdKey()
    return favourites[assetType][asset[idKey]] === true
      ? redHeart
      : blackHeart
  }

  /**
   * Updated state in the favourites object to either true or false.
   * @param e
   */
  const handleLike = (e) => {
    e.stopPropagation()
    console.log(e)
    const idKey = getIdKey()
    // current asset id can be accessed with the correct asset id key
    const currentAssetId = asset[idKey]
    // extract the nested object from the favourites object that is associated with the current asset's class (homes or
    // lots)
    const currentAssetClassFavourites = favourites[assetType]
    setFavourites(prevState => {
      if (currentAssetClassFavourites.hasOwnProperty(currentAssetId)) {
        const updatedCurrentAssetClassFavourites = {
          ...currentAssetClassFavourites,
          [currentAssetId]: !currentAssetClassFavourites[currentAssetId]
        }
        return {...prevState, [assetType]: updatedCurrentAssetClassFavourites}
      }
      else {
        return {...prevState, [assetType]: {...currentAssetClassFavourites, [currentAssetId]: true}}
      }
    })
  }

  return (
    <>
      <article
        className={`asset-container ${isClickable ? "clickable-asset-container" : ""}`}
        onClick={handleAssetClick}
      >
        <section className={"image-container"}>
          <img src={asset.image} alt={getAltImgText()} />
          <div
            className={"favourite-icon-container"}
            onClick={handleLike}
          >
            <img
              src={imageSource} alt={"heart"}
            />
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
    </>
  )
}
