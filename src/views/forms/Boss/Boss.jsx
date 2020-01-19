import React from "react"
import { Field, ErrorMessage } from "formik"
import CustomDropdown from "../../../components/CustomDropdown"

export const BossForm = ({ pokemons }) => (
  <>
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
    </div>
    <div className="mb-3 px-1 w-1/4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="difficulty"
      >
        Difficulty
      </label>
      <Field
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        name="difficulty"
      />
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="difficulty"
      />
    </div>
  </>
)
