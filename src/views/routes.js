// Views
import RaidBattle from "./RaidBattle"

// Views Forms
import PokemonForm from "./forms/Pokemon"
import PokedexForm from "./forms/Pokedex"

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
  {
    path: "/pokedex",
    component: PokedexForm,
    exact: true,
  },
]
