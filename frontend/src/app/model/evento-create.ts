export interface EventoCreate {
  id: number;
  id_evento_pai: number | null;
  id_organizador: number;
  ids_ministrantes: number[];
  nome: string;
  descricao: string;
  data_inicio: Date;
  data_fim: Date;
  local: string;
  preco: number;
  qtd_vagas: number;
  data_inicio_inscricao: Date;
  data_fim_inscricao: Date;
}
