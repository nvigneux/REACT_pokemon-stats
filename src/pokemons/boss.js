import * as TYPES from "../types";

export const BOSS_MOCK = [
  {
    id: 129,
    name: "Magicarpe",
    type: [TYPES.WATER],
    level: 41,
    baseAttack: 29,
    baseDefense: 85,
    baseStamina: 700,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.WATER, name: "Trempette", power: 0 },
      charged: { type: TYPES.NORMAL, name: "Lutte", power: 35 }
    }
  },
  {
    id: 73,
    name: "Tentacruel",
    type: [TYPES.WATER, TYPES.POISON],
    level: 41,
    baseAttack: 166,
    baseDefense: 209,
    baseStamina: 2025,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.POISON, name: "Direct Toxik", power: 10 },
      charged: { type: TYPES.POISON, name: "Hydrocanon", power: 130 }
    }
  },
  {
    id: 196,
    name: "Mentali",
    type: [TYPES.PSYCHIC],
    level: 41,
    baseAttack: 261,
    baseDefense: 175,
    baseStamina: 3000,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.PSYCHIC, name: "Choc Mental", power: 20 },
      charged: { type: TYPES.PSYCHIC, name: "Psyko", power: 90 }
    }
  },
  {
    id: 248,
    name: "Tyranocif",
    type: [TYPES.DARK, TYPES.ROCK],
    level: 41,
    baseAttack: 251,
    baseDefense: 207,
    baseStamina: 7500,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.ROCK, name: "Anti-Air", power: 16 },
      charged: { type: TYPES.ROCK, name: "Lame de Roc", power: 100 }
    }
  },
  {
    id: 384,
    name: "Rayquaza",
    type: [TYPES.DRAGON, TYPES.FLYING],
    level: 41,
    baseAttack: 284,
    baseDefense: 170,
    baseStamina: 12500,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.DRAGON, name: "Draco-Queue", power: 15 },
      charged: { type: TYPES.DRAGON, name: "Colère", power: 110 }
    }
  },
  {
    id: 150,
    name: "MewTwo",
    type: [TYPES.PSYCHIC],
    level: 41,
    baseAttack: 300,
    baseDefense: 182,
    baseStamina: 22500,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: { type: TYPES.PSYCHIC, name: "Choc Mental", power: 20 },
      charged: { type: TYPES.PSYCHIC, name: "Frappe Psy", power: 90 }
    }
  }
];
