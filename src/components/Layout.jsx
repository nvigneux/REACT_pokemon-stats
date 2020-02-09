import React from "react"
import PropTypes from "prop-types"

import { MenuIcon, useMenuIcon } from "./MenuIcon"

const Layout = ({ children }) => {
  const [isActive, setIsActive] = useMenuIcon()
  return (
    <div className="flex h-full sm:items-center min-h-screen justify-center bg-pokemon pt-4 px-2">
      <div className="flex flex-col sm:self-center mobile-size rounded overflow-hidden bg-container sm:shadow-lg p-4">
        {children}
      </div>
      <button
        type="button"
        onClick={setIsActive}
        style={{ height: "3.5rem", width: "3.5rem" }}
        className="fixed rounded-full bg-button-menu bottom-0 right-0 mr-4 mb-2 shadow-lg"
      >
        <MenuIcon isActive={isActive} />
      </button>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
