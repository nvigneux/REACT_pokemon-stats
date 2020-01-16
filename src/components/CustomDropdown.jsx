import React from "react"
import Select from "react-select"
import { useField, useFormikContext } from "formik"

const formatOptionLabel = ({ name }) => {
  return (
    <div style={{ display: "flex" }}>
      <div>{name}</div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>{name}</div>
    </div>
  )
}

const CustomDropdown = ({ options, label, name, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field, meta] = useField(name)

  const handleOptionChange = selection => {
    setFieldValue(name, selection)
  }

  const updateBlur = () => {
    setFieldTouched(name, true)
  }

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
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
      {meta.touched && meta.error ? (
        <span className="custom-input-error">{meta.error}</span>
      ) : null}
    </>
  )
}

export default CustomDropdown
