import React from "react"
import PropTypes from "prop-types"
import { ErrorMessage } from "formik"

import CustomSelect from "../../atoms/CustomSelect/CustomSelect"
import OptionMove from "../OptionMove"

const MoveSelect = ({ label, name, moves }) => (
  <>
    <CustomSelect
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

// Todo type charged move
MoveSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // moves: PropTypes.any.isRequired,
}

export default MoveSelect
