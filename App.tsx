import React, { useState } from "react";

import { Screen } from "./src/components";
import { Game, SelectLevel } from "./src/blocks";
import { ILevel } from "./src/types";

import { LEVELS, AVAILABLE_IMAGES } from "./config/gameConfig";

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<ILevel | null>(null);

  const handleSelectDifficulty = (level: ILevel) => {
    setSelectedLevel(level);
  };

  return (
    <Screen>
      {selectedLevel === null ? (
        <SelectLevel
          levels={LEVELS}
          handleSelectDifficulty={handleSelectDifficulty}
        />
      ) : (
        <Game
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          availableImages={AVAILABLE_IMAGES}
        />
      )}
    </Screen>
  );
}
