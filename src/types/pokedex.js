import PropTypes from "prop-types"

import { Pokemon } from "./pokemon"
import { QuickMove } from "./quickMove"
import { ChargedMove } from "./chargedMove"
import { Stats } from "./stats"

const { shape, number } = PropTypes

export const Pokedex = shape({
  id: number.isRequired,
  pokemon: Pokemon,
  iv_attack: number.isRequired,
  iv_defense: number.isRequired,
  iv_stamina: number.isRequired,
  level: number.isRequired,
  quick_move: QuickMove,
  charged_move: ChargedMove,
  stats: Stats,
})
