import React, { useState } from "react";

import { Screen } from "./src/components";
import { Game, SelectLevel } from "./src/blocks";
import { ILevel } from "./src/types";

const LEVELS: ILevel[] = [
  { label: "Easy", value: "easy", matrix: [2, 4] },
  { label: "Medium", value: "medium", matrix: [3, 4] },
  { label: "Hard", value: "hard", matrix: [4, 4] },
];

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<ILevel | null>(null);

  const handleSelectDifficulty = (level: ILevel) => {
    setSelectedLevel(level);
  };

  return (
    <Screen>
      {!selectedLevel ? (
        <SelectLevel
          levels={LEVELS}
          handleSelectDifficulty={handleSelectDifficulty}
        />
      ) : (
        <Game setSelectedLevel={setSelectedLevel} />
      )}
    </Screen>
  );
}
