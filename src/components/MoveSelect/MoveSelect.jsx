import React, { useState, useEffect } from "react"
import { ErrorMessage } from "formik"

import CustomDropdown from "../CustomDropdown"
import OptionMove from "../OptionMove"

const MoveSelect = ({ label, name, moves }) => (
  <>
    <CustomDropdown
      label={label}
      id={name}
      name={name}
      options={moves}
      optionComponent={<OptionMove />}
      isSearchable={false}
      placeholder={`Sélectionner l'${label}`}
    />
    <ErrorMessage
      className="text-red-500 text-xs italic"
      component="span"
      name={name}
    />
  </>
)

//TODO rework proptype
MoveSelect.propTypes = {}

export default MoveSelect
