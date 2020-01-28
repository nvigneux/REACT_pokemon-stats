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
        className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
        htmlFor="difficulty"
      >
        Difficulty
      </label>
      <Field
        className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
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
