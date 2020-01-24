import React from "react"

import PictoType from "../PictoType"

const OptionMove = ({ id, type, name, power }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div
          className={`${type} w-5 h-5 mr-3 rounded-full flex items-center justify-center`}
        >
          <PictoType key={id} icon={type} className="w-3 h-3" />
        </div>
        <div className="capitalize text-base text-gray-900 font-medium">
          {name}
        </div>
      </div>
      <div className="text-base text-gray-700 font-medium">{power}</div>
    </div>
  )
}

export default OptionMove
