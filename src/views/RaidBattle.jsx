import React, { Suspense, lazy, useState, useEffect } from "react"
import { orderBy } from "lodash"

import { prefetchPokedexes, prefetchBosses } from "../hooks/useApi"
import ErrorBoundary from "../hooks/ErrorBoundary"

import WeatherSelect from "../components/WeatherSelect"
import LoadingSelect from "../components/LoadingSelect"
import LoadingPokedexCard from "../components/LoadingPokedexCard"
import PokedexCard from "../components/PokedexCard"

import { simulateBattle, simulateBattleStats } from "../utils/battle"
import { getDmgMoves } from "../utils/dps"

import { WEATHERS } from "../constants/weather"
import { POKEMON } from "../constants/constant"
import "../styles.css"

const BossSelect = lazy(() => import("../components/BossSelect"))
const Pokedexes = lazy(() => import("../components/Pokedexes"))

const bosses = prefetchBosses()
const pokedexes = prefetchPokedexes()

const RaidBattle = () => {
  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState(WEATHERS[0])
  const [activeTeam, setActiveTeam] = useState([])

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
        return pokemonBattleStats
      })

      const buildActiveTeam = () =>
        resultBattle.map(result => {
          return pokedexes.reduce((acc, item) => {
            if (item.id === result.pokemonId)
              acc.push({ ...result, pokedex: item })
            return acc
          }, [])[0]
        })

      setActiveTeam(orderBy(buildActiveTeam(), ["dps"], ["desc"]))
      // console.log(
      //   `Best pokedexes against ${activeBoss.pokemon.name}`,
      //   orderBy(buildActiveTeam, ["dps"], ["desc"])
      // )
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

      {activeTeam.length && activeBoss ? (
        <div className="flex flex-row flex-wrap bg-gray-200 -mx-4 mt-2 p-4 rounded-t-pokemon">
          {activeTeam.slice(0, 6).map(pokedex => (
            <div
              key={pokedex.pokemonId}
              className="w-1/3 flex flex-col flex-wrap"
            >
              <PokedexCard pokedex={pokedex.pokedex} result={pokedex} />
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-row flex-wrap pt-2">
        <ErrorBoundary fallback={<LoadingPokedexCard number={6} label={false} />}>
          <Suspense fallback={<LoadingPokedexCard number={6} label={false} />}>
            <Pokedexes pokedexes={pokedexes} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default RaidBattle
