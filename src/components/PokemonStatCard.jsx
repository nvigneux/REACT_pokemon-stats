import React from "react";
import PropTypes from "prop-types";

import { IMG_URL, IMG_FORMAT } from "../constant";

const PokemonsStatCard = ({
  pokemon: { name, id, stats },
  backgroundColor
}) => (
  <button
    className={`max-w-xs flex flex-col items-center text-center rounded m-2 mb-4 cursor-pointer ${backgroundColor}`}
    key={id}
  >
    <div className="flex-shrink-0">
      <img
        className="center justify-center w-24"
        src={IMG_URL + id + IMG_FORMAT}
        alt={name}
      />
    </div>
    <div className="flex-auto pb-2">
      <div className="flex flex-col pb-2">
        <h1 className="w-40 min-w-full text-xl text-gray-900 font-medium">
          {`${name} `}
          <span className="text-sm font-normal">{stats.iv}%</span>
        </h1>
        <h2 className="text-base text-gray-800 font-medium">{`CP : ${
          stats.cp
        }`}</h2>
      </div>
      <ul className="list-none italic">
        <li className="text-base text-gray-800">{`Attack : ${
          stats.attack
        }`}</li>
        <li className="text-base text-gray-800">{`Defense : ${
          stats.defense
        }`}</li>
        <li className="text-base text-gray-800">{`Stamina : ${
          stats.stamina
        }`}</li>
      </ul>
    </div>
  </button>
);

PokemonsStatCard.propsTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    baseAttack: PropTypes.number.isRequired,
    baseDefense: PropTypes.number.isRequired,
    baseStamina: PropTypes.number.isRequired,
    individualAttack: PropTypes.number.isRequired,
    individualDefense: PropTypes.number.isRequired,
    individualStamina: PropTypes.number.isRequired
  }),
  backgroundColor: PropTypes.string
};

PokemonsStatCard.defaultProps = {
  backgroundColor: "bg-gray-300 hover:bg-gray-400"
}

export default PokemonsStatCard;
