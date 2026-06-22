import { Stack } from "expo-router";
import { StudyProvider } from "../context/StudyContext";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <StudyProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#0F172A" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </StudyProvider>
    </AuthProvider>
  );
}