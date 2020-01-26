import React from "react"
import { ErrorMessage } from "formik"

import CustomDropdown from "../CustomDropdown"
import OptionMove from "../OptionMove"

const ChargedMoveSelect = ({ chargedMoves }) => (
  <>
    <CustomDropdown
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

ChargedMoveSelect.propTypes = {
  chargedMoves: PropTypes.any.isRequired,
}

export default ChargedMoveSelect
