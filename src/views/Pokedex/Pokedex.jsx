import React, { useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, ErrorMessage } from "formik"

import useApi from "../../hooks/useApi"
import Layout from "../../components/Layout"
import Link from "../../components/Link/Link"
import CustomDropdown from "../../components/CustomDropdown"
import OptionPokemon from "../../components/OptionPokemon"
import OptionType from "../../components/OptionType"
import DisplayFormikState from "../forms/DisplayFormikState"

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

import { QUICK_MOVES } from "../../constants/moves"
import { TYPES_ARRAY } from "../../constants/types"

const PokedexValidationSchema = showPokemonForm => {
  const pokemonExistValidation = PokedexFormValidation.concat(
    PokedexSelectValidation
  )
  const pokemonNotExistValidation = PokedexFormValidation.concat(
    PokemonFormValidation
  )

  return showPokemonForm !== "visible"
    ? pokemonExistValidation
    : pokemonNotExistValidation
}

const Pokedex = () => {
  const [loadPokemons, pokemons, errorsPokemons, { fetchPokemons }] = useApi()
  const [
    loadQuickMoves,
    quickMoves,
    errorsQuickMoves,

    { fetchQuickMoves },
  ] = useApi()
  const [
    loadChargedMoves,
    chargedMoves,
    errorsChargedMoves,
    { fetchChargedMoves },
  ] = useApi()
  const [showPokemonForm, setShowPokemonForm] = useState("hidden")

  useEffect(() => {
    // TODO add suspense request
    fetchPokemons()
    fetchQuickMoves()
    fetchChargedMoves()
  }, [])

  return (
    <Layout>
      {/* <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1> */}
      <Formik
        initialValues={{
          pokemon: null,
          ...PokedexFormInitValues,
          ...PokemonFormInitValues,
        }}
        validationSchema={() => PokedexValidationSchema(showPokemonForm)}
        onSubmit={(values, actions) => {
          const references = {
            user: 1,
            quick_move: 1,
            charged_move: 1,
          }

          //TODO refacto la condition d'envoi des forms si pokemon ou non
          axios({
            method: "POST",
            url: "http://localhost:1337/pokedexes",
            data: { ...values, ...references, pokemon: values.pokemon.id },
          })
            .then(() => {
              actions.setSubmitting(false)
            })
            .catch(() => {
              actions.setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, errors, touched, ...props }) => (
          <Form className="bg-white flex flex-col">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
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
              </div>
              {showPokemonForm === "visible" ? (
                <Link
                  label="Je ne veux plus ajouter de pokemon."
                  onClick={() => setShowPokemonForm("hidden")}
                />
              ) : (
                <Link
                  label="Mon pokémon n'est pas dans la liste."
                  onClick={() => {
                    setShowPokemonForm("visible")
                  }}
                />
              )}
            </div>

            <PokedexForm pokemons={pokemons} />
            {/* TODO Make validation for each moves select */}
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <CustomDropdown
                  label="Attaque rapide"
                  id="quick_move"
                  name="quick_move"
                  options={quickMoves}
                  optionComponent={<OptionPokemon />}
                  isSearchable={false}
                  placeholder="Sélectionner l'attaque rapide"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="quick_move"
                />
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <CustomDropdown
                  label="Attaque chargé"
                  id="charged_move"
                  name="charged_move"
                  options={chargedMoves}
                  optionComponent={<OptionPokemon />}
                  isSearchable={false}
                  placeholder="Sélectionner l'attaque chargé"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="charged_move"
                />
              </div>
            </div>

            {showPokemonForm === "visible" ? (
              <>
                <PokemonForm />
                <div className="mb-3 px-1">
                  <div className="flex flex-col">
                    <CustomDropdown
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
              className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>

            <DisplayFormikState {...props} />
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Pokedex
