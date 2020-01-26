import React, { cloneElement } from "react"
import Select, { components } from "react-select"
import PropTypes from "prop-types"
import { useField, useFormikContext } from "formik"

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

const styles = {
  singleValue: defaultStyles => ({
    ...defaultStyles,
    width: "92%",
  }),
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
        className="capitalize block text-gray-700 text-sm font-bold mb-3"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        styles={styles}
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
