import React, { useState, useEffect } from "react"

import PokemonStatCard from "./components/PokemonStatCard"
import WeatherSelect from "./components/WeatherSelect"

import { pokemonStats } from "./utils/stats"
import { getRealDps } from "./utils/dps"

import { CP_MULTIPLIER } from "./constant"
import { POKEMON_MOCK } from "./pokemons/pokedex"
import { BOSS_MOCK } from "./pokemons/boss"

import "./styles.css"
import { simulateBattle } from "./utils/battle"

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
      const dps = getRealDps(activePokemon, activeOpponent, activeWeather)
      const battle = simulateBattle(activePokemon, activeOpponent)
      console.log(dps, battle)
    }
  }, [activePokemon, activeOpponent, activeWeather])

  // TODO watch if memo can be useful on WeatherSelect
  return (
    <div className="App">
      <WeatherSelect default={activeWeather} select={setActiveWeather} />
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
