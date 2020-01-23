import React, { Suspense, lazy, useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, ErrorMessage } from "formik"
import { uniqBy } from "lodash"
import * as yup from "yup"

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

// TODO rename BiduleSelectComponent -> BiduleSelect
const PokemonSelectComponent = lazy(() =>
  import("../../components/PokemonSelectComponent")
)
const QuickMoveSelectComponent = lazy(() =>
  import("../../components/QuickMoveSelectComponent")
)
const ChargedMoveSelectComponent = lazy(() =>
  import("../../components/ChargedMoveSelectComponent")
)

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

const PokedexValueSchema = {
  pokemon: null,
  ...PokedexFormInitValues,
  ...PokemonFormInitValues,
}

// TODO make a Loading component for fallback SelectComponent
const Pokedex = () => {
  const [showPokemonForm, setShowPokemonForm] = useState("hidden")
  const [formCompletion, setformCompletion] = useState(0)

  const percentageCompletion = formValues => {
    const totalNode = PokedexValidationSchema(showPokemonForm)._nodes.length

    PokedexValidationSchema(showPokemonForm)
      .validate(formValues, { abortEarly: false })
      .then(() => {
        setformCompletion(100)
      })
      .catch(err => {
        const validationNode = uniqBy(err.inner, "path") // case where a same field trigger many validation
        const percentage = (validationNode.length / totalNode) * 100
        setformCompletion(100 - percentage)
      })
  }

  useEffect(() => {
    percentageCompletion(PokedexValueSchema)
  }, [])

  return (
    <Layout>
      {/* <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1> */}
      {/* TODO move pokemon init value */}
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
                <Suspense fallback="Loading PokemonSelectComponent ...">
                  <PokemonSelectComponent showPokemonForm={showPokemonForm} />
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
                <Suspense fallback="Loading QuickMoveSelectComponent ...">
                  {/* TODO make optionMove for select */}
                  <QuickMoveSelectComponent />
                </Suspense>
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <Suspense fallback="Loading ChargedMoveSelectComponent ...">
                  <ChargedMoveSelectComponent />
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

            <div className="flex">
              <span className="h-12 w-12 flex items-center justify-center text-white bg-blue-500 rounded-full border-blue-300 shadow-outline">
                {`${Math.floor(formCompletion)} %`}
              </span>
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white px-2 py-1 ml-4 rounded self-center"
                onClick={() => percentageCompletion(props.values)}
              >
                Test
              </button>
            </div>
            <DisplayFormikState {...props} />
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Pokedex
