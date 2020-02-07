import React from "react"
import PropTypes from "prop-types"

import MenuIcon from "./MenuIcon"

const Layout = ({ children }) => {
  return (
    <div className="flex h-full sm:items-center min-h-screen justify-center bg-pokemon pt-4 px-2">
      <div className="flex flex-col sm:self-center mobile-size rounded overflow-hidden bg-container sm:shadow-lg p-4">
        {children}
      </div>
      <div className="fixed h-16 w-16 rounded-full bg-button-menu bottom-0 right-0 mr-4 mb-2 shadow-lg">
        <MenuIcon />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
