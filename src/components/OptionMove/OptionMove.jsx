import React from "react"
// import PropTypes from "prop-types"

import Picto from "../Picto"

const OptionMove = ({ id, type, name, power }) => (
  <div className="flex justify-between">
    <div className="flex items-center">
      <div
        className={`${type} w-5 h-5 mr-3 rounded-full flex items-center justify-center`}
      >
        <Picto key={id} icon={type} className="w-3 h-3" />
      </div>
      <div className="capitalize text-base text-gray-900 font-medium">
        {name}
      </div>
    </div>
    <div className="text-base text-gray-700 font-medium">{power}</div>
  </div>
)

// Problem PropTypes & Suspense & React Select
// OptionMove.propTypes = {
// id: PropTypes.number.isRequired,
// type: PropTypes.string.isRequired,
// name: PropTypes.string.isRequired,
// power: PropTypes.number.isRequired,
// }

export default OptionMove
