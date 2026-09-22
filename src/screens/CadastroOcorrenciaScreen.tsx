import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Risco } from "../types/Ocorrencia";
import { salvarOcorrencia } from "../services/ocorrenciaService";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

const OPCOES_RISCO: { valor: Risco; label: string }[] = [
  { valor: "baixo", label: "Baixo" },
  { valor: "medio", label: "Médio" },
  { valor: "alto", label: "Alto" },
];

export default function CadastroOcorrenciaScreen({ navigation }: Props) {
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [trecho, setTrecho] = useState("");
  const [risco, setRisco] = useState<Risco>("medio");
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    if (!descricao.trim() || !local.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha descrição e local.");
      return;
    }

    setSalvando(true);
    try {
      await salvarOcorrencia({
        descricao: descricao.trim(),
        local: local.trim(),
        trecho: trecho.trim() || undefined,
        risco,
        status: "aberta",
      });
      // Volta para a lista, que recarrega os dados persistidos ao focar.
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar a ocorrência.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Nova ocorrência</Text>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="O que aconteceu?"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço ou referência"
          value={local}
          onChangeText={setLocal}
        />

        <Text style={styles.label}>Trecho (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rebouças x Pinheiros"
          value={trecho}
          onChangeText={setTrecho}
        />

        <Text style={styles.label}>Classificação de risco</Text>
        <View style={styles.opcoesRisco}>
          {OPCOES_RISCO.map((opcao) => (
            <TouchableOpacity
              key={opcao.valor}
              style={[
                styles.opcaoRisco,
                risco === opcao.valor && styles.opcaoRiscoSelecionada,
              ]}
              onPress={() => setRisco(opcao.valor)}
            >
              <Text
                style={[
                  styles.opcaoRiscoTexto,
                  risco === opcao.valor && styles.opcaoRiscoTextoSelecionado,
                ]}
              >
                {opcao.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={handleSalvar}
          disabled={salvando}
        >
          <Text style={styles.botaoSalvarTexto}>
            {salvando ? "Salvando..." : "Salvar ocorrência"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#FFF",
  },
  opcoesRisco: { flexDirection: "row", gap: 10 },
  opcaoRisco: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  opcaoRiscoSelecionada: { backgroundColor: "#2A5BD7", borderColor: "#2A5BD7" },
  opcaoRiscoTexto: { color: "#444", fontWeight: "600" },
  opcaoRiscoTextoSelecionado: { color: "#FFF" },
  botaoSalvar: {
    marginTop: 28,
    backgroundColor: "#2A5BD7",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoSalvarTexto: { color: "#FFF", fontWeight: "700", fontSize: 15 },
});
