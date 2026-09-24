import { useState } from 'react';
import type { HistoryEntry } from '../game/types';
import { limparHistorico } from '../game/storage';

interface HistoryScreenProps {
  history: HistoryEntry[];
  onBack: () => void;
  onHistoryCleared: () => void;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function getMessage(score: number): string {
  if (score >= 200) return 'Lendário';
  if (score >= 150) return 'Excelente';
  if (score >= 100) return 'Bom';
  if (score >= 60)  return 'Regular';
  return 'Iniciante';
}

export default function HistoryScreen({ history, onBack, onHistoryCleared }: HistoryScreenProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    // Segunda ação confirma a exclusão (RN28)
    limparHistorico();
    onHistoryCleared();
    setConfirmClear(false);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8">
        <div>
          <h1 className="font-display text-2xl font-bold leading-none tracking-tight">GENERAL</h1>
          <p className="text-xs text-white/30 mt-0.5">Histórico de partidas</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs border border-white/15 rounded-lg px-3 py-1.5 text-white/50
            hover:text-white hover:border-white/30 transition
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Voltar
        </button>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-6 max-w-2xl w-full mx-auto">
        {history.length === 0 ? (
          /* Estado vazio (RN27) */
          <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
            <div className="text-4xl opacity-20">🎲</div>
            <p className="text-white/40 text-sm">Nenhuma partida finalizada ainda.</p>
            <p className="text-white/25 text-xs">Complete uma partida para ver seu histórico aqui.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {history.map((entry, i) => (
                <div
                  key={entry.id}
                  className="border border-white/8 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:border-white/15 transition"
                >
                  {/* Posição */}
                  <span className="font-mono text-xs text-white/20 w-5 shrink-0">#{i + 1}</span>

                  {/* Jogador */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{entry.playerName}</p>
                    <p className="text-xs text-white/30 mt-0.5">{formatDateTime(entry.dateTime)}</p>
                  </div>

                  {/* Classificação */}
                  <span className="text-xs text-white/30 shrink-0 hidden sm:block">
                    {getMessage(entry.finalScore)}
                  </span>

                  {/* Pontuação */}
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-accent text-xl tabular-nums">
                      {entry.finalScore}
                    </span>
                    <p className="text-xs text-white/25">pontos</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Limpar histórico (RN28 — exige confirmação explícita) */}
            <div className="text-center">
              {confirmClear ? (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm text-white/50">Tem certeza? Esta ação não pode ser desfeita.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClear}
                      className="text-xs border border-red-500/40 text-red-400 rounded-lg px-4 py-2
                        hover:bg-red-500/10 transition
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      Confirmar limpeza
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="text-xs border border-white/15 text-white/50 rounded-lg px-4 py-2
                        hover:text-white transition
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleClear}
                  className="text-xs text-white/25 hover:text-white/50 transition underline underline-offset-2
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Limpar histórico
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
