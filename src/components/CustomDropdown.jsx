import React, { cloneElement } from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { useField, useFormikContext } from "formik"

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
        className="block text-gray-700 text-sm font-bold mb-3"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        options={options}
        onBlur={updateBlur}
        onChange={handleOptionChange}
        formatOptionLabel={option =>
          cloneElement(optionComponent, { ...option })
        }
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
  optionComponent: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default CustomDropdown
