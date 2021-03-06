import React, { cloneElement } from "react"
import Select from "react-select"

import { selectForm } from "../../../constants/stylesSelect"

import OptionBoss from "../OptionBoss"

const BossSelect = ({ bosses, activeValue, select }) => (
  <>
    <Select
      styles={selectForm}
      options={bosses}
      onChange={select}
      isSearchable
      isClearable
      formatOptionLabel={option => {
        return cloneElement(<OptionBoss />, { key: option.id, ...option })
      }}
      getOptionValue={option => option.pokemon.id_base_pokemon}
      getOptionLabel={option => option.pokemon.name}
      isOptionSelected={option =>
        activeValue ? activeValue.id === option.id : false
      }
      placeholder="Choisir un boss ..."
    />
  </>
)

export default BossSelect
