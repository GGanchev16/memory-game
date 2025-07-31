import { Text, StyleSheet, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty Level:</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 150,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#373737",
    textAlign: "center",
    marginBottom: 20,
  },
});
