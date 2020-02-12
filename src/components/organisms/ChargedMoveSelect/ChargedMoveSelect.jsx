import React from "react"
// import PropTypes from "prop-types"

import { ErrorMessage } from "formik"

import CustomSelect from "../../atoms/CustomSelect"
import OptionMove from "../../molecules/OptionMove"

const ChargedMoveSelect = ({ chargedMoves }) => (
  <>
    <CustomSelect
      label="Attaque rapide"
      id="charged_move"
      name="charged_move"
      options={chargedMoves}
      optionComponent={<OptionMove />}
      isSearchable={false}
      placeholder="Sélectionner l'attaque rapide"
    />
    <ErrorMessage
      className="text-red-500 text-xs italic"
      component="span"
      name="charged_move"
    />
  </>
)

// Todo type charged move
// ChargedMoveSelect.propTypes = {
//   chargedMoves: PropTypes.any.isRequired,
// }

export default ChargedMoveSelect
