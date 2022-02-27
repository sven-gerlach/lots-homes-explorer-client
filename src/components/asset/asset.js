// import libraries and frameworks
import React, {useEffect, useState} from "react";

// import components
import AssetStats from "./assetStats/assetStats";
import Modal from "../modal/modal";

// import styles
import "./asset.scss"
import blackHeart from "../../assets/heart-black.png"
import redHeart from "../../assets/heart-red.png"
import { useSearchParams } from "react-router-dom";


/**
 * Display summarised representation of the asset, including an image, name, description, size, tags.
 * @param assetType
 * @param asset
 * @param favourites
 * @param setFavourites
 * @param getIdKey
 * @constructor
 */
export default function Asset({assetType, asset, favourites, setFavourites, getIdKey}) {
  const [imageSource, setImageSource] = useState("")
  const [isModalActive, setIsModalActive] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  /**
   * Every time the favourites or the asset state changes, update the image source used for the favourites / heart
   * emoticon
   */
  useEffect(() => {
    setImageSource(getImgSrc())
    // eslint-disable-next-line
  }, [favourites, asset])

  /**
   * If the url query string contains the assetType (homes | lots) open the modal
   */
  useEffect(() => {
    const searchParamAssetValue = searchParams.get(assetType)
    // Note: disregard linter warning as the boolean will only work if type coercion is allowed
    // [string] == [number]
    if (asset[getIdKey()] == searchParamAssetValue) {
      changeModalState()
    }
  }, [searchParams])

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

  /**
   * Pass this function to the modal to close the modal when it is open
   */
  const changeModalState = () => {
    setIsModalActive(prevState => !prevState)
  }

  /**
   * create a query string and inject it into the url
   * @param e
   */
  const handleAssetClick = (e) => {
    const assetIdKey = getIdKey()
    setSearchParams({ [assetType]: asset[assetIdKey] })
  }

  return (
    <>
      <article
        className={"asset-container"}
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
      {isModalActive &&(
        <section className={"modal-container"}>
          <Modal
            closeModal={changeModalState}
          />
        </section>
      )}
    </>
  )
}
