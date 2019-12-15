import React from "react";

import { IMG_URL, IMG_FORMAT } from "./constant";

const PokemonsStatCard = ({ pokemon: { name, id, stats }, className }) => (
  <div
    className={`max-w-md flex items-start bg-gray-300 rounded m-2 mb-4 ${className}`}
    key={id}
  >
    <div className="flex-shrink-0 p-2">
      <img
        className="center justify-center w-24"
        src={IMG_URL + id + IMG_FORMAT}
        alt={name}
      />
    </div>
    <div className="flex-auto py-3 pr-3">
      <div className="flex row items-baseline justify-between pb-2">
        <h1 className="text-xl text-gray-900 font-medium">
          {`${name} `}
          <span className="text-sm font-normal">{stats.iv}%</span>
        </h1>
        <h2 className="text-base text-gray-800 font-medium">{`Combat Point : ${
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
  </div>
);

export default PokemonsStatCard;
