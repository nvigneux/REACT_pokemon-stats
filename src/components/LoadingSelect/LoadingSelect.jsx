import React from "react"
import PropTypes from "prop-types"

const LoadingSelect = ({ label, labelWidth }) => {
  return (
    <>
      {label ? (
        <span
          className={`linear-background h-4 w-${labelWidth} block text-sm font-bold mb-3 bg-gray-500 self-start px-4 rounded-full`}
        ></span>
      ) : null}
      <div className="linear-background h-10 w-full bg-gray-500 rounded"></div>
    </>
  )
}

LoadingSelect.propTypes = {
  label: PropTypes.bool,
  labelWidth: PropTypes.string,
}

LoadingSelect.defaultProps = {
  label: true,
  labelWidth: "20",
}

export default LoadingSelect
