import React, { useState } from "react"
import { Formik, Form, ErrorMessage } from "formik"

import ErrorBoundary from "../../hooks/ErrorBoundary"
import useApi from "../../hooks/useApi"
import Link from "../../components/atoms/Link/Link"
import CustomSelect from "../../components/atoms/CustomSelect/CustomSelect"
import OptionType from "../../components/molecules/OptionType"
import LoadingSelect from "../../components/atoms/LoadingSelect"

import {
  BossFormValidation,
  BossSelectValidation,
  BossForm,
  BossFormInitValues,
} from "../../forms/Boss"
import {
  PokemonFormValidation,
  PokemonForm,
  PokemonFormInitValues,
} from "../../forms/Pokemon"

import { TYPES_ARRAY } from "../../constants/types"

import PokemonSelect from "../../components/organisms/PokemonSelect"
import MoveSelect from "../../components/molecules/MoveSelect"

const Boss = ({ pokemons, quickMoves, chargedMoves }) => {
  const [isPokemonFormVisible, setIsPokemonFormVisible] = useState(false)
  const [, , , { postPokemon }] = useApi()
  const [, , , { postBoss }] = useApi()

  const BossValidationSchema = () => {
    let pokemonValidation = BossFormValidation

    if (isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(PokemonFormValidation)

    if (!isPokemonFormVisible)
      pokemonValidation = pokemonValidation.concat(BossSelectValidation)

    return pokemonValidation
  }

  const BossValueSchema = {
    ...BossFormInitValues,
    ...PokemonFormInitValues,
  }

  const handlePokemonFormVisibility = () => {
    setIsPokemonFormVisible(!isPokemonFormVisible)
  }

  const handleSubmitForm = (values, resetForm) =>
    isPokemonFormVisible
      ? postPokemon({ ...values }).then(res => {
          postBoss({ ...values, pokemon: res.data.id }).then(resetForm)
        })
      : postBoss({ ...values }).then(resetForm)

  return (
    <>
      {/* <h1 className="py-4 px-1 mb-6 text-black text-xl border-b border-grey-lighter">
        Ajouter un pokémon
      </h1> */}
      <Formik
        initialValues={BossValueSchema}
        validationSchema={BossValidationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitForm(values, resetForm)
        }
      >
        {({ ...props }) => (
          <Form className="flex flex-col mt-2 mb-16">
            <div className="mb-3 px-1">
              <div className="flex flex-col">
                <ErrorBoundary fallback={<LoadingSelect />}>
                  <PokemonSelect
                    label="Boss"
                    pokemons={pokemons}
                    isPokemonFormVisible={isPokemonFormVisible}
                  />
                </ErrorBoundary>
              </div>

              <Link
                label={
                  isPokemonFormVisible
                    ? "Je ne veux plus ajouter de boss."
                    : "Le boss n'est pas dans la liste."
                }
                onClick={handlePokemonFormVisibility}
              />
            </div>

            <BossForm {...props} />

            <div className="my-2 px-1">
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
                      isSearchable={false}
                      placeholder="Sélectionner le(s) type(s)"
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

export default Boss
