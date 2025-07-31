import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  styles?: ViewStyle;
}

export const Button = ({
  label,
  onPress,
  styles: customStyles,
}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
