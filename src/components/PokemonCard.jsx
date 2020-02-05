import React from "react"
// import PropTypes from "prop-types"

import { IMG_URL, IMG_FORMAT } from "../constants/constant"
import { Pokemon } from "../types/pokemon"

import Picto from "./Picto"

const PokemonCard = ({ pokemon }) => (
  <div className="bg-gray-100 rounded p-2 m-1">
    <div className="flex-auto flex flex-row items-baseline justify-center leading-none">
      <span className="text-xs text-gray-500 font-medium pr-1">CP</span>
      <span className="text-lg text-gray-700 font-medium">
        {pokemon.stats.cp}
      </span>
    </div>
    <div className="flex-auto flex flex-col items-center">
      <img
        className="center justify-center w-16"
        src={IMG_URL + pokemon.id + IMG_FORMAT}
        alt={pokemon.name}
      />
    </div>
    <div className="flex-auto flex flex-col items-center">
      <div className="text-sm text-gray-700 font-medium leading-none pb-1">
        {`${pokemon.name} `}
      </div>
      <div className="w-full flex row flex-auto justify-around items-center">
        <div className="flex row">
          <div className="fighting w-4 h-4 mr-1 rounded-full shadow-outline-type flex items-center justify-center">
            <Picto icon="fighting" className="w-2 h-2" />
          </div>
          <div className="bug w-4 h-4 -ml-1 rounded-full shadow-outline-type flex items-center justify-center">
            <Picto icon="bug" className="w-2 h-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

PokemonCard.propTypes = {
  pokemon: Pokemon.isRequired,
}

export default PokemonCard
