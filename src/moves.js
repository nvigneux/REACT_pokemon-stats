import * as TYPES from "./types"

export const QUICK_MOVES = [
  {
    id: 1,
    type: TYPES.FIGHTING,
    name: "Riposte",
    power: 12,
    execTime: 0.9,
    energyGen: 8,
  },
  {
    id: 2,
    type: TYPES.DRAGON,
    name: "Dracosouffle",
    power: 6,
    execTime: 0.5,
    energyGen: 4,
  },
  {
    id: 3,
    type: TYPES.WATER,
    name: "Pistolet à O",
    power: 5,
    execTime: 0.5,
    energyGen: 5,
  },
  {
    id: 4,
    type: TYPES.POISON,
    name: "Direct Toxik",
    power: 10,
    execTime: 0.8,
    energyGen: 7,
  },
  {
    id: 5,
    type: TYPES.PSYCHIC,
    name: "Choc Mental",
    power: 20,
    execTime: 1.6,
    energyGen: 15,
  },
  {
    id: 6,
    type: TYPES.ROCK,
    name: "Anti-Air",
    power: 16,
    execTime: 1.2,
    energyGen: 8,
  },
  {
    id: 7,
    type: TYPES.DRAGON,
    name: "Draco-Queue",
    power: 15,
    execTime: 1.1,
    energyGen: 9,
  },
  {
    id: 8,
    type: TYPES.FIGHTING,
    name: "Dynamopoing",
    power: 90,
    execTime: 2.7,
    energyReq: 50,
  },
  {
    id: 9,
    type: TYPES.DRAGON,
    name: "Dracogriffe",
    power: 50,
    execTime: 1.7,
    energyReq: 33,
  },
  {
    id: 10,
    type: TYPES.WATER,
    name: "Hydracanon",
    power: 130,
    execTime: 3.3,
    energyReq: 100,
  },
  {
    id: 11,
    type: TYPES.DRAGON,
    name: "Colère",
    power: 110,
    execTime: 3.9,
    energyReq: 50,
  },
  {
    id: 12,
    type: TYPES.PSYCHIC,
    name: "Frappe Psy",
    power: 90,
    execTime: 2.3,
    energyReq: 50,
  },
  {
    id: 13,
    type: TYPES.ROCK,
    name: "Lame de Roc",
    power: 100,
    execTime: 2.3,
    energyReq: 100,
  },
  {
    id: 14,
    type: TYPES.PSYCHIC,
    name: "Psyko",
    power: 90,
    execTime: 2.8,
    energyReq: 50,
  },
]

export const generateFakeMoves = number => {
  const arrayFakeMoves = []
  for (let i = 0; i < number; i += 1) {
    arrayFakeMoves.push({
      id: i,
      type: TYPES.PSYCHIC,
      name: "Psyko",
      power: 90,
      execTime: 2.8,
      energyGen: 5,
      energyReq: 50,
    })
  }
  return arrayFakeMoves
}
