import React, { lazy } from "react"

import { prefetchPokedexes, prefetchBosses } from "../../hooks/useApi"

const bosses = prefetchBosses()
const pokedexes = prefetchPokedexes()

const RaidBattle = lazy(() => import("./RaidBattle"))

const RaidBattleMain = () => (
  <RaidBattle pokedexes={pokedexes} bosses={bosses} />
)

export default RaidBattleMain
