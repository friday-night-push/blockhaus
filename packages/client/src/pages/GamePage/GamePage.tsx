import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { PAGE_ROUTES } from 'src/utils/constants';

import Game from './Game';

import type { RootState } from '../../store';

let startTimer: NodeJS.Timeout;
let isFullscreen = false;

export interface GamePageProps {
  toggleFullscreen: (canvasRef: React.RefObject<HTMLCanvasElement>, isFS: boolean) => boolean;
}

export const GamePage: React.FC<GamePageProps> = ({ toggleFullscreen }) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let game: Game;

  const gameDifficultState = useSelector((state: RootState) => state.example.gameDifficult);
  const gameTypeState = useSelector((state: RootState) => state.example.gameType);

  useEffect(() => {
    clearTimeout(startTimer);
    startTimer = setTimeout(Initialize, 100);
  }, []);

  function Initialize() {
    const scores = localStorage.getItem('scores');
    const field = localStorage.getItem('field');
    const scoresState = scores ? parseInt(scores) : 0;
    const fieldState = field ? JSON.parse(field) : [];

    game = new Game(canvasRef);
    game.Init(scoresState, fieldState);
    game.SetDifficult(gameDifficultState);
    game.SetType(gameTypeState);
    game.SetPauseHandler(pauseGame);
    game.SetToggleFullscreenHandler(toggleFS);
    game.SetSaveDataHandler(saveData);
    game.Start();
  }

  function pauseGame() {
    navigate(PAGE_ROUTES.GAME_PAUSE);
  }

  function toggleFS() {
    isFullscreen = toggleFullscreen(canvasRef, isFullscreen);
    game.SetToggleIcon(isFullscreen);
  }

  function saveData(score: number, field: number[]) {
    localStorage.setItem('scores', score.toString());
    localStorage.setItem('field', JSON.stringify(field));
  }

  return <canvas ref={canvasRef} className='canvas'></canvas>;
};
