const TIME_LIMIT = 180
const ATT_DELAY = 700
const DEF_DELAY = 1600

const QUICK_ATK_ATTACKER = "Quick Attacker"
const CHARGED_ATK_ATTACKER = "Charged Attacker"

const QUICK_ATK_DEFENDER = "Quick Defender"
const CHARGED_ATK_DEFENDER = "Charged Defender"

const battleReducer = (state, { type, pokemon, timer }) => {
  switch (type) {
    case QUICK_ATK_ATTACKER: {
      return {
        ...state,
        oppHp: state.oppHp - pokemon.moves.quick.dmg,
        oppEnergy: state.oppEnergy + pokemon.moves.quick.dmg / 2,
        attEnergy: state.attEnergy + pokemon.moves.quick.energyGen,
        attTimeNextAtt: timer - pokemon.moves.quick.execTime * 1000,
      }
    }
    case CHARGED_ATK_ATTACKER: {
      return {
        ...state,
        oppHp: state.oppHp - pokemon.moves.charged.dmg,
        oppEnergy: state.oppEnergy + pokemon.moves.charged.dmg / 2,
        attEnergy: state.attEnergy - pokemon.moves.charged.energyReq,
        attTimeNextAtt: timer - pokemon.moves.charged.execTime * 1000,
      }
    }
    case QUICK_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - pokemon.moves.quick.dmg,
        attEnergy: state.attEnergy + pokemon.moves.quick.dmg / 2,
        oppEnergy: state.oppEnergy + pokemon.moves.quick.energyGen,
        oppTimeNextAtt: timer - pokemon.moves.quick.execTime * 1000,
      }
    }
    case CHARGED_ATK_DEFENDER: {
      return {
        ...state,
        attHp: state.attHp - pokemon.moves.charged.dmg,
        attEnergy: state.attEnergy + pokemon.moves.charged.dmg / 2,
        oppEnergy: state.oppEnergy - pokemon.moves.charged.energyReq,
        oppTimeNextAtt: timer - pokemon.moves.charged.execTime * 1000,
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
    attTimeNextAtt: 0,
    oppTimeNextAtt: 0,
  }

  let timerRemaining = timerBattle
  for (timerRemaining; timerRemaining >= 0; timerRemaining -= 100) {
    // console.log("time", timerRemaining / 1000, historyBattle)

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

    // Attacker can begin launch quick attack
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
            attack: QUICK_ATK_ATTACKER,
            time: timerRemaining,
            pokemon: attacker.id,
          },
        ],
      }
    }

    if (timerRemaining === stateBattle.attTimeNextAtt) {
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
              attack: CHARGED_ATK_ATTACKER,
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
              attack: QUICK_ATK_ATTACKER,
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
            attack: QUICK_ATK_DEFENDER,
            time: timerRemaining,
            pokemon: opponent.id,
          },
        ],
      }
    }

    if (timerRemaining === stateBattle.attTimeNextAtt) {
      // if Attacker can launch a charged attack
      if (opponent.moves.charged.energyReq <= stateBattle.attEnergy) {
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
              attack: CHARGED_ATK_DEFENDER,
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
              attack: QUICK_ATK_DEFENDER,
              time: timerRemaining,
              pokemon: opponent.id,
            },
          ],
        }
      }
    }
  }
}

// TODO ? Make a reducer for state battle ? good idea ?
