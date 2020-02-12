import React, { useState, useEffect } from "react"
import { orderBy } from "lodash"

import WeatherSelect from "../components/molecules/WeatherSelect/WeatherSelect"
import PokedexCard from "../components/molecules/PokedexCard/PokedexCard"

import { simulateBattle, simulateBattleStats } from "../utils/battle"
import { getDmgMoves } from "../utils/dps"

import { WEATHERS } from "../constants/weather"
import { POKEMON } from "../constants/constant"
import "../styles.css"

import BossSelect from "../components/molecules/BossSelect"
import Pokedexes from "../components/organisms/Pokedexes"

const RaidBattle = ({ pokedexes, bosses }) => {
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
          <BossSelect
            bosses={bosses}
            activeValue={activeBoss}
            select={setActiveBoss}
          />
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
        <Pokedexes pokedexes={pokedexes} />
      </div>
    </>
  )
}

export default RaidBattle
