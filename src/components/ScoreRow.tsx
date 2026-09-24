import type { Category } from '../game/types';
import { calcularPontuacaoCategoria } from '../game/rules';

interface ScoreRowProps {
  category: Category;
  scored: number | null;
  dice: number[];
  hasRolled: boolean;
  onSelect: (id: string) => void;
}

export default function ScoreRow({ category, scored, dice, hasRolled, onSelect }: ScoreRowProps) {
  const isUsed = scored !== null;
  const possible = hasRolled && !isUsed ? calcularPontuacaoCategoria(category.id, dice) : null;

  return (
    <button
      disabled={isUsed || !hasRolled}
      onClick={() => onSelect(category.id)}
      aria-label={
        isUsed
          ? `${category.label}: ${scored} pontos (utilizada)`
          : possible !== null
          ? `${category.label}: ${possible} pontos possíveis. Clique para registrar.`
          : `${category.label}: lance os dados para ver pontuação`
      }
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm
        transition-all duration-150 group
        ${isUsed
          ? 'opacity-40 cursor-default'
          : hasRolled
          ? 'cursor-pointer hover:bg-white/5 hover:ring-1 hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
          : 'opacity-50 cursor-not-allowed'
        }
      `}
    >
      <span className="text-left">
        <span className={`font-medium ${isUsed ? 'text-white/40' : 'text-white/80'}`}>
          {category.label}
        </span>
        {!isUsed && (
          <span className="block text-xs text-white/30 leading-none mt-0.5">
            {category.description}
          </span>
        )}
        {isUsed && (
          <span className="block text-xs text-white/25 leading-none mt-0.5">Registrada</span>
        )}
      </span>

      <span className={`font-mono text-sm tabular-nums ml-3 shrink-0 ${
        isUsed
          ? 'text-white/35'
          : possible !== null && possible > 0
          ? 'text-accent font-semibold'
          : possible !== null
          ? 'text-white/30'
          : 'text-white/20'
      }`}>
        {isUsed
          ? scored
          : possible !== null
          ? possible
          : '—'
        }
      </span>
    </button>
  );
}
