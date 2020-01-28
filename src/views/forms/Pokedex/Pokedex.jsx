import React from "react"
import { Field, ErrorMessage } from "formik"

export const PokedexForm = () => (
  <>
    <div className="mb-3 px-1 w-1/3">
      <label
        className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
        htmlFor="iv_stamina"
      >
        Level
      </label>
      <Field
        className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
        type="number"
        name="level"
      />
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="level"
      />
    </div>
    <div className="flex flex-wrap">
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="iv_attack"
        >
          IV Attaque
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name="iv_attack"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name="iv_attack"
        />
      </div>
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="iv_defense"
        >
          IV Défense
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name="iv_defense"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name="iv_defense"
        />
      </div>
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor="iv_stamina"
        >
          IV Stamina
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name="iv_stamina"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name="iv_stamina"
        />
      </div>
    </div>
  </>
)
