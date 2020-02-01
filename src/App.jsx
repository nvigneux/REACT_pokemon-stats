import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "use-nv-simple-toast"

// Components
import Routes from "./Routes"

// Context
// import { AppProvider } from "./AppContext"

// Styles
import "./styles.css"

function App() {
  return (
    <ToastContainer>
      <Router>
        <Routes />
      </Router>
    </ToastContainer>
  )
}

export default App
