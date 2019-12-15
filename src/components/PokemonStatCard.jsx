import React from "react";
import PropTypes from "prop-types";

import { IMG_URL, IMG_FORMAT } from "../constant";

const PokemonsStatCard = ({ pokemon, click, theme }) => (
  <button
    key={pokemon.id}
    className={`max-w-xs flex flex-col items-center text-center rounded m-2 mb-4 cursor-pointer py-2 bg-${theme}-300 hover:bg-${theme}-400 `}
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
        <h2 className="text-xs text-gray-800 font-medium">{`CP : ${
          pokemon.stats.cp
        }`}</h2>
      </div>
      <ul className="list-none italic">
        <li className="text-xs text-gray-800">{`Attack : ${
          pokemon.stats.attack
        }`}</li>
        <li className="text-xs text-gray-800">{`Defense : ${
          pokemon.stats.defense
        }`}</li>
        <li className="text-xs text-gray-800">{`Stamina : ${
          pokemon.stats.stamina
        }`}</li>
      </ul>
    </div>
  </button>
);

PokemonsStatCard.propsTypes = {
  pokemon: PropTypes.shape({}).isRequired,
  click: PropTypes.func,
  theme: PropTypes.string
};

PokemonsStatCard.defaultProps = {
  click: () => {},
  theme: "gray"
};

export default PokemonsStatCard;
