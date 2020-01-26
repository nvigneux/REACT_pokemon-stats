import React from "react"
import PropTypes from "prop-types"
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

MoveSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  moves: PropTypes.any.isRequired,
}

export default MoveSelect
