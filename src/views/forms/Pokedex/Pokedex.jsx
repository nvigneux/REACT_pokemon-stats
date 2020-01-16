import React, { useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import Layout from "../../../components/Layout"
import CustomDropdown from "../../../components/CustomDropdown"

const numberValidation = Yup.number()
  .required("Required")
  .integer("No decimal value !")
  .min(0, "> 0")

const PokedexFormSchema = Yup.object().shape({
  pokemon: Yup.object()
    .shape({})
    .required("Required"),
  level: numberValidation,
  iv_attack: numberValidation,
  iv_defense: numberValidation,
  iv_stamina: numberValidation,
})

const PokedexForm = () => {
  const [pokemons, setPokemons] = useState([])
  const [showPokemonForm, setShowPokemonForm] = useState("hidden")

  const handleFormPokemon = () => {
    console.log("show add pokemon form")
    setShowPokemonForm("visible")
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1337/pokemons",
    })
      .then(res => {
        setPokemons(res.data)
      })
      .catch(() => {
        console.log("erreur pokemon")
      })
  }, [])

  return (
    <Layout>
      <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1>
      <Formik
        initialValues={{
          level: 0,
          iv_attack: 0,
          iv_defense: 0,
          iv_stamina: 0,
        }}
        validationSchema={PokedexFormSchema}
        onSubmit={(values, actions) => {
          const references = {
            user: 1,
            quick_move: 1,
            charged_move: 1,
          }
          axios({
            method: "POST",
            url: "http://localhost:1337/pokedexes",
            data: { ...values, ...references, pokemon: values.pokemon.id },
          })
            .then(() => {
              actions.setSubmitting(false)
              actions.resetForm()
            })
            .catch(() => {
              actions.setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="bg-white flex flex-col">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <CustomDropdown
                  label="Pokemons"
                  id="pokemon"
                  name="pokemon"
                  options={pokemons}
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="pokemon"
                />
              </div>
              <span
                onClick={handleFormPokemon}
                className="text-gray-600 active:text-gray-400 focus:text-gray-500 hover:text-gray-500 text-xs italic underline cursor-pointer"
              >
                Mon pokémon n'est pas dans la liste.
              </span>
            </div>
            {showPokemonForm === "visible" ? (
              <div className="mb-3 px-1">pokemon form</div>
            ) : null}
            <div className="flex flex-wrap">
              <div className="mb-3 px-1 w-1/4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="iv_attack"
                >
                  IV Attaque
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="iv_attack"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="iv_attack"
                />
              </div>
              <div className="mb-3 px-1 w-1/4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="iv_defense"
                >
                  IV Défense
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="iv_defense"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="iv_defense"
                />
              </div>
              <div className="mb-6 px-1 w-1/4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="iv_stamina"
                >
                  IV Stamina
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="iv_stamina"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="iv_stamina"
                />
              </div>
              <div className="mb-6 px-1 w-1/4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="iv_stamina"
                >
                  Level
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="level"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="level"
                />
              </div>
            </div>
            <button
              className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default PokedexForm
