import { View, Text, StyleSheet, SafeAreaView } from "react-native";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Yara Memory Game</Text>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#373737",
    textAlign: "center",
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
