import React, {useEffect, useState} from "react";
import Modal from "../modal/modal";
import {useSearchParams} from "react-router-dom";


/**
 *
 * @param WrappedComponent
 * @param assetType
 * @param getIdKey
 * @param favourites
 * @param setFavourites
 * @param compatibleLots
 * @param compatibleHomes
 * @param homes
 * @param lots
 * @return {function(*)}
 */
export default function withModal(WrappedComponent, assetType, getIdKey, favourites, setFavourites, compatibleLots, compatibleHomes, lots, homes) {
  return ({asset}) => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    /**
     * If the url query string contains the assetType (homes | lots) open the modal
     */
    useEffect(() => {
      const searchParamAssetValue = searchParams.get(assetType)
      // Note: disregard linter warning as the boolean will only work if type coercion is allowed
      // [string] == [number]
      // eslint-disable-next-line
      if (asset[getIdKey(assetType)] == searchParamAssetValue) {
        setIsModalActive(true)
      }
      // eslint-disable-next-line
    }, [searchParams])

    /**
     * Pass this function to the modal to close the modal when it is open
     */
    const closeModal = () => {
      setIsModalActive(false)
      setSearchParams("")
    }

    /**
     * create a query string and inject it into the url
     * @param e
     */
    const handleAssetClick = (e) => {
      const assetIdKey = getIdKey(assetType)
      setSearchParams({ [assetType]: asset[assetIdKey] })
    }

    return (
      <>
        <WrappedComponent
          assetType={assetType}
          asset={asset}
          favourites={favourites}
          setFavourites={setFavourites}
          getIdKey={getIdKey}
          compatibleLots={compatibleLots}
          compatibleHomes={compatibleHomes}
          homes={homes}
          lots={lots}
          handleAssetClick={handleAssetClick}
          isClickable={true}
        />
        {isModalActive &&(
          <section className={"modal-container"}>
            <Modal
              closeModal={closeModal}
              modalHeader={assetType === "homes" ? asset.name : asset.address}
              modalSubHeader={assetType === "homes" ? "Lots" : "Homes"}
              asset={asset}
              assetType={assetType}
              favourites={favourites}
              setFavourites={setFavourites}
              getIdKey={getIdKey}
              compatibleLots={compatibleLots}
              compatibleHomes={compatibleHomes}
              homes={homes}
              lots={lots}
            />
          </section>
        )}
      </>
    )
  }
}
