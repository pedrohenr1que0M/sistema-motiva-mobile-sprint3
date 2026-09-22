export type Risco = "baixo" | "medio" | "alto";

export type StatusOcorrencia = "aberta" | "em_analise" | "resolvida";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: Risco;
  data: string; // ISO string
  // Campos de domínio Motiva
  trecho?: string; // trecho/rota onde a ocorrência aconteceu
  status?: StatusOcorrencia;
};

export type NovaOcorrencia = Omit<Ocorrencia, "id" | "data">;
