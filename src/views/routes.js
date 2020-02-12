import React, { Suspense } from "react"

// Views
const Login = React.lazy(() => import("./Login"))
const RaidBattle = React.lazy(() => import("./RaidBattle"))
const PokedexForm = React.lazy(() => import("./Pokedex"))
const BossForm = React.lazy(() => import("./Boss"))

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div></div>}>
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
    component: WaitingComponent(RaidBattle),
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
