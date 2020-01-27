import React, { Suspense, lazy, useState } from "react"
import axios from "axios"
import { Formik, Form, ErrorMessage } from "formik"
import { prefetch } from "react-suspense-fetch"

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

import {
  API_POKEMONS,
  API_POKEDEXES,
  API_QUICK_MOVE,
  API_CHARGED_MOVE,
} from "../../constants/constant"
import { TYPES_ARRAY } from "../../constants/types"

const PokemonSelect = lazy(() => import("../../components/PokemonSelect"))
const MoveSelect = lazy(() => import("../../components/MoveSelect"))

const pokemons = prefetch(async () => (await fetch(API_POKEMONS)).json())
const quickMoves = prefetch(async () => (await fetch(API_QUICK_MOVE)).json())
const chargedMoves = prefetch(async () =>
  (await fetch(API_CHARGED_MOVE)).json()
)

const Pokedex = () => {
  const [isPokemonFormVisible, setisPokemonFormVisible] = useState(false)

  const PokedexValidationSchema = isPokemonFormVisible => {
    let pokemonValidation = PokedexFormValidation

    if (isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokemonFormValidation)

    if (!isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokedexSelectValidation)

    return pokemonValidation
  }

  const PokedexValueSchema = {
    pokemon: null,
    ...PokedexFormInitValues,
    ...PokemonFormInitValues,
  }

  const handleSubmitForm = values => {
    isPokemonFormVisible
      ? axios({
          method: "POST",
          url: API_POKEMONS,
          data: { ...values },
        })
          .then(res => {
            axios({
              method: "POST",
              url: API_POKEDEXES,
              data: { ...values, pokemon: res.data.id, user: 1 },
            })
              .then(res => {
                console.log("res, set message confirmation")
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            console.log(error)
          })
      : axios({
          method: "POST",
          url: API_POKEDEXES,
          data: { ...values, user: 1 },
        })
          .then(() => {
            console.log("res, set message confirmation")
          })
          .catch(error => {
            console.log(error)
          })
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
          <Form className="bg-white flex flex-col">
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
              {isPokemonFormVisible ? (
                <Link
                  label="Je ne veux plus ajouter de pokemon."
                  onClick={() => setisPokemonFormVisible(false)}
                />
              ) : (
                <Link
                  label="Mon pokémon n'est pas dans la liste."
                  onClick={() => {
                    setisPokemonFormVisible(true)
                  }}
                />
              )}
            </div>

            <PokedexForm />

            <div className="mb-3 px-1">
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
              className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
