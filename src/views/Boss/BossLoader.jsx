import React from "react"

import LoadingSelect from "../../components/atoms/LoadingSelect"

const Boss = () => {
  return (
    <>
      <div className="flex flex-col mt-2 mb-16">
        <div className="mb-3 px-1">
          <div className="flex flex-col mb-6">
            <LoadingSelect />
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="mb-3 px-1 w-1/3">
            <LoadingSelect />
          </div>
          <div className="mb-3 px-1 w-1/3">
            <LoadingSelect />
          </div>
          <div className="mb-3 px-1 w-1/3">
            <LoadingSelect />
          </div>
        </div>

        <div className="my-2 px-1">
          <div className="flex flex-col">
            <LoadingSelect />
          </div>
        </div>

        <div className="mb-3 px-1 ">
          <div className="flex flex-col">
            <LoadingSelect />
          </div>
        </div>

        <div className="w-32 h-12 self-end tracking-wide uppercase bg-green-pokemon bg-green-pokemon text-sm font-bold mt-4 py-2 px-8 rounded-full focus:outline-none focus:shadow-outline" />
      </div>
    </>
  )
}

export default Boss
