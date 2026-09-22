import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./src/types/navigation";
import ListaOcorrenciasScreen from "./src/screens/ListaOcorrenciasScreen";
import CadastroOcorrenciaScreen from "./src/screens/CadastroOcorrenciaScreen";
import DetalheOcorrenciaScreen from "./src/screens/DetalheOcorrenciaScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Lista"
        screenOptions={{
          headerStyle: { backgroundColor: "#2A5BD7" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen
          name="Lista"
          component={ListaOcorrenciasScreen}
          options={{ title: "Motiva" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroOcorrenciaScreen}
          options={{ title: "Nova ocorrência" }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheOcorrenciaScreen}
          options={{ title: "Detalhe da ocorrência" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
