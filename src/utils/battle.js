import {
  TIMER_BATTLE,
  POKEMON,
  BOSS,
  QUICK_ATK_ATTACKER,
  CHARGED_ATK_ATTACKER,
  QUICK_ATK_DEFENDER,
  CHARGED_ATK_DEFENDER,
} from "../constants/constant"

const ATT_DELAY = 700
const DEF_DELAY = 1600
const DEF_DELAY_ATTACK = 2000

const battleReducer = (state, { type, move, timer }) => {
  switch (type) {
    case QUICK_ATK_ATTACKER: {
      return {
        ...state,
        defHp: state.defHp - move.dmg,
        defEnergy: state.defEnergy + move.dmg / 2,
        attEnergy: state.attEnergy + move.energyGen,
        attTimeNextAtk: timer - move.execTime * 1000,
      }
    }
    case CHARGED_ATK_ATTACKER: {
      return {
        ...state,
        defHp: state.defHp - move.dmg,
        defEnergy: state.defEnergy + move.dmg / 2,
        attEnergy: state.attEnergy - move.energyReq,
        attTimeNextAtk: timer - move.execTime * 1000,
      }
    }
    case QUICK_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - move.dmg,
        attEnergy: state.attEnergy + move.dmg / 2,
        defEnergy: state.defEnergy + move.energyGen,
        defTimeNextAtk: timer - move.execTime * 1000 - DEF_DELAY_ATTACK,
      }
    }
    case CHARGED_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - move.dmg,
        attEnergy: state.attEnergy + move.dmg / 2,
        defEnergy: state.defEnergy - move.energyReq,
        defTimeNextAtk: timer - move.execTime * 1000,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

/**
 * Will simulate all the attacks during a raid fight between two pokemon
 * Atta
 * @param {Pokemon} attacker
 * @param {Pokemon} defender
 */
export const simulateBattle = (attacker, defender) => {
  const logBattle = []

  let stateBattle = {
    attHp: attacker.stats.stamina,
    attEnergy: 0,
    attTimeNextAtk: 0,
    defHp: defender.stats.stamina,
    defEnergy: 0,
    defTimeNextAtk: 0,
  }

  let timerRemaining = TIMER_BATTLE
  for (timerRemaining; timerRemaining >= 0; timerRemaining -= 100) {
    /**
     * Condition for the END of the fight
     */
    if (
      stateBattle.attHp <= 0 ||
      stateBattle.defHp <= 0 ||
      timerRemaining === 0
    ) {
      break
    }

    /**
     * Attacker attacks
     * Attacker can begin launch quick attack after his first attack delay
     */
    if (
      timerRemaining === stateBattle.attTimeNextAtk ||
      timerRemaining === TIMER_BATTLE - ATT_DELAY
    ) {
      // if Attacker can launch a charged attack
      if (attacker.moves.charged.energyReq <= stateBattle.attEnergy) {
        stateBattle = battleReducer(stateBattle, {
          type: CHARGED_ATK_ATTACKER,
          move: attacker.moves.charged,
          timer: timerRemaining,
        })
        logBattle.push({
          time: timerRemaining,
          type: CHARGED_ATK_ATTACKER,
          pokemon: attacker.id,
          stateBattle,
        })
      } else {
        stateBattle = battleReducer(stateBattle, {
          type: QUICK_ATK_ATTACKER,
          move: attacker.moves.quick,
          timer: timerRemaining,
        })
        logBattle.push({
          time: timerRemaining,
          type: QUICK_ATK_ATTACKER,
          pokemon: attacker.id,
          stateBattle,
        })
      }
    }

    /**
     * Defender attacks
     * Defender can begin launch quick attack after his first attack delay
     */
    if (
      timerRemaining === stateBattle.defTimeNextAtk ||
      timerRemaining === TIMER_BATTLE - DEF_DELAY
    ) {
      // if Defender can launch a charged attack
      if (defender.moves.charged.energyReq <= stateBattle.defEnergy) {
        stateBattle = battleReducer(stateBattle, {
          type: CHARGED_ATK_DEFENDER,
          move: defender.moves.charged,
          timer: timerRemaining,
        })
        logBattle.push({
          time: timerRemaining,
          type: CHARGED_ATK_DEFENDER,
          pokemon: defender.id,
          stateBattle,
        })
      } else {
        stateBattle = battleReducer(stateBattle, {
          type: QUICK_ATK_DEFENDER,
          move: defender.moves.quick,
          timer: timerRemaining,
        })
        logBattle.push({
          time: timerRemaining,
          type: QUICK_ATK_DEFENDER,
          pokemon: defender.id,
          stateBattle,
        })
      }
    }
  }
  return logBattle
}

const getNumberAtk = (battle, type) =>
  battle.reduce(
    (accumulator, event) =>
      event.type === type ? accumulator + 1 : accumulator,
    0
  )

/**
 * Get stats : Total Dmg, LifeTime, Number Atk, Dps Atk
 * @param {*} battle
 * @param {number} opponent
 */
export const simulateBattleStats = (
  type = POKEMON,
  pokemonId,
  battle,
  opponent
) => {
  let totalDmg
  const lastLog = battle[battle.length - 1]
  const battleDuration = (TIMER_BATTLE - lastLog.time) / 1000
  const lifeTime = battleDuration

  switch (type) {
    case POKEMON:
      totalDmg = opponent.stats.stamina - lastLog.stateBattle.defHp
      return {
        pokemonId,
        totalDmg,
        lifeTime,
        nbQuickAtk: getNumberAtk(battle, QUICK_ATK_ATTACKER),
        nbChargedAtk: getNumberAtk(battle, CHARGED_ATK_ATTACKER),
        dps: totalDmg / lifeTime,
      }
    case BOSS:
      totalDmg = opponent.stats.stamina - lastLog.stateBattle.attHp
      return {
        pokemonId,
        totalDmg,
        lifeTime,
        nbQuickAtk: getNumberAtk(battle, QUICK_ATK_DEFENDER),
        nbChargedAtk: getNumberAtk(battle, CHARGED_ATK_DEFENDER),
        dps: totalDmg / lifeTime,
      }
    default: {
      throw new Error(`Unhandled type: ${type}`)
    }
  }
}
