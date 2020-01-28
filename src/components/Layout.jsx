import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  return (
    <div className="flex h-full sm:items-center min-h-screen justify-center background-pokemon pt-4 px-2">
      <div className="flex flex-col sm:self-center mobile-size rounded overflow-hidden bg-white sm:shadow-lg p-4">
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
