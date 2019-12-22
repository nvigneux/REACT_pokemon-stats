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
      quick: {
        type: TYPES.WATER,
        name: "Trempette",
        power: 0,
        execTime: 1.73,
        energyGen: 20,
        energyReq: null
      },
      charged: {
        type: TYPES.NORMAL,
        name: "Lutte",
        power: 35,
        execTime: 2.7,
        energyGen: null,
        energyReq: 0
      }
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
      quick: {
        type: TYPES.POISON,
        name: "Direct Toxik",
        power: 10,
        execTime: 0.8,
        energyGen: 7,
        energyReq: null
      },
      charged: {
        type: TYPES.WATER,
        name: "Hydrocanon",
        power: 130,
        execTime: 3.3,
        energyGen: null,
        energyReq: 100
      }
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
      quick: {
        type: TYPES.PSYCHIC,
        name: "Choc Mental",
        power: 20,
        execTime: 1.6,
        energyGen: 15,
        energyReq: null
      },
      charged: {
        type: TYPES.PSYCHIC,
        name: "Psyko",
        power: 90,
        execTime: 2.8,
        energyGen: null,
        energyReq: 50
      }
    }
  },
  {
    id: 248,
    name: "Tyranocif",
    type: [TYPES.DARK, TYPES.ROCK],
    level: 30,
    baseAttack: 251,
    baseDefense: 207,
    baseStamina: 225,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 0,
    moves: {
      quick: {
        type: TYPES.ROCK,
        name: "Anti-Air",
        power: 16,
        execTime: 1.2,
        energyGen: 8,
        energyReq: null
      },
      charged: {
        type: TYPES.ROCK,
        name: "Lame de Roc",
        power: 100,
        execTime: 2.3,
        energyGen: null,
        energyReq: 100
      }
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
      quick: {
        type: TYPES.DRAGON,
        name: "Draco-Queue",
        power: 15,
        execTime: 1.1,
        energyGen: 9,
        energyReq: null
      },
      charged: {
        type: TYPES.DRAGON,
        name: "Colère",
        power: 110,
        execTime: 3.9,
        energyGen: null,
        energyReq: 50
      }
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
      quick: {
        type: TYPES.PSYCHIC,
        name: "Choc Mental",
        power: 20,
        execTime: 1.6,
        energyGen: 15,
        energyReq: null
      },
      charged: {
        type: TYPES.PSYCHIC,
        name: "Frappe Psy",
        power: 90,
        execTime: 2.3,
        energyGen: null,
        energyReq: 50
      }
    }
  }
];
