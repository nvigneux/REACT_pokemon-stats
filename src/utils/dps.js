import { getWeatherBonus } from "./weather";
import { getMoveEffectivenessType } from "./et";

const getDpsMove = (move, pokemon, opponent, weather) => {
  const stab = pokemon.type.includes(move.type) ? 1.2 : 1;
  const bonusWeather = getWeatherBonus(weather, move.type);
  const effectiveness = getMoveEffectivenessType(move.type, opponent.type);

  console.log(pokemon.stats, opponent.stats);
  return (
    Math.floor(
      0.5 *
        move.power *
        stab *
        effectiveness *
        bonusWeather *
        (pokemon.stats.attack / opponent.stats.defense)
    ) + 1
  );
};

export const getRealDps = (pokemon, opponent, weather) => {
  const moveDpsQuick = getDpsMove(
    pokemon.moves.quick,
    pokemon,
    opponent,
    weather
  );
  const moveDpsCharged = getDpsMove(
    pokemon.moves.charged,
    pokemon,
    opponent,
    weather
  );
  const numberAttackRequired = Math.ceil(
    pokemon.moves.charged.energyReq / pokemon.moves.quick.energyGen
  );
  const calculRealDps =
    (moveDpsQuick * numberAttackRequired + moveDpsCharged) /
    (pokemon.moves.quick.execTime * numberAttackRequired +
      pokemon.moves.charged.execTime);

  return calculRealDps;
};
