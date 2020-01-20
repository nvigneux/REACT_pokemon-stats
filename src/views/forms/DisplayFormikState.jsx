import React from "react"

const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0" }}>
    <pre className="bg-gray-200 text-xs text-gray-600 p-4 rounded">
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)

export default DisplayFormikState
