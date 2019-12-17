import * as TYPES from "../types"

export const POKEMON_MOCK = [
  {
    id: 149,
    name: "Dracolosse",
    type: [TYPES.DRAGON, TYPES.FLYING],
    level: 29,
    baseAttack: 263,
    baseDefense: 198,
    baseStamina: 209,
    individualAttack: 15,
    individualDefense: 12,
    individualStamina: 11,
    moves: {
      quick: { type: TYPES.DRAGON, name: "Dracosouffle", power: 6 },
      charged: { type: TYPES.DRAGON, name: "Dracogriffe", power: 50 }
    }
  },
  {
    id: 134,
    name: "Aquali",
    type: [TYPES.WATER],
    level: 28,
    baseAttack: 205,
    baseDefense: 161,
    baseStamina: 277,
    individualAttack: 14,
    individualDefense: 11,
    individualStamina: 9,
    moves: {
      quick: { type: TYPES.WATER, name: "Pistolet à O", power: 5 },
      charged: { type: TYPES.WATER, name: "Hydracanon", power: 130 }
    }
  }
];
