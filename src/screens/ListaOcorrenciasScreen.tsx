import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ocorrencia } from "../types/Ocorrencia";
import { getOcorrencias } from "../services/ocorrenciaService";
import OcorrenciaCard from "../components/OcorrenciaCard";

type Props = NativeStackScreenProps<RootStackParamList, "Lista">;

export default function ListaOcorrenciasScreen({ navigation }: Props) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    const dados = await getOcorrencias();
    setOcorrencias(dados);
    setCarregando(false);
  }, []);

  // Recarrega toda vez que a tela volta a ficar em foco
  // (ex: ao voltar do cadastro), garantindo que a lista
  // sempre reflita o que está persistido.
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Motiva</Text>
          <Text style={styles.subtitulo}>Ocorrências registradas</Text>
        </View>
        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.botaoNovoTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : ocorrencias.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>
            Nenhuma ocorrência registrada ainda.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OcorrenciaCard
              ocorrencia={item}
              onPress={() =>
                navigation.navigate("Detalhe", { id: item.id })
              }
            />
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titulo: { fontSize: 24, fontWeight: "800", color: "#1A1A1A" },
  subtitulo: { fontSize: 13, color: "#666", marginTop: 2 },
  botaoNovo: {
    backgroundColor: "#2A5BD7",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoNovoTexto: { color: "#FFF", fontWeight: "700" },
  vazio: { alignItems: "center", marginTop: 60, paddingHorizontal: 32 },
  vazioTexto: { color: "#888", textAlign: "center" },
});
