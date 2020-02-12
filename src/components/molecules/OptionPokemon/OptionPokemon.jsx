import React from "react"
// import PropTypes from "prop-types"

import { IMG_FORMAT, IMG_URL } from "../../../constants/constant"

const OptionPokemon = ({ name, id_base_pokemon: idBasePokemon }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <img
        className="h-8 mr-2"
        src={IMG_URL + idBasePokemon + IMG_FORMAT}
        alt={`${name}`}
      />
      <div className="text-base text-gray-900 font-medium">{name}</div>
    </div>
    <span className="text-base text-gray-600 font-light">{`#${idBasePokemon}`}</span>
  </div>
)

// Problem PropTypes & Suspense & React Select
OptionPokemon.propTypes = {
  // name: PropTypes.string.isRequired,
  // id_base_pokemon: PropTypes.number.isRequired,
}

export default OptionPokemon
