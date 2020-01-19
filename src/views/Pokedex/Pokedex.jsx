import React, { useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import Layout from "../../components/Layout"
import Link from "../../components/Link/Link"

import { PokedexFormValidation, PokedexForm } from "../forms/Pokedex"
import { PokemonFormValidation, PokemonForm } from "../forms/Pokemon"

export const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)

//TODO refacto schema, ptet a export dans chaque fichier form
const PokedexValidationSchema = showPokemonForm => {
  const pokemonExistValidation = PokedexFormValidation()
  const pokemonNotExistValidation = PokedexFormValidation().concat(
    PokemonFormValidation()
  )
  console.log(pokemonExistValidation)
  console.log(pokemonNotExistValidation)
  console.log(showPokemonForm)
  return showPokemonForm !== "visible"
    ? pokemonExistValidation
    : pokemonNotExistValidation
}

// TODO reegarder si on peut faire pareil que le schema
const PokedexValues = {
  level: 0,
  iv_attack: 0,
  iv_defense: 0,
  iv_stamina: 0,
  pokemon: null,
  id_base_pokemon: 0,
  name: "",
  attack: 0,
  defense: 0,
  stamina: 0,
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
        initialValues={PokedexValues}
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
            {/* TODO move select custom to parent  */}
            <PokedexForm pokemons={pokemons} />
            {showPokemonForm === "visible" ? (
              <>
                <Link
                  label="Je ne veux plus ajouter de pokemon."
                  onClick={() => setShowPokemonForm("hidden")}
                />
                <PokemonForm />
              </>
            ) : (
              <Link
                label="Mon pokémon n'est pas dans la liste."
                onClick={() => setShowPokemonForm("visible")}
              />
            )}

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
