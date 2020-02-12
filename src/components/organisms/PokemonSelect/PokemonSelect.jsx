import React from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import { ErrorMessage } from "formik"

import CustomSelect from "../../atoms/CustomSelect/CustomSelect"
import OptionPokemon from "../../molecules/OptionPokemon"

const PokemonSelect = ({ label, pokemons, isPokemonFormVisible }) => (
  <>
    <CustomSelect
      label={label}
      id="pokemon"
      name="pokemon"
      options={orderBy(pokemons, ["id_base_pokemon"], ["asc"])}
      optionComponent={<OptionPokemon />}
      isSearchable
      getOptionLabel={option => option.name}
      getOptionValue={option => option.id_base_pokemon}
      isDisabled={isPokemonFormVisible}
      placeholder={`Sélectionner un ${label}`}
    />
    {!isPokemonFormVisible ? (
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="pokemon"
      />
    ) : null}
  </>
)

PokemonSelect.propTypes = {
  isPokemonFormVisible: PropTypes.bool.isRequired,
  label: PropTypes.string,
}

PokemonSelect.defaultProps = {
  label: "pokémon",
}

export default PokemonSelect
