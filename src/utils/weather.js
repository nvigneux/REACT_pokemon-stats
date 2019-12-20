import { WEATHERS } from "../constant";

export const getWeatherBonus = (name, type) => {
  return WEATHERS[name].includes(type) ? 1.2 : 1;
};
