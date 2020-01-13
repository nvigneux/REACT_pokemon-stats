// Views
import RaidBattle from "./RaidBattle"

// Views Forms
import PokemonForm from "./forms/Pokemon"

export const routes = [
  {
    path: "/",
    component: RaidBattle,
    exact: true,
  },
]

export const protectedRoutes = [
  {
    path: "/pokemon",
    component: PokemonForm,
    exact: true,
  },
]
