import React from "react"
import PropTypes from "prop-types"

const LoadingPokedexCard = ({ number }) => {
  const createTable = numberItem => {
    const table = []

    // Outer loop to create parent
    for (let i = 0; i < numberItem; i += 1) {
      table.push(
        <div key={i} className="h-36 w-1/3 p-1">
          <div className="h-full w-full flex flex-col bg-gray-100 rounded">
            <div className="linear-background h-5 w-20 my-2 px-4 rounded-full self-center" />
            <div className="linear-background w-12 h-12 px-4 rounded-full self-center" />
            <div className="linear-background h-4 w-20 my-2 px-4 rounded-full self-center" />
            <div className="flex flex-row justify-center mb-2">
              <div className="linear-background h-4 w-1/4 px-4 mr-4 rounded-full self-center" />
              <div className="linear-background h-4 w-1/4 px-4 rounded-full self-center" />
            </div>
          </div>
        </div>
      )
    }
    return table
  }

  return createTable(number)
}

LoadingPokedexCard.propTypes = {
  number: PropTypes.number,
}

LoadingPokedexCard.defaultProps = {
  number: 6,
}

export default LoadingPokedexCard
