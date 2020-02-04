import { useState } from "react"
import axios from "axios"
import { prefetch } from "react-suspense-fetch"
import { useToast } from "use-nv-simple-toast"

// Utils & misc
import {
  API_URL,
  API_POKEDEXES,
  API_BOSSES,
  API_POKEMONS,
  API_QUICK_MOVE,
  API_CHARGED_MOVE,
} from "../constants/constant"

const useApi = (options = { trigger: false }) => {
  const { trigger } = options
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
    console.log(res);
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
          errorMessage = "401 - Mot de passe ou utilisateur incorrect"
          break
        case 403:
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

  return [loading, payload, error, { postPokemon, postPokedex, postBoss }]
}

// TODO PUT ORDER BY ON POKEMON HERE ?
export const prefetchPokemons = () =>
  prefetch(async () => (await fetch(API_POKEMONS)).json())

export const prefetchBosses = () =>
  prefetch(async () => (await fetch(API_BOSSES)).json())

export const prefetchQuickMoves = () =>
  prefetch(async () => (await fetch(API_QUICK_MOVE)).json())

export const prefetchChargedMoves = () =>
  prefetch(async () => (await fetch(API_CHARGED_MOVE)).json())

export default useApi
