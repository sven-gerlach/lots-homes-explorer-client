// import libraries and frameworks
import React, {useEffect, useState} from "react";

// import components
import Asset from "../asset/asset";

// import styles
import "./modal.scss"


/**
 * Modal displays all compatible assets
 * @param closeModal
 * @param modalHeader
 * @param modalSubHeader
 * @param assetType
 * @param asset
 * @param favourites
 * @param setFavourites
 * @param getIdKey
 * @param compatibleLots
 * @param compatibleHomes
 * @param homes
 * @param lots
 * @return {JSX.Element}
 * @constructor
 */
export default function Modal (
  {
    closeModal,
    modalHeader,
    modalSubHeader,
    assetType,
    asset,
    favourites,
    setFavourites,
    getIdKey,
    compatibleLots,
    compatibleHomes,
    homes,
    lots,
  }) {

  const [compatibleAssets, setCompatibleAssets] = useState()

  /**
   * Filter assets for compatible assets and store them in state such that the render function can then iterate over
   * them and create the asset representation
   */
  useEffect(() => {
    // eslint-disable-next-line
    switch (assetType) {
      case "homes":
        if (compatibleLots) {
          const idKey = "lotId"
          const currentHomeId = asset[getIdKey()]
          // not ideal since this is a linear time operation
          const newState = lots.filter(lot => compatibleLots[currentHomeId].includes(lot[idKey]))
          setCompatibleAssets(newState)
        }
        break
      case "lots":
        if (compatibleHomes) {
          const idKey = "homePlanId"
          const currentLotId = asset[getIdKey()]
          // not ideal since this is a linear time operation
          const newState = homes.filter(home => compatibleHomes[currentLotId].includes(home[idKey]))
          setCompatibleAssets(newState)
        }
    }
    // eslint-disable-next-line
  }, [compatibleLots, compatibleHomes, assetType, homes, lots])

  return (
    <>
      <div className={"modal-content"}>
        <header className={"modal-header-container"}>
          <p className={"modal-header"}>{modalHeader}</p>
          <div
            className={"close-icon-container"}
            onClick={closeModal}
          >
            &nbsp;
          </div>
        </header>
        <p className={"modal-sub-header"}>Compatible {modalSubHeader}</p>
        <div className={"assets-container"}>
          {compatibleAssets && (
            compatibleAssets.map((asset, key) => (
              <Asset
                key={key}
                assetType={assetType}
                asset={asset}
                favourites={favourites}
                setFavourites={setFavourites}
                getIdKey={getIdKey}
                compatibleLots={compatibleLots}
                compatibleHomes={compatibleHomes}
                homes={homes}
                lots={lots}
              />))
          )}
        </div>
      </div>
    </>
  )
}
