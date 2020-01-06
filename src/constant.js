export const CP_MULTIPLIER = [
  0.094,
  0.16639787,
  0.21573247,
  0.25572005,
  0.29024988,
  0.3210876,
  0.34921268,
  0.37523559,
  0.39956728,
  0.42250001,
  0.44310755,
  0.46279839,
  0.48168495,
  0.49985844,
  0.51739395,
  0.53435433,
  0.55079269,
  0.56675452,
  0.58227891,
  0.59740001,
  0.61215729,
  0.62656713,
  0.64065295,
  0.65443563,
  0.667934,
  0.68116492,
  0.69414365,
  0.70688421,
  0.71939909,
  0.7317,
  0.73776948,
  0.74378943,
  0.74976104,
  0.75568551,
  0.76156384,
  0.76739717,
  0.7731865,
  0.77893275,
  0.78463697,
  0.79030001,
  1,
]

export const WEATHERS = {
  sunny: ["fire", "ground", "grass"],
  clear: ["fire", "ground", "grass"],
  partly_cloudy: ["normal", "rock"],
  cloudy: ["fairy", "fighting", "poison"],
  rain: ["water", "electric", "bug"],
  snow: ["ice", "steel"],
  windy: ["dragon", "flying", "psychic"],
  foggy: ["ghost", "dark"],
  none: [],
}

export const POKEMON = "pokemon"
export const BOSS = "boss"

export const QUICK = "quick"
export const CHARGED = "charged"

const TIME_LIMIT = 180
export const TIMER_BATTLE = TIME_LIMIT * 1000 // fight duration : 180000ms
export const QUICK_ATK_ATTACKER = "Attacker Quick"
export const CHARGED_ATK_ATTACKER = "Attacker Charged"
export const QUICK_ATK_DEFENDER = "Defender Quick"
export const CHARGED_ATK_DEFENDER = "Defender Charged"

export const IMG_FORMAT = ".png"
export const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
