import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { PAGE_ROUTES } from 'src/utils/constants';

import Game from './Game';

let startTimer: NodeJS.Timeout;
let isFullscreen = false;

export interface GamePageProps {
  toggleFullscreen: (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    isFullscreen: boolean
  ) => boolean;
}

export const GamePage: React.FC<GamePageProps> = ({ toggleFullscreen }) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let game: Game;

  useEffect(() => {
    clearTimeout(startTimer);
    startTimer = setTimeout(Initialize, 100);
  }, []);

  function Initialize() {
    game = new Game(canvasRef);
    game.Init();
    game.SetPauseHandler(pauseGame);
    game.SetToggleFullscreenHandler(toggleFS);
    game.Start();
  }

  function pauseGame() {
    navigate(PAGE_ROUTES.GAME_PAUSE);
  }

  function toggleFS() {
    isFullscreen = toggleFullscreen(canvasRef, isFullscreen);
    game.SetToggleIcon(isFullscreen);
    console.info('aaaaaaaaaaaaaaa', isFullscreen);
  }

  return <canvas ref={canvasRef} className="canvas"></canvas>;
};
