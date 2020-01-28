import React from "react"
import { Field, ErrorMessage } from "formik"

export const PokemonForm = () => (
  <div className="bg-white flex flex-col">
    <div className="flex flex-wrap">
      <div className="mb-3 px-1 w-4/6">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="name"
        >
          Nom
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="text"
          name="name"
          placeholder="Nom du pokémon"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name="name"
        />
      </div>
      <div className="mb-3 px-1 w-2/6">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="id_base_pokemon"
        >
          Id Pokemon
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
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
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="attack"
        >
          Attaque
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
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
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="defense"
        >
          Défense
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name="defense"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name="defense"
        />
      </div>
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="stamina"
        >
          Stamina
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
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
