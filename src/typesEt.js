const IMMUNITY = 0.390625;
const NOT_EFFICIENT = 0.625;
const NORMAL_EFFICIENT = 1;
const SUPER_EFFICIENT = 1.6;

export const TYPES_EFFICIENT = {
  BUG: {
    BUG: NORMAL_EFFICIENT,
    DARK: SUPER_EFFICIENT,
    DRAGON: NORMAL_EFFICIENT,
    ELECTRIC: NORMAL_EFFICIENT,
    FAIRY: NOT_EFFICIENT,
    FIGHTING: NOT_EFFICIENT,
    FIRE: NOT_EFFICIENT,
    FLYING: NOT_EFFICIENT,
    GHOST: NOT_EFFICIENT,
    GRASS: NORMAL_EFFICIENT,
    GROUND: NORMAL_EFFICIENT,
    ICE: NORMAL_EFFICIENT,
    NORMAL: NORMAL_EFFICIENT,
    POISON: NOT_EFFICIENT,
    PSYCHIC: SUPER_EFFICIENT,
    ROCK: NORMAL_EFFICIENT,
    STEEL: NOT_EFFICIENT,
    WATER: NORMAL_EFFICIENT
  }
};
