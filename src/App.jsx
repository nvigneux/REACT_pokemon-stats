import React, { useState, useEffect } from "react"
import { orderBy } from "lodash"

import PokemonStatCard from "./components/PokemonStatCard"
import WeatherSelect from "./components/WeatherSelect"

import { simulateBattle, simulateBattleStats } from "./utils/battle"
import { pokemonStats } from "./utils/stats"
import { getDmgMoves } from "./utils/dps"

import { POKEMON_MOCK } from "./pokemons/pokedex"
import { BOSS_MOCK } from "./pokemons/boss"
import { MOVES } from "./moves"
import { CP_MULTIPLIER, WEATHERS, POKEMON } from "./constant"

import "./styles.css"

const PokemonCategory = ({ title, children }) => (
  <div className="flex flex-col">
    <h3 className="text-base font-semibold tracking-wider pl-2">{title}</h3>
    <div className="flex flex-row flex-nowrap">{children}</div>
  </div>
)

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [bosses, setBosses] = useState([])

  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState("sunny")

  // Add stats to each pokemons & bosses
  useEffect(() => {
    const pokemonsWithMoves = POKEMON_MOCK.map(pokemon => {
      const moveQuick = MOVES.find(item => item.id === pokemon.moves.quick)
      const moveCharged = MOVES.find(item => item.id === pokemon.moves.charged)
      return { ...pokemon, moves: { quick: moveQuick, charged: moveCharged } }
    })
    const bossesWithMoves = BOSS_MOCK.map(boss => {
      const moveQuick = MOVES.find(item => item.id === boss.moves.quick)
      const moveCharged = MOVES.find(item => item.id === boss.moves.charged)
      return { ...boss, moves: { quick: moveQuick, charged: moveCharged } }
    })

    const pokemonsWithStats = pokemonsWithMoves.map(pokemon => {
      const stats = pokemonStats(CP_MULTIPLIER, pokemon)
      return { stats, ...pokemon }
    })
    const bossesWithStats = bossesWithMoves.map(boss => {
      const stats = pokemonStats(CP_MULTIPLIER, boss)
      return { stats, ...boss }
    })

    setPokemons(pokemonsWithStats)
    setBosses(bossesWithStats)
  }, [])

  useEffect(() => {
    if (activeBoss) {
      const resultBattle = pokemons.map(attacker => {
        const activeAttacker = getDmgMoves(attacker, activeBoss, activeWeather)
        const activeDefender = getDmgMoves(activeBoss, attacker, activeWeather)

        const battle = simulateBattle(activeAttacker, activeDefender)
        const pokemonBattleStats = simulateBattleStats(
          POKEMON,
          activeAttacker.id,
          battle,
          activeDefender
        )

        console.group(activeAttacker.name)
        console.log("Attacker :", activeAttacker, "Defender :", activeDefender)
        console.log("Log battle :", battle)
        console.log("Stats :", pokemonBattleStats)
        console.groupEnd()

        return pokemonBattleStats
      })
      console.log(
        `Best pokemons against ${activeBoss.name}`,
        orderBy(resultBattle, ["dps"], ["desc"])
      )
    }
  }, [activeBoss, activeWeather])

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
            {pokemons.map(pokemon => {
              return <PokemonStatCard key={pokemon.id} pokemon={pokemon} />
            })}
          </PokemonCategory>
        </div>

        <div className="flex flex-col">
          <PokemonCategory title="Boss">
            {bosses.map(boss => {
              return (
                <PokemonStatCard
                  key={boss.id}
                  pokemon={boss}
                  click={setActiveBoss}
                  theme="red"
                  className="cursor-pointer"
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
