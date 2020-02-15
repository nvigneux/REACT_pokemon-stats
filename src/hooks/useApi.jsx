import { useState } from "react"
import axios from "axios"
import { prefetch } from "react-suspense-fetch"
import { useToast } from "use-nv-simple-toast"
import { orderBy } from "lodash"

import { pokemonStats } from "../utils/stats"
import { CP_MULTIPLIER } from "../constants/cpMultiplier"

// Utils & misc
import {
  API_URL,
  API_POKEDEXES,
  API_BOSSES,
  API_POKEMONS,
  API_QUICK_MOVE,
  API_CHARGED_MOVE,
  API_LOGIN,
} from "../constants/constant"

// Context
import useAppContext from "./useAppContext"

const useApi = (options = { trigger: false }) => {
  const { trigger } = options
  const {
    // context: { auth },
    setAuth,
    clearAuth,
  } = useAppContext()
  const [loading, setLoading] = useState(trigger)
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState(null)
  const { setToast } = useToast()

  // CONFIG

  const axiosConfig = {
    baseURL: `${API_URL}`,
  }

  const request = (method, url, data, reqOptions = { silentLoad: false }) => {
    setError(null)
    if (!reqOptions.silentLoad) setLoading(true)

    return axios({
      ...axiosConfig,
      url,
      method,
      data,
    })
  }

  const responseHandler = (res, message) => {
    if (res.data) setPayload(res.data)
    setLoading(false)
    setToast({ title: message })
    return res
  }

  const errorHandler = resError => {
    if (resError.response) {
      setLoading(false)
      let errorMessage = ""
      switch (resError.response.status) {
        case 400:
          errorMessage = "400 - Contenu inexistant"
          break
        case 401:
          clearAuth()
          errorMessage = "401 - Mot de passe ou utilisateur incorrect"
          break
        case 403:
          clearAuth()
          errorMessage =
            "403 - Votre authentification a expirée ou vous n'êtes pas authorisé à accéder à ce contenu"
          break
        case 412:
          errorMessage = "412 - Le format attendu n'est pas correct"
          break
        case 500:
          errorMessage = "500 - Erreur réseau"
          break
        default:
          errorMessage = "000 - Une erreur est survenue"
          break
      }
      setToast({ title: errorMessage })
    }
    setLoading(false)
    return resError
  }

  /**
   * Maybe if your data will always be the same make transformation in a then vefore setPayload
   * If the data is differents for the same call make the transformation in the render of your component
   * Use a state if you use the Set, you avoid re render
   */

  const postPokemon = data =>
    request("POST", API_POKEMONS, data)
      .then(res => responseHandler(res, "Succes POST pokémon"))
      .catch(errorHandler)

  const postPokedex = data =>
    request("POST", API_POKEDEXES, data)
      .then(res => responseHandler(res, "Succes POST pokédex"))
      .catch(errorHandler)

  const postBoss = data =>
    request("POST", API_BOSSES, data)
      .then(res => responseHandler(res, "Succes POST boss"))
      .catch(errorHandler)

  const postLogin = data =>
    request("POST", API_LOGIN, data)
      .then(res => {
        if (res.data) setAuth(res.data)
        setLoading(false)
        setToast({ title: "Succes authentification" })
        return res
      })
      .catch(errorHandler)

  return [
    loading,
    payload,
    error,
    { postPokemon, postPokedex, postBoss, postLogin },
  ]
}

export const prefetchPokemons = () =>
  prefetch(async () => (await fetch(API_POKEMONS)).json())

export const prefetchBosses = () =>
  prefetch(() =>
    fetch(API_BOSSES).then(res =>
      res.json().then(bosses => {
        const bossesWithStats = bosses.map(boss => {
          const stats = pokemonStats(CP_MULTIPLIER, boss)
          return { ...boss, stats }
        })
        return orderBy(bossesWithStats, ["stats.cp"], ["desc"])
      })
    )
  )

export const prefetchPokedexes = () => {
  const context = JSON.parse(localStorage.getItem("context"))
  return prefetch(() =>
    fetch(`${API_POKEDEXES}?user=${context.auth.id}&_limit=999`).then(res =>
      res.json().then(pokedexes => {
        const pokedexesWithStats = pokedexes.map(pokemon => {
          const stats = pokemonStats(CP_MULTIPLIER, pokemon)
          return { ...pokemon, stats }
        })
        const orderPokedexesCp = orderBy(
          pokedexesWithStats,
          ["stats.cp"],
          ["desc"]
        )
        return orderPokedexesCp
      })
    )
  )
}

export const prefetchQuickMoves = () =>
  prefetch(() =>
    fetch(`${API_QUICK_MOVE}`).then(res =>
      res.json().then(moves => {
        return orderBy(moves, ["name"], ["asc"])
      })
    )
  )

export const prefetchChargedMoves = () =>
  prefetch(() =>
    fetch(`${API_CHARGED_MOVE}`).then(res =>
      res.json().then(moves => {
        return orderBy(moves, ["name"], ["asc"])
      })
    )
  )

export default useApi
