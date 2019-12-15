import React from "react";
import ReactDOM from "react-dom";

import PokemonStatCard from "./PokemonStatCard";

import { CP_MULTIPLIER, BOSS_MOCK, POKEMON_MOCK } from "./constant";

import "./styles.css";

function App() {
  // Formula to calculate attack ,defense and stamina by the pokemon's base stats
  const calculateStat = (base, individual, cpMultiplier) =>
    (base + individual) * cpMultiplier;

  // Formula to calculate combat point by the pokemon's bases stats
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
    const iv = Math.floor(
      ((pokemon.individualAttack +
        pokemon.individualDefense +
        pokemon.individualStamina) *
        100) /
        45
    );
    return { cp, iv, attack, defense, stamina };
  };

  return (
    <div className="App">
      <h3 className="text-lg font-semibold tracking-wider pl-2">Pokemons</h3>
      <div className="mb-5">
        {POKEMON_MOCK.map(pokemon => {
          const stats = pokemonStats(CP_MULTIPLIER, pokemon);
          return (
            <PokemonStatCard key={pokemon.id} pokemon={{ stats, ...pokemon }} />
          );
        })}
      </div>
      <h3 className="text-lg font-semibold tracking-wider pl-2">Boss</h3>
      <div className="mb-5">
        {BOSS_MOCK.map(pokemon => {
          const stats = pokemonStats(CP_MULTIPLIER, pokemon);
          return (
            <PokemonStatCard
              key={pokemon.id}
              pokemon={{ stats, ...pokemon }}
              className="bg-red-200"
            />
          );
        })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
