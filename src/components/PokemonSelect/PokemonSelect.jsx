import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import { ErrorMessage } from "formik"

import CustomDropdown from "../CustomDropdown"
import OptionPokemon from "../OptionPokemon"

const PokemonSelect = ({ pokemons, showPokemonForm }) => (
  <>
    <CustomDropdown
      label="Pokemons"
      id="pokemon"
      name="pokemon"
      options={pokemons}
      optionComponent={<OptionPokemon />}
      isSearchable={false}
      isDisabled={showPokemonForm === "visible"}
      placeholder="Sélectionner un pokémon"
    />
    {showPokemonForm === "hidden" ? (
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="pokemon"
      />
    ) : null}
  </>
)

PokemonSelect.propTypes = {
  showPokemonForm: PropTypes.string.isRequired,
}

export default PokemonSelect
