import React from "react"
import PropTypes from "prop-types"

const OptionLabel = ({ id, name }) => (
  <div className="flex items-center">
    <img className="h-8 mr-2" src={image} alt={`${name}`} />
    <div className="text-base text-gray-900 font-medium">{name}</div>
  </div>
)

OptionLabel.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default OptionLabel
