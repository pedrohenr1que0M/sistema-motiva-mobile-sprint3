import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ocorrencia, NovaOcorrencia } from "../types/Ocorrencia";
import { mockOcorrencias } from "../data/mockOcorrencias";

// Toda a persistência do app fica concentrada aqui.
// As telas nunca chamam o AsyncStorage diretamente, apenas este serviço.

const STORAGE_KEY = "@motiva:ocorrencias";

async function seedIfEmpty(): Promise<Ocorrencia[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    // Primeira execução: grava o mock como ponto de partida.
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockOcorrencias));
    return mockOcorrencias;
  }

  return JSON.parse(raw) as Ocorrencia[];
}

export async function getOcorrencias(): Promise<Ocorrencia[]> {
  const ocorrencias = await seedIfEmpty();
  // Mais recentes primeiro
  return [...ocorrencias].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
}

export async function getOcorrenciaPorId(
  id: number
): Promise<Ocorrencia | undefined> {
  const ocorrencias = await seedIfEmpty();
  return ocorrencias.find((o) => o.id === id);
}

export async function salvarOcorrencia(
  nova: NovaOcorrencia
): Promise<Ocorrencia> {
  const ocorrencias = await seedIfEmpty();

  const proximoId =
    ocorrencias.length > 0
      ? Math.max(...ocorrencias.map((o) => o.id)) + 1
      : 1;

  const ocorrenciaCompleta: Ocorrencia = {
    ...nova,
    id: proximoId,
    data: new Date().toISOString(),
  };

  const atualizadas = [...ocorrencias, ocorrenciaCompleta];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));

  return ocorrenciaCompleta;
}

export async function removerOcorrencia(id: number): Promise<void> {
  const ocorrencias = await seedIfEmpty();
  const atualizadas = ocorrencias.filter((o) => o.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
}

// Útil para testes manuais / botão de reset no app, se quiserem.
export async function limparTudo(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
