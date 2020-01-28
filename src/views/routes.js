// Views
import RaidBattle from "./RaidBattle"

// Views Forms
import PokedexForm from "./Pokedex/Pokedex"
import BossForm from "./Boss/Boss"

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
