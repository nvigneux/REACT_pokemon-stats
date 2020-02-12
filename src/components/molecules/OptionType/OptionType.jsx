import React from "react"
// import PropTypes from "prop-types"

import Picto from "../../atoms/Picto"

const OptionType = ({ id, name }) => (
  <div key={id} className="flex items-center">
    <div
      className={`${name} w-5 h-5 mr-3 rounded-full flex items-center justify-center`}
    >
      <Picto key={id} icon={name} className="w-3 h-3" />
    </div>
    <div className="text-base text-gray-900 font-medium capitalize">{name}</div>
  </div>
)

// Problem PropTypes & Suspense & React Select
// OptionType.propTypes = {
// id: PropTypes.number.isRequired,
// name: PropTypes.string.isRequired,
// }

export default OptionType
