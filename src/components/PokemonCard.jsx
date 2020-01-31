import React from "react"

import PropTypes from "prop-types"

import { IMG_URL, IMG_FORMAT } from "../constants/constant"
import { Pokemon } from "../types/pokemon"

import PictoType from "./PictoType"

const PokemonCard = ({ pokemon, click, theme }) => (
  <button
    type="button"
    key={pokemon.id}
    className={`max-w-xs flex flex-col items-center text-center rounded m-2 mb-4 py-2 bg-${theme}-300 hover:bg-${theme}-400 `}
    onClick={() => click(pokemon)}
  >
    <div className="text-xs text-gray-800 font-medium">
      <span>{`CP : `}</span>
      <span>{pokemon.stats.cp}</span>
    </div>
    <div className="flex-shrink-0">
      <img
        className="center justify-center w-16"
        src={IMG_URL + pokemon.id + IMG_FORMAT}
        alt={pokemon.name}
      />
    </div>
    <div className="flex-auto">
      <div className="flex flex-col pb-1">
        <div className="w-40 min-w-full text-base text-gray-900 font-medium">
          {`${pokemon.name} `}
        </div>
        <div className="flex row">
          {/* // type pokemon */}
          <div className="flex row">
            <div
              className={`fighting w-5 h-5 mr-3 rounded-full shadow-outline flex items-center justify-center`}
            >
              <PictoType icon="fighting" className="w-3 h-3" />
            </div>{" "}
            <div
              className={`bug w-5 h-5 mr-3 rounded-full shadow-outline flex items-center justify-center`}
            >
              <PictoType icon="bug" className="w-3 h-3" />
            </div>
          </div>
          {/* // type attack */}
          <div className="flex row">
            <div
              className={`fighting w-5 h-5 mr-3 rounded-full shadow-outline flex items-center justify-center`}
            >
              <PictoType icon="fighting" className="w-3 h-3" />
            </div>{" "}
            <div
              className={`bug w-5 h-5 mr-3 rounded-full shadow-outline flex items-center justify-center`}
            >
              <PictoType icon="bug" className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
)

PokemonCard.propTypes = {
  pokemon: Pokemon.isRequired,
  click: PropTypes.func,
  theme: PropTypes.string,
}

PokemonCard.defaultProps = {
  click: () => {},
  theme: "gray",
}

export default PokemonCard
