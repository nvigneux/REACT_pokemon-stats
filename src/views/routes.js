import React, { Suspense } from "react"

// Views
import Login from "./Login"
const RaidBattleMain = React.lazy(() => import("./RaidBattleMain"))
const PokedexForm = React.lazy(() => import("./Pokedex"))
const BossForm = React.lazy(() => import("./Boss"))

// TODO make template for each page loading in fallback
function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div>RaidBattleMain</div>}>
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
    component: WaitingComponent(RaidBattleMain),
    exact: true,
  },
  {
    path: "/pokedex",
    component: WaitingComponent(PokedexForm),
    exact: true,
  },
  {
    path: "/boss",
    component: WaitingComponent(BossForm),
    exact: true,
  },
]
