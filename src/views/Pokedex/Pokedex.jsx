import React, { Suspense, lazy, useState } from "react"
import axios from "axios"
import { Formik, Form, ErrorMessage } from "formik"
import { prefetch } from "react-suspense-fetch"

import Layout from "../../components/Layout"
import Link from "../../components/Link/Link"
import CustomDropdown from "../../components/CustomDropdown"
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

import { TYPES_ARRAY } from "../../constants/types"

const PokemonSelect = lazy(() => import("../../components/PokemonSelect"))
const MoveSelect = lazy(() => import("../../components/MoveSelect"))

const pokemons = prefetch(async () =>
  (await fetch("http://localhost:1337/pokemons")).json()
)
const quickMoves = prefetch(async () =>
  (await fetch("http://localhost:1337/quick-moves")).json()
)
const chargedMoves = prefetch(async () =>
  (await fetch("http://localhost:1337/charged-moves")).json()
)

// TODO make a Loading component for fallback Select
const Pokedex = () => {
  const [showPokemonForm, setShowPokemonForm] = useState("hidden")

  const PokedexValidationSchema = showPokemonForm => {
    let pokemonValidation = PokedexFormValidation

    if (showPokemonForm === "visible")
      pokemonValidation = pokemonValidation.concat(PokemonFormValidation)

    if (showPokemonForm === "hidden")
      pokemonValidation = pokemonValidation.concat(PokedexSelectValidation)

    return pokemonValidation
  }

  const PokedexValueSchema = {
    pokemon: null,
    ...PokedexFormInitValues,
    ...PokemonFormInitValues,
  }

  return (
    <Layout>
      {/* <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1> */}
      <Formik
        initialValues={PokedexValueSchema}
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
                <Suspense fallback="Loading PokemonSelect ...">
                  <PokemonSelect
                    pokemons={pokemons}
                    showPokemonForm={showPokemonForm}
                  />
                </Suspense>
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

            <PokedexForm />

            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <Suspense fallback="Loading QuickMoveSelect ...">
                  <MoveSelect name="quick_moves" moves={quickMoves} />
                </Suspense>
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <Suspense fallback="Loading ChargedMoveSelect ...">
                  <MoveSelect name="charged_moves" moves={chargedMoves} />
                </Suspense>
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
