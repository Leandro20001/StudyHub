import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { useState, useContext, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StudyContext } from "../context/StudyContext";

export default function Materias() {
  const [nome, setNome] = useState("");
  const [prioridadeMateria, setPrioridadeMateria] = useState('');

  const { materias, adicionarMateria } = useContext(StudyContext);

  const prioridadePeso = {
    alta: 3,
    media: 2,
    baixa: 1,
  };

  const materiasOrdenadas = useMemo(() => {
    return [...materias].sort(
      (a, b) =>
        prioridadePeso[b.prioridadeMateria] -
        prioridadePeso[a.prioridadeMateria]
    );
  }, [materias]);

  function handleAdd() {
    if (!nome.trim()) return;

    adicionarMateria(nome, prioridadeMateria);
    setNome("");
    setPrioridadeMateria("media");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1020", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
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

      {/* PRIORIDADE */}
      <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
        {["baixa", "media", "alta"].map((p) => (
          <Pressable
            key={p}
            onPress={() => setPrioridadeMateria(p)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor:
                prioridadeMateria === p ? "#6366F1" : "#111827",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", textTransform: "capitalize", fontWeight: "bold" }}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleAdd}
        style={{
          backgroundColor: "#6366F1",
          marginTop: 12,
          padding: 15,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Adicionar
        </Text>
      </Pressable>

      <Text style={{ color: "#94A3B8", marginTop: 20, marginBottom: 10 }}>
        Total: {materias.length}
      </Text>

      <FlatList
        data={materiasOrdenadas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LinearGradient
            colors={
              item.prioridadeMateria === "alta"
                ? ["#EF4444", "#F97316"]
                : item.prioridadeMateria === "media"
                ? ["#4F46E5", "#6366F1"]
                : ["#10B981", "#22C55E"]
            }
            style={{
              padding: 18,
              borderRadius: 20,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              📘 {item.nome}
            </Text>

            <Text style={{ color: "white", marginTop: 5, opacity: 0.8, textTransform: "capitalize" }}>
              Prioridade: {item.prioridadeMateria}
            </Text>
          </LinearGradient>
        )}
      />
    </View>
  );
}