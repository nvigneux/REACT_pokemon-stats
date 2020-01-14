import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  return (
    <div className="container-full container-full--center">
      <div className="mobile-container shadow-lg">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
