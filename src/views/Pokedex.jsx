import React, { useState } from "react"
import { Formik, Form, ErrorMessage } from "formik"

import useApi from "../hooks/useApi"

import useAppContext from "../hooks/useAppContext"
import Link from "../components/atoms/Link/Link"
import CustomSelect from "../components/atoms/CustomSelect/CustomSelect"
import OptionType from "../components/molecules/OptionType"

import {
  PokedexFormValidation,
  PokedexSelectValidation,
  PokedexForm,
  PokedexFormInitValues,
} from "../forms/Pokedex"
import {
  PokemonFormValidation,
  PokemonForm,
  PokemonFormInitValues,
} from "../forms/Pokemon"

import { TYPES_ARRAY } from "../constants/types"

import PokemonSelect from "../components/organisms/PokemonSelect"
import MoveSelect from "../components/molecules/MoveSelect"

const Pokedex = ({ pokemons, quickMoves, chargedMoves }) => {
  const {
    context: { auth },
  } = useAppContext()
  const [isPokemonFormVisible, setIsPokemonFormVisible] = useState(false)
  const [, , , { postPokemon }] = useApi()
  const [, , , { postPokedex }] = useApi()

  const PokedexValidationSchema = () => {
    let pokemonValidation = PokedexFormValidation

    if (isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokemonFormValidation)

    if (!isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokedexSelectValidation)

    return pokemonValidation
  }

  const PokedexValueSchema = {
    ...PokedexFormInitValues,
    ...PokemonFormInitValues,
  }

  const handlePokemonFormVisibility = () => {
    setIsPokemonFormVisible(!isPokemonFormVisible)
  }

  const handleSubmitForm = (values, resetForm) =>
    isPokemonFormVisible
      ? postPokemon({ ...values }).then(res =>
          res.data
            ? postPokedex({
                ...values,
                pokemon: res.data.id,
                user: auth.id,
              }).then(resetForm)
            : res
        )
      : postPokedex({ ...values, user: auth.id }).then(resetForm)

  return (
    <>
      <Formik
        initialValues={PokedexValueSchema}
        validationSchema={PokedexValidationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitForm(values, resetForm)
        }
      >
        {() => (
          <Form className="flex flex-col mt-2">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <PokemonSelect
                  pokemons={pokemons}
                  isPokemonFormVisible={isPokemonFormVisible}
                />
              </div>

              <Link
                label={
                  isPokemonFormVisible
                    ? "Je ne veux plus ajouter de pokemon."
                    : "Mon pokémon n'est pas dans la liste ?"
                }
                onClick={handlePokemonFormVisibility}
              />
            </div>

            <PokedexForm />

            <div className="my-2 px-1">
              <div className="flex flex-col">
                <MoveSelect
                  label="attaque rapide"
                  name="quick_move"
                  moves={quickMoves}
                />
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <MoveSelect
                  label="attaque chargé"
                  name="charged_move"
                  moves={chargedMoves}
                />
              </div>
            </div>

            {isPokemonFormVisible ? (
              <>
                <PokemonForm />
                <div className="mb-3 px-1">
                  <div className="flex flex-col">
                    <CustomSelect
                      label="Type(s)"
                      id="type"
                      name="type"
                      options={TYPES_ARRAY}
                      optionComponent={<OptionType />}
                      isMulti
                      isSearchable={false}
                      placeholder="Sélectionner le(s) type(s)"
                    />
                    <ErrorMessage
                      className="text-red-500 text-xs italic"
                      component="span"
                      name="type"
                    />
                  </div>
                </div>
              </>
            ) : null}

            <button
              className="self-end tracking-wide uppercase bg-green-pokemon text-white text-sm font-bold mt-4 py-3 px-8 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Envoyer
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Pokedex
