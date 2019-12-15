import React from "react";
import ReactDOM from "react-dom";

import PokemonStatCard from "./components/PokemonStatCard";

import { CP_MULTIPLIER } from "./constant";
import { POKEMON_MOCK } from "./pokemons/pokedex";
import { BOSS_MOCK } from "./pokemons/boss";

import "./styles.css";

function App() {
  // Formula to calculate attack ,defense and stamina by the pokemon's base stats
  const calculateStat = (base, individual, cpMultiplier) =>
    Math.floor((base + individual) * cpMultiplier);

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
      <div className="flex flex-row overflow-auto scroll">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold tracking-wider pl-2">
            Pokemons
          </h3>
          <div className="flex flex-row flex-nowrap">
            {POKEMON_MOCK.map(pokemon => {
              const stats = pokemonStats(CP_MULTIPLIER, pokemon);
              return (
                <PokemonStatCard
                  key={pokemon.id}
                  pokemon={{ stats, ...pokemon }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold tracking-wider pl-2">Boss</h3>
          <div className="flex flex-row flex-nowrap">
            {BOSS_MOCK.map(pokemon => {
              const stats = pokemonStats(CP_MULTIPLIER, pokemon);
              return (
                <PokemonStatCard
                  key={pokemon.id}
                  pokemon={{ stats, ...pokemon }}
                  backgroundColor="bg-red-200 hover:bg-red-300"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
