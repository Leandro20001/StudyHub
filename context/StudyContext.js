import { createContext, useState } from "react";

export const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [materias, setMaterias] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  function adicionarMateria(nome) {
    setMaterias([
      ...materias,
      { id: Date.now().toString(), nome },
    ]);
  }

  function adicionarTarefa(texto, prazo) {
    setTarefas([
      ...tarefas,
      {
        id: Date.now().toString(),
        texto,
        prazo,
        concluida: false,
      },
    ]);
  }
  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((t) =>
        t.id === id
          ? { ...t, concluida: true }
          : t
      )
    );
  }
  function removerTarefa(id) {
    setTarefas(
      tarefas.filter((t) => t.id !== id)
    );
  }

  return (
    <StudyContext.Provider
      value={{
        materias,
        tarefas,
        adicionarMateria,
        adicionarTarefa,
        concluirTarefa,
        removerTarefa,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}