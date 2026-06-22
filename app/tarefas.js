import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

import * as Notifications from "expo-notifications";
import { StudyContext } from "../context/StudyContext";

export default function Tarefas() {
  const {
    tarefas,
    adicionarTarefa,
    concluirTarefa,
    removerTarefa,
  } = useContext(StudyContext);

  const [texto, setTexto] = useState("");
  const [prazo, setPrazo] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  function formatarData(valor) {
    const numeros = valor.replace(/\D/g, "");

    if (numeros.length <= 4) {
      return numeros;
    }

    if (numeros.length <= 6) {
      return `${numeros.slice(0, 4)}/${numeros.slice(4)}`;
    }

    return `${numeros.slice(0, 4)}/${numeros.slice(
      4,
      6
    )}/${numeros.slice(6, 8)}`;
  }

  async function criarTarefa() {
    if (!texto.trim()) {
      Alert.alert(
        "Erro",
        "Digite o nome da tarefa."
      );
      return;
    }

    if (
      !/^\d{4}\/\d{2}\/\d{2}$/.test(prazo)
    ) {
      Alert.alert(
        "Data inválida",
        "Use o formato AAAA/MM/DD"
      );
      return;
    }

    adicionarTarefa(
      texto,
      prazo,
      prioridade
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📚 StudyHub",
        body: `Lembre-se da tarefa: ${texto}`,
      },
      trigger: {
        seconds: 60,
      },
    });

    setTexto("");
    setPrazo("");
    setPrioridade("Média");
  }

  function corPrioridade(prio) {
    switch (prio) {
      case "Alta":
        return "#EF4444";

      case "Baixa":
        return "#22C55E";

      default:
        return "#F59E0B";
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1020",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        📚 Tarefas
      </Text>

      <TextInput
        placeholder="Nome da tarefa"
        placeholderTextColor="#94A3B8"
        value={texto}
        onChangeText={setTexto}
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 15,
          borderRadius: 15,
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          color: "#FFFFFF",
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Prioridade
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {["Baixa", "Média", "Alta"].map(
          (item) => (
            <Pressable
              key={item}
              onPress={() =>
                setPrioridade(item)
              }
              style={{
                width: "31%",
                padding: 12,
                borderRadius: 12,
                backgroundColor:
                  prioridade === item
                    ? "#6366F1"
                    : "#111827",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text
        style={{
          color: "#FFFFFF",
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Prazo de entrega
      </Text>

      <TextInput
        placeholder="AAAA/MM/DD"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        maxLength={10}
        value={prazo}
        onChangeText={(valor) =>
          setPrazo(formatarData(valor))
        }
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 15,
          borderRadius: 15,
          marginBottom: 25,
        }}
      />

      <Pressable
        onPress={criarTarefa}
        style={{
          backgroundColor: "#6366F1",
          padding: 15,
          borderRadius: 15,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Adicionar Tarefa
        </Text>
      </Pressable>

      <FlatList
        data={tarefas}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text
            style={{
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Nenhuma tarefa cadastrada.
          </Text>
        }
        renderItem={({ item }) => {
          const atrasada =
            new Date(
              item.prazo.replaceAll("/", "-")
            ) < new Date() &&
            !item.concluida;

          return (
            <View
              style={{
                backgroundColor: "#111827",
                padding: 15,
                borderRadius: 15,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "600",
                  textDecorationLine:
                    item.concluida
                      ? "line-through"
                      : "none",
                }}
              >
                {item.texto}
              </Text>

              <Text
                style={{
                  color: corPrioridade(
                    item.prioridade
                  ),
                  marginTop: 8,
                  fontWeight: "bold",
                }}
              >
                {item.prioridade}
              </Text>

              <Text
                style={{
                  color: atrasada
                    ? "#EF4444"
                    : "#94A3B8",
                  marginTop: 6,
                }}
              >
                📅 {item.prazo}
              </Text>

              {atrasada && (
                <Text
                  style={{
                    color: "#EF4444",
                    marginTop: 5,
                    fontWeight: "bold",
                  }}
                >
                  ⚠️ Tarefa atrasada
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                {!item.concluida && (
                  <Pressable
                    onPress={() =>
                      concluirTarefa(item.id)
                    }
                    style={{
                      backgroundColor:
                        "#22C55E",
                      padding: 10,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      Concluir
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={() =>
                    removerTarefa(item.id)
                  }
                  style={{
                    backgroundColor:
                      "#EF4444",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Excluir
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}