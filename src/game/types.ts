export type CategoryId =
  | 'as'
  | 'duque'
  | 'terno'
  | 'quadra_face'
  | 'quina'
  | 'sena'
  | 'trinca'
  | 'quadra_comb'
  | 'full_house'
  | 'sequencia'
  | 'general';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export type ScoreMap = Record<CategoryId, number | null>;

export interface GameState {
  screen: 'start' | 'recover' | 'game' | 'result' | 'history';
  playerName: string;
  round: number;
  rolls: number;
  dice: number[];
  kept: boolean[]; // dados travados entre lançamentos (FA: manter dados)
  scores: ScoreMap;
  message: string;
  combo: string | null;
}

// Registro de uma partida finalizada para o histórico (FA03)
export interface HistoryEntry {
  id: string;           // UUID simples baseado em timestamp
  playerName: string;
  finalScore: number;
  rounds: number;       // sempre 11
  dateTime: string;     // ISO 8601
  status: 'finalizada';
  categoryScores: ScoreMap;
}
