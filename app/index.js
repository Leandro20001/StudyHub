import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { router } from "expo-router";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { login, signUp } = useContext(AuthContext);

  function handleSubmit() {
    if (!email.trim() || !password.trim()) return;

    if (isLogin) {
      login(email, password);
    } else {
      signUp(email, password);
    }

    router.replace("/home"); // 🔥 entra no app
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#0B1020",
      justifyContent: "center",
      padding: 20,
    }}>
      <Text style={{
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
      }}>
        📚 Study App
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#6366F1",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}>
          {isLogin ? "Entrar" : "Criar conta"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setIsLogin(!isLogin)}
        style={{ marginTop: 15 }}
      >
        <Text style={{ color: "#94A3B8", textAlign: "center" }}>
          {isLogin
            ? "Não tem conta? Criar agora"
            : "Já tem conta? Entrar"}
        </Text>
      </Pressable>
    </View>
  );
}