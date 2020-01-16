import React from "react"
import Select, { components } from "react-select"
import { useField, useFormikContext } from "formik"
import { cloneDeep } from "lodash"
import { IMG_URL, IMG_FORMAT } from "../constants/constant"

const OptionPokemon = ({ data, innerRef, innerProps, ...props }) => {
  console.log(props)

  return (
    <div ref={innerRef} {...innerProps}>
      <img
        className="center justify-center w-16"
        src={IMG_URL + data.id_base_pokemon + IMG_FORMAT}
        alt={data.name}
      />
      <span>{data.id_base_pokemon}</span>
      <span>{data.name}</span>
    </div>
  )
}

// https://medium.com/@lahiru0561/react-select-with-custom-label-and-custom-search-122bfe06b6d7
// stackoverflow.com/questions/58804769/react-select-losing-focus-for-custom-component-valuecontainer
const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue } = props
  const newChildren = cloneDeep(children)
  const nbValues = getValue().length
  newChildren[0] = `${nbValues} items selected`

  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    )
  }
  return (
    <components.ValueContainer {...props}>
      {newChildren}
    </components.ValueContainer>
  )
}

const CustomDropdown = ({ options, label, name, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field, meta] = useField(name)

  const handleOptionChange = selection => {
    setFieldValue(name, selection.id)
  }

  const updateBlur = () => {
    setFieldTouched(name, true)
  }
  console.log(field, meta)
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="iv_attack"
      >
        {label}
      </label>
      <Select
        options={options}
        {...field}
        {...props}
        onBlur={updateBlur}
        onChange={handleOptionChange}
        components={{ Option: OptionPokemon, ValueContainer }}
      />

      <Select
        components={{ Option: OptionPokemon, ValueContainer }}
        options={options}
      />
      {meta.touched && meta.error ? (
        <span className="custom-input-error">{meta.error}</span>
      ) : null}
    </>
  )
}

export default CustomDropdown
