import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  GpConst,
  SPRITES,
  cubeDatas,
  defaultHeight,
  defaultWidth,
  shiftHorizontal,
  shiftVertical,
} from './GamePage.constants';

import { TFigure, TRectClickHandler } from './GamePage.types';

import { GpUtils } from './GamePage.utils';

import { PAGE_ROUTES } from 'src/utils/constants';

import { loadSprites } from 'src/utils/loadSprites';

let startTimer: NodeJS.Timeout;

export const GamePage = () => {
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let ctx: CanvasRenderingContext2D | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let sprites: Record<string, HTMLImageElement>;
  let centerWin: { x: number; y: number } = { x: 0, y: 0 };

  let wField: number;
  let hField: number;
  let drawX: number;
  let drawY: number;

  let field: number[] = [];
  let selectedField: number[] = [];
  const figures: TFigure[] = [];

  let score = 0;

  // drag and drop
  let isDrag = false;
  let dragFigure: TFigure | null = null;
  let putX = 0;
  let putY = 0;

  const clickHandlers: TRectClickHandler[] = [
    {
      x1: GpConst.Bar.x,
      y1: GpConst.Bar.y,
      x2: GpConst.Bar.x + GpConst.Bar.width,
      y2: GpConst.Bar.y + GpConst.Bar.height,
      handler: () => pauseGame(),
    } as TRectClickHandler,
  ];

  useEffect(() => {
    clearTimeout(startTimer);
    startTimer = setTimeout(Start, 100);
  }, []);

  function Start() {
    console.info('Start');

    field = new Array(100).fill(0);
    selectedField = new Array(100).fill(-1);

    canvasRef.current?.addEventListener('click', (event: MouseEvent) => {
      console.info('addEventListener click');
      const x = event.x;
      const y = event.y;
      clickHandlers.forEach(ch => {
        if (x >= ch.x1 && x <= ch.x2 && y >= ch.y1 && y <= ch.y2) {
          ch.handler();
        }
      });
    });

    // нажали кнопку мыши
    canvasRef.current?.addEventListener('mousedown', (event: MouseEvent) => {
      isDrag = true;
      const x = event.x;
      const y = event.y;
      figures.forEach((f: TFigure) => {
        if (x >= f.x && x <= f.x + f.width && y >= f.y && y <= f.y + f.height) {
          dragFigure = f;
          dragFigure.shiftX = x - dragFigure.x;
          dragFigure.shiftY = y - dragFigure.y;
          console.info('dragFigure', dragFigure);
        }
      });
    });

    // отпустили кнопку мыши
    canvasRef.current?.addEventListener('mouseup', () => {
      isDrag = false;
      if (dragFigure) {
        for (let i = 0; i < 9; i++) {
          if (cubeDatas[dragFigure.num][i] != 0) {
            score++;
            const sx = i % 3;
            const sy = Math.floor(i / 3);
            field[(putX + sx) * 10 + (putY + sy)] =
              cubeDatas[dragFigure.num][i];
          }
        }

        dragFigure.moveX = dragFigure.x;
        dragFigure.moveY = dragFigure.y;
        dragFigure = null;
      }
    });

    // перемещаем мышкой
    canvasRef.current?.addEventListener('mousemove', (event: MouseEvent) => {
      if (ctx) {
        selectedField = new Array(100).fill(-1);
        if (isDrag && dragFigure) {
          dragFigure.moveX = event.x - dragFigure.shiftX;
          dragFigure.moveY = event.y - dragFigure.shiftY;

          const x = dragFigure.moveX + 10;
          const y = dragFigure.moveY + 10;
          if (
            x >= drawX &&
            x <= drawX + wField - 3 &&
            y >= drawY &&
            y <= drawY + hField - 3
          ) {
            putX = Math.floor((x - drawX) / defaultWidth);
            putY = Math.floor((y - drawY) / defaultHeight);
            for (let i = 0; i < 9; i++) {
              if (cubeDatas[dragFigure.num][i] != 0) {
                const sx = i % 3;
                const sy = Math.floor(i / 3);
                if (field[(putX + sx) * 10 + (putY + sy)] == 0)
                  selectedField[(putX + sx) * 10 + (putY + sy)] = 1;
              }
            }
          }
        } else {
          if (
            event.x >= drawX &&
            event.x <= drawX + wField - 3 &&
            event.y >= drawY &&
            event.y <= drawY + hField - 3
          ) {
            const indX = Math.floor((event.x - drawX) / defaultWidth);
            const indY = Math.floor((event.y - drawY) / defaultHeight);
            if (field[indX * 10 + indY] == 0)
              selectedField[indX * 10 + indY] = 1;
          }
        }
      }
    });

    const context = GpUtils.getContext(canvasRef);
    canvas = context.canvas;
    ctx = context.ctx;

    loadSprites(SPRITES).then(s => {
      sprites = s;
      resize();
      randomFigures();
      animate();
    });
  }

  function animate() {
    requestAnimationFrame(animate);

    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.drawImage(sprites.BG, 0, 0, canvasWidth, canvasHeight);

      GpUtils.DrawBar(ctx, sprites.PAUSE);

      GpUtils.DrawField(
        ctx,
        sprites.CUBES,
        drawX,
        drawY,
        wField,
        hField,
        field
      );
      GpUtils.DrawField(
        ctx,
        sprites.CUBES,
        drawX,
        drawY,
        wField,
        hField,
        selectedField,
        false
      );

      /*
      for (let i = 0; i < 5; i++)
      for (let j = 0; j < 5; j++) {
        GpUtils.DrawFigure(ctx, sprites.CUBES, i * 100, j * 100, j * 5 + i);
      }
      */

      GpUtils.DrawFigures(ctx, sprites.CUBES, figures);

      GpUtils.DrawScore(ctx, sprites.COIN, score, centerWin.x);
    } else console.info('no ctx');
  }

  function resize() {
    console.info('resize');
    if (canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight - 5;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      centerWin = { x: canvasWidth / 2, y: canvasHeight / 2 };

      wField = 10 * defaultWidth + 2;
      hField = 10 * defaultHeight + 2;

      drawX = centerWin.x - wField / 2 + shiftHorizontal;
      drawY = centerWin.y - hField / 2 + shiftVertical;
    }
  }

  function pauseGame() {
    navigate(PAGE_ROUTES.GAME_PAUSE);
  }

  window.onresize = () => {
    resize();
  };

  function randomFigures() {
    const tmp: number[] = [];

    let sum = 0;
    for (let i = 0; i < 5; i++) {
      let num = 0;

      do {
        num = Math.floor(Math.random() * cubeDatas.length);
      } while (tmp.includes(num));
      tmp.push(num);

      const figure = GpUtils.GenerateFigure(num);
      figure.x = 0;
      figure.y = 600;
      sum = sum + figure.width + 50;

      figures.push(figure);
    }

    let l = 0;
    const figuresShift =
      (figures.reduce((a, b) => a + b.width + 50, 0) - 50) / 2;
    figures.forEach((f: TFigure) => {
      f.x = centerWin.x + l - figuresShift;
      l += f.width + 50;

      f.moveX = f.x;
      f.moveY = f.y;
    });

    console.info('figures', figures);
  }

  return <canvas ref={canvasRef} className="canvas"></canvas>;
};
