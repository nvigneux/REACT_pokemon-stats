const TIME_LIMIT = 180
const ATK_DELAY = 700
const DEF_DELAY = 1600

const QUICK_ATK = "quick"
const CHARGED_ATK = "charged"

const battleReducer = (state, { type, attacker, timer }) => {
  switch (type) {
    case QUICK_ATK: {
      return {
        ...state,
        oppHp: state.oppHp - attacker.moves.quick.dmg,
        oppEnergy: state.oppEnergy + attacker.moves.quick.dmg / 2,
        attEnergy: state.attEnergy + attacker.moves.quick.energyGen,
        attTimeNextAtt: timer - attacker.moves.quick.execTime * 1000,
      }
    }
    case CHARGED_ATK: {
      return {
        ...state,
        oppHp: state.oppHp - attacker.moves.charged.dmg,
        oppEnergy: state.oppEnergy + attacker.moves.charged.dmg / 2,
        attEnergy: state.attEnergy - attacker.moves.charged.energyReq,
        attTimeNextAtt: timer - attacker.moves.charged.execTime * 1000,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

export const simulateBattle = (pokemon, opponent) => {
  const timerBattle = TIME_LIMIT * 1000 // fight duration : 180000ms
  let resumeBattle = { attacker: pokemon, defender: opponent, events: [] }
  let timerRemaining = timerBattle // fight duration : 180000ms
  let stateBattle = {
    attHp: pokemon.stats.stamina,
    oppHp: opponent.stats.stamina,
    attEnergy: 0,
    oppEnergy: 0,
    attTimeNextAtt: 0,
    oppTimeNextAtt: 0,
  }

  for (timerRemaining; timerRemaining > 0; timerRemaining -= 100) {
    // console.log("time", timerRemaining / 1000, resumeBattle)

    if (stateBattle.oppHp <= 0) {
      console.log("Defender is KO", resumeBattle)
      break
    }

    if (timerRemaining === 0) {
      console.log("Timer is over", resumeBattle)
      break
    }

    // Attacker can begin launch quick attack
    if (timerRemaining === timerBattle - ATK_DELAY) {
      stateBattle = battleReducer(stateBattle, {
        type: QUICK_ATK,
        attacker: pokemon,
        timer: timerRemaining,
      })
      resumeBattle = {
        ...resumeBattle,
        events: [...resumeBattle.events, { stateBattle, attack: QUICK_ATK }],
      }
    }

    if (timerRemaining === stateBattle.attTimeNextAtt) {
      // if Attacker can launch a charged attack
      if (pokemon.moves.charged.energyReq <= stateBattle.attEnergy) {
        stateBattle = battleReducer(stateBattle, {
          type: CHARGED_ATK,
          attacker: pokemon,
          timer: timerRemaining,
        })
        resumeBattle = {
          ...resumeBattle,
          events: [
            ...resumeBattle.events,
            { stateBattle, attack: CHARGED_ATK },
          ],
        }
      } else {
        stateBattle = battleReducer(stateBattle, {
          type: QUICK_ATK,
          attacker: pokemon,
          timer: timerRemaining,
        })
        resumeBattle = {
          ...resumeBattle,
          events: [...resumeBattle.events, { stateBattle, attack: QUICK_ATK }],
        }
      }
    }

    // Defender can begin
    if (timerRemaining === timerBattle - DEF_DELAY) {
      console.log("Defender first attack")
    }
  }
}

// TODO ? Make a reducer for state battle ? good idea ?
