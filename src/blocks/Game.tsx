import { StyleSheet, View } from "react-native";
import { Button } from "../components";

interface GameProps {
  setSelectedLevel: (level: null) => void;
}

export const Game = ({ setSelectedLevel }: GameProps) => {
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Button
          label="Exit"
          onPress={() => setSelectedLevel(null)}
          styles={styles.btn}
        />
        <Button label="Reset" onPress={() => {}} styles={styles.btn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: { width: "30%" },
});
