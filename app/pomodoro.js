import {
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import {
  useState,
  useEffect,
} from "react";

export default function Pomodoro() {
  const [tempo, setTempo] = useState(1500);
  const [ativo, setAtivo] = useState(false);

  const [minutosCustom, setMinutosCustom] =
    useState("");

  const [modo, setModo] =
    useState("Pomodoro");

  useEffect(() => {
    let timer;

    if (ativo && tempo > 0) {
      timer = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [ativo, tempo]);

  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  function definirTempo(segundos, nome) {
    setTempo(segundos);
    setModo(nome);
    setAtivo(false);
  }

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
          marginTop: 30,
        }}
      >
        ⏱ Sessões de Estudo
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          marginTop: 5,
        }}
      >
        Modo atual: {modo}
      </Text>

      {/* TIMER */}

      <View
        style={{
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 70,
            fontWeight: "bold",
          }}
        >
          {String(minutos).padStart(2, "0")}:
          {String(segundos).padStart(2, "0")}
        </Text>
      </View>

      {/* CONTROLES */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 15,
          marginTop: 30,
        }}
      >
        <Pressable
          onPress={() => setAtivo(!ativo)}
          style={{
            backgroundColor: "#6366F1",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {ativo ? "Pausar" : "Iniciar"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setAtivo(false);
          }}
          style={{
            backgroundColor: "#EF4444",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Parar
          </Text>
        </Pressable>
      </View>

      {/* CRONÔMETRO PERSONALIZADO */}

      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          🎯 Tempo Personalizado
        </Text>

        <TextInput
          placeholder="Minutos"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={minutosCustom}
          onChangeText={setMinutosCustom}
          style={{
            backgroundColor: "#111827",
            color: "white",
            padding: 15,
            borderRadius: 15,
          }}
        />

        <Pressable
          onPress={() => {
            const min =
              parseInt(minutosCustom) || 0;

            definirTempo(
              min * 60,
              "Personalizado"
            );
          }}
          style={{
            backgroundColor: "#22C55E",
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Definir Tempo
          </Text>
        </Pressable>
      </View>

      {/* TÉCNICAS */}

      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginTop: 35,
          marginBottom: 10,
        }}
      >
        📚 Técnicas de Estudo
      </Text>

      <View
        style={{
          gap: 10,
        }}
      >
        <Pressable
          onPress={() =>
            definirTempo(
              25 * 60,
              "Pomodoro 25/5"
            )
          }
          style={{
            backgroundColor: "#111827",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            🍅 Pomodoro (25 min)
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            definirTempo(
              50 * 60,
              "Pomodoro Longo 50/10"
            )
          }
          style={{
            backgroundColor: "#111827",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            📖 Pomodoro Longo (50 min)
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            definirTempo(
              52 * 60,
              "Técnica 52/17"
            )
          }
          style={{
            backgroundColor: "#111827",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            ⚡ Técnica 52/17
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            definirTempo(
              90 * 60,
              "Deep Work"
            )
          }
          style={{
            backgroundColor: "#111827",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            🔥 Deep Work (90 min)
          </Text>
        </Pressable>
      </View>

      {tempo === 0 && (
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#22C55E",
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
            🎉 Sessão concluída!
          </Text>
        </View>
      )}
    </View>
  );
}