import { Ocorrencia } from "../types/Ocorrencia";

// Dados iniciais usados apenas na primeira execução do app,
// quando ainda não existe nada salvo no AsyncStorage.
export const mockOcorrencias: Ocorrencia[] = [
  {
    id: 1,
    descricao: "Via com buraco grande próximo ao acostamento",
    local: "Av. Rebouças, São Paulo - SP",
    trecho: "Rebouças x Pinheiros",
    risco: "alto",
    status: "aberta",
    data: new Date(2026, 8, 10, 8, 30).toISOString(),
  },
  {
    id: 2,
    descricao: "Sinalização de trânsito apagada em cruzamento",
    local: "Rua Augusta, São Paulo - SP",
    trecho: "Augusta x Paulista",
    risco: "medio",
    status: "em_analise",
    data: new Date(2026, 8, 14, 17, 5).toISOString(),
  },
  {
    id: 3,
    descricao: "Trecho com pista molhada e pouca visibilidade à noite",
    local: "Marginal Pinheiros, São Paulo - SP",
    trecho: "Marginal Pinheiros - sentido Interlagos",
    risco: "baixo",
    status: "resolvida",
    data: new Date(2026, 8, 18, 21, 15).toISOString(),
  },
];
