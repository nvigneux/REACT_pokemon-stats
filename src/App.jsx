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
// TODO make a ComponentMAin for each view like raidbattle to make correct suspense prefetch
function App() {
  return (
    <AppProvider>
      <ToastContainer
        positionX="center"
        positionY="top"
        backgroundColor="black"
      >
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
