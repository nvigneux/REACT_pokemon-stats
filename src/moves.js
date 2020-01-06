import * as TYPES from "./types"
import { QUICK, CHARGED } from "./constant"

export const MOVES = [
  {
    id: 1,
    move: QUICK,
    type: TYPES.FIGHTING,
    name: "Riposte",
    power: 12,
    execTime: 0.9,
    energyGen: 8,
    energyReq: null,
  },
  {
    id: 2,
    move: CHARGED,
    type: TYPES.FIGHTING,
    name: "Dynamopoing",
    power: 90,
    execTime: 2.7,
    energyGen: null,
    energyReq: 50,
  },
]
