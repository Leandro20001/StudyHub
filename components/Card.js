import { View } from "react-native";
import { theme } from "../app/theme";

export default function Card({ children }) {
  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 15,
        borderRadius: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
}