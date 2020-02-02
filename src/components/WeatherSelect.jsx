/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { cloneElement } from "react"
import Select, { components } from "react-select"
import OptionWeather from "./OptionWeather"

const styles = {
  singleValue: defaultStyles => ({
    ...defaultStyles,
    width: "92%",
  }),
  valueContainer: defaultStyles => ({
    ...defaultStyles,
    height: "42px",
    padding: "2px 4px",
  }),
  container: defaultStyles => ({
    ...defaultStyles,
    border: "none",
  }),
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    border: "none",
    boxShadow: 0,
  }),
  placeholder: defaultStyles => ({
    ...defaultStyles,
    fontSize: "0.75rem",
    color: "#96a4a5",
    textTransform: "uppercase",
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: defaultStyles => ({
    ...defaultStyles,
    padding: "8px 0px",
    width: "12px",
  }),
}

const WeatherSelect = ({ values, activeValue, select }) => (
  <div className="w-1/3 px-2 mb-6">
    <div className="relative">
      <Select
        styles={styles}
        options={values}
        onChange={select}
        defaultValue={activeValue}
        isSearchable={false}
        formatOptionLabel={option => {
          return cloneElement(<OptionWeather />, { key: option.label, ...option })
        }}
        getOptionValue={option => option.label}
        isOptionSelected={option =>
          activeValue ? activeValue.label === option.label : false
        }
      />
    </div>
  </div>
)

export default React.memo(WeatherSelect)
