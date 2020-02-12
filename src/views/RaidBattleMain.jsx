import React, { Suspense, lazy } from "react"

import { prefetchPokedexes, prefetchBosses } from "../hooks/useApi"
// import ErrorBoundary from "../hooks/ErrorBoundary"

const RaidBattle = lazy(() => import("./RaidBattle"))

const bosses = prefetchBosses()
const pokedexes = prefetchPokedexes()

const RaidBattleMain = () => (
    <RaidBattle pokedexes={pokedexes} bosses={bosses} />
)

export default RaidBattleMain
