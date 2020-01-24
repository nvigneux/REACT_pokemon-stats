import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import { ErrorMessage } from "formik"

import useApi from "../../hooks/useApi"

import CustomDropdown from "../CustomDropdown"
import OptionPokemon from "../OptionPokemon"

const ChargedMoveSelect = () => {
  const [, dataChargedMoves, , { fetchChargedMoves }] = useApi()
  const [chargedMoves, setChargedMoves] = useState([])

  useEffect(() => {
    fetchChargedMoves()
  }, [])

  useEffect(() => {
    if (dataChargedMoves && dataChargedMoves.length)
      setChargedMoves(dataChargedMoves)
  }, [dataChargedMoves])

  return (
    <>
      <CustomDropdown
        label="Attaque rapide"
        id="charged_move"
        name="charged_move"
        options={chargedMoves}
        optionComponent={<OptionPokemon />}
        isSearchable={false}
        placeholder="Sélectionner l'attaque rapide"
      />
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="charged_move"
      />
    </>
  )
}

ChargedMoveSelect.propTypes = {}

export default ChargedMoveSelect
