import PropTypes from "prop-types"

const { shape, number } = PropTypes

export const Stats = shape({
  cp: number.isRequired,
  iv: number.isRequired,
  attack: number.isRequired,
  defense: number.isRequired,
  stamina: number.isRequired,
})
