import * as TYPES from "../types"

export const POKEMON_MOCK = [
  {
    id: 68,
    name: "Mackogneur",
    type: [TYPES.FIGHTING],
    level: 40,
    baseAttack: 234,
    baseDefense: 159,
    baseStamina: 207,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 15,
    moves: {
      quick: 1,
      charged: 8,
    },
  },
  {
    id: 297,
    name: "Hariyama",
    type: [TYPES.FIGHTING],
    level: 40,
    baseAttack: 209,
    baseDefense: 114,
    baseStamina: 302,
    individualAttack: 15,
    individualDefense: 15,
    individualStamina: 15,
    moves: {
      quick: 1,
      charged: 8,
    },
  },
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
      quick: 3,
      charged: 9,
    },
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
      quick: 3,
      charged: 10,
    },
  },
]

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getRandomString = length => {
  const chars = [..."abcdefghijklmnopqrstuvwxyz"]
  return [...Array(length)].map(() => chars[getRandomInt(0, chars.length)])
    .join``
}

export const generateFakePokemons = number => {
  const arrayFakePokemons = []
  for (let i = 0; i < number; i += 1) {
    arrayFakePokemons.push({
      id: getRandomInt(1, 450),
      name: getRandomString(getRandomInt(5, 10)),
      type: [TYPES.DRAGON, TYPES.FLYING],
      level: getRandomInt(20, 40),
      baseAttack: getRandomInt(150, 280),
      baseDefense: getRandomInt(150, 280),
      baseStamina: getRandomInt(150, 280),
      individualAttack: getRandomInt(0, 15),
      individualDefense: getRandomInt(0, 15),
      individualStamina: getRandomInt(0, 15),
      moves: {
        quick: getRandomInt(1, 199),
        charged: getRandomInt(1, 199),
      },
    })
  }
  return arrayFakePokemons
}
