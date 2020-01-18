// Views
import RaidBattle from "./RaidBattle"

// Views Forms
import PokedexForm from "./Pokedex/Pokedex"

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
]
