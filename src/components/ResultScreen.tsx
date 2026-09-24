import { CATEGORIES } from '../game/config';
import type { ScoreMap } from '../game/types';
import { calcularTotal } from '../game/rules';

interface ResultScreenProps {
  playerName: string;
  scores: ScoreMap;
  onNewGame: () => void;
}

export default function ResultScreen({ playerName, scores, onNewGame }: ResultScreenProps) {
  const total = calcularTotal(scores);

  function getMessage(t: number): string {
    if (t >= 200) return 'Resultado lendário!';
    if (t >= 150) return 'Excelente partida!';
    if (t >= 100) return 'Boa jogada!';
    if (t >= 60)  return 'Resultado razoável.';
    return 'Tente novamente!';
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-1">Partida encerrada</p>
          <h1 className="font-display text-4xl font-bold text-white">{playerName}</h1>
          <div className="mt-4 text-6xl font-mono font-bold text-accent tabular-nums">{total}</div>
          <p className="mt-2 text-white/40 text-sm">{getMessage(total)} — {CATEGORIES.length} categorias preenchidas.</p>
        </div>

        <div className="border border-white/8 rounded-xl overflow-hidden mb-6">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={`flex justify-between px-4 py-2.5 text-sm ${
                i < CATEGORIES.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <span className="text-white/50">{cat.label}</span>
              <span className="font-mono text-white/70 tabular-nums">
                {scores[cat.id] ?? 0}
              </span>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3 border-t border-white/10 bg-white/3">
            <span className="font-bold text-white text-sm uppercase tracking-wider">Total</span>
            <span className="font-mono font-bold text-accent tabular-nums">{total}</span>
          </div>
        </div>

        <button
          onClick={onNewGame}
          className="w-full bg-accent text-black font-bold text-sm uppercase tracking-widest
            py-3.5 rounded-xl transition hover:brightness-110 active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Novo Jogo
        </button>
      </div>
    </div>
  );
}
