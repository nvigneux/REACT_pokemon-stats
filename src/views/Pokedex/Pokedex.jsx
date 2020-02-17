import React, { useState, useEffect } from "react"
import { Formik, Form, ErrorMessage } from "formik"
import { useParams } from "react-router-dom"
import { useToast } from "use-nv-simple-toast"

import useApi from "../../hooks/useApi"
import ErrorBoundary from "../../hooks/ErrorBoundary"
import useAppContext from "../../hooks/useAppContext"
import Link from "../../components/atoms/Link/Link"
import CustomSelect from "../../components/atoms/CustomSelect/CustomSelect"
import OptionType from "../../components/molecules/OptionType"
import LoadingSelect from "../../components/atoms/LoadingSelect"

import { pokemonStats } from "../../utils/stats"
import { CP_MULTIPLIER } from "../../constants/cpMultiplier"

import {
  PokedexFormValidation,
  PokedexSelectValidation,
  PokedexForm,
  PokedexFormInitValues,
} from "../../forms/Pokedex"
import {
  PokemonFormValidation,
  PokemonForm,
  PokemonFormInitValues,
} from "../../forms/Pokemon"

import { TYPES_ARRAY } from "../../constants/types"

import PokemonSelect from "../../components/organisms/PokemonSelect"
import MoveSelect from "../../components/molecules/MoveSelect"

const Pokedex = ({ pokemons, quickMoves, chargedMoves }) => {
  const {
    context: { auth },
  } = useAppContext()
  const [isPokemonFormVisible, setIsPokemonFormVisible] = useState(false)
  const [, , , { postPokemon }] = useApi()
  const [, , , { postPokedex }] = useApi()
  const [, , , { updatePokedex }] = useApi()
  const [, pokedexData, , { getPokedex }] = useApi()
  const { setToast } = useToast()

  // IF EDIT POKEDEX
  const { id } = useParams()
  useEffect(() => {
    if (id) getPokedex(id)
  }, [id])

  const PokedexValidationSchema = () => {
    let pokemonValidation = PokedexFormValidation

    if (isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokemonFormValidation)

    if (!isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokedexSelectValidation)

    return pokemonValidation
  }

  const PokedexValueSchema = {
    ...PokedexFormInitValues,
    ...PokemonFormInitValues,
  }

  const findLevelPokemon = (cps, pokedex) => {
    let level = null
    Object.keys(cps).map(item => {
      const stats = pokemonStats(cps, { ...pokedex, level: item })
      if (pokedex.cp >= stats.cp - 2 && pokedex.cp <= stats.cp + 2) {
        level = item
      }
    })
    return level
  }

  const handlePokemonFormVisibility = () => {
    setIsPokemonFormVisible(!isPokemonFormVisible)
  }

  const handleSubmitForm = (values, resetForm) => {
    const level = findLevelPokemon(CP_MULTIPLIER, values)
    if (level) {
      const data = {
        ...values,
        level: parseFloat(level),
        user: auth.id,
      }
      if (isPokemonFormVisible && !id) {
        postPokemon({ ...values }).then(res =>
          res.data
            ? postPokedex({
                ...data,
                pokemon: res.data.id,
              }).then(resetForm)
            : res
        )
      }
      if (!isPokemonFormVisible && !id) {
        postPokedex(data).then(resetForm)
      }
      if (id) {
        updatePokedex(id, data)
      }
    } else {
      setToast({ title: "CP ou IVs incorrect !" })
    }
  }

  return (
    <>
      <Formik
        initialValues={id && pokedexData ? pokedexData : PokedexValueSchema}
        validationSchema={PokedexValidationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) =>
          handleSubmitForm(values, resetForm)
        }
      >
        {() => (
          <Form className="flex flex-col mt-2">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <PokemonSelect
                    pokemons={pokemons}
                    isPokemonFormVisible={isPokemonFormVisible}
                  />
                </ErrorBoundary>
              </div>
              {!id ? (
                <Link
                  label={
                    isPokemonFormVisible
                      ? "Je ne veux plus ajouter de pokemon."
                      : "Mon pokémon n'est pas dans la liste ?"
                  }
                  onClick={handlePokemonFormVisibility}
                />
              ) : null}
            </div>

            {isPokemonFormVisible ? (
              <>
                <PokemonForm />
                <div className="mb-3 px-1">
                  <div className="flex flex-col">
                    <CustomSelect
                      label="Type(s)"
                      id="type"
                      name="type"
                      options={TYPES_ARRAY}
                      optionComponent={<OptionType />}
                      isMulti
                      isSearchable
                      placeholder="Sélectionner le(s) type(s)"
                      getOptionLabel={option => option.name}
                    />
                    <ErrorMessage
                      className="text-red-500 text-xs italic"
                      component="span"
                      name="type"
                    />
                  </div>
                </div>
              </>
            ) : null}

            <div className="mb-2 px-1">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <MoveSelect
                    label="attaque rapide"
                    name="quick_move"
                    moves={quickMoves}
                  />
                </ErrorBoundary>
              </div>
            </div>

            <div className="mb-3 px-1 ">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <MoveSelect
                    label="attaque chargé"
                    name="charged_move"
                    moves={chargedMoves}
                  />
                </ErrorBoundary>
              </div>
            </div>

            <PokedexForm />

            <button
              className="self-end tracking-wide uppercase bg-green-pokemon text-white text-sm font-bold mt-4 py-3 px-8 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Envoyer
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Pokedex
