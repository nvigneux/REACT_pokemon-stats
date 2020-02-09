/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

// Routes
import { routes, protectedRoutes } from "./views/routes"

// // Context
// import useAppContext from "./hooks/useAppContext"

const Routes = () => {
  const auth = JSON.parse(window.localStorage.getItem("auth"))
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {auth && auth.token
        ? protectedRoutes.map(route => <Route key={route.path} {...route} />)
        : null}
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  )
}
export default Routes
