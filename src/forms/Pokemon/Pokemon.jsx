import React from "react"
import { Field, ErrorMessage } from "formik"
import PropTypes from "prop-types"

export const PokemonForm = ({ prefix }) => (
  <div className="flex flex-col">
    <div className="flex flex-wrap">
      <div className="mb-3 px-1 w-4/6">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor={`${prefix}name`}
        >
          Nom
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="text"
          name={`${prefix}name`}
          placeholder="Nom du pokémon"
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name={`${prefix}name`}
        />
      </div>
      <div className="mb-3 px-1 w-2/6">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor={`${prefix}id_base_pokemon`}
        >
          Id Pokemon
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name={`${prefix}id_base_pokemon`}
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name={`${prefix}id_base_pokemon`}
        />
      </div>
    </div>
    <div className="flex flex-wrap">
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor={`${prefix}attack`}
        >
          Attaque
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name={`${prefix}attack`}
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name={`${prefix}attack`}
        />
      </div>
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor={`${prefix}defense`}
        >
          Défense
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name={`${prefix}defense`}
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name={`${prefix}defense`}
        />
      </div>
      <div className="mb-3 px-1 w-1/3">
        <label
          className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
          htmlFor={`${prefix}stamina`}
        >
          Stamina
        </label>
        <Field
          className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
          type="number"
          name={`${prefix}stamina`}
        />
        <ErrorMessage
          className="text-red-500 text-xs italic"
          component="span"
          name={`${prefix}stamina`}
        />
      </div>
    </div>
  </div>
)

PokemonForm.propTypes = {
  prefix: PropTypes.string,
}

PokemonForm.defaultProps = {
  prefix: "",
}
