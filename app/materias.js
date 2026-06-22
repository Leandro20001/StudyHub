import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StudyContext } from "../context/StudyContext";

export default function Materias() {
  const [nome, setNome] = useState("");

  const {
    materias,
    adicionarMateria,
  } = useContext(StudyContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1020",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        📚 Matérias
      </Text>

      <TextInput
        placeholder="Nome da matéria"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <Pressable
        onPress={() => {
          if (!nome.trim()) return;

          adicionarMateria(nome);
          setNome("");
        }}
        style={{
          backgroundColor: "#6366F1",
          marginTop: 12,
          padding: 15,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Adicionar
        </Text>
      </Pressable>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Total: {materias.length}
      </Text>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={
              index % 3 === 0
                ? ["#4F46E5", "#6366F1"]
                : index % 3 === 1
                ? ["#06B6D4", "#3B82F6"]
                : ["#10B981", "#22C55E"]
            }
            style={{
              padding: 18,
              borderRadius: 20,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              📘 {item.nome}
            </Text>
          </LinearGradient>
        )}
      />
    </View>
  );
}