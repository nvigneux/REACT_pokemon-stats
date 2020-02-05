import React, { Suspense, lazy, useState, useEffect } from "react"
import { orderBy } from "lodash"

import { prefetchPokedexes, prefetchBosses } from "../hooks/useApi"
import ErrorBoundary from "../hooks/ErrorBoundary"

import WeatherSelect from "../components/WeatherSelect"
import LoadingSelect from "../components/LoadingSelect/LoadingSelect"

import { simulateBattle, simulateBattleStats } from "../utils/battle"
import { getDmgMoves } from "../utils/dps"

import { WEATHERS } from "../constants/weather"
import { POKEMON } from "../constants/constant"

import "../styles.css"

const BossSelect = lazy(() => import("../components/BossSelect")) // TODO make optionBoss
const Pokedexes = lazy(() => import("../components/Pokedexes"))

const bosses = prefetchBosses()
const pokedexes = prefetchPokedexes()

const RaidBattle = () => {
  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState(WEATHERS[0])

  useEffect(() => {
    if (activeBoss) {
      const resultBattle = pokedexes.map(attacker => {
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
        `Best pokedexes against ${activeBoss.name}`,
        orderBy(resultBattle, ["dps"], ["desc"])
      )
    }
  }, [activeBoss, activeWeather])

  return (
    <>
      <div className="flex flex-row items-end mb-4">
        <div className="w-full">
          <ErrorBoundary fallback={<LoadingSelect label={false} />}>
            <Suspense fallback={<LoadingSelect label={false} />}>
              <BossSelect
                bosses={bosses}
                activeValue={activeBoss}
                select={setActiveBoss}
              />
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

      <div className="flex flex-row flex-wrap">
        <ErrorBoundary fallback={<LoadingSelect label={false} />}>
          <Suspense fallback={<LoadingSelect label={false} />}>
            <Pokedexes pokedexes={pokedexes} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default RaidBattle
