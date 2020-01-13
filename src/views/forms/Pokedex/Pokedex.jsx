import React from "react"
import axios from "axios"
import { Formik, Form, Field } from "formik"

const PokedexForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          iv_attack: 0,
          iv_defense: 0,
          iv_stamina: 0,
        }}
        onSubmit={(values, actions) => {
          const references = {
            pokemon: 1,
            user: 1,
            quick_move: 1,
            charged_move: 1,
          }
          axios({
            method: "POST",
            url: "http://localhost:1337/pokedexes",
            data: { ...values, ...references },
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
              htmlFor="iv_attack"
            >
              Iv attack
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="iv_attack"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="iv_defense"
            >
              Iv defense
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="iv_defense"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="iv_stamina"
            >
              Iv stamina
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="iv_stamina"
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PokedexForm
