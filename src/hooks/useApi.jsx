import { useState } from "react"
import axios from "axios"
import { prefetch } from "react-suspense-fetch"

// Utils & misc
import {
  API_URL,
  API_POKEDEXES,
  API_POKEMONS,
  API_QUICK_MOVE,
  API_CHARGED_MOVE,
} from "../constants/constant"

const useApi = (options = { trigger: false }) => {
  const { trigger } = options
  const [loading, setLoading] = useState(trigger)
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState(null)

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

  const responseHandler = res => {
    if (res.data) setPayload(res.data)
    setLoading(false)
    return res
  }

  const errorHandler = resError => {
    if (resError.response) {
      setLoading(false)
      switch (resError.response.status) {
        case 400:
          return setError("400 - Contenu inexistant")
        case 401:
          return setError("401 - Mot de passe ou utilisateur incorrect")
        case 403:
          return setError(
            "403 - Votre authentification a expirée ou vous n'êtes pas authorisé à accéder à ce contenu"
          )
        case 412:
          return setError("412 - Le format attendu n'est pas correct")
        case 500:
          return setError("500 - Erreur réseau")
        default:
          return setError("000 - Une erreur est survenue")
      }
    }
    setLoading(false)
    return resError
  }

  /**
   * Maybe if your data will always be the same make transformation in a then vefore setPayload
   * If the data is differents for the same call make the transformation in the render of your component
   * Use a state if you use the Set, you avoid re render
   */

  return [loading, payload, error, {}]
}

// TODO MAKE SUCCESS OR ERROR MESSAGES

export const postPokemon = data => {
  return axios({
    method: "post",
    url: API_POKEMONS,
    data,
  })
}

export const postPokedex = data => {
  return axios({
    method: "post",
    url: API_POKEDEXES,
    data,
  })
}

// TODO PUT ORDER BY ON POKEMON HERE ?
export const prefetchPokemons = () =>
  prefetch(async () => (await fetch(API_POKEMONS)).json())

export const prefetchQuickMoves = () =>
  prefetch(async () => (await fetch(API_QUICK_MOVE)).json())

export const prefetchChargedMoves = () =>
  prefetch(async () => (await fetch(API_CHARGED_MOVE)).json())

export default useApi
