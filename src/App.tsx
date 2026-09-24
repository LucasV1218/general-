import { useState } from 'react';
import { INITIAL_SCORES, CONFIG } from './game/config';
import type { GameState } from './game/types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function makeInitialState(playerName: string): GameState {
  return {
    screen: 'game',
    playerName,
    round: 1,
    rolls: 0,
    dice: [],
    scores: { ...INITIAL_SCORES },
    message: `Partida iniciada. Clique em "Lançar Dados" para começar.`,
    combo: null,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>({
    screen: 'start',
    playerName: '',
    round: 1,
    rolls: 0,
    dice: [],
    scores: { ...INITIAL_SCORES },
    message: '',
    combo: null,
  });

  function handleStart(name: string) {
    setState(makeInitialState(name));
  }

  function handleNewGame() {
    setState(prev => ({
      ...makeInitialState(prev.playerName || 'Jogador'),
    }));
  }

  function handleRestart() {
    setState({
      screen: 'start',
      playerName: '',
      round: 1,
      rolls: 0,
      dice: [],
      scores: { ...INITIAL_SCORES },
      message: '',
      combo: null,
    });
  }

  if (state.screen === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (state.screen === 'result') {
    return (
      <ResultScreen
        playerName={state.playerName}
        scores={state.scores}
        onNewGame={handleRestart}
      />
    );
  }

  return (
    <GameScreen
      state={state}
      onStateChange={setState}
      onNewGame={handleRestart}
    />
  );
}
