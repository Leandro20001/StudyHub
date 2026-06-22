import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
  } from "react-native";
  
  import { useState, useContext, useEffect } from "react";
  import { StudyContext } from "../context/StudyContext";
  import { theme } from "./theme";
  
  export default function Tarefas() {
    const [texto, setTexto] = useState("");
    const [prazo, setPrazo] = useState("");
  
    const {
      tarefas,
      adicionarTarefa,
      concluirTarefa,
      removerTarefa,
    } = useContext(StudyContext);
  
    // 🧠 ALERTA PERIÓDICO (simples e funcional)
    useEffect(() => {
      const interval = setInterval(() => {
        const agora = new Date();
  
        tarefas.forEach((t) => {
          if (!t.concluida && t.prazo) {
            const dataPrazo = new Date(t.prazo);
  
            const diff = dataPrazo - agora;
            const dias = diff / (1000 * 60 * 60 * 24);
  
            if (dias <= 2 && dias > 0) {
              console.log(
                `⚠️ Tarefa próxima do prazo: ${t.texto}`
              );
            }
  
            if (dias <= 0) {
              console.log(
                `🚨 Tarefa atrasada: ${t.texto}`
              );
            }
          }
        });
      }, 10000); // checa a cada 10s (demo)
  
      return () => clearInterval(interval);
    }, [tarefas]);
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          padding: 15,
        }}
      >
        <TextInput
          placeholder="Nova tarefa"
          placeholderTextColor={theme.muted}
          value={texto}
          onChangeText={setTexto}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
  
        <TextInput
          placeholder="Prazo (YYYY-MM-DD)"
          placeholderTextColor={theme.muted}
          value={prazo}
          onChangeText={setPrazo}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
  
        <Pressable
          onPress={() => {
            adicionarTarefa(texto, prazo);
            setTexto("");
            setPrazo("");
          }}
          style={{
            backgroundColor: theme.primary,
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Adicionar
          </Text>
        </Pressable>
  
        <FlatList
          data={tarefas}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.card,
                padding: 15,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 16 }}>
                {item.concluida ? "✅" : "⏳"} {item.texto}
              </Text>
  
              <Text style={{ color: theme.muted }}>
                📅 Prazo: {item.prazo || "não definido"}
              </Text>
  
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <Pressable onPress={() => concluirTarefa(item.id)}>
                  <Text style={{ color: "lightgreen" }}>
                    Concluir
                  </Text>
                </Pressable>
  
                <Pressable onPress={() => removerTarefa(item.id)}>
                  <Text style={{ color: "red" }}>
                    Excluir
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    );
  }