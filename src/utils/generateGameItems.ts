import { ILevel, GridItem } from "../types";

export const generateGameItems = (
  level: ILevel,
  availableImages: string[]
): GridItem[] => {
  const selectedImages = availableImages.slice(0, level.pairs);

  const pairs = selectedImages.flatMap((imageId) => [
    {
      id: `${imageId}_1`,
      imageId,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `${imageId}_2`,
      imageId,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return pairs.sort(() => Math.random() - 0.5);
};
