import React from "react"
import PropTypes from "prop-types"

const Link = ({ label, onClick }) => {
  return (
    <span
      tabIndex={0}
      role="button"
      onKeyDown={() => {}}
      onClick={onClick}
      className="color-link-pokemon uppercase active:text-gray-400 focus:text-gray-500 hover:text-gray-500 text-xs cursor-pointer mb-3 px-1"
    >
      {label}
    </span>
  )
}

Link.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Link
