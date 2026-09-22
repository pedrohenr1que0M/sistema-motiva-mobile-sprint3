import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ocorrencia, Risco } from "../types/Ocorrencia";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

const RISCO_CONFIG: Record<Risco, { label: string; cor: string; bg: string }> = {
  baixo: { label: "Baixo", cor: "#1E7B3E", bg: "#E4F6E9" },
  medio: { label: "Médio", cor: "#8A5A00", bg: "#FFF3D9" },
  alto: { label: "Alto", cor: "#B3261E", bg: "#FBE4E2" },
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

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const risco = RISCO_CONFIG[ocorrencia.risco];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.descricao} numberOfLines={1}>
          {ocorrencia.descricao}
        </Text>
        <View style={[styles.badge, { backgroundColor: risco.bg }]}>
          <Text style={[styles.badgeText, { color: risco.cor }]}>
            {risco.label}
          </Text>
        </View>
      </View>

      <Text style={styles.local} numberOfLines={1}>
        📍 {ocorrencia.local}
      </Text>

      {ocorrencia.trecho ? (
        <Text style={styles.trecho} numberOfLines={1}>
          Trecho: {ocorrencia.trecho}
        </Text>
      ) : null}

      <Text style={styles.data}>{formatarData(ocorrencia.data)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descricao: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  local: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
  },
  trecho: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  data: {
    fontSize: 11,
    color: "#999",
    marginTop: 8,
  },
});
