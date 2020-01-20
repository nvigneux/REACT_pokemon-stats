import { useState } from "react"
import axios from "axios"

// Utils & misc
import { API_URL } from "../constants/constant"

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
          setError(
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

  const fetchPokemons = async () => {
    return request("GET", "/pokemons", null)
      .then(responseHandler)
      .catch(errorHandler)
  }

  const fetchQuickMoves = async () => {
    return request("GET", "/quick-moves", null)
      .then(responseHandler)
      .catch(errorHandler)
  }

  const fetchChargedMoves = async () => {
    return request("GET", "/charged-moves", null)
      .then(responseHandler)
      .catch(errorHandler)
  }

  return [
    loading,
    payload,
    error,
    {
      fetchPokemons,
      fetchQuickMoves,
      fetchChargedMoves,
    },
  ]
}

export default useApi
