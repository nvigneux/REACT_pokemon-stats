import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"

const AppContext = React.createContext([{}, () => {}])

const initContext = JSON.parse(localStorage.getItem("context")) || {
  auth: null,
}

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initContext)

  useEffect(() => {
    if (!isEmpty(state)) localStorage.setItem("context", JSON.stringify(state))
  }, [state])

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AppContext, AppProvider }
