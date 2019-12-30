export const simulateBattle = (pokemon, opponent) => {
  console.log(pokemon, opponent)
  let timerBattle = 100
  const stateBattle = {
    attHp: pokemon.stats.stamina,
    oppHp: opponent.stats.stamina,
    attEnergy: 0,
    oppEnergy: 0,
    attTime: 0,
    oppTime: 0,
  }

  const events = {}
  while (timerBattle > 0) {
    console.log("state", stateBattle)

    stateBattle.oppHp -= pokemon.stats.attack
    timerBattle -= pokemon.moves.quick.execTime
    events[Math.round(timerBattle * 100) / 100] = stateBattle

    console.log(stateBattle.oppHp)

    if (stateBattle.oppHp <= 0) {
      timerBattle = 0
    }
  }
  console.log("toto", events)
}
