import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ocorrencia, Risco } from "../types/Ocorrencia";
import { getOcorrenciaPorId } from "../services/ocorrenciaService";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhe">;

const RISCO_CONFIG: Record<Risco, { label: string; cor: string; bg: string }> = {
  baixo: { label: "Baixo", cor: "#1E7B3E", bg: "#E4F6E9" },
  medio: { label: "Médio", cor: "#8A5A00", bg: "#FFF3D9" },
  alto: { label: "Alto", cor: "#B3261E", bg: "#FBE4E2" },
};

const STATUS_LABEL: Record<string, string> = {
  aberta: "Aberta",
  em_analise: "Em análise",
  resolvida: "Resolvida",
};

function formatarData(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DetalheOcorrenciaScreen({ route }: Props) {
  const { id } = route.params;
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      const dado = await getOcorrenciaPorId(id);
      setOcorrencia(dado ?? null);
      setCarregando(false);
    })();
  }, [id]);

  if (carregando) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!ocorrencia) {
    return (
      <View style={styles.container}>
        <Text>Ocorrência não encontrada.</Text>
      </View>
    );
  }

  const risco = RISCO_CONFIG[ocorrencia.risco];

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: risco.bg }]}>
        <Text style={[styles.badgeTexto, { color: risco.cor }]}>
          Risco {risco.label}
        </Text>
      </View>

      <Text style={styles.descricao}>{ocorrencia.descricao}</Text>

      <View style={styles.linha}>
        <Text style={styles.campoLabel}>Local</Text>
        <Text style={styles.campoValor}>{ocorrencia.local}</Text>
      </View>

      {ocorrencia.trecho ? (
        <View style={styles.linha}>
          <Text style={styles.campoLabel}>Trecho</Text>
          <Text style={styles.campoValor}>{ocorrencia.trecho}</Text>
        </View>
      ) : null}

      {ocorrencia.status ? (
        <View style={styles.linha}>
          <Text style={styles.campoLabel}>Status</Text>
          <Text style={styles.campoValor}>
            {STATUS_LABEL[ocorrencia.status] ?? ocorrencia.status}
          </Text>
        </View>
      ) : null}

      <View style={styles.linha}>
        <Text style={styles.campoLabel}>Registrada em</Text>
        <Text style={styles.campoValor}>{formatarData(ocorrencia.data)}</Text>
      </View>

      <View style={styles.linha}>
        <Text style={styles.campoLabel}>ID</Text>
        <Text style={styles.campoValor}>#{ocorrencia.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F6F8" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeTexto: { fontWeight: "700" },
  descricao: { fontSize: 20, fontWeight: "700", color: "#1A1A1A", marginBottom: 20 },
  linha: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  campoLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  campoValor: { fontSize: 15, color: "#222", fontWeight: "500" },
});
