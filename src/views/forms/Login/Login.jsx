import React from "react"
import { Field, ErrorMessage, useFormikContext } from "formik"

export const LoginForm = () => {
  const { values, setFieldValue } = useFormikContext()

  const createKeyboard = () => {
    const table = []
    // Outer loop to create parent
    for (let i = 1; i <= 9; i += 1) {
      table.push(
        <div key={i} className="w-1/3 flex justify-center items-center mb-4">
          <button
            type="button"
            className="focus:outline-none bg-button-menu w-12 h-12 flex justify-center items-center text-green-100 rounded-full"
            onClick={() => setFieldValue("password", `${values.password}${i}`)}
          >
            {i}
          </button>
        </div>
      )
    }
    return table
  }

  return (
    <>
      <div className="w-10/12 flex flex-wrap">
        <div className="flex flex-wrap flex-col mb-2 ml-4">
          <div className="flex items-center border-b border-b-2 border-teal-500 w-1/3 mb-1">
            <Field
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              name="password"
            />
          </div>
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="password"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap pt-2 justify-center items-center">
            {createKeyboard()}
          </div>
        </div>
      </div>
    </>
  )
}
