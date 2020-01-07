import React, { useState, useEffect } from "react"
import { orderBy, keyBy } from "lodash"

import PokemonStatCard from "./components/PokemonStatCard"
import WeatherSelect from "./components/WeatherSelect"

import { simulateBattle, simulateBattleStats } from "./utils/battle"
import { pokemonStats } from "./utils/stats"
import { getDmgMoves } from "./utils/dps"

import { POKEMON_MOCK, generateFakePokemons } from "./pokemons/pokedex"
import { BOSS_MOCK } from "./pokemons/boss"
import { QUICK_MOVES, CHARGED_MOVES, generateFakeMoves } from "./moves"
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

  const fakeMovesQuick = keyBy(generateFakeMoves(200), "id")

  const buildPokemons = sourcePokemons =>
    sourcePokemons.map(pokemon => {
      const moveQuick = fakeMovesQuick[pokemon.moves.quick]
      const moveCharged = fakeMovesQuick[pokemon.moves.charged]
      const stats = pokemonStats(CP_MULTIPLIER, pokemon)
      return {
        ...pokemon,
        stats,
        moves: { quick: moveQuick, charged: moveCharged },
      }
    })

  // Add stats to each pokemons & bosses
  useEffect(() => {
    const number = 3000
    const fakePokemons = generateFakePokemons(number)
    const fakeBoss = generateFakePokemons(number)
    console.log(fakePokemons)
    setPokemons(buildPokemons(fakePokemons))
    setBosses(buildPokemons(fakeBoss))
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
  }, [pokemons, activeBoss, activeWeather])

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
          {/* <PokemonCategory title="Pokedex">
            {pokemons.map(pokemon => {
              return (
                <PokemonStatCard
                  key={`${pokemon.id + pokemon.name}`}
                  pokemon={pokemon}
                />
              )
            })}
          </PokemonCategory> */}
        </div>

        <div className="flex flex-col">
          {/* <PokemonCategory title="Boss">
            {bosses.map(boss => {
              return (
                <PokemonStatCard
                  key={`${boss.id + boss.name}`}
                  pokemon={boss}
                  click={setActiveBoss}
                  theme="red"
                  className="cursor-pointer"
                />
              )
            })}
          </PokemonCategory> */}
        </div>
      </div>
    </div>
  )
}

export default App
