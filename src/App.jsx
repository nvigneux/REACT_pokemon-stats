import React, { useState, useEffect } from "react"

import PokemonStatCard from "./components/PokemonStatCard"
import WeatherSelect from "./components/WeatherSelect"

import { simulateBattle } from "./utils/battle"
import { pokemonStats, battleStats } from "./utils/stats"
import { getDmgMoves } from "./utils/dps"

import { CP_MULTIPLIER, WEATHERS } from "./constant"
import { POKEMON_MOCK } from "./pokemons/pokedex"
import { BOSS_MOCK } from "./pokemons/boss"

import "./styles.css"

const PokemonCategory = ({ title, children }) => (
  <div className="flex flex-col">
    <h3 className="text-base font-semibold tracking-wider pl-2">{title}</h3>
    <div className="flex flex-row flex-nowrap">{children}</div>
  </div>
)

const App = () => {
  const [activePokemon, setActivePokemon] = useState(null)
  const [activeOpponent, setActiveOpponent] = useState(null)

  const [activeWeather, setActiveWeather] = useState("sunny")

  useEffect(() => {
    if (activePokemon && activeOpponent) {
      const activeAttacker = getDmgMoves(
        activePokemon,
        activeOpponent,
        activeWeather
      )
      const activeDefender = getDmgMoves(
        activeOpponent,
        activePokemon,
        activeWeather
      )
      console.group(activeAttacker.name)
      console.log(activeAttacker, activeDefender)
      const battle = simulateBattle(activeAttacker, activeDefender)
      console.log(battle)
      const simulateBattleStats = battleStats(
        battle,
        activeAttacker,
        activeDefender
      )
      console.log(simulateBattleStats)
      console.groupEnd()
    }
  }, [activePokemon, activeOpponent, activeWeather])

  // TODO watch if memo can be useful
  return (
    <div className="App">
      <WeatherSelect
        values={WEATHERS}
        default={activeWeather}
        select={setActiveWeather}
      />

      <div className="flex flex-row overflow-auto scroll">
        <div className="flex flex-col pr-4">
          <PokemonCategory title="Pokedex">
            {POKEMON_MOCK.map(pokemon => {
              const stats = pokemonStats(CP_MULTIPLIER, pokemon)
              return (
                <PokemonStatCard
                  key={pokemon.id}
                  pokemon={{ stats, ...pokemon }}
                  click={setActivePokemon}
                />
              )
            })}
          </PokemonCategory>
        </div>
        <div className="flex flex-col">
          <PokemonCategory title="Boss">
            {BOSS_MOCK.map(pokemon => {
              const stats = pokemonStats(CP_MULTIPLIER, pokemon)
              return (
                <PokemonStatCard
                  key={pokemon.id}
                  pokemon={{ stats, ...pokemon }}
                  click={setActiveOpponent}
                  theme="red"
                />
              )
            })}
          </PokemonCategory>
        </div>
      </div>
    </div>
  )
}

export default App
