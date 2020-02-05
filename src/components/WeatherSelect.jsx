import React, { cloneElement } from "react"
import Select from "react-select"

import OptionWeather from "./OptionWeather"

import { selectWeather } from "../constants/stylesSelect"

const WeatherSelect = ({ values, activeValue, select }) => (
  <div className="relative">
    <Select
      styles={selectWeather}
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
)

export default React.memo(WeatherSelect)
