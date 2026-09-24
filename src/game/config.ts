import type { Category, CategoryId } from './types';

export const CONFIG = {
  QUANTIDADE_DADOS: 5,
  MAX_LANCAMENTOS: 3,
  TOTAL_RODADAS: 11,
} as const;

export const CATEGORIES: Category[] = [
  { id: 'as',          label: 'Ás',          description: 'Soma dos dados com valor 1' },
  { id: 'duque',       label: 'Duque',       description: 'Soma dos dados com valor 2' },
  { id: 'terno',       label: 'Terno',       description: 'Soma dos dados com valor 3' },
  { id: 'quadra_face', label: 'Quadra (4)',  description: 'Soma dos dados com valor 4' },
  { id: 'quina',       label: 'Quina',       description: 'Soma dos dados com valor 5' },
  { id: 'sena',        label: 'Sena',        description: 'Soma dos dados com valor 6' },
  { id: 'trinca',      label: 'Trinca',      description: 'Pelo menos 3 iguais — soma os 5 dados' },
  { id: 'quadra_comb', label: 'Quadra',      description: 'Pelo menos 4 iguais — soma os 5 dados' },
  { id: 'full_house',  label: 'Full House',  description: 'Trinca + par — 25 pontos' },
  { id: 'sequencia',   label: 'Sequência',   description: '1-2-3-4-5 ou 2-3-4-5-6 — 30 pontos' },
  { id: 'general',     label: 'General',     description: 'Cinco iguais — 50 pontos' },
];

export const INITIAL_SCORES: Record<CategoryId, null> = {
  as: null, duque: null, terno: null, quadra_face: null, quina: null, sena: null,
  trinca: null, quadra_comb: null, full_house: null, sequencia: null, general: null,
};
