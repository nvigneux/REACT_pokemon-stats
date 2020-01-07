import {
  // BUG,
  DARK,
  DRAGON,
  // ELECTRIC,
  // FAIRY,
  // FIGHTING,
  // FIRE,
  FLYING,
  // GHOST,
  // GRASS,
  // GROUND,
  // ICE,
  // NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  // STEEL,
  WATER,
} from "../types"

export const BOSS_MOCK = [
  {
    id: 73,
    name: "Tentacruel",
    type: [WATER, POISON],
    level: 41,
    baseAttack: 166,
    baseDefense: 209,
    baseStamina: 2025,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: 7,
      charged: 6,
    },
  },
  {
    id: 196,
    name: "Mentali",
    type: [PSYCHIC],
    level: 41,
    baseAttack: 261,
    baseDefense: 175,
    baseStamina: 3000,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: 8,
      charged: 9,
    },
  },
  {
    id: 248,
    name: "Tyranocif",
    type: [DARK, ROCK],
    level: 41,
    baseAttack: 251,
    baseDefense: 207,
    baseStamina: 9000,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: 10,
      charged: 11,
    },
  },
  {
    id: 384,
    name: "Rayquaza",
    type: [DRAGON, FLYING],
    level: 41,
    baseAttack: 284,
    baseDefense: 170,
    baseStamina: 12500,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: 12,
      charged: 13,
    },
  },
  {
    id: 150,
    name: "MewTwo",
    type: [PSYCHIC],
    level: 41,
    baseAttack: 300,
    baseDefense: 182,
    baseStamina: 22500,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: 8,
      charged: 14,
    },
  },
]
