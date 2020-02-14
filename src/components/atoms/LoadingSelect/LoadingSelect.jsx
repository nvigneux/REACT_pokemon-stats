import React from "react"
import PropTypes from "prop-types"

const LoadingSelect = ({ label, labelWidth }) => {
  return (
    <>
      {label ? (
        <span
          className={`linear-background h-4 w-${labelWidth} block text-sm font-bold mb-2 ml-1 bg-gray-500 self-start px-4 rounded-full`}
        />
      ) : null}
      <div className="linear-background h-10 w-full bg-gray-500 rounded-full" />
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
