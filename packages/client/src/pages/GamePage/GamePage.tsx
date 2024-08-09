import { useEffect, useRef, useState } from 'react';

import { Menu, Modal } from '@gravity-ui/uikit';

import { useNavigate } from 'react-router-dom';

import { MenuItem } from 'src/components';

import { TRectClickHandler } from 'src/shared/types/game';

import { GpConst } from './GamePage.constants';

import { PAGE_ROUTES, SPRITES } from '../../utils/constants';

import { loadSprites } from '../../utils/loadSprites';

let startTimer: NodeJS.Timeout;

export const GamePage = () => {
  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let ctx: CanvasRenderingContext2D | null = null;
  let canvas: HTMLCanvasElement | null = null;

  let canvasWidth = 0;
  let canvasHeight = 0;

  let sprites: Record<string, HTMLImageElement>;

  const clickHandlers: TRectClickHandler[] = [
    {
      x1: GpConst.Bar.x,
      y1: GpConst.Bar.y,
      x2: GpConst.Bar.x + GpConst.Bar.width,
      y2: GpConst.Bar.y + GpConst.Bar.height,
      handler: () => openMenu(),
    } as TRectClickHandler,
  ];

  useEffect(() => {
    canvas = canvasRef.current;
    if (!canvas) {
      throw 'Canvas is null';
    }

    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
      throw 'Canvas context is null';
    }

    clearTimeout(startTimer);
    startTimer = setTimeout(Start, 100);
  }, []);

  async function Start() {
    console.info('Start');

    if ((canvasRef.current as any).clickEvnt == undefined) {
      canvasRef.current?.addEventListener('click', (event: MouseEvent) => {
        const x = event.x;
        const y = event.y;
        clickHandlers.forEach(ch => {
          if (x >= ch.x1 && x <= ch.x2 && y >= ch.y1 && y <= ch.y2) {
            ch.handler();
          }
        });
        (canvasRef.current as any).clickEvnt = true;
      });
    }

    sprites = await loadSprites(SPRITES);
    resize();
  }

  function openMenu() {
    pauseGame();
    setIsMenu(true);
  }

  function draw() {
    if (ctx) {
      ctx.fillStyle = '#ffddff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.drawImage(
        sprites.BAR as any,
        0,
        0,
        32,
        32,
        GpConst.Bar.x,
        GpConst.Bar.y,
        GpConst.Bar.width,
        GpConst.Bar.height
      );
    }
  }

  function resize() {
    if (canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight - 5;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;

      draw();
    }
  }

  function pauseGame() {
    // замораживание всех процессов (счётчиков и прочее)
  }

  function ResumeGame() {
    // возобновление всех процессов
    setIsMenu(false);
  }

  function CancelGame() {
    // прерывание всех процессов и выход в меню
    navigate(PAGE_ROUTES.MENU);
  }

  window.onresize = () => {
    resize();
  };

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>

      <Modal open={isMenu}>
        <Menu size={'xl'}>
          {/* TODO: Не могу отцентрировать по аналогии из GameMenuPage, ругается на direction */}
          {/* <Container direction={'column'} alignItems={'center'}> */}
          <MenuItem label="Resume game" onClick={ResumeGame} />
          <MenuItem label="Cancel game" onClick={CancelGame} />
          {/* </Container> */}
        </Menu>
      </Modal>
    </>
  );
};
