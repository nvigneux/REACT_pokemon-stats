import React, { useState, useEffect } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { orderBy, keyBy } from "lodash"

import PokemonStatCard from "./components/PokemonStatCard"
import WeatherSelect from "./components/WeatherSelect"

import { simulateBattle, simulateBattleStats } from "./utils/battle"
import { pokemonStats } from "./utils/stats"
import { getDmgMoves } from "./utils/dps"

import { POKEMON_MOCK } from "./pokemons/pokedex"
import { BOSS_MOCK } from "./pokemons/boss"
import { QUICK_MOVES, CHARGED_MOVES } from "./constants/moves"
import { CP_MULTIPLIER } from "./constants/cpMultiplier"
import { WEATHERS } from "./constants/weather"
import { POKEMON } from "./constants/constant"

import "./styles.css"

const PokemonCategory = ({ title, children }) => (
  <div className="flex flex-col">
    <h3 className="text-base font-semibold tracking-wider pl-2">{title}</h3>
    <div className="flex flex-row flex-nowrap">{children}</div>
  </div>
)

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [bosses, setBosses] = useState([])

  const [activeBoss, setActiveBoss] = useState(null)
  const [activeWeather, setActiveWeather] = useState("sunny")

  // Add stats & moves to each pokemons & bosses
  useEffect(() => {
    const quickMoveHashArray = keyBy(QUICK_MOVES, "id")
    const chargedMoveHashArray = keyBy(CHARGED_MOVES, "id")

    const addSupplementDataPokemon = sourcePokemons =>
      sourcePokemons.map(pokemon => {
        const moveQuick = quickMoveHashArray[pokemon.moves.quick]
        const moveCharged = chargedMoveHashArray[pokemon.moves.charged]
        const stats = pokemonStats(CP_MULTIPLIER, pokemon)
        return {
          ...pokemon,
          stats,
          moves: { quick: moveQuick, charged: moveCharged },
        }
      })

    setPokemons(addSupplementDataPokemon(POKEMON_MOCK))
    setBosses(addSupplementDataPokemon(BOSS_MOCK))
  }, [])

  useEffect(() => {
    if (activeBoss) {
      const resultBattle = pokemons.map(attacker => {
        const activeAttacker = getDmgMoves(attacker, activeBoss, activeWeather)
        const activeDefender = getDmgMoves(activeBoss, attacker, activeWeather)

        const battle = simulateBattle(activeAttacker, activeDefender)
        const pokemonBattleStats = simulateBattleStats(
          POKEMON,
          activeAttacker.id,
          battle,
          activeDefender
        )

        console.group(activeAttacker.name)
        console.log("Attacker :", activeAttacker, "Defender :", activeDefender)
        console.log("Log battle :", battle)
        console.log("Stats :", pokemonBattleStats)
        console.groupEnd()

        return pokemonBattleStats
      })
      console.log(
        `Best pokemons against ${activeBoss.name}`,
        orderBy(resultBattle, ["dps"], ["desc"])
      )
    }
  }, [pokemons, activeBoss, activeWeather])

  // TODO watch if memo can be useful
  return (
    <div className="App">
      <WeatherSelect
        values={WEATHERS}
        default={activeWeather}
        select={setActiveWeather}
      />

      <div className="flex flex-row overflow-auto scroll">
        <div className="flex flex-col pr-4">
          <PokemonCategory title="Pokedex">
            {pokemons.map(pokemon => {
              return <PokemonStatCard key={pokemon.id} pokemon={pokemon} />
            })}
          </PokemonCategory>
        </div>

        <div className="flex flex-col">
          <PokemonCategory title="Boss">
            {bosses.map(boss => {
              return (
                <PokemonStatCard
                  key={boss.id}
                  pokemon={boss}
                  click={setActiveBoss}
                  theme="red"
                  className="cursor-pointer"
                />
              )
            })}
          </PokemonCategory>
        </div>
      </div>

      {/* Test formik send post to strapi */}
      <div>
        <h1>Any place in your app!</h1>
        <Formik
          initialValues={{
            id_base_pokemon: 0,
            name: "",
            attack: 0,
            defense: 0,
            stamina: 0,
          }}
          onSubmit={(values, actions) => {
            const type = { type: ["fighting"] }
            axios({
              method: "POST",
              url: "http://localhost:1337/pokemons",
              data: { ...values, type },
            })
              .then(response => {
                actions.setSubmitting(false)
                actions.resetForm()
              })
              .catch(error => {
                actions.setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id_base_pokemon"
              >
                Id Pokemon
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="id_base_pokemon"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attack"
              >
                Attack
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="attack"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="defense"
              >
                Defense
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="defense"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="stamina"
              >
                Stamina
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="stamina"
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            iv_attack: 0,
            iv_defense: 0,
            iv_stamina: 0,
          }}
          onSubmit={(values, actions) => {
            const references = {
              pokemon: 1,
              user: 1,
              quick_move: 1,
              charged_move: 1,
            }
            axios({
              method: "POST",
              url: "http://localhost:1337/pokedexes",
              data: { ...values, ...references },
            })
              .then(response => {
                actions.setSubmitting(false)
                actions.resetForm()
              })
              .catch(error => {
                actions.setSubmitting(false)
              })
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="iv_attack"
              >
                Iv attack
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="iv_attack"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="iv_defense"
              >
                Iv defense
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="iv_defense"
              />
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="iv_stamina"
              >
                Iv stamina
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="iv_stamina"
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default App
