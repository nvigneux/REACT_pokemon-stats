/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

// Routes
import { routes, protectedRoutes } from "./views/routes"

// // Context
// import useAppContext from "./hooks/useAppContext"

const Routes = () => {
  // const {
  //   context: { auth },
  // } = useAppContext()

  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {protectedRoutes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {/* {auth && auth.access_token
        ? protectedRoutes.map(route => <Route key={route.path} {...route} />)
        : null} */}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
}
export default Routes
