import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { PAGE_ROUTES } from 'src/utils/constants';

import Game from './Game';
import { FullscreenToggle } from '../../components/organisms';

let startTimer: NodeJS.Timeout;

export const GamePage = () => {
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
    game.Start();
  }

  function pauseGame() {
    navigate(PAGE_ROUTES.GAME_PAUSE);
  }

  return (
    <FullscreenToggle>
      <canvas ref={canvasRef} className="canvas"></canvas>;
    </FullscreenToggle>
  );
};
