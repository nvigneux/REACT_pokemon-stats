import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import { ErrorMessage } from "formik"

import useApi from "../../hooks/useApi"

import CustomDropdown from "../CustomDropdown"
import OptionPokemon from "../OptionPokemon"

const PokemonSelectComponent = () => {
  const [, dataPokemons, , { fetchPokemons }] = useApi()
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetchPokemons()
  }, [])

  useEffect(() => {
    if (dataPokemons && dataPokemons.length) setPokemons(dataPokemons)
  }, [dataPokemons])

  return (
    <>
      <CustomDropdown
        label="Pokemons"
        id="pokemon"
        name="pokemon"
        options={pokemons}
        optionComponent={<OptionPokemon />}
        isSearchable={false}
        // isDisabled={showPokemonForm === "visible"}
        placeholder="Sélectionner un pokémon"
      />
      {/* {showPokemonForm === "hidden" ? ( */}
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="pokemon"
      />
      {/* ) : null} */}
    </>
  )
}

PokemonSelectComponent.propTypes = {}

export default PokemonSelectComponent
