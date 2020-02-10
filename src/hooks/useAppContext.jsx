import { useContext } from "react"

// Utils & misc
import { AppContext } from "../AppContext"

const useAppContext = () => {
  const [state, setState] = useContext(AppContext)

  const setAuth = ({ user, jwt }) => {
    setState({ ...state, auth: { id: user.id, token: jwt } })
  }

  const clearAuth = () => {
    // db.delete()
    window.localStorage.clear()
    setState({})
  }

  return {
    context: state,
    setAuth,
    clearAuth,
  }
}

export default useAppContext
