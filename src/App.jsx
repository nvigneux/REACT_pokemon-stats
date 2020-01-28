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
      <div className="background-pokemon pt-4 px-2">
        <div className="bg-white rounded-full">
          <Routes />
        </div>
      </div>
    </Router>
    // </AppProvider>
  )
}

export default App
