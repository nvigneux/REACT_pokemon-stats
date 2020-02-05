import PropTypes from "prop-types"

const { shape, arrayOf, number, string } = PropTypes

export const Pokemon = shape({
  id: number.isRequired,
  name: string.isRequired,
  attack: number.isRequired,
  defense: number.isRequired,
  stamina: number.isRequired,
  id_base_pokemon: number.isRequired,
  type: arrayOf(shape({ id: number.isRequired, name: string.isRequired }))
    .isRequired,
})
