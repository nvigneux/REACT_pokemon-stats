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

  const activePokemon = POKEMON_MOCK[0];
  const statsPokemon = pokemonStats(CP_MULTIPLIER, activePokemon);

  return (
    <div className="App">
      <h1>{activePokemon.name}</h1>
      <h2>{`Combat Point : ${statsPokemon.cp}`}</h2>
      <h3>{`Attack : ${statsPokemon.attack}`}</h3>
      <h3>{`Defense : ${statsPokemon.defense}`}</h3>
      <h3>{`Stamina : ${statsPokemon.stamina}`}</h3>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
