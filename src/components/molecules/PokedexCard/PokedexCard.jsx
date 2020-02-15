import React from "react"
// import PropTypes from "prop-types"

import { IMG_URL, IMG_FORMAT } from "../../../constants/constant"
import { Pokedex } from "../../../types/pokedex"

import Picto from "../../atoms/Picto"

const PokedexCard = ({ pokedex, result }) => (
  <>
    <div
      className={`bg-gray-100 rounded ${result ? "p-2 mt-2 mx-2" : "p-2 m-1"}`}
    >
      <div className="flex-auto flex flex-row items-baseline justify-center leading-none">
        <span className="text-xs text-gray-500 font-medium pr-1">CP</span>
        <span
          className={`${
            result ? "text-normal" : "text-lg"
          } text-gray-700 font-medium`}
        >
          {pokedex.stats.cp}
        </span>
      </div>
      <div className="flex-auto flex flex-col items-center">
        <img
          className={`center justify-center ${result ? "w-12" : "w-16 -mt-1"}`}
          src={IMG_URL + pokedex.pokemon.id_base_pokemon + IMG_FORMAT}
          alt={pokedex.pokemon.name}
          loading="lazy"
        />
      </div>
      <div className="flex-auto flex flex-col items-center">
        <div className="text-sm text-gray-700 font-medium leading-none pb-1 capitalize">
          {`${pokedex.pokemon.name} `}
        </div>
        <div className="w-full flex row flex-auto justify-around items-center">
          <div className="flex row">
            {pokedex.pokemon.type.map((type, index) => (
              <div
                key={index}
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
          <div className="flex flex-row">
            <div
              className={`${pokedex.quick_move.type} w-4 h-4 rounded-full shadow-outline-type flex items-center justify-center mr-1`}
            >
              <Picto icon={pokedex.quick_move.type} className="w-2 h-2" />
            </div>
            <div
              className={`${pokedex.charged_move.type} w-4 h-4 rounded-full shadow-outline-type flex items-center justify-center -ml-1`}
            >
              <Picto icon={pokedex.charged_move.type} className="w-2 h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {result ? (
      <div className="flex flex-row text-xs bg-button-menu text-green-100 justify-between px-2 py-1 mb-2 mx-2 rounded-b">
        <span>{Math.round((result.dps + Number.EPSILON) * 100) / 100}</span>
        <span>{`${result.lifeTime}s`}</span>
      </div>
    ) : null}
  </>
)

PokedexCard.propTypes = {
  pokedex: Pokedex.isRequired,
}

export default PokedexCard
