/**
 * Defined the bonus given by the weather
 * default : x1, same weather : 1.2x
 * @param {string} name
 * @param {string} type
 */
export const getWeatherBonus = (weather, type) => {
  return weather.value.includes(type) ? 1.2 : 1
}
