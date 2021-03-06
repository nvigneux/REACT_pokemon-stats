import {
  BUG,
  DARK,
  DRAGON,
  ELECTRIC,
  FAIRY,
  FIGHTING,
  FIRE,
  FLYING,
  GHOST,
  GRASS,
  GROUND,
  ICE,
  NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  STEEL,
  WATER,
} from "./types"

export const WEATHERS = [
  // { label: "sunny", value: [FIRE, GROUND, GRASS] }, // same as clear
  { label: "clear", value: [FIRE, GROUND, GRASS] },
  { label: "partly_cloudy", value: [NORMAL, ROCK] },
  { label: "cloudy", value: [FAIRY, FIGHTING, POISON] },
  { label: "rain", value: [WATER, ELECTRIC, BUG] },
  { label: "snow", value: [ICE, STEEL] },
  { label: "windy", value: [DRAGON, FLYING, PSYCHIC] },
  { label: "foggy", value: [GHOST, DARK] },
  { label: "none", value: [] },
]
