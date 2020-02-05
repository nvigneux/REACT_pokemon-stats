import React from "react"

import PokedexCard from "./PokedexCard"

const Pokedexes = ({ pokedexes }) =>
  pokedexes.map(pokedex => {
    return (
      <div key={pokedex.id} className="w-1/3 flex flex-col flex-wrap">
        <PokedexCard pokedex={pokedex} />
      </div>
    )
  })

export default Pokedexes
