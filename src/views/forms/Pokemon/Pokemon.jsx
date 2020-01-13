import React from "react"
import axios from "axios"
import { Formik, Form, Field } from "formik"

const PokemonForm = () => {
  return (
    <>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{
          id_base_pokemon: 0,
          name: "",
          attack: 0,
          defense: 0,
          stamina: 0,
        }}
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
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PokemonForm
