import { createContext, useState } from "react";

export const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [materias, setMaterias] = useState([]);
  const [prioridadeMateria, setPrioridadeMateira] = useState();
  const [tarefas, setTarefas] = useState([]);
  const [usuario, setUsuario] = useState(null);

function login(nome, email, senha) {
  setUsuario({
    nome,
    email,
    senha,
  });
}

function logout() {
  setUsuario(null);
}

function adicionarMateria(nome, prioridadeMateria) {
  const novaMateria = {
    id: Date.now().toString(),
    nome,
    prioridadeMateria, 
  };

  setMaterias((prev) => [...prev, novaMateria]);
}

  function adicionarTarefa(texto, prazo, prioridade) {
    setTarefas([
      ...tarefas,
      {
        id: Date.now().toString(),
        prioridade,
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
        prioridadeMateria,
        adicionarMateria,
        adicionarTarefa,
        concluirTarefa,
        removerTarefa,
        login,
        logout,
        usuario
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}