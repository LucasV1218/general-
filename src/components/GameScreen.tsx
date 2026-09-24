import { useCallback, useState } from 'react';
import { CONFIG, CATEGORIES } from '../game/config';
import { calcularPontuacaoCategoria, identificarCombo, calcularTotal } from '../game/rules';
import type { GameState, CategoryId } from '../game/types';
import DieFace from './DieFace';
import ScoreRow from './ScoreRow';

interface GameScreenProps {
  state: GameState;
  onStateChange: (s: GameState) => void;
  onNewGame: () => void;
  onShowHistory: () => void;
}

export default function GameScreen({ state, onStateChange, onNewGame, onShowHistory }: GameScreenProps) {
  const [rolling, setRolling] = useState(false);

  const canRoll = state.rolls < CONFIG.MAX_LANCAMENTOS && !rolling;
  const hasRolled = state.rolls > 0;
  const canKeepDice = hasRolled && state.rolls < CONFIG.MAX_LANCAMENTOS;
  const total = calcularTotal(state.scores);

  // Lança apenas os dados não travados; reinicia kept se for o primeiro lançamento da rodada
  const lancarDados = useCallback(() => {
    if (!canRoll) return;

    setRolling(true);
    setTimeout(() => {
      const isFirst = state.rolls === 0;
      const novos = state.dice.map((v, i) => {
        // No primeiro lançamento, todos saem; depois, apenas os não travados
        if (!isFirst && state.kept[i]) return v;
        return Math.floor(Math.random() * 6) + 1;
      });

      // No primeiro lançamento, inicializa os 5 dados do zero
      const dadosFinais = isFirst
        ? Array.from({ length: CONFIG.QUANTIDADE_DADOS }, () => Math.floor(Math.random() * 6) + 1)
        : novos;

      const novoRolls = state.rolls + 1;
      const combo = identificarCombo(dadosFinais);

      onStateChange({
        ...state,
        dice: dadosFinais,
        kept: isFirst ? Array(CONFIG.QUANTIDADE_DADOS).fill(false) : state.kept,
        rolls: novoRolls,
        combo,
        message: `Lançamento ${novoRolls} de ${CONFIG.MAX_LANCAMENTOS}.${
          novoRolls === CONFIG.MAX_LANCAMENTOS
            ? ' Limite atingido. Escolha uma categoria.'
            : ' Trave dados desejados ou lance novamente.'
        }`,
      });
      setRolling(false);
    }, 350);
  }, [canRoll, state, onStateChange]);

  // Alterna o estado "travado" de um dado específico
  function toggleKept(index: number) {
    if (!canKeepDice) return;
    const novoKept = state.kept.map((k, i) => (i === index ? !k : k));
    onStateChange({ ...state, kept: novoKept });
  }

  // Registra a categoria e avança a rodada
  function selecionarCategoria(id: string) {
    const catId = id as CategoryId;

    if (!hasRolled) {
      onStateChange({ ...state, message: 'Lance os dados antes de registrar uma categoria.' });
      return;
    }
    if (state.scores[catId] !== null) {
      onStateChange({ ...state, message: 'Essa categoria já foi utilizada.' });
      return;
    }

    const pontos = calcularPontuacaoCategoria(catId, state.dice);
    const novosScores = { ...state.scores, [catId]: pontos };
    const novaRodada = state.round + 1;
    const finalizada = novaRodada > CONFIG.TOTAL_RODADAS;

    onStateChange({
      ...state,
      scores: novosScores,
      round: novaRodada,
      rolls: 0,
      dice: [],
      kept: Array(CONFIG.QUANTIDADE_DADOS).fill(false),
      combo: null,
      screen: finalizada ? 'result' : 'game',
      message: finalizada
        ? ''
        : `Rodada ${novaRodada} de ${CONFIG.TOTAL_RODADAS}. Lance os dados para começar.`,
    });
  }

  const isLastRound = state.round === CONFIG.TOTAL_RODADAS;

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8">
        <div>
          <h1 className="font-display text-2xl font-bold leading-none tracking-tight">GENERAL</h1>
          <p className="text-xs text-white/30 mt-0.5">Jogo de dados</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/50 hidden sm:inline">
            <span className="text-white/30 text-xs uppercase tracking-wider mr-1">Jogador</span>
            {state.playerName}
          </span>
          <button
            onClick={onShowHistory}
            className="text-xs border border-white/15 rounded-lg px-3 py-1.5 text-white/50
              hover:text-white hover:border-white/30 transition
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Histórico
          </button>
          <button
            onClick={onNewGame}
            className="text-xs border border-white/15 rounded-lg px-3 py-1.5 text-white/50
              hover:text-white hover:border-white/30 transition
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Novo Jogo
          </button>
        </div>
      </header>

      {/* Área principal */}
      <main className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">

        {/* Coluna esquerda — jogo */}
        <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 gap-6">

          {/* Status da rodada */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/30">Rodada</span>
              <span className="font-mono text-lg font-bold text-white tabular-nums">
                {state.round}
                <span className="text-white/30 text-sm font-normal"> / {CONFIG.TOTAL_RODADAS}</span>
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/30">Lançamentos</span>
              <span className="font-mono text-lg font-bold tabular-nums">
                <span className={state.rolls >= CONFIG.MAX_LANCAMENTOS ? 'text-white/40' : 'text-white'}>
                  {state.rolls}
                </span>
                <span className="text-white/30 text-sm font-normal"> / {CONFIG.MAX_LANCAMENTOS}</span>
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/30">Pontos</span>
              <span className="font-mono text-lg font-bold text-accent tabular-nums">{total}</span>
            </div>
            {isLastRound && (
              <span className="ml-auto text-xs uppercase tracking-widest text-accent/80 border border-accent/30 rounded px-2 py-0.5">
                Última rodada
              </span>
            )}
          </div>

          {/* Dados */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex items-center justify-center gap-3 sm:gap-4 py-4"
              aria-label="Área dos dados"
            >
              {hasRolled
                ? state.dice.map((v, i) => (
                    <DieFace
                      key={i}
                      value={v}
                      rolling={rolling && !state.kept[i]}
                      kept={state.kept[i]}
                      canKeep={canKeepDice}
                      onToggleKeep={() => toggleKept(i)}
                    />
                  ))
                : Array.from({ length: CONFIG.QUANTIDADE_DADOS }).map((_, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px]
                        rounded-xl border border-white/8 bg-[#1a1a28]/50"
                      aria-hidden="true"
                    />
                  ))
              }
            </div>

            {/* Dica de "travar dados" */}
            {canKeepDice && (
              <p className="text-xs text-white/25 text-center">
                Clique em um dado para travá-lo no próximo lançamento
              </p>
            )}
          </div>

          {/* Combinação identificada */}
          {state.combo && (
            <div
              role="status"
              aria-live="polite"
              className="text-center font-bold text-accent text-base tracking-wide animate-fade-in"
            >
              {state.combo}
            </div>
          )}

          {/* Botão lançar */}
          <div className="flex justify-center">
            <button
              onClick={lancarDados}
              disabled={!canRoll}
              aria-label={canRoll ? 'Lançar os dados' : 'Limite de lançamentos atingido'}
              className={`
                px-10 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${canRoll
                  ? 'bg-accent text-black hover:brightness-110 active:scale-[0.98] cursor-pointer'
                  : 'bg-white/8 text-white/25 cursor-not-allowed'
                }
              `}
            >
              {rolling ? 'Lançando…' : 'Lançar Dados'}
            </button>
          </div>

          {/* Mensagem de status */}
          {state.message && (
            <p role="status" aria-live="polite" className="text-center text-sm text-white/40">
              {state.message}
            </p>
          )}
        </div>

        {/* Divisor */}
        <div className="hidden lg:block w-px bg-white/8 my-6" />
        <div className="lg:hidden h-px bg-white/8 mx-4 sm:mx-8" />

        {/* Coluna direita — categorias */}
        <div className="lg:w-72 xl:w-80 px-4 sm:px-6 lg:px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-1 px-3">Categorias</p>

          {CATEGORIES.map(cat => (
            <ScoreRow
              key={cat.id}
              category={cat}
              scored={state.scores[cat.id]}
              dice={state.dice}
              hasRolled={hasRolled}
              onSelect={selecionarCategoria}
            />
          ))}

          <div className="mt-4 pt-4 border-t border-white/8 flex justify-between items-center px-3">
            <span className="text-xs uppercase tracking-wider text-white/40 font-medium">Total</span>
            <span className="font-mono font-bold text-accent text-lg tabular-nums">{total}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
