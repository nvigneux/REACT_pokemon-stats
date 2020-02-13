import React, { lazy } from "react"

import {
  prefetchPokemons,
  prefetchQuickMoves,
  prefetchChargedMoves,
} from "../hooks/useApi"

const pokemons = prefetchPokemons()
const quickMoves = prefetchQuickMoves()
const chargedMoves = prefetchChargedMoves()

const Pokedex = lazy(() => import("./Pokedex"))

const PokedexMain = () => (
  <Pokedex
    pokemons={pokemons}
    quickMoves={quickMoves}
    chargedMoves={chargedMoves}
  />
)

export default PokedexMain
