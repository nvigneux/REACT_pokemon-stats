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
          <div key={pokemon.id}>
            <h1>{pokemon.name}</h1>
            <h2>{`Combat Point : ${statsPokemon.cp}`}</h2>
            <h3>{`Attack : ${statsPokemon.attack}`}</h3>
            <h3>{`Defense : ${statsPokemon.defense}`}</h3>
            <h3>{`Stamina : ${statsPokemon.stamina}`}</h3>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
