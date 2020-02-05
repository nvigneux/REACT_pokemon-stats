import React from "react"
import { Field, ErrorMessage, useFormikContext } from "formik"

import { pokemonStats } from "../../../utils/stats"
import { CP_MULTIPLIER } from "../../../constants/cpMultiplier"

export const BossForm = ({ values }) => {
  const { setFieldValue } = useFormikContext()

  const handleStamina = stamina => {
    setFieldValue("iv_stamina", parseInt(stamina, 10))
    const pokemon =
      values.pokemon && (!values.attack || !values.defense || !values.stamina)
        ? values.pokemon
        : {
            attack: values.attack,
            defense: values.defense,
            stamina: values.stamina,
          }

    if (pokemon && stamina) {
      const stats = pokemonStats(CP_MULTIPLIER, {
        pokemon: { ...pokemon },
        iv_attack: values.iv_attack,
        iv_defense: values.iv_defense,
        iv_stamina: parseInt(stamina, 10),
        level: values.level,
      })
      setFieldValue("cp", stats.cp)
    }
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="mb-3 px-1 w-1/3">
          <label
            className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
            htmlFor="difficulty"
          >
            Difficulté
          </label>
          <Field
            className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
            type="number"
            name="difficulty"
          />
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="difficulty"
          />
        </div>
        <div className="mb-3 px-1 w-1/3">
          <label
            className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
            htmlFor="iv_stamina"
          >
            Stamina
          </label>
          <Field
            className="appearance-none border-1-5 border-blue-pokemon rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
            type="number"
            name="iv_stamina"
            onChange={e => handleStamina(e.target.value)}
          />
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="iv_stamina"
          />
        </div>
        <div className="mb-3 px-1 w-1/3">
          <label
            className="uppercase tracking-wider block color-blue-pokemon text-xs font-bold mb-1 pl-1"
            htmlFor="cp"
          >
            Cp théorique
          </label>
          <Field
            className="appearance-none rounded-full w-full py-2 px-3 text-gray-700 leading-tight"
            type="number"
            name="cp"
            disabled
          />
          <ErrorMessage
            className="text-red-500 text-xs italic"
            component="span"
            name="cp"
          />
        </div>
      </div>
    </>
  )
}
