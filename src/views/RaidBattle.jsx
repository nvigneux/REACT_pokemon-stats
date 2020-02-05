import React, { Suspense, lazy, useState, useEffect } from "react"
import { orderBy } from "lodash"

import { prefetchPokedexes, prefetchBosses } from "../hooks/useApi"
import ErrorBoundary from "../hooks/ErrorBoundary"

import Layout from "../components/Layout"
import PokemonCard from "../components/PokemonCard"
import WeatherSelect from "../components/WeatherSelect"
import LoadingSelect from "../components/LoadingSelect/LoadingSelect"

import { simulateBattle, simulateBattleStats } from "../utils/battle"
import { getDmgMoves } from "../utils/dps"

import { WEATHERS } from "../constants/weather"
import { POKEMON } from "../constants/constant"

import "../styles.css"

const BossSelect = lazy(() => import("../components/BossSelect")) // TODO make optionBoss

const bosses = prefetchBosses()
const pokemons = prefetchPokedexes() // TODO make pokemons fetch and loop

const RaidBattle = () => {
  const [pokemons, setPokemons] = useState([])

  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState(WEATHERS[0])


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
    <>
      <div className="flex flex-row items-end mb-4">
        <div className="w-full">
          <ErrorBoundary fallback={<LoadingSelect label={false} />}>
            <Suspense fallback={<LoadingSelect label={false} />}>
              <BossSelect bosses={bosses} />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="w-20">
          <WeatherSelect
            values={WEATHERS}
            activeValue={activeWeather}
            select={setActiveWeather}
          />
        </div>
      </div>

      {/* <div className="flex flex-row flex-wrap">
        {pokemons.map(pokemon => {
          return (
            <div key={pokemon.id} className="w-1/3 flex flex-col flex-wrap">
              <PokemonCard pokemon={pokemon} />
            </div>
          )
        })}
      </div> */}
    </>
  )
}

export default RaidBattle
