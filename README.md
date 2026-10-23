# Motiva — App de Registro e Classificação de Ocorrências

## Link Vídeo
https://youtu.be/a0S5q2WOQgc

## Integrantes
RM 563655 – ENZO MORETTO
RM 565887 – GUILHERME MOTA MELO
RM 562287 – JOÃO IVO CAMPOLINA SILVEIRA
RM 563355 – LUCAS DE OLIVEIRA SCOVINI
RM 563054 – PEDRO HENRIQUE OLIVEIRA MARQUES
RM 563419 – PEDRO MIRABELLA TONARQUE


---

## O que o app resolve

A Motiva conecta entregadores e gestores de logística urbana. Este app permite
registrar **ocorrências de risco** encontradas durante os trechos de entrega
(buracos, sinalização apagada, pontos com baixa visibilidade, assaltos, etc.),
classificá-las por nível de risco (**baixo / médio / alto**) e consultá-las
depois, mesmo após fechar o aplicativo — ajudando a mapear trechos perigosos
e priorizar correções.

## Como rodar o projeto

Pré-requisitos: Node.js instalado e o app **Expo Go** no celular (ou um
emulador Android/iOS configurado).

```bash
# instalar dependências
npm install

# iniciar o projeto
npx expo start
```

Escaneie o QR Code exibido no terminal com o Expo Go (Android) ou a câmera
(iOS), ou pressione `a` / `i` no terminal para abrir em um emulador.

## Como os dados são persistidos

Os dados são salvos localmente no dispositivo usando o
**`@react-native-async-storage/async-storage`**, através do serviço
`src/services/ocorrenciaService.ts`. As telas nunca acessam o AsyncStorage
diretamente — todo o acesso passa por esse serviço.

- Na primeira execução, o app "semeia" o storage com uma lista mock
  (`src/data/mockOcorrencias.ts`).
- A partir do primeiro cadastro feito pelo usuário, a lista mock deixa de
  ser a fonte de dados: tudo passa a vir do que está salvo no AsyncStorage.
- Cada ocorrência é salva como parte de um array serializado em JSON, sob a
  chave `@motiva:ocorrencias`.
- Como o AsyncStorage grava em disco, os dados **sobrevivem ao fechar e
  reabrir o app**.

## Estrutura do projeto

```
src/
  screens/      -> ListaOcorrenciasScreen, CadastroOcorrenciaScreen, DetalheOcorrenciaScreen
  components/   -> OcorrenciaCard
  types/        -> Ocorrencia.ts, navigation.ts
  data/         -> mockOcorrencias.ts (seed inicial)
  services/     -> ocorrenciaService.ts (toda a persistência)
```

## Fluxo do app

1. **Listar** — ao abrir o app, a tela inicial (`Lista`) carrega as
   ocorrências salvas via `getOcorrencias()` e exibe cada uma em um
   `OcorrenciaCard`, com o nível de risco destacado por cor.
2. **Criar** — o botão "+ Nova" leva à tela de `Cadastro`, onde o usuário
   preenche descrição, local, trecho (opcional) e escolhe o risco. Ao salvar,
   a ocorrência é gravada no AsyncStorage via `salvarOcorrencia()`.
3. **Ver detalhe** — ao tocar em um card na lista, o app navega para
   `Detalhe`, buscando a ocorrência específica por `id` com
   `getOcorrenciaPorId()`.
4. **Voltar para a lista** — ao voltar do cadastro, a tela `Lista` recarrega
   automaticamente (usando `useFocusEffect`), mostrando a nova ocorrência sem
   precisar reiniciar o app.
5. **Reabrir o app** — como os dados estão no AsyncStorage (não em memória),
   fechar e reabrir o app mantém todas as ocorrências cadastradas.

## Navegação

Implementada com **React Navigation** (`native-stack`), com três telas:
`Lista → Cadastro → Detalhe`, controladas por `App.tsx`.

## Modelo de dados

```ts
export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
  trecho?: string;
  status?: "aberta" | "em_analise" | "resolvida";
};
```
