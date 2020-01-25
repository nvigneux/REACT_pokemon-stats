import React, { useState, useEffect } from "react"
import { ErrorMessage } from "formik"

// import useApi from "../../hooks/useApi"

import CustomDropdown from "../CustomDropdown"
import OptionMove from "../OptionMove"

// TODO try to make the call api before the render of component
const QuickMoveSelect = ({ quickMoves }) => (
  <>
    <CustomDropdown
      label="Attaque rapide"
      id="quick_move"
      name="quick_move"
      options={quickMoves}
      optionComponent={<OptionMove />}
      isSearchable={false}
      placeholder="Sélectionner l'attaque rapide"
    />
    <ErrorMessage
      className="text-red-500 text-xs italic"
      component="span"
      name="quick_move"
    />
  </>
)

QuickMoveSelect.propTypes = {}

export default QuickMoveSelect
