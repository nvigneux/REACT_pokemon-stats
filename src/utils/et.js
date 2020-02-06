import { TYPES_EFFICIENT } from "../constants/typesEt"

/**
 * Defined the bonus STAB
 * @param {string} moveType
 * @param {string} opponentType
 */
export const getMoveEffectivenessType = (moveType, opponentType) => {
  let totalEffectiveness = TYPES_EFFICIENT[moveType][opponentType[0].name]
  if (opponentType.length > 1) {
    totalEffectiveness *= TYPES_EFFICIENT[moveType][opponentType[1].name]
  }
  return totalEffectiveness
}
