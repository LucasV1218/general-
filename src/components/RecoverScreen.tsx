import { calcularTotal } from '../game/rules';
import type { GameState } from '../game/types';
import { CONFIG, CATEGORIES } from '../game/config';

interface RecoverScreenProps {
  savedState: GameState;
  onContinue: () => void;
  onNewGame: () => void;
}

export default function RecoverScreen({ savedState, onContinue, onNewGame }: RecoverScreenProps) {
  const total = calcularTotal(savedState.scores);
  const categoriesUsed = Object.values(savedState.scores).filter(v => v !== null).length;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl font-bold tracking-tight text-white leading-none mb-2">
            GENERAL
          </h1>
          <p className="text-xs text-white/30 uppercase tracking-widest">Partida salva encontrada</p>
        </div>

        {/* Card da partida salva */}
        <div className="border border-accent/25 bg-accent/5 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/30 mb-0.5">Jogador</p>
              <p className="font-semibold text-white text-lg">{savedState.playerName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-white/30 mb-0.5">Pontos</p>
              <p className="font-mono font-bold text-accent text-xl tabular-nums">{total}</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm border-t border-white/8 pt-4">
            <div>
              <p className="text-xs text-white/30">Rodada</p>
              <p className="font-mono font-medium text-white">
                {savedState.round} / {CONFIG.TOTAL_RODADAS}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/30">Categorias</p>
              <p className="font-mono font-medium text-white">
                {categoriesUsed} / {CATEGORIES.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/30">Lançamentos</p>
              <p className="font-mono font-medium text-white">
                {savedState.rolls} / {CONFIG.MAX_LANCAMENTOS}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onContinue}
            className="w-full bg-accent text-black font-bold text-sm uppercase tracking-widest
              py-3.5 rounded-xl transition hover:brightness-110 active:scale-[0.98]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Continuar Partida
          </button>
          <button
            onClick={onNewGame}
            className="w-full border border-white/15 text-white/60 font-medium text-sm
              py-3 rounded-xl transition hover:text-white hover:border-white/30
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Nova Partida
          </button>
        </div>
      </div>
    </div>
  );
}
