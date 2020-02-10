import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

import useAppContext from "../hooks/useAppContext"

import { Popin, usePopin } from "./Popin/Popin"

import { MenuIcon, useMenuIcon } from "./MenuIcon"

const Layout = ({ children }) => {
  const { clearAuth } = useAppContext()
  const [isActive, setIsActive] = useMenuIcon()
  const [isDisplayed, toggle] = usePopin()

  const handleNavigation = () => {
    setIsActive()
    toggle()
  }

  const handleLogout = () => {
    handleNavigation()
    clearAuth()
  }

  return (
    <div className="flex h-full sm:items-center min-h-screen justify-center bg-pokemon pt-4 px-2">
      <div className="flex flex-col sm:self-center mobile-size rounded overflow-hidden bg-container sm:shadow-lg p-4">
        {children}
        <button
          type="button"
          onClick={handleNavigation}
          style={{ zIndex: 11, height: "3.5rem", width: "3.5rem" }}
          className="fixed rounded-full bg-button-menu bottom-0 right-0 mr-4 mb-2 shadow-lg"
        >
          <MenuIcon isActive={isActive} />
        </button>
        <Popin isDisplayed={isDisplayed} onClose={handleNavigation}>
          <>
            <NavLink
              activeClassName="active-menu"
              onClick={handleLogout}
              to="/login"
              exact
              className="color-menu-pokemon text-base uppercase px-1 mr-2 mb-6 hover:text-green-100"
            >
              Déconnexion
            </NavLink>
            <NavLink
              activeClassName="active-menu"
              onClick={handleNavigation}
              to="/"
              exact
              className="color-menu-pokemon text-base uppercase px-1 mr-2 mb-6 hover:text-green-100"
            >
              Pokédex
            </NavLink>
            <NavLink
              activeClassName="active-menu"
              onClick={handleNavigation}
              to="/boss"
              className="color-menu-pokemon text-base uppercase px-1 mr-2 mb-6 hover:text-green-100"
            >
              Ajouter un Boss
            </NavLink>
            <NavLink
              activeClassName="active-menu"
              onClick={handleNavigation}
              to="/pokedex"
              className="color-menu-pokemon text-base uppercase px-1 mr-2 mb-6 hover:text-green-100"
            >
              Ajouter un Pokémon
            </NavLink>
          </>
        </Popin>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
