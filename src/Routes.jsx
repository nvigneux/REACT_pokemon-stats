/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

// Routes
import { routes, protectedRoutes } from "./views/routes.js"
import Layout from "./components/templates/Layout"

// // Context
import useAppContext from "./hooks/useAppContext"

const Routes = () => {
  const {
    context: { auth },
  } = useAppContext()
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {auth && auth.token ? (
        <Layout>
          {protectedRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Layout>
      ) : null}
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  )
}
export default Routes
