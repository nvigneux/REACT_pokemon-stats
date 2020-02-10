import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "use-nv-simple-toast"
// Components
import Routes from "./Routes"

// TODO pack away component with atomic
// TODO Rename component

// Context
import { AppProvider } from "./AppContext"

// Styles
import "./styles.css"

// TODO make crawler attack pokemon go
// TODO change style TOAST x
function App() {
  return (
    <AppProvider>
      <ToastContainer>
        <Router>
          <React.Suspense fallback={<div />}>
            <Routes />
          </React.Suspense>
        </Router>
      </ToastContainer>
    </AppProvider>
  )
}

export default App
