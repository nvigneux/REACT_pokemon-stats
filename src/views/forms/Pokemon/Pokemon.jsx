import React from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import Layout from "../../../components/Layout"

const numberValidation = Yup.number()
  .required("Required")
  .positive("A positive number !")
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
      <h1>Any place in your app!</h1>
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
          <Form className="bg-white">
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
            <ErrorMessage name="id_base_pokemon" />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
            />
            <ErrorMessage name="name" />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="attack"
            >
              Attack
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="attack"
            />
            <ErrorMessage name="attack" />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="defense"
            >
              Defense
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="defense"
            />
            <ErrorMessage name="defense" />
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
            <ErrorMessage name="stamina" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default PokemonForm
