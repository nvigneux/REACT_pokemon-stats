import React from "react"

// Views
const Login = React.lazy(() => import("./Login"))
const RaidBattle = React.lazy(() => import("./RaidBattle"))
const PokedexForm = React.lazy(() => import("./Pokedex"))
const BossForm = React.lazy(() => import("./Boss"))

export const routes = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
]

export const protectedRoutes = [
  {
    path: "/",
    component: RaidBattle,
    exact: true,
  },
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
