export const POKEMON = "pokemon"
export const BOSS = "boss"

export const IMG_FORMAT = ".png"
export const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

export const API_URL = process.env.REACT_APP_API_URL

export const API_POKEMONS = `${API_URL}/pokemons`
export const API_POKEDEXES = `${API_URL}/pokedexes`
export const API_BOSSES = `${API_URL}/bosses`
export const API_QUICK_MOVE = `${API_URL}/quick-moves?_limit=1000000`
export const API_CHARGED_MOVE = `${API_URL}/charged-moves?_limit=1000000`
export const API_LOGIN = `${API_URL}/auth/local`

export const ORDER_FIELD = [
  { value: "totalDmg", label: "DMG" },
  { value: "dps", label: "DPS" },
]

export const MIN_IV_STAR = 84
