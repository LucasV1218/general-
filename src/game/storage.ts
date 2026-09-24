import type { GameState, HistoryEntry } from './types';

const KEYS = {
  PARTIDA: 'general_partida_v1',
  HISTORICO: 'general_historico_v1',
} as const;

// Serializa e salva o estado atual da partida em andamento
export function salvarPartida(state: GameState): void {
  try {
    localStorage.setItem(KEYS.PARTIDA, JSON.stringify(state));
  } catch {
    // localStorage pode estar bloqueado em alguns contextos; ignorar silenciosamente
  }
}

// Recupera a partida salva, retornando null se não existir ou estiver corrompida (RN29)
export function carregarPartida(): GameState | null {
  try {
    const raw = localStorage.getItem(KEYS.PARTIDA);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    // Validação mínima de integridade
    if (
      typeof parsed.playerName !== 'string' ||
      typeof parsed.round !== 'number' ||
      typeof parsed.rolls !== 'number' ||
      !parsed.scores
    ) return null;
    return parsed;
  } catch {
    return null;
  }
}

// Remove a partida salva após finalização ou abandono
export function removerPartidaSalva(): void {
  try {
    localStorage.removeItem(KEYS.PARTIDA);
  } catch {}
}

// Adiciona uma partida finalizada ao histórico sem sobrescrever entradas anteriores (RN25)
export function registrarPartidaHistorico(entry: HistoryEntry): void {
  try {
    const historico = carregarHistorico();
    historico.unshift(entry); // mais recente primeiro
    localStorage.setItem(KEYS.HISTORICO, JSON.stringify(historico));
  } catch {}
}

// Retorna o histórico completo; array vazio se vazio ou corrompido
export function carregarHistorico(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.HISTORICO);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

// Remove todo o histórico (exige ação explícita do usuário — RN28)
export function limparHistorico(): void {
  try {
    localStorage.removeItem(KEYS.HISTORICO);
  } catch {}
}
