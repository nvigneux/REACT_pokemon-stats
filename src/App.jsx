import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "use-nv-simple-toast"
// Components
import Routes from "./Routes"

// TODO pack away component with atomic
// TODO Rename component

// Context
// import { AppProvider } from "./AppContext"
// Styles
import "./styles.css"

// TODO make logout
// TODO app context for auth
// TODO change style TOAST x
// TODO when auth put id in request and change role in strapi
// TODO make crawler attack pokemon go
function App() {
  return (
    <ToastContainer>
      <Router>
        <React.Suspense fallback={<div />}>
          <Routes />
        </React.Suspense>
      </Router>
    </ToastContainer>
  )
}

export default App
