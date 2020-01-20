import React from "react"

import PictoType from "../PictoType"

const OptionType = ({ value, name }) => {
  return (
    <div key={value} className="flex items-center">
      <div
        className={`${name} w-5 h-5 mr-3 rounded-full flex items-center justify-center`}
      >
        <PictoType key={value} icon={name} className="w-3 h-3" />
      </div>
      <div className="text-base text-gray-900 font-medium capitalize">
        {name}
      </div>
    </div>
  )
}

export default OptionType
