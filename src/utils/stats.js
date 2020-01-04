import {
  TIMER_BATTLE,
  QUICK_ATK_ATTACKER,
  QUICK_ATK_DEFENDER,
  CHARGED_ATK_ATTACKER,
  CHARGED_ATK_DEFENDER,
} from "../constant"

// Formula to calculate attack ,defense and stamina by the pokemon's base stats
const calculateStat = (base, individual, cpMultiplier) =>
  Math.floor((base + individual) * cpMultiplier)

// Formula to calculate combat point by the pokemon's bases stats
const calculateCombatPoint = (attack, defense, stamina) =>
  Math.floor(Math.sqrt(attack * attack * defense * stamina) / 10)

export const pokemonStats = (cpMultiplier, pokemon) => {
  const pokemonCpMultiplier = cpMultiplier[pokemon.level - 1]
  const attack = calculateStat(
    pokemon.baseAttack,
    pokemon.individualAttack,
    pokemonCpMultiplier
  )
  const defense = calculateStat(
    pokemon.baseDefense,
    pokemon.individualDefense,
    pokemonCpMultiplier
  )
  const stamina = calculateStat(
    pokemon.baseStamina,
    pokemon.individualStamina,
    pokemonCpMultiplier
  )
  const cp = calculateCombatPoint(attack, defense, stamina)
  const iv = Math.floor(
    ((pokemon.individualAttack +
      pokemon.individualDefense +
      pokemon.individualStamina) *
      100) /
      45
  )
  return { cp, iv, attack, defense, stamina }
}

const getNumberAtk = (battle, type) =>
  battle.reduce(
    (accumulator, event) =>
      event.type === type ? accumulator + 1 : accumulator,
    0
  )

export const battleStats = (battle, attacker, defender) => {
  const lastLog = battle[battle.length - 1]

  const totalDmgAtt = defender.stats.stamina - lastLog.stateBattle.defHp
  const totalDmgDef = attacker.stats.stamina - lastLog.stateBattle.attHp

  const battleDuration = (TIMER_BATTLE - lastLog.time) / 1000
  const lifeTimeAtt = battleDuration
  const lifeTimeDef = battleDuration

  const nbQuickAtkAtt = getNumberAtk(battle, QUICK_ATK_ATTACKER)
  const nbQuickAtkDef = getNumberAtk(battle, QUICK_ATK_DEFENDER)

  const nbChargedAtkAtt = getNumberAtk(battle, CHARGED_ATK_ATTACKER)
  const nbChargedAtkDef = getNumberAtk(battle, CHARGED_ATK_DEFENDER)

  const dpsAtt = totalDmgAtt / lifeTimeAtt
  const dpsDef = totalDmgDef / lifeTimeDef

  return {
    attacker: {
      totalDmgAtt,
      lifeTimeAtt,
      nbQuickAtkAtt,
      nbChargedAtkAtt,
      dpsAtt,
    },
    defender: {
      totalDmgDef,
      lifeTimeDef,
      nbQuickAtkDef,
      nbChargedAtkDef,
      dpsDef,
    },
  }
}
