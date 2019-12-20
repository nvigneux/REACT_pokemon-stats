import { getWeatherBonus } from "./weather";
import { getMoveEffectivenessType } from "./et";

const getDpsMove = (move, pokemon, opponent, weather) => {
  const stab = pokemon.type.includes(move.type) ? 1.2 : 1;
  const bonusWeather = getWeatherBonus(weather, move.type);
  const effectiveness = getMoveEffectivenessType(move.type, opponent.type);

  return (
    Math.floor(
      ((0.5 * pokemon.stats.attack) / opponent.stats.defense) *
        move.power *
        stab *
        effectiveness *
        bonusWeather
    ) + 1
  );
};

export const getDps = (pokemon, opponent, weather) => {
  const dpsQuickAttack = getDpsMove(
    pokemon.moves.quick,
    pokemon,
    opponent,
    weather
  );
  const dpsChargedAttack = getDpsMove(
    pokemon.moves.charged,
    pokemon,
    opponent,
    weather
  );
  console.log(pokemon.name, dpsQuickAttack, opponent.name);
  console.log(pokemon.name, dpsChargedAttack, opponent.name);
};
