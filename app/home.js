import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StudyContext } from "../context/StudyContext";

export default function Home() {
  const { materias, tarefas } = useContext(StudyContext);

  const concluidas = tarefas.filter(
    (t) => t.concluida
  ).length;

  const progresso =
    tarefas.length > 0
      ? (concluidas / tarefas.length) * 100
      : 0;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1020",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "#94A3B8",
            fontSize: 16,
          }}
        >
          Bem-vindo 👋
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          StudyHub
        </Text>
      </View>

      {/* DASHBOARD */}
      <View
        style={{
          backgroundColor: "#111827",
          borderRadius: 20,
          padding: 20,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Seu Progresso
        </Text>

        <Text style={{ color: "#94A3B8" }}>
          📚 Matérias: {materias.length}
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 5,
          }}
        >
          📝 Tarefas: {tarefas.length}
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 5,
          }}
        >
          ✅ Concluídas: {concluidas}
        </Text>

        {/* Barra */}
        <View
          style={{
            height: 10,
            backgroundColor: "#1E293B",
            borderRadius: 20,
            marginTop: 15,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${progresso}%`,
              height: "100%",
              backgroundColor: "#22C55E",
            }}
          />
        </View>

        <Text
          style={{
            color: "#22C55E",
            marginTop: 8,
          }}
        >
          {Math.round(progresso)}% concluído
        </Text>
      </View>

      {/* MATÉRIAS */}
      <Pressable
        onPress={() => router.push("/materias")}
        style={{ marginTop: 20 }}
      >
        <LinearGradient
          colors={["#4F46E5", "#6366F1"]}
          style={{
            padding: 22,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            📚 Matérias
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: 5,
            }}
          >
            Organize suas disciplinas
          </Text>
        </LinearGradient>
      </Pressable>

      {/* TAREFAS */}
      <Pressable
        onPress={() => router.push("/tarefas")}
        style={{ marginTop: 15 }}
      >
        <LinearGradient
          colors={["#06B6D4", "#3B82F6"]}
          style={{
            padding: 22,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            📝 Tarefas
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: 5,
            }}
          >
            Controle de atividades e prazos
          </Text>
        </LinearGradient>
      </Pressable>

      {/* POMODORO */}
      <Pressable
        onPress={() => router.push("/pomodoro")}
        style={{ marginTop: 15 }}
      >
        <LinearGradient
          colors={["#F97316", "#EF4444"]}
          style={{
            padding: 22,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            ⏱ Pomodoro
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: 5,
            }}
          >
            Sessões de foco e produtividade
          </Text>
        </LinearGradient>
      </Pressable>

      {/* ESTATÍSTICAS */}
      <Pressable
        onPress={() => router.push("/estatisticas")}
        style={{ marginTop: 15 }}
      >
        <LinearGradient
          colors={["#10B981", "#22C55E"]}
          style={{
            padding: 22,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            📊 Estatísticas
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: 5,
            }}
          >
            Acompanhe seu desempenho
          </Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}