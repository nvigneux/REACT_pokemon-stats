import React, { lazy } from "react"

import {
  prefetchPokemons,
  prefetchQuickMoves,
  prefetchChargedMoves,
} from "../../hooks/useApi"

const pokemons = prefetchPokemons()
const quickMoves = prefetchQuickMoves()
const chargedMoves = prefetchChargedMoves()

const Boss = lazy(() => import("./Boss"))

const BossMain = () => (
  <Boss
    pokemons={pokemons}
    quickMoves={quickMoves}
    chargedMoves={chargedMoves}
  />
)

export default BossMain
