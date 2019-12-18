import { TYPES_EFFICIENT } from "../typesEt";

export const getMoveEffectivenessType = (moveType, opponentType) => {
  let totalEffectiveness = TYPES_EFFICIENT[moveType][opponentType[0]];
  if (opponentType.length > 1) {
    totalEffectiveness =
      totalEffectiveness * TYPES_EFFICIENT[moveType][opponentType[1]];
  }
  return totalEffectiveness;
};
