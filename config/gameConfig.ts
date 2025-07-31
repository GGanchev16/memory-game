import { GameDifficulty, ILevel } from "../src/types";

export const LEVELS: ILevel[] = [
  {
    label: "Easy",
    value: GameDifficulty.Easy,
    matrix: [4, 2],
    pairs: 4,
  },
  {
    label: "Medium",
    value: GameDifficulty.Medium,
    matrix: [4, 3],
    pairs: 6,
  },
  {
    label: "Hard",
    value: GameDifficulty.Hard,
    matrix: [4, 4],
    pairs: 8,
  },
];

export const AVAILABLE_IMAGES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const IMAGE_MAP = {
  "1": require("../assets/1.png"),
  "2": require("../assets/2.png"),
  "3": require("../assets/3.png"),
  "4": require("../assets/4.png"),
  "5": require("../assets/5.png"),
  "6": require("../assets/6.png"),
  "7": require("../assets/7.png"),
  "8": require("../assets/8.png"),
  "9": require("../assets/9.png"),
};

export const GAME_TIMING = {
  MATCH_DELAY: 500,
  NO_MATCH_DELAY: 2000,
};

export const GRID_CONFIG = {
  GAP: 10,
};
