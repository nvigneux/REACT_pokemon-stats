import React from "react"
import PropTypes from "prop-types"

import PokedexCard from "../../molecules/PokedexCard"

const Pokedexes = ({ pokedexes, click }) =>
  pokedexes.map(pokedex => {
    return (
      <div
        key={pokedex.id}
        className="w-1/3 flex flex-col flex-wrap"
        onClick={() => click(pokedex.id)}
      >
        <PokedexCard pokedex={pokedex} />
      </div>
    )
  })

export default Pokedexes

Pokedexes.propTypes = {
  click: PropTypes.func,
}

Pokedexes.defaultProps = {
  click: () => {},
}
