import React, { useState, useEffect } from "react"
import { orderBy } from "lodash"
import { useHistory } from "react-router-dom"

import ErrorBoundary from "../../hooks/ErrorBoundary"
import WeatherSelect from "../../components/molecules/WeatherSelect/WeatherSelect"
import PokedexCard from "../../components/molecules/PokedexCard/PokedexCard"
import BossSelect from "../../components/molecules/BossSelect"
import Pokedexes from "../../components/organisms/Pokedexes"
import LoadingSelect from "../../components/atoms/LoadingSelect"
import LoadingPokedexCard from "../../components/atoms/LoadingPokedexCard"

import { simulateBattle, simulateBattleStats } from "../../utils/battle"
import { getDmgMoves } from "../../utils/dps"

import { WEATHERS } from "../../constants/weather"
import { POKEMON, ORDER_FIELD } from "../../constants/constant"
import "../../styles.css"

const RaidBattle = ({ pokedexes, bosses }) => {
  const history = useHistory()
  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState(WEATHERS[0])
  const [activeTeam, setActiveTeam] = useState([])
  const [seeMore, setSeeMore] = useState(false)
  const [orderActiveTeam, setOrderActiveTeam] = useState("totalDmg")

  const handleOrderActiveTeam = value => {
    setOrderActiveTeam(value)
    setActiveTeam(orderBy(activeTeam, [value], ["desc"]))
  }

  const handleEditPokedex = id => {
    history.push(`/pokedex/edit/${id}`)
  }

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
        const battleQuick = simulateBattle(activeAttacker, activeDefender, true)
        const pokemonBattleStatsQuick = simulateBattleStats(
          POKEMON,
          activeAttacker.id,
          battleQuick,
          activeDefender
        )
        return pokemonBattleStats.dps > pokemonBattleStatsQuick.dps
          ? pokemonBattleStats
          : { ...pokemonBattleStatsQuick, quick: true }
      })

      const buildActiveTeam = () =>
        resultBattle.map(result => {
          return pokedexes.reduce((acc, item) => {
            if (item.id === result.pokemonId)
              acc.push({ ...result, pokedex: item })
            return acc
          }, [])[0]
        })

      setActiveTeam(orderBy(buildActiveTeam(), [orderActiveTeam], ["desc"]))
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
            <BossSelect
              bosses={bosses}
              activeValue={activeBoss}
              select={setActiveBoss}
            />
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
        <>
          <div className="bg-gray-200 -mx-4 mt-2 p-4 rounded-t-pokemon">
            <div className="flex flex-row flex-wrap justify-end pb-2 pr-2">
              {ORDER_FIELD.map(item => (
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded-lg ${
                    orderActiveTeam === item.value
                      ? "bg-button-menu text-gray-100"
                      : "text-green-700"
                  }`}
                  onClick={() => handleOrderActiveTeam(item.value)}
                  key={item.value}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-row flex-wrap">
              {activeTeam.slice(0, seeMore ? 18 : 6).map(pokedex => (
                <div
                  key={pokedex.pokemonId}
                  className="w-1/3 flex flex-col flex-wrap"
                >
                  <PokedexCard pokedex={pokedex.pokedex} result={pokedex} />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSeeMore(!seeMore)}
              className="w-full flex flex-wrap justify-center text-sm text-gray-600 hover:text-gray-800"
            >
              {seeMore ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        </>
      ) : null}

      <div className="flex flex-row flex-wrap pt-2">
        <ErrorBoundary fallback={<LoadingPokedexCard />}>
          <Pokedexes pokedexes={pokedexes} click={handleEditPokedex} />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default RaidBattle
