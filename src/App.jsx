import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "use-nv-simple-toast"
// Components
import Routes from "./Routes"

// TODO pack away component with atomic
// TODO Rename component

// Context
// import { AppProvider } from "./AppContext"
import Layout from "./components/Layout"

// Styles
import "./styles.css"

function App() {
  return (
    <ToastContainer>
      <Router>
        <Layout>
          <React.Suspense fallback={<div />}>
            <Routes />
          </React.Suspense>
        </Layout>
      </Router>
    </ToastContainer>
  )
}

export default App
