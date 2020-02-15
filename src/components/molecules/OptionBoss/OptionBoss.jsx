import React from "react"
// import PropTypes from "prop-types"

import { IMG_FORMAT, IMG_URL } from "../../../constants/constant"

const OptionBoss = ({
  pokemon: { name, id_base_pokemon: idBasePokemon },
  stats,
}) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <img
        className="h-8 mr-2"
        src={IMG_URL + idBasePokemon + IMG_FORMAT}
        alt={`${name}`}
        loading="lazy"
      />
      <div className="text-base text-gray-900 font-medium capitalize">
        {name}
      </div>
    </div>
    <div className="flex flex-row items-baseline justify-center leading-none">
      <span className="text-xs text-gray-500 font-medium pr-1">CP</span>
      <span className="text-normal text-gray-700 font-medium">{stats.cp}</span>
    </div>
  </div>
)

// Problem PropTypes & Suspense & React Select
OptionBoss.propTypes = {
  // name: PropTypes.string.isRequired,
  // id_base_pokemon: PropTypes.number.isRequired,
}

export default OptionBoss
