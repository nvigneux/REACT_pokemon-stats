import React from "react";
import ReactDOM from "react-dom";

import { POKEMON_MOCK, CP_MULTIPLIER } from "./constant";

import "./styles.css";

function App() {
  const calculateStat = (base, individual, cpMultiplier) =>
    (base + individual) * cpMultiplier;

  const calculateCombatPoint = (attack, defense, stamina) =>
    Math.floor(Math.sqrt(attack * attack * defense * stamina) / 10);

  const pokemonStats = (cpMultiplier, pokemon) => {
    const pokemonCpMultiplier = cpMultiplier[pokemon.level - 1];
    const attack = calculateStat(
      pokemon.baseAttack,
      pokemon.individualAttack,
      pokemonCpMultiplier
    );
    const defense = calculateStat(
      pokemon.baseDefense,
      pokemon.individualDefense,
      pokemonCpMultiplier
    );
    const stamina = calculateStat(
      pokemon.baseStamina,
      pokemon.individualStamina,
      pokemonCpMultiplier
    );
    const cp = calculateCombatPoint(attack, defense, stamina);
    return { cp, attack, defense, stamina };
  };

  return (
    <div className="App">
      {POKEMON_MOCK.map(pokemon => {
        const statsPokemon = pokemonStats(CP_MULTIPLIER, pokemon);
        return (
          <div
            className="max-w-md flex items-start bg-gray-300 rounded m-2 mb-4"
            key={pokemon.id}
          >
            <div className="flex-shrink-0 p-2">
              <img
                className="center justify-center"
                src={pokemon.img}
                alt="Woman paying for a purchase"
              />
            </div>
            <div className="flex-auto py-3 pr-3">
              <div className="flex row items-baseline justify-between pb-2">
                <h1 className="text-xl text-gray-900 font-medium">{pokemon.name}</h1>
                <h2 className="text-base text-gray-800 font-medium">{`Combat Point : ${
                  statsPokemon.cp
                }`}</h2>
              </div>
              <ul className="list-none">
                <li className="text-base text-gray-800">{`Attack : ${
                  statsPokemon.attack
                }`}</li>
                <li className="text-base text-gray-800">{`Defense : ${
                  statsPokemon.defense
                }`}</li>
                <li className="text-base text-gray-800">{`Stamina : ${
                  statsPokemon.stamina
                }`}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
