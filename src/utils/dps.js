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

const calculateRealDps = (
  quickMoveDps,
  chargedMoveDps,
  numberAttackRequired,
  quickMoveExecTime,
  chargedMoveExecTime
) =>
  (quickMoveDps * numberAttackRequired + chargedMoveDps) /
  (quickMoveExecTime * numberAttackRequired + chargedMoveExecTime)

/**
 * @param {Pokemon} attacker
 * @param {Pokemon} defender
 * @param {string} weather
 */
const getRealDps = (attacker, defender, weather) => {
  const quickMoveDps = getDpsMove(
    attacker.moves.quick,
    attacker,
    defender,
    weather
  )
  const chargedMoveDps = getDpsMove(
    attacker.moves.charged,
    attacker,
    defender,
    weather
  )
  const numberAttackRequired = Math.ceil(
    attacker.moves.charged.energyReq / attacker.moves.quick.energyGen
  )
  const realDps = calculateRealDps(
    quickMoveDps,
    chargedMoveDps,
    numberAttackRequired,
    attacker.moves.quick.execTime,
    attacker.moves.charged.execTime
  )

  return {
    realDps: Math.round(realDps * 100) / 100,
    quick: quickMoveDps,
    charged: chargedMoveDps,
  }
}

/**
 *  Get the damage output for quick & charged moves of one pokemon against another
 * @param {Pokemon} attacker
 * @param {Pokemon} defender
 * @param {string} weather
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
