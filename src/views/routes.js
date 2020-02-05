import React from "react"

// Views
const RaidBattle = React.lazy(() => import("./RaidBattle"))
const PokedexForm = React.lazy(() => import("./Pokedex/Pokedex"))
const BossForm = React.lazy(() => import("./Boss/Boss"))

export const routes = [
  {
    path: "/",
    component: RaidBattle,
    exact: true,
  },
]

export const protectedRoutes = [
  {
    path: "/pokedex",
    component: PokedexForm,
    exact: true,
  },
  {
    path: "/boss",
    component: BossForm,
    exact: true,
  },
]
