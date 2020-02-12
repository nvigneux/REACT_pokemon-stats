import React from "react"
import PropTypes from "prop-types"

const LoadingPokedexCard = ({ label, labelWidth, number }) => {
  const createTable = numberItem => {
    const table = []

    // Outer loop to create parent
    for (let i = 0; i < numberItem; i += 1) {
      table.push(
        <div key={i} className="h-36 w-1/3 p-1">
          <div className="h-full w-full linear-background bg-gray-500 rounded" />
        </div>
      )
    }
    return table
  }

  return (
    <>
      {label ? (
        <span
          className={`${number} linear-background h-4 w-${labelWidth} block text-sm font-bold mb-3 bg-gray-500 self-start px-4 rounded-full`}
        />
      ) : null}
      {createTable(number)}
    </>
  )
}

LoadingPokedexCard.propTypes = {
  label: PropTypes.bool,
  labelWidth: PropTypes.string,
  number: PropTypes.number,
}

LoadingPokedexCard.defaultProps = {
  label: true,
  labelWidth: "20",
  number: 6,
}

export default LoadingPokedexCard
