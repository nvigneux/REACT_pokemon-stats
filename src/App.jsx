import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

// Components
import Routes from "./Routes"

// Context
// import { AppProvider } from "./AppContext"

// Styles
import "./styles.css"

function App() {
  return (
    // <AppProvider>
    <Router>
      <Routes />
    </Router>
    // </AppProvider>
  )
}

export default App
