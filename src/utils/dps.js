import { getWeatherBonus } from "./weather"
import { getMoveEffectivenessType } from "./et"

const getDpsMove = (move, attacker, defender, weather) => {
  const stab = attacker.type.includes(move.type) ? 1.2 : 1
  const bonusWeather = getWeatherBonus(weather, move.type)
  const effectiveness = getMoveEffectivenessType(move.type, defender.type)

  return (
    Math.floor(
      0.5 *
        move.power *
        stab *
        effectiveness *
        bonusWeather *
        (attacker.stats.attack / defender.stats.defense)
    ) + 1
  )
}

const getRealDps = (attacker, defender, weather) => {
  const moveDpsQuick = getDpsMove(
    attacker.moves.quick,
    attacker,
    defender,
    weather
  )
  const moveDpsCharged = getDpsMove(
    attacker.moves.charged,
    attacker,
    defender,
    weather
  )
  const numberAttackRequired = Math.ceil(
    attacker.moves.charged.energyReq / attacker.moves.quick.energyGen
  )
  const calculRealDps =
    (moveDpsQuick * numberAttackRequired + moveDpsCharged) /
    (attacker.moves.quick.execTime * numberAttackRequired +
      attacker.moves.charged.execTime)

  return {
    realDps: Math.round(calculRealDps * 100) / 100,
    quick: moveDpsQuick,
    charged: moveDpsCharged,
  }
}

/**
 *  Get the damage output for quick & charged moves of one pokemon against another
 * @param {Pokemon} attacker
 * @param {Pokemon} defender
 * @param {*} weather
 */
export const getDmgMoves = (attacker, defender, weather) => {
  const dmgAttacker = getRealDps(attacker, defender, weather)
  return {
    ...attacker,
    moves: {
      ...attacker.moves,
      quick: { dmg: dmgAttacker.quick, ...attacker.moves.quick },
      charged: { dmg: dmgAttacker.charged, ...attacker.moves.charged },
    },
  }
}
