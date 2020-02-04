import React, { cloneElement } from "react"
import Select from "react-select"

import { selectForm } from "../../constants/stylesSelect"

import OptionPokemon from "../OptionPokemon"

const BossSelect = ({ bosses, active }) => (
  <>
    <Select
      styles={selectForm}
      options={bosses}
      isSearchable={false}
      formatOptionLabel={option => {
        return cloneElement(<OptionPokemon />, { key: option.id, ...option })
      }}
      getOptionValue={option => option.id}
      isOptionSelected={option => (active ? active.id === option.id : false)}
      placeholder="Choisir un boss ..."
    />
  </>
)

export default BossSelect
