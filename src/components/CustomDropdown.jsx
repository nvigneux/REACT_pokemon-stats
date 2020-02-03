import React, { cloneElement } from "react"
import Select, { components } from "react-select"
import PropTypes from "prop-types"
import { useField, useFormikContext } from "formik"

import { selectForm } from "../constants/stylesSelect"

const MultiValueLabel = props => {
  return (
    <span className="bg-gray-100">
      <components.MultiValueLabel {...props} />
    </span>
  )
}

const MultiValueRemove = props => {
  return (
    <span className="bg-gray-100 flex text-gray-800">
      <components.MultiValueRemove {...props} />
    </span>
  )
}

const CustomDropdown = ({
  options,
  optionComponent,
  label,
  name,
  ...props
}) => {
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
        className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        styles={selectForm}
        components={{ MultiValueLabel, MultiValueRemove }}
        options={options}
        onBlur={updateBlur}
        onChange={handleOptionChange}
        formatOptionLabel={option => {
          return cloneElement(optionComponent, { key: option.id, ...option })
        }}
        getOptionValue={option => option.id}
        isOptionSelected={option =>
          field.value ? field.value.id === option.id : false
        }
      />
    </>
  )
}

CustomDropdown.propTypes = {
  options: PropTypes.any.isRequired,
  optionComponent: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default CustomDropdown
