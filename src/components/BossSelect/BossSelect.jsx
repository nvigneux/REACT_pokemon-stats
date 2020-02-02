import React, { cloneElement } from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import Select, { components } from "react-select"

import OptionPokemon from "../OptionPokemon"

const BossSelect = ({ bosses, active }) => (
  <>
    <Select
      options={bosses}
      isSearchable={false}
      formatOptionLabel={option => {
        return cloneElement(<OptionPokemon />, { key: option.id, ...option })
      }}
      getOptionValue={option => option.id}
      isOptionSelected={option => (active ? active.id === option.id : false)}
    />
  </>
)

export default BossSelect
