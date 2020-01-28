import React, { Suspense, lazy, useState } from "react"
import { Formik, Form, ErrorMessage } from "formik"

import useApi, {
  postPokedex,
  postPokemon,
  prefetchPokemons,
  prefetchQuickMoves,
  prefetchChargedMoves,
} from "../../hooks/useApi"
import ErrorBoundary from "../../hooks/ErrorBoundary"
import Layout from "../../components/Layout"
import Link from "../../components/Link/Link"
import CustomDropdown from "../../components/CustomDropdown"
import OptionType from "../../components/OptionType"
import LoadingSelect from "../../components/LoadingSelect/LoadingSelect"

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

import { TYPES_ARRAY } from "../../constants/types"

const PokemonSelect = lazy(() => import("../../components/PokemonSelect"))
const MoveSelect = lazy(() => import("../../components/MoveSelect"))

const pokemons = prefetchPokemons()
const quickMoves = prefetchQuickMoves()
const chargedMoves = prefetchChargedMoves()

const Pokedex = () => {
  const [isPokemonFormVisible, setIsPokemonFormVisible] = useState(false)

  const PokedexValidationSchema = isPokemonFormVisible => {
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

  const handleSubmitForm = values => {
    isPokemonFormVisible
      ? postPokemon({ ...values }).then(res => {
          postPokedex({ ...values, pokemon: res.data.id, user: 1 })
        })
      : postPokedex({ ...values, user: 1 })
  }

  return (
    <Layout>
      {/* <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1> */}
      <Formik
        initialValues={PokedexValueSchema}
        validationSchema={() => PokedexValidationSchema(isPokemonFormVisible)}
        onSubmit={values => handleSubmitForm(values)}
      >
        {({ isSubmitting, errors, touched, ...props }) => (
          <Form className="bg-white flex flex-col mt-2">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <Suspense fallback={<LoadingSelect />}>
                    {/* TODO style select box */}
                    <PokemonSelect
                      pokemons={pokemons}
                      isPokemonFormVisible={isPokemonFormVisible}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>

              <Link
                label={
                  isPokemonFormVisible
                    ? "Je ne veux plus ajouter de pokemon."
                    : "Mon pokémon n'est pas dans la liste."
                }
                onClick={() => handlePokemonFormVisibility()}
              />
            </div>

            <PokedexForm />

            <div className="my-2 px-1">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <Suspense fallback={<LoadingSelect labelWidth="24" />}>
                    <MoveSelect
                      label="attaque rapide"
                      name="quick_move"
                      moves={quickMoves}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <Suspense fallback={<LoadingSelect labelWidth="24" />}>
                    <MoveSelect
                      label="attaque chargé"
                      name="charged_move"
                      moves={chargedMoves}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>

            {isPokemonFormVisible ? (
              <>
                <span className="w-full h-px mt-2 mb-3 bg-gray-200"></span>
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
              className="self-end tracking-wide uppercase bg-green-pokemon text-white text-sm font-bold mt-4 py-3 px-8 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Envoyer
            </button>

            {/* <DisplayFormikState {...props} /> */}
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Pokedex
