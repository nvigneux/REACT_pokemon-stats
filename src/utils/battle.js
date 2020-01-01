const TIME_LIMIT = 180
const ATK_DELAY = 700
const DEF_DELAY = 1600

export const simulateBattle = (pokemon, opponent) => {
  const timerBattle = TIME_LIMIT * 1000 // fight duration : 180000ms
  let events = []
  let timerRemaining = timerBattle // fight duration : 180000ms
  let stateBattle = {
    attHp: pokemon.stats.stamina,
    oppHp: opponent.stats.stamina,
    attEnergy: 0,
    oppEnergy: 0,
    attTime: 0,
    oppTime: 0,
  }

  for (timerRemaining; timerRemaining > 0; timerRemaining -= 100) {
    console.log("time", timerRemaining / 1000)

    // Attacker can begin launch quick attack
    if (timerRemaining === timerBattle - ATK_DELAY) {
      stateBattle.oppHp -= pokemon.moves.quick.dmg
      stateBattle.oppEnergy += pokemon.moves.quick.dmg / 2
      stateBattle.attEnergy = pokemon.moves.quick.energyGen
      stateBattle.attTime = timerRemaining - pokemon.moves.quick.execTime * 1000
    }

    if (timerRemaining === stateBattle.attTime) {
      // if Attacker can launch a charged attack
      if (pokemon.moves.charged.energyReq <= stateBattle.attEnergy) {
        stateBattle.oppHp -= pokemon.moves.charged.dmg
        stateBattle.oppEnergy += pokemon.moves.charged.dmg / 2
        stateBattle.attEnergy -= pokemon.moves.charged.energyReq
        stateBattle.attTime =
          timerRemaining - pokemon.moves.charged.execTime * 1000
      }

      // Attacker launch quick attack
      if (pokemon.moves.charged.energyReq > stateBattle.attEnergy) {
        stateBattle.oppHp -= pokemon.moves.quick.dmg
        stateBattle.oppEnergy += pokemon.moves.quick.dmg / 2
        stateBattle.attEnergy += pokemon.moves.quick.energyGen
        stateBattle.attTime =
          timerRemaining - pokemon.moves.quick.execTime * 1000
      }
    }

    // Defender can begin
    if (timerRemaining === timerBattle - DEF_DELAY) {
      console.log("Defender first attack")
    }

    if (stateBattle.oppHp <= 0) {
      console.log("Defender is KO")
      break
    }

    if (timerRemaining === 0) {
      console.log("Timer is over")
    }
  }
}

// TODO ? Make a reducer for state battle ? good idea ?
