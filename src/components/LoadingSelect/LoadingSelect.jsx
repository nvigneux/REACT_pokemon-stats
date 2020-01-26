import React from "react"
import PropTypes from "prop-types"

const LoadingSelect = ({ labelWidth }) => {
  return (
    <>
      <span
        className={`linear-background h-4 w-${labelWidth} block text-sm font-bold mb-3 bg-gray-500 self-start px-4 rounded-full`}
      ></span>
      <div className="linear-background h-10 w-full bg-gray-500 rounded"></div>
    </>
  )
}

LoadingSelect.propTypes = {
  labelWidth: PropTypes.string.isRequired,
}

LoadingSelect.defaultProps = {
  labelWidth: "20",
}

export default LoadingSelect
