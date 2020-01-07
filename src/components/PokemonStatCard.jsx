import React from "react"

import PropTypes from "prop-types"

import { IMG_URL, IMG_FORMAT } from "../constants/constant"
import { Pokemon } from "../types/pokemon"

const PokemonMove = ({ move }) => {
  return move ? (
    <div className="flex flex-row items-center justify-between text-left px-5 pt-2">
      <div className="flex flex-col">
        <span className="text-xs text-gray-800">{move.name}</span>
        <span className="text-xs italic text-gray-800">{move.type}</span>
      </div>
      <span className="text-sm text-gray-800">{move.power}</span>
    </div>
  ) : null
}

const PokemonsStatCard = ({ pokemon, click, theme }) => (
  <button
    type="button"
    key={pokemon.id}
    className={`max-w-xs flex flex-col items-center text-center rounded m-2 mb-4 py-2 bg-${theme}-300 hover:bg-${theme}-400 `}
    onClick={() => click(pokemon)}
  >
    <div className="flex-shrink-0">
      <img
        className="center justify-center w-16"
        src={IMG_URL + pokemon.id + IMG_FORMAT}
        alt={pokemon.name}
      />
    </div>
    <div className="flex-auto">
      <div className="flex flex-col pb-1">
        <h1 className="w-40 min-w-full text-base text-gray-900 font-medium">
          {`${pokemon.name} `}
          <span className="text-xs font-normal">{pokemon.stats.iv}%</span>
        </h1>
        <h2 className="text-xs text-gray-800 font-medium">{`CP :
        
        ${pokemon.stats.cp}`}</h2>
      </div>
      <ul className="list-none italic">
        <li className="text-xs text-gray-800">{`Attack : ${pokemon.stats.attack}`}</li>
        <li className="text-xs text-gray-800">{`Defense : ${pokemon.stats.defense}`}</li>
        <li className="text-xs text-gray-800">
          {`Stamina : ${pokemon.stats.stamina}
        `}
        </li>
      </ul>
      <PokemonMove move={pokemon.moves.quick} />
      <PokemonMove move={pokemon.moves.charged} />
    </div>
  </button>
)

PokemonsStatCard.propTypes = {
  pokemon: Pokemon.isRequired,
  click: PropTypes.func,
  theme: PropTypes.string,
}

PokemonsStatCard.defaultProps = {
  click: () => {},
  theme: "gray",
}

export default PokemonsStatCard
