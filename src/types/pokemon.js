import PropTypes from "prop-types"

const { shape, number, string } = PropTypes

export const Pokemon = shape({
  id: number.isRequired,
  name: string.isRequired,
  level: number.isRequired,
  baseAttack: number.isRequired,
  baseDefense: number.isRequired,
  baseStamina: number.isRequired,
  individualAttack: number.isRequired,
  individualDefense: number.isRequired,
  individualStamina: number.isRequired,
  moves: shape({
    quick: shape({
      id: number.isRequired,
      type: string.isRequired,
      name: string.isRequired,
      power: number.isRequired,
      execTime: number.isRequired,
      energyGen: number.isRequired,
    }).isRequired,
    charged: shape({
      id: number.isRequired,
      type: string.isRequired,
      name: string.isRequired,
      power: number.isRequired,
      execTime: number.isRequired,
      energyReq: number.isRequired,
    }).isRequired,
  }).isRequired,
  stats: shape({
    cp: number.isRequired,
    iv: number.isRequired,
    attack: number.isRequired,
    defense: number.isRequired,
    stamina: number.isRequired,
  }).isRequired,
})
