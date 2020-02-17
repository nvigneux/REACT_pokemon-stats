import React from "react"
import PropTypes from "prop-types"

import PokedexCard from "../../molecules/PokedexCard"
// TODO make delete pokedex
const Pokedexes = ({ pokedexes, click }) =>
  pokedexes.map(pokedex => {
    return (
      <div key={pokedex.id} className="w-1/3 flex flex-col flex-wrap">
        <button onClick={() => click(pokedex.id)} type="button">
          <PokedexCard pokedex={pokedex} />
        </button>
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
