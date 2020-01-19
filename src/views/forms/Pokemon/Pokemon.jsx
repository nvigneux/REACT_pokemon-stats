import React from "react"
import { Field, ErrorMessage } from "formik"

export const PokemonFormInitValues = {
  id_base_pokemon: 0,
  name: "",
  attack: 0,
  defense: 0,
  stamina: 0,
}

export const PokemonForm = () => (
  <div className="bg-white flex flex-col">
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
  </div>
)
