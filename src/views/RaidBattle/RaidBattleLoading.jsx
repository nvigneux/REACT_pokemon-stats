import React from "react"

import LoadingSelect from "../../components/atoms/LoadingSelect"
import LoadingPokedexCard from "../../components/atoms/LoadingPokedexCard"

const RaidBattleLoading = () => {
  return (
    <>
      <div className="flex flex-row items-end mb-4">
        <div className="w-full mr-3">
          <LoadingSelect label={false} />
        </div>

        <div className="w-20">
          <LoadingSelect label={false} />
        </div>
      </div>

      <div className="flex flex-row flex-wrap pt-2">
        <LoadingPokedexCard />
      </div>
    </>
  )
}

export default RaidBattleLoading
