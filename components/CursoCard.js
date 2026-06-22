import { Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CursoCard({
  titulo,
  subtitulo,
  colors,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 18,
          borderRadius: 20,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {titulo}
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.8)",
                marginTop: 4,
              }}
            >
              {subtitulo}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 26,
              color: "white",
              fontWeight: "bold",
            }}
          >
            +
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}