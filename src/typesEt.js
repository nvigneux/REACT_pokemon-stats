import {
  BUG,
  DARK,
  DRAGON,
  ELECTRIC,
  FAIRY,
  FIGHTING,
  FIRE,
  FLYING,
  GHOST,
  GRASS,
  GROUND,
  ICE,
  NORMAL,
  POISON,
  PSYCHIC,
  ROCK,
  STEEL,
  WATER
} from "./types";

const IMMUNITY = 0.390625;
const NOT_EFFICIENT = 0.625;
const NORMAL_EFFICIENT = 1;
const SUPER_EFFICIENT = 1.6;

export const TYPES_EFFICIENT = {
  [BUG]: {
    [BUG]: NORMAL_EFFICIENT,
    [DARK]: SUPER_EFFICIENT,
    [DRAGON]: NORMAL_EFFICIENT,
    [ELECTRIC]: NORMAL_EFFICIENT,
    [FAIRY]: NOT_EFFICIENT,
    [FIGHTING]: NOT_EFFICIENT,
    [FIRE]: NOT_EFFICIENT,
    [FLYING]: NOT_EFFICIENT,
    [GHOST]: NOT_EFFICIENT,
    [GRASS]: NORMAL_EFFICIENT,
    [GROUND]: NORMAL_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NOT_EFFICIENT,
    [PSYCHIC]: SUPER_EFFICIENT,
    [ROCK]: NORMAL_EFFICIENT,
    [STEEL]: NOT_EFFICIENT,
    [WATER]: NORMAL_EFFICIENT
  },
  [DARK]: {
    [BUG]: NORMAL_EFFICIENT,
    [DARK]: NOT_EFFICIENT,
    [DRAGON]: NORMAL_EFFICIENT,
    [ELECTRIC]: NORMAL_EFFICIENT,
    [FAIRY]: NOT_EFFICIENT,
    [FIGHTING]: NOT_EFFICIENT,
    [FIRE]: NORMAL_EFFICIENT,
    [FLYING]: NORMAL_EFFICIENT,
    [GHOST]: SUPER_EFFICIENT,
    [GRASS]: NORMAL_EFFICIENT,
    [GROUND]: NORMAL_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NORMAL_EFFICIENT,
    [PSYCHIC]: SUPER_EFFICIENT,
    [ROCK]: NORMAL_EFFICIENT,
    [STEEL]: NORMAL_EFFICIENT,
    [WATER]: NORMAL_EFFICIENT
  },
  [DRAGON]: {
    [BUG]: NORMAL_EFFICIENT,
    [DARK]: NORMAL_EFFICIENT,
    [DRAGON]: SUPER_EFFICIENT,
    [ELECTRIC]: NORMAL_EFFICIENT,
    [FAIRY]: IMMUNITY,
    [FIGHTING]: NORMAL_EFFICIENT,
    [FIRE]: NORMAL_EFFICIENT,
    [FLYING]: NORMAL_EFFICIENT,
    [GHOST]: NORMAL_EFFICIENT,
    [GRASS]: NORMAL_EFFICIENT,
    [GROUND]: NORMAL_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NORMAL_EFFICIENT,
    [PSYCHIC]: NORMAL_EFFICIENT,
    [ROCK]: NORMAL_EFFICIENT,
    [STEEL]: NOT_EFFICIENT,
    [WATER]: NORMAL_EFFICIENT
  },
  [FAIRY]: {
    [BUG]: NORMAL_EFFICIENT,
    [DARK]: SUPER_EFFICIENT,
    [DRAGON]: SUPER_EFFICIENT,
    [ELECTRIC]: NORMAL_EFFICIENT,
    [FAIRY]: NORMAL_EFFICIENT,
    [FIGHTING]: SUPER_EFFICIENT,
    [FIRE]: NOT_EFFICIENT,
    [FLYING]: NORMAL_EFFICIENT,
    [GHOST]: NORMAL_EFFICIENT,
    [GRASS]: NORMAL_EFFICIENT,
    [GROUND]: NORMAL_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NOT_EFFICIENT,
    [PSYCHIC]: NORMAL_EFFICIENT,
    [ROCK]: NORMAL_EFFICIENT,
    [STEEL]: NOT_EFFICIENT,
    [WATER]: NORMAL_EFFICIENT
  },
  [FLYING]: {
    [BUG]: SUPER_EFFICIENT,
    [DARK]: NORMAL_EFFICIENT,
    [DRAGON]: NORMAL_EFFICIENT,
    [ELECTRIC]: NOT_EFFICIENT,
    [FAIRY]: NORMAL_EFFICIENT,
    [FIGHTING]: SUPER_EFFICIENT,
    [FIRE]: NORMAL_EFFICIENT,
    [FLYING]: NORMAL_EFFICIENT,
    [GHOST]: NORMAL_EFFICIENT,
    [GRASS]: SUPER_EFFICIENT,
    [GROUND]: NORMAL_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NORMAL_EFFICIENT,
    [PSYCHIC]: NORMAL_EFFICIENT,
    [ROCK]: NOT_EFFICIENT,
    [STEEL]: NOT_EFFICIENT,
    [WATER]: NORMAL_EFFICIENT
  },
  [WATER]: {
    [BUG]: NORMAL_EFFICIENT,
    [DARK]: NORMAL_EFFICIENT,
    [DRAGON]: NOT_EFFICIENT,
    [ELECTRIC]: NORMAL_EFFICIENT,
    [FAIRY]: NORMAL_EFFICIENT,
    [FIGHTING]: NORMAL_EFFICIENT,
    [FIRE]: SUPER_EFFICIENT,
    [FLYING]: NORMAL_EFFICIENT,
    [GHOST]: NORMAL_EFFICIENT,
    [GRASS]: NOT_EFFICIENT,
    [GROUND]: SUPER_EFFICIENT,
    [ICE]: NORMAL_EFFICIENT,
    [NORMAL]: NORMAL_EFFICIENT,
    [POISON]: NORMAL_EFFICIENT,
    [PSYCHIC]: NORMAL_EFFICIENT,
    [ROCK]: SUPER_EFFICIENT,
    [STEEL]: NORMAL_EFFICIENT,
    [WATER]: NOT_EFFICIENT
  }
};
