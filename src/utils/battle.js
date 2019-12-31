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
    console.log("toto", pokemon, timerRemaining, stateBattle)
    // Attacker can begin
    if (timerRemaining === timerBattle - ATK_DELAY) {
      console.log("att")
      stateBattle.oppHp -= pokemon.moves.quick.dmg
      stateBattle.oppEnergy += pokemon.moves.quick.dmg / 2
      stateBattle.attEnergy =
        timerRemaining - pokemon.moves.quick.execTime * 1000
      stateBattle.attTime = timerRemaining - pokemon.moves.quick.execTime * 1000
    }

    if (timerRemaining === stateBattle.attTime) {
      stateBattle.oppHp -= pokemon.moves.quick.dmg
      stateBattle.oppEnergy += pokemon.moves.quick.dmg / 2
      stateBattle.attEnergy =
        timerRemaining - pokemon.moves.quick.execTime * 1000
      stateBattle.attTime = timerRemaining - pokemon.moves.quick.execTime * 1000
    }
    // IA can begin
    if (timerRemaining === timerBattle - DEF_DELAY) {
      console.log("ia")
    }
  }
}

// TODO ? Make a reducer for state battle ? good idea ?
