export interface ILevel {
  label: string;
  value: GameDifficulty;
  matrix: [number, number];
  pairs: number;
}

export interface GridItem {
  id: string;
  imageId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export enum GameDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
