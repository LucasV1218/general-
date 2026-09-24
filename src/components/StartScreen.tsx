import { useState } from 'react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Informe o nome do jogador antes de iniciar.');
      return;
    }
    onStart(trimmed);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-6xl font-bold tracking-tight text-white leading-none">
            GENERAL
          </h1>
          <p className="mt-2 text-white/40 text-sm tracking-widest uppercase">
            Jogo de dados para um jogador
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="player-name" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Nome do jogador
            </label>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="Digite seu nome"
              autoComplete="off"
              maxLength={30}
              aria-describedby={error ? 'name-error' : undefined}
              className="w-full bg-[#1a1a28] border border-white/10 rounded-xl px-4 py-3
                text-white placeholder-white/20 text-base
                focus:outline-none focus:ring-2 focus:ring-accent/60
                transition"
            />
            {error && (
              <p id="name-error" role="alert" className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-black font-bold text-sm uppercase tracking-widest
              py-3.5 rounded-xl transition hover:brightness-110 active:scale-[0.98]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Iniciar Partida
          </button>
        </form>

        {/* Tabela de pontuação rápida */}
        <div className="mt-10 border border-white/8 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-3">Tabela de pontuação</p>
          <div className="space-y-1 text-xs text-white/40 font-mono">
            {[
              ['Trinca', 'soma dos 5 dados'],
              ['Quadra', 'soma dos 5 dados'],
              ['Full House', '25 pts'],
              ['Sequência', '30 pts'],
              ['General', '50 pts'],
            ].map(([cat, pts]) => (
              <div key={cat} className="flex justify-between">
                <span>{cat}</span>
                <span className="text-white/25">{pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
