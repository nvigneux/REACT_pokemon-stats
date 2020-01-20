import React from "react"

import { IMG_FORMAT, IMG_URL } from "../../constants/constant"

const OptionPokemon = ({ id, name }) => {
  return (
    <div className="flex items-center">
      <img
        className="h-8 mr-2"
        src={IMG_URL + id + IMG_FORMAT}
        alt={`${name}`}
      />
      <div className="text-base text-gray-900 font-medium">{name}</div>
    </div>
  )
}

export default OptionPokemon
