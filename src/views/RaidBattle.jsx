import React, { Suspense, lazy, useState, useEffect } from "react"
import { orderBy, keyBy } from "lodash"

import { prefetchPokemons } from "../hooks/useApi"
import ErrorBoundary from "../hooks/ErrorBoundary"

import Layout from "../components/Layout"
import PokemonCard from "../components/PokemonCard"
import WeatherSelect from "../components/WeatherSelect"
import LoadingSelect from "../components/LoadingSelect/LoadingSelect"

import { simulateBattle, simulateBattleStats } from "../utils/battle"
import { pokemonStats } from "../utils/stats"
import { getDmgMoves } from "../utils/dps"

import { POKEMON_MOCK } from "../constants/pokemons/pokedex"
import { BOSS_MOCK } from "../constants/pokemons/boss"
import { QUICK_MOVES, CHARGED_MOVES } from "../constants/moves"
import { CP_MULTIPLIER } from "../constants/cpMultiplier"
import { WEATHERS } from "../constants/weather"
import { POKEMON } from "../constants/constant"

import "../styles.css"

const PokemonCategory = ({ title, children }) => (
  <div className="flex flex-col">
    <h3 className="text-base font-semibold tracking-wider pl-2">{title}</h3>
    <div className="flex flex-row flex-nowrap">{children}</div>
  </div>
)

const BossSelect = lazy(() => import("../components/BossSelect"))
const bosses = prefetchPokemons()

const RaidBattle = () => {
  const [pokemons, setPokemons] = useState([])

  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState(WEATHERS[0])

  // Add stats & moves to each pokemons & bosses
  useEffect(() => {
    const quickMoveHashArray = keyBy(QUICK_MOVES, "id")
    const chargedMoveHashArray = keyBy(CHARGED_MOVES, "id")

    const addSupplementDataPokemon = sourcePokemons =>
      sourcePokemons.map(pokemon => {
        const moveQuick = quickMoveHashArray[pokemon.moves.quick]
        const moveCharged = chargedMoveHashArray[pokemon.moves.charged]
        const stats = pokemonStats(CP_MULTIPLIER, pokemon)
        return {
          ...pokemon,
          stats,
          moves: { quick: moveQuick, charged: moveCharged },
        }
      })

    setPokemons(addSupplementDataPokemon(POKEMON_MOCK))
    // setBosses(addSupplementDataPokemon(BOSS_MOCK))
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

  return (
    <Layout>
      <div className="flex flex-row items-end mb-4">
        <div className="w-2/3">
          <ErrorBoundary fallback={<LoadingSelect label={false} />}>
            <Suspense fallback={<LoadingSelect label={false} />}>
              <BossSelect bosses={bosses} />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="w-1/3">
          <WeatherSelect
            values={WEATHERS}
            activeValue={activeWeather}
            select={setActiveWeather}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {pokemons.map(pokemon => {
          return (
            <div key={pokemon.id} className="w-1/3 flex flex-col flex-wrap">
              <PokemonCard pokemon={pokemon} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default RaidBattle
