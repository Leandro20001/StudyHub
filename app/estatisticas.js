import {
  View,
  Text,
} from "react-native";

import { useContext } from "react";
import { StudyContext } from "../context/StudyContext";

export default function Estatisticas() {
  const {
    tarefas,
    materias,
  } = useContext(StudyContext);

  const concluidas =
    tarefas.filter(
      (t) => t.concluida
    ).length;

  const pendentes =
    tarefas.length -
    concluidas;

  const taxa =
    tarefas.length > 0
      ? Math.round(
          (concluidas /
            tarefas.length) *
            100
        )
      : 0;

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
        📊 Estatísticas
      </Text>

      <View
        style={{
          backgroundColor:
            "#111827",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          📚 Matérias:
          {" "}
          {materias.length}
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 10,
          }}
        >
          ✅ Concluídas:
          {" "}
          {concluidas}
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 10,
          }}
        >
          ⏳ Pendentes:
          {" "}
          {pendentes}
        </Text>

        <Text
          style={{
            color: "#22C55E",
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          🎯 Taxa de conclusão:
          {" "}
          {taxa}%
        </Text>
      </View>
    </View>
  );
}