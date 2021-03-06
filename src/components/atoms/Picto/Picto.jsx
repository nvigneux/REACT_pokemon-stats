import React from "react"
import PropTypes from "prop-types"

// PICTOS
import { pictoTypes } from "./PictoType"
import { pictoWeather } from "./PictoWeather"
import { pictoOther } from "./PictoOther"

const pictos = { ...pictoTypes, ...pictoWeather, ...pictoOther }

export const Picto = ({ icon, ...props }) =>
  React.cloneElement(pictos[icon], props)

Picto.propTypes = {
  icon: PropTypes.oneOf(Object.keys(pictos)).isRequired,
}

export default Picto
