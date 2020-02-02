import React from "react"
import PropTypes from "prop-types"

import PictoType from "../PictoType"

const OptionWeather = ({ label, value }) => (
  <div className="flex justify-between">
    <div className="flex flex-col items-center w-full">
      <div className={`w-6 h-6 mr-1 rounded-full flex items-center justify-center`}>
        <img src={`/assets/weather/${label}.png`} alt={label} />
      </div>
      <div className="flex flex-row items-center">
        {value.map((item, index) => {
          return (
            <div
              key={item}
              className={`${item} w-4 h-4 rounded-full shadow-outline-type flex items-center justify-center ${
                index > 1 ? "-ml-1" : "-ml-1 mr-1"
              }`}
            >
              <PictoType icon={item} className="w-2 h-2" />
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

// Problem PropTypes & Suspense & React Select
OptionWeather.propTypes = {
  // id: PropTypes.number.isRequired,
  // type: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // power: PropTypes.number.isRequired,
}

export default OptionWeather
