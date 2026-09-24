// Posições dos pontos (pips) em cada face do dado
const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
};

interface DieFaceProps {
  value: number;
  rolling?: boolean;
  kept?: boolean;
  canKeep?: boolean;
  onToggleKeep?: () => void;
}

export default function DieFace({ value, rolling, kept, canKeep, onToggleKeep }: DieFaceProps) {
  const pips = PIP_LAYOUTS[value] ?? [];

  return (
    <button
      type="button"
      onClick={canKeep ? onToggleKeep : undefined}
      disabled={!canKeep}
      aria-label={`Dado com valor ${value}${kept ? ' (travado)' : ''}${canKeep ? '. Clique para ' + (kept ? 'soltar' : 'travar') : ''}`}
      aria-pressed={kept}
      className={`
        relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px]
        rounded-xl border transition-all duration-150
        shadow-[0_4px_16px_rgba(0,0,0,0.5)]
        ${canKeep ? 'cursor-pointer' : 'cursor-default'}
        ${kept
          ? 'border-accent/70 bg-[#1e2410] shadow-[0_0_0_2px_var(--accent),0_4px_16px_rgba(0,0,0,0.5)] scale-[1.06]'
          : 'border-white/10 bg-[#1a1a28] hover:border-white/20'
        }
        ${rolling ? 'animate-die-roll' : ''}
      `}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {pips.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={9}
            fill={kept ? 'var(--accent)' : 'var(--accent)'}
            opacity={kept ? 1 : 0.85}
          />
        ))}
      </svg>
      {/* Indicador "travado" */}
      {kept && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wider text-accent bg-[#0b0b13] px-1 rounded">
          travado
        </span>
      )}
    </button>
  );
}
