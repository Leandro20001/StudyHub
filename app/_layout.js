import { Stack } from "expo-router";
import { StudyProvider } from "../context/StudyContext";

export default function Layout() {
  return (
    <StudyProvider>
      <Stack />
    </StudyProvider>
  );
}