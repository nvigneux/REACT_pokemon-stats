import React from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { useField, useFormikContext } from "formik"

import { IMG_URL, IMG_FORMAT } from "../constants/constant"

// TODO move format option label compoennt in parent node refacto
const formatOptionLabel = ({ id, name }) => {
  return (
    <div className="flex items-center">
      <img
        className="h-8 mr-2"
        src={IMG_URL + id + IMG_FORMAT}
        alt={`${name}`}
      />
      <div className="text-base text-gray-900 font-medium">{name}</div>
    </div>
  )
}

const CustomDropdown = ({ options, label, name, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field] = useField(name)

  const handleOptionChange = selection => {
    setFieldValue(name, selection)
  }

  const updateBlur = () => {
    setFieldTouched(name, true)
  }

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-3"
        htmlFor="iv_attack"
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        options={options}
        onBlur={updateBlur}
        onChange={handleOptionChange}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={option => `${option}`}
        isOptionSelected={option =>
          field.value ? field.value.id === option.id : false
        }
      />
    </>
  )
}

CustomDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // optionComponent: PropTypes.node.isRequired,
}

export default CustomDropdown
