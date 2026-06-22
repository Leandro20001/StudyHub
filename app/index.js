import {
    View,
    Text,
    TextInput,
    Button,
  } from "react-native";
  
  import { useState } from "react";
  import { router } from "expo-router";
  
  export default function Index() {
    const [nome, setNome] = useState("");
  
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          📚 StudyHub
        </Text>
  
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
          }}
        />
  
        <Button
          title="Entrar"
          onPress={() =>
            router.replace("/home")
          }
        />
      </View>
    );
  }