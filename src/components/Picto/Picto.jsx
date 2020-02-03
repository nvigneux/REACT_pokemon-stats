import React from "react"
import PropTypes from "prop-types"

// Icons
import { ReactComponent as Bug } from "../../assets/icons/bug.svg"
import { ReactComponent as Dark } from "../../assets/icons/dark.svg"
import { ReactComponent as Dragon } from "../../assets/icons/dragon.svg"
import { ReactComponent as Electric } from "../../assets/icons/electric.svg"
import { ReactComponent as Fairy } from "../../assets/icons/fairy.svg"
import { ReactComponent as Fighting } from "../../assets/icons/fighting.svg"
import { ReactComponent as Fire } from "../../assets/icons/fire.svg"
import { ReactComponent as Flying } from "../../assets/icons/flying.svg"
import { ReactComponent as Ghost } from "../../assets/icons/ghost.svg"
import { ReactComponent as Grass } from "../../assets/icons/grass.svg"
import { ReactComponent as Ground } from "../../assets/icons/ground.svg"
import { ReactComponent as Ice } from "../../assets/icons/ice.svg"
import { ReactComponent as Normal } from "../../assets/icons/normal.svg"
import { ReactComponent as Poison } from "../../assets/icons/poison.svg"
import { ReactComponent as Psychic } from "../../assets/icons/psychic.svg"
import { ReactComponent as Rock } from "../../assets/icons/rock.svg"
import { ReactComponent as Steel } from "../../assets/icons/steel.svg"
import { ReactComponent as Water } from "../../assets/icons/water.svg"

export const availablePictos = {
  bug: <Bug />,
  dark: <Dark />,
  dragon: <Dragon />,
  electric: <Electric />,
  fairy: <Fairy />,
  fighting: <Fighting />,
  fire: <Fire />,
  flying: <Flying />,
  ghost: <Ghost />,
  grass: <Grass />,
  ground: <Ground />,
  ice: <Ice />,
  normal: <Normal />,
  poison: <Poison />,
  psychic: <Psychic />,
  rock: <Rock />,
  steel: <Steel />,
  water: <Water />,
}

export const Picto = ({ icon, ...props }) =>
  React.cloneElement(availablePictos[icon], props)

Picto.propTypes = {
  icon: PropTypes.oneOf(Object.keys(availablePictos)).isRequired,
}

export default Picto
