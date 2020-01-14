import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen justify-center items-center">
      <div className="flex flex-col self-center mobile-size rounded overflow-hidden bg-white shadow-lg p-4">
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
