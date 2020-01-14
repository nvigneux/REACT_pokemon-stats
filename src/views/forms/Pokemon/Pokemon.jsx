import React from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import Layout from "../../../components/Layout"

const numberValidation = Yup.number()
  .required("Required")
  .positive("Positive number !")
  .integer("No decimal value !")

const PokemonFormSchema = Yup.object().shape({
  id_base_pokemon: numberValidation,
  name: Yup.string().required("Required"),
  attack: numberValidation,
  defense: numberValidation,
  stamina: numberValidation,
})

const PokemonForm = () => {
  return (
    <Layout>
      <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1>
      <Formik
        initialValues={{
          id_base_pokemon: 0,
          name: "",
          attack: 0,
          defense: 0,
          stamina: 0,
        }}
        validationSchema={PokemonFormSchema}
        onSubmit={(values, actions) => {
          const type = { type: ["fighting"] }
          axios({
            method: "POST",
            url: "http://localhost:1337/pokemons",
            data: { ...values, type },
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
        {({ error, isSubmitting }) => (
          <Form className="bg-white flex flex-col">
            <div className="flex flex-wrap">
              <div className="mb-3 px-1 w-4/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nom
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="name"
                />
              </div>
              <div className="mb-3 px-1 w-2/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="id_base_pokemon"
                >
                  Id Pokemon
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="id_base_pokemon"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="id_base_pokemon"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mb-3 px-1 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="attack"
                >
                  Attaque
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="attack"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="attack"
                />
              </div>
              <div className="mb-3 px-1 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="defense"
                >
                  Défense
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="defense"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="defense"
                />
              </div>
              <div className="mb-6 px-1 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stamina"
                >
                  Stamina
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="stamina"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  component="span"
                  name="stamina"
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

export default PokemonForm
