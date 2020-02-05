import React from "react"
// import PropTypes from "prop-types"

import { IMG_URL, IMG_FORMAT } from "../constants/constant"
import { Pokedex } from "../types/pokedex"

import Picto from "./Picto"

const PokedexCard = ({ pokedex }) => (
  <div className="bg-gray-100 rounded p-2 m-1">
    <div className="flex-auto flex flex-row items-baseline justify-center leading-none">
      <span className="text-xs text-gray-500 font-medium pr-1">CP</span>
      <span className="text-lg text-gray-700 font-medium">
        {pokedex.stats.cp}
      </span>
    </div>
    <div className="flex-auto flex flex-col items-center">
      <img
        className="center justify-center w-16"
        src={IMG_URL + pokedex.pokemon.id_base_pokemon + IMG_FORMAT}
        alt={pokedex.pokemon.name}
      />
    </div>
    <div className="flex-auto flex flex-col items-center">
      <div className="text-sm text-gray-700 font-medium leading-none pb-1">
        {`${pokedex.pokemon.name} `}
      </div>
      <div className="w-full flex row flex-auto justify-around items-center">
        <div className="flex row">
          {pokedex.pokemon.type.map((type, index) => (
            <div
              key={type.id}
              className={`${
                type.name
              } w-4 h-4 rounded-full shadow-outline-type flex items-center justify-center ${
                index <= 0 ? "mr-1" : "-ml-1"
              }`}
            >
              <Picto icon={type.name} className="w-2 h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

PokedexCard.propTypes = {
  pokedex: Pokedex.isRequired,
}

export default PokedexCard
