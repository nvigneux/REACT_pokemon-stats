import React, { useState, useEffect } from "react"
import { ErrorMessage } from "formik"

import CustomDropdown from "../CustomDropdown"
import OptionMove from "../OptionMove"

const MoveSelect = ({ name, moves }) => (
  <>
    <CustomDropdown
      label="Attaque rapide"
      id={name}
      name={name}
      options={moves}
      optionComponent={<OptionMove />}
      isSearchable={false}
      placeholder="Sélectionner l'attaque rapide"
    />
    <ErrorMessage
      className="text-red-500 text-xs italic"
      component="span"
      name={name}
    />
  </>
)

MoveSelect.propTypes = {}

export default MoveSelect
