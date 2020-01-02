const TIME_LIMIT = 180
const ATT_DELAY = 700
const DEF_DELAY = 1600

const DEF_DELAY_ATTACK = 2000

const QUICK_ATK_ATTACKER = "Attacker Quick"
const CHARGED_ATK_ATTACKER = "Attacker Charged"

const QUICK_ATK_DEFENDER = "Defender Quick"
const CHARGED_ATK_DEFENDER = "Defender Charged"

const battleReducer = (state, { type, pokemon, timer }) => {
  switch (type) {
    case QUICK_ATK_ATTACKER: {
      return {
        ...state,
        oppHp: state.oppHp - pokemon.moves.quick.dmg,
        oppEnergy: state.oppEnergy + pokemon.moves.quick.dmg / 2,
        attEnergy: state.attEnergy + pokemon.moves.quick.energyGen,
        attTimeNextAtk: timer - pokemon.moves.quick.execTime * 1000,
      }
    }
    case CHARGED_ATK_ATTACKER: {
      return {
        ...state,
        oppHp: state.oppHp - pokemon.moves.charged.dmg,
        oppEnergy: state.oppEnergy + pokemon.moves.charged.dmg / 2,
        attEnergy: state.attEnergy - pokemon.moves.charged.energyReq,
        attTimeNextAtk: timer - pokemon.moves.charged.execTime * 1000,
      }
    }
    case QUICK_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - pokemon.moves.quick.dmg,
        attEnergy: state.attEnergy + pokemon.moves.quick.dmg / 2,
        oppEnergy: state.oppEnergy + pokemon.moves.quick.energyGen,
        oppTimeNextAtk:
          timer - pokemon.moves.quick.execTime * 1000 - DEF_DELAY_ATTACK,
      }
    }
    case CHARGED_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - pokemon.moves.charged.dmg,
        attEnergy: state.attEnergy + pokemon.moves.charged.dmg / 2,
        oppEnergy: state.oppEnergy - pokemon.moves.charged.energyReq,
        oppTimeNextAtk: timer - pokemon.moves.charged.execTime * 1000,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

export const simulateBattle = (attacker, opponent) => {
  const timerBattle = TIME_LIMIT * 1000 // fight duration : 180000ms

  let historyBattle = { events: [] }
  let stateBattle = {
    attHp: attacker.stats.stamina,
    oppHp: opponent.stats.stamina,
    attEnergy: 0,
    oppEnergy: 0,
    attTimeNextAtk: 0,
    oppTimeNextAtk: 0,
  }

  let timerRemaining = timerBattle
  for (timerRemaining; timerRemaining >= 0; timerRemaining -= 100) {
    /**
     * Condition for the END of the fight
     */
    if (stateBattle.attHp <= 0) {
      console.log("Attacker is KO", historyBattle)
      break
    }
    if (stateBattle.oppHp <= 0) {
      console.log("Defender is KO", historyBattle)
      break
    }
    if (timerRemaining === 0) {
      console.log("Timer is over", historyBattle)
      break
    }

    /**
     * Attacker can begin launch quick attack
     */
    // wait until the attacker's delay is reached
    if (timerRemaining === timerBattle - ATT_DELAY) {
      stateBattle = battleReducer(stateBattle, {
        type: QUICK_ATK_ATTACKER,
        pokemon: attacker,
        timer: timerRemaining,
      })
      historyBattle = {
        ...historyBattle,
        events: [
          ...historyBattle.events,
          {
            stateBattle,
            type: QUICK_ATK_ATTACKER,
            time: timerRemaining,
            pokemon: attacker.id,
          },
        ],
      }
    }

    if (timerRemaining === stateBattle.attTimeNextAtk) {
      // if Attacker can launch a charged attack
      if (attacker.moves.charged.energyReq <= stateBattle.attEnergy) {
        stateBattle = battleReducer(stateBattle, {
          type: CHARGED_ATK_ATTACKER,
          pokemon: attacker,
          timer: timerRemaining,
        })
        historyBattle = {
          ...historyBattle,
          events: [
            ...historyBattle.events,
            {
              stateBattle,
              type: CHARGED_ATK_ATTACKER,
              time: timerRemaining,
              pokemon: attacker.id,
            },
          ],
        }
      } else {
        stateBattle = battleReducer(stateBattle, {
          type: QUICK_ATK_ATTACKER,
          pokemon: attacker,
          timer: timerRemaining,
        })
        historyBattle = {
          ...historyBattle,
          events: [
            ...historyBattle.events,
            {
              stateBattle,
              type: QUICK_ATK_ATTACKER,
              time: timerRemaining,
              pokemon: attacker.id,
            },
          ],
        }
      }
    }

    // Defender can begin launch quick attack
    if (timerRemaining === timerBattle - DEF_DELAY) {
      stateBattle = battleReducer(stateBattle, {
        type: QUICK_ATK_DEFENDER,
        pokemon: opponent,
        timer: timerRemaining,
      })
      historyBattle = {
        ...historyBattle,
        events: [
          ...historyBattle.events,
          {
            stateBattle,
            type: QUICK_ATK_DEFENDER,
            time: timerRemaining,
            pokemon: opponent.id,
          },
        ],
      }
    }

    if (timerRemaining === stateBattle.oppTimeNextAtk) {
      // if Defender can launch a charged attack
      if (opponent.moves.charged.energyReq <= stateBattle.oppEnergy) {
        stateBattle = battleReducer(stateBattle, {
          type: CHARGED_ATK_DEFENDER,
          pokemon: opponent,
          timer: timerRemaining,
        })
        historyBattle = {
          ...historyBattle,
          events: [
            ...historyBattle.events,
            {
              stateBattle,
              type: CHARGED_ATK_DEFENDER,
              time: timerRemaining,
              pokemon: opponent.id,
            },
          ],
        }
      } else {
        stateBattle = battleReducer(stateBattle, {
          type: QUICK_ATK_DEFENDER,
          pokemon: opponent,
          timer: timerRemaining,
        })
        historyBattle = {
          ...historyBattle,
          events: [
            ...historyBattle.events,
            {
              stateBattle,
              type: QUICK_ATK_DEFENDER,
              time: timerRemaining,
              pokemon: opponent.id,
            },
          ],
        }
      }
    }
  }
}

// TODO refactoring of events
