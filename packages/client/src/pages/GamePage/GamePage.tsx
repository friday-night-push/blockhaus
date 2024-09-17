import { useContext, useEffect, useRef, useState } from 'react';

import { Button, Modal } from '@gravity-ui/uikit';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'src/hoc/AuthProvider';

import { PAGE_ROUTES } from 'src/utils/constants';

import Game from './Game';

import type { RootState } from '../../store';

let startTimer: NodeJS.Timeout;
let isFullscreen = false;

export interface GamePageProps {
  toggleFullscreen: (canvasRef: React.RefObject<HTMLCanvasElement>, isFS: boolean) => boolean;
}

export const GamePage: React.FC<GamePageProps> = ({ toggleFullscreen }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { user } = useContext(AuthContext);

  let game: Game;

  let gameDifficultState = useSelector((state: RootState) => state.example.gameDifficult);
  let gameTypeState = useSelector((state: RootState) => state.example.gameType);

  useEffect(() => {
    clearTimeout(startTimer);
    startTimer = setTimeout(Initialize, 100);
  }, []);

  function Initialize() {
    const scores = localStorage.getItem('scores');
    const field = localStorage.getItem('field');
    const scoresState = scores ? parseInt(scores) : 0;
    const fieldState = field ? JSON.parse(field) : [];

    const difficult = localStorage.getItem('difficult');
    const type = localStorage.getItem('type');

    gameDifficultState = difficult ? parseInt(difficult) : gameDifficultState;
    gameTypeState = type ? parseInt(type) : gameTypeState;
    localStorage.setItem('difficult', gameDifficultState.toString());
    localStorage.setItem('type', gameTypeState.toString());

    const time = localStorage.getItem('time');

    game = new Game(canvasRef);
    game.Init(scoresState, fieldState);
    game.SetDifficult(gameDifficultState, time == null ? -1 : parseInt(time));
    game.SetType(gameTypeState);
    game.SetPauseHandler(pauseGame);
    game.SetToggleFullscreenHandler(toggleFS);
    game.SetSaveDataHandler(saveData);
    game.SetGameOver(gameOver);
    game.Start();
  }

  function pauseGame() {
    game.PauseGame();
    navigate(PAGE_ROUTES.GAME_PAUSE);
  }

  function toggleFS() {
    isFullscreen = toggleFullscreen(canvasRef, isFullscreen);
    game.SetToggleIcon(isFullscreen);
  }

  function saveData(score: number, field: number[], time: number) {
    localStorage.setItem('scores', score.toString());
    localStorage.setItem('time', time.toString());
    localStorage.setItem('field', JSON.stringify(field));
  }

  function gameOver(score: number, type: number, diff: number) {
    const isAuth = localStorage.getItem('isAuth');

    let name = 'Y';
    if (user != null && isAuth != null) {
      name = user?.display_name == null ? user?.first_name : user?.display_name;
      name += ', y';
    }

    setContent(`Game over. ${name}our score is ${score}. Type: ${type}, difficult: ${diff}.`);
    setOpen(true);
  }

  function closeGame() {
    localStorage.removeItem('scores');
    localStorage.removeItem('field');
    localStorage.removeItem('time');
    localStorage.removeItem('type');
    localStorage.removeItem('difficult');
    navigate(PAGE_ROUTES.MENU);
  }

  return (
    <>
      <canvas ref={canvasRef} className='canvas'></canvas>;
      <Modal open={open} onClose={closeGame}>
        <div style={{ padding: '20px' }}>
          {content}
          <hr />
          <Button onClick={closeGame}>Ok</Button>
        </div>
      </Modal>
    </>
  );
};
