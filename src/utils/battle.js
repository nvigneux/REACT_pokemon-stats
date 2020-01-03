const TIME_LIMIT = 180
const ATT_DELAY = 700
const DEF_DELAY = 1600

const DEF_DELAY_ATTACK = 2000

const QUICK_ATK_ATTACKER = "Attacker Quick"
const CHARGED_ATK_ATTACKER = "Attacker Charged"

const QUICK_ATK_DEFENDER = "Defender Quick"
const CHARGED_ATK_DEFENDER = "Defender Charged"

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
  const timerBattle = TIME_LIMIT * 1000 // fight duration : 180000ms

  let stateBattle = {
    attHp: attacker.stats.stamina,
    attEnergy: 0,
    attTimeNextAtk: 0,
    defHp: defender.stats.stamina,
    defEnergy: 0,
    defTimeNextAtk: 0,
  }

  let timerRemaining = timerBattle
  for (timerRemaining; timerRemaining >= 0; timerRemaining -= 100) {
    /**
     * Condition for the END of the fight
     */
    if (stateBattle.attHp <= 0) {
      console.log("Attacker is KO", attacker.id, logBattle)
      break
    }
    if (stateBattle.defHp <= 0) {
      console.log("Defender is KO", defender.id, logBattle)
      break
    }
    if (timerRemaining === 0) {
      console.log("Timer is over", logBattle)
      break
    }

    /**
     * Attacker attacks
     * Attacker can begin launch quick attack after his first attack delay
     */
    if (
      timerRemaining === stateBattle.attTimeNextAtk ||
      timerRemaining === timerBattle - ATT_DELAY
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
      timerRemaining === timerBattle - DEF_DELAY
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
}
