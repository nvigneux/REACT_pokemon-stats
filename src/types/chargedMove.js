import PropTypes from "prop-types"

const { shape, number, string } = PropTypes

export const ChargedMove = shape({
  id: number.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  power: number.isRequired,
  execution_time: number.isRequired,
  energy_required: number.isRequired,
})
