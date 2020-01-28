/**
 * Formula to calculate attack ,defense and stamina by the pokemon's base stats
 * @param {number} base
 * @param {number} individual
 * @param {number} cpMultiplier
 */
const calculateStat = (base, individual, cpMultiplier) =>
  Math.floor((base + individual) * cpMultiplier)

/**
 * Formula to calculate combat point by the pokemon's bases stats
 * @param {number} attack
 * @param {number} defense
 * @param {number} stamina
 */
const calculateCombatPoint = (attack, defense, stamina) =>
  Math.floor(Math.sqrt(attack * attack * defense * stamina) / 10)

/**
 * Return all base stats of one pokemon
 * { Attack, Defense, Stamina, CP, IV }
 * @param {number} cpMultiplier
 * @param {Pokemon} pokemon
 */
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

/**
 * TODO Temporary version of pokemonStats
 * { Attack, Defense, Stamina, CP, IV }
 * @param {number} cpMultiplier
 * @param {Pokemon} pokemon
 */
export const pokemonStatsTemp = (cpMultiplier, pokemon) => {
  console.log(pokemon)
  const pokemonCpMultiplier = cpMultiplier[pokemon.level - 1]
  const attack = calculateStat(
    pokemon.attack,
    pokemon.iv_attack,
    pokemonCpMultiplier
  )
  const defense = calculateStat(
    pokemon.defense,
    pokemon.iv_defense,
    pokemonCpMultiplier
  )
  const stamina = calculateStat(
    pokemon.stamina,
    pokemon.iv_stamina,
    pokemonCpMultiplier
  )
  const cp = calculateCombatPoint(attack, defense, stamina)
  const iv = Math.floor(
    ((pokemon.iv_attack + pokemon.iv_defense + pokemon.iv_stamina) * 100) / 45
  )
  return { cp, iv, attack, defense, stamina }
}
