import { View } from "react-native";

import { Button } from "../components";
import { ILevel } from "../types";

interface SelectLevelProps {
  levels: ILevel[];
  handleSelectDifficulty: (level: ILevel) => void;
}

export const SelectLevel = ({
  levels,
  handleSelectDifficulty,
}: SelectLevelProps) => {
  return (
    <View style={{ gap: 16 }}>
      {levels.map((level) => (
        <Button
          key={level.value}
          label={level.label}
          onPress={() => handleSelectDifficulty(level)}
        />
      ))}
    </View>
  );
};
