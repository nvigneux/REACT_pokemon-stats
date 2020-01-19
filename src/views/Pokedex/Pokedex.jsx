import React, { useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, ErrorMessage } from "formik"

import DisplayFormikState from "../forms/DisplayFormikState"

import Layout from "../../components/Layout"
import Link from "../../components/Link/Link"
import CustomDropdown from "../../components/CustomDropdown"
import OptionLabel from "../../components/OptionLabel"

import {
  PokedexFormValidation,
  PokedexSelectValidation,
  PokedexForm,
  PokedexFormInitValues,
} from "../forms/Pokedex"
import {
  PokemonFormValidation,
  PokemonForm,
  PokemonFormInitValues,
} from "../forms/Pokemon"

const PokedexValidationSchema = showPokemonForm => {
  const pokemonExistValidation = PokedexFormValidation.concat(
    PokedexSelectValidation
  )
  const pokemonNotExistValidation = PokedexFormValidation.concat(
    PokemonFormValidation
  )

  return showPokemonForm !== "visible"
    ? pokemonExistValidation
    : pokemonNotExistValidation
}

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [showPokemonForm, setShowPokemonForm] = useState("hidden")

  useEffect(() => {
    //TODO refacto les call axios
    axios({
      method: "GET",
      url: "http://localhost:1337/pokemons",
    })
      .then(res => {
        setPokemons(res.data)
      })
      .catch(() => {
        console.log("erreur pokemon")
      })
  }, [])

  return (
    <Layout>
      <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1>
      <Formik
        initialValues={{
          pokemon: null,
          ...PokedexFormInitValues,
          ...PokemonFormInitValues,
        }}
        validationSchema={() => PokedexValidationSchema(showPokemonForm)}
        onSubmit={(values, actions) => {
          //TODO refacto la condition d'envoi des forms si pokemon ou non
          const references = {
            user: 1,
            quick_move: 1,
            charged_move: 1,
          }

          axios({
            method: "POST",
            url: "http://localhost:1337/pokedexes",
            data: { ...values, ...references, pokemon: values.pokemon.id },
          })
            .then(() => {
              actions.setSubmitting(false)
            })
            .catch(() => {
              actions.setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, errors, touched, ...props }) => (
          <Form className="bg-white flex flex-col">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <CustomDropdown
                  label="Pokemons"
                  id="pokemon"
                  name="pokemon"
                  options={pokemons}
                  optionComponent={<OptionLabel />}
                />
                {showPokemonForm === "hidden" ? (
                  <ErrorMessage
                    className="text-red-500 text-xs italic"
                    component="span"
                    name="pokemon"
                  />
                ) : null}
              </div>
              {showPokemonForm === "visible" ? (
                <Link
                  label="Je ne veux plus ajouter de pokemon."
                  onClick={() => setShowPokemonForm("hidden")}
                />
              ) : (
                <Link
                  label="Mon pokémon n'est pas dans la liste."
                  onClick={() => setShowPokemonForm("visible")}
                />
              )}
            </div>

            <PokedexForm pokemons={pokemons} />
            {showPokemonForm === "visible" ? <PokemonForm /> : null}

            <button
              className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>

            <DisplayFormikState {...props} />
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Pokedex
