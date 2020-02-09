import React from "react"
import { Field, ErrorMessage } from "formik"

export const LoginForm = ({ values }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="mb-3 px-1 w-1/3">
          <label
            className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
            htmlFor="identifier"
          >
            identifier
          </label>
          <Field
            className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
            type="text"
            name="identifier"
          />
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="identifier"
          />
        </div>
        <div className="mb-3 px-1 w-1/3">
          <label
            className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
            htmlFor="password"
          >
            Password
          </label>
          <Field
            className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
            type="text"
            name="password"
          />
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="password"
          />
        </div>
      </div>
    </>
  )
}
