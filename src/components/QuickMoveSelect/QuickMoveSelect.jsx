import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { orderBy } from "lodash"
import { ErrorMessage } from "formik"

import useApi from "../../hooks/useApi"

import CustomDropdown from "../CustomDropdown"
import OptionPokemon from "../OptionPokemon"

// TODO try to make the call api before the render of component
const QuickMoveSelect = () => {
  // TODO delete state on each ComponentSelect we don't need it
  const [, dataQuickMoves, , { fetchQuickMoves }] = useApi()
  const [quickMoves, setQuickMoves] = useState([])

  useEffect(() => {
    fetchQuickMoves()
  }, [])

  useEffect(() => {
    if (dataQuickMoves && dataQuickMoves.length) setQuickMoves(dataQuickMoves)
  }, [dataQuickMoves])

  return (
    <>
      <CustomDropdown
        label="Attaque rapide"
        id="quick_move"
        name="quick_move"
        options={quickMoves}
        optionComponent={<OptionPokemon />}
        isSearchable={false}
        placeholder="Sélectionner l'attaque rapide"
      />
      <ErrorMessage
        className="text-red-500 text-xs italic"
        component="span"
        name="quick_move"
      />
    </>
  )
}

QuickMoveSelect.propTypes = {}

export default QuickMoveSelect
