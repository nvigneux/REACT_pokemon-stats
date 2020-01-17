// Views
import RaidBattle from "./RaidBattle"

// Views Forms
import PokemonForm from "./Pokemon/Pokemon"
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
