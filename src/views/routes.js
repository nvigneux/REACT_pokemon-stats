import React, { Suspense } from "react"

// Views
import Login from "./Login"
import RaidBattleMainLoader from "./RaidBattle/RaidBattleLoading"
import PokedexFormLoader from "./Pokedex/PokedexLoader"
import BossFormLoader from "./Boss/BossLoader"

const RaidBattleMain = React.lazy(() => import("./RaidBattle/RaidBattleMain"))
const PokedexFormMain = React.lazy(() => import("./Pokedex/PokedexMain"))
const BossFormMain = React.lazy(() => import("./Boss/BossMain"))

function WaitingComponent(Component, LoadingComponent) {
  return props => (
    <Suspense fallback={<LoadingComponent />}>
      <Component {...props} />
    </Suspense>
  )
}

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
    component: WaitingComponent(RaidBattleMain, RaidBattleMainLoader),
    exact: true,
  },
  {
    path: "/pokedex",
    component: WaitingComponent(PokedexFormMain, PokedexFormLoader),
    exact: true,
  },
  {
    path: "/boss",
    component: WaitingComponent(BossFormMain, BossFormLoader),
    exact: true,
  },
]
