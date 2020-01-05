import { WEATHERS } from "../constant"

/**
 * Defined the bonus given by the weather
 * default : x1, same weather : 1.2x
 * @param {string} name
 * @param {string} type
 */
export const getWeatherBonus = (name, type) => {
  return WEATHERS[name].includes(type) ? 1.2 : 1
}
