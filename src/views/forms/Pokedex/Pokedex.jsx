import React from "react"
import { Field, ErrorMessage } from "formik"

export const PokedexForm = () => (
  <>
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
      <div className="mb-3 px-1 w-1/4">
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
      <div className="mb-3 px-1 w-1/4">
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
  </>
)
