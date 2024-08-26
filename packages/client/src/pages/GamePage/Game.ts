import { loadSprites } from 'src/utils/loadSprites';

import {
  SPRITES,
  PAUSE,
  CUBE_DATAS,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  SHIFT_HORIZONTAL,
  SHIFT_VERTICAL,
} from './GamePage.constants';

import { GpDraw } from './GamePage.draw';

import { GpFigure } from './GamePage.figure';

import type { TFigure, TRectClickHandler } from './GamePage.types';

export default class Game {
  private canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;

  private canvasWidth = 0;
  private canvasHeight = 0;

  private sprites: Record<string, HTMLImageElement> = {};

  private centerWin: { x: number; y: number } = { x: 0, y: 0 };

  private wField = 0;
  private hField = 0;
  private drawX = 0;
  private drawY = 0;

  private field: number[] = [];
  private selectedField: number[] = [];
  private figures: TFigure[] = [];

  private score = 0;

  // перетаскивание
  private isDrag = false;
  private dragFigure: TFigure | null = null;
  private putX = 0;
  private putY = 0;

  // массив объектов, по который будет оцениваться куда кликнули и какой вызывать обработчик
  private CLICK_HANDLERS: TRectClickHandler[] = [];

  constructor(canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) {
    this.canvasRef = canvasRef;
  }

  Init() {
    this.canvas = this.canvasRef.current;
    if (!this.canvas) throw 'Canvas is null';

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!this.ctx) throw 'Canvas context is null';
  }

  Start() {
    this.addEvents();

    this.field = new Array(100).fill(0);
    this.selectedField = new Array(100).fill(-1);

    loadSprites(SPRITES).then((s: Record<string, HTMLImageElement>) => {
      this.sprites = s;
      this.resize();
      this.figures = GpFigure.RandomFigures(this.centerWin.x);
      this.animate();
    });
  }

  SetPauseHandler(handler: () => void) {
    const rect: TRectClickHandler = {
      x1: PAUSE.x,
      y1: PAUSE.y,
      x2: PAUSE.x + PAUSE.width,
      y2: PAUSE.y + PAUSE.height,
      handler: handler,
    } as TRectClickHandler;
    this.CLICK_HANDLERS.push(rect);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.drawImage(
        this.sprites.BG,
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );

      GpDraw.DrawBar(this.ctx, this.sprites.PAUSE);

      GpDraw.DrawField(
        this.ctx,
        this.sprites.CUBES,
        this.drawX,
        this.drawY,
        this.wField,
        this.hField,
        this.field
      );
      GpDraw.DrawField(
        this.ctx,
        this.sprites.CUBES,
        this.drawX,
        this.drawY,
        this.wField,
        this.hField,
        this.selectedField,
        false
      );

      GpDraw.DrawFigures(this.ctx, this.sprites.CUBES, this.figures);

      GpDraw.DrawScore(
        this.ctx,
        this.sprites.COIN,
        this.score,
        this.centerWin.x
      );
    } else console.info('no ctx');
  }

  private addEvents() {
    this.canvasRef.current?.addEventListener('click', (event: MouseEvent) => {
      const x = event.x;
      const y = event.y;
      this.CLICK_HANDLERS.forEach((rch: TRectClickHandler) => {
        console.info(x, y);
        console.info(rch);
        if (x >= rch.x1 && x <= rch.x2 && y >= rch.y1 && y <= rch.y2) {
          console.info('click', rch.handler);
          rch.handler();
        }
      });
    });

    // нажали кнопку мыши
    this.canvasRef.current?.addEventListener(
      'mousedown',
      (event: MouseEvent) => {
        this.isDrag = true;
        const x = event.x;
        const y = event.y;
        this.figures.forEach((f: TFigure) => {
          if (
            x >= f.x &&
            x <= f.x + f.width &&
            y >= f.y &&
            y <= f.y + f.height
          ) {
            this.dragFigure = f;
            this.dragFigure.shiftX = x - this.dragFigure.x;
            this.dragFigure.shiftY = y - this.dragFigure.y;
          }
        });
      }
    );

    // отпустили кнопку мыши
    this.canvasRef.current?.addEventListener('mouseup', () => {
      this.isDrag = false;
      if (this.dragFigure) {
        for (let i = 0; i < 9; i++) {
          if (CUBE_DATAS[this.dragFigure.num][i] != 0) {
            this.score++;
            const sx = i % 3;
            const sy = Math.floor(i / 3);
            this.field[(this.putX + sx) * 10 + (this.putY + sy)] =
              CUBE_DATAS[this.dragFigure.num][i];
          }
        }

        this.dragFigure.moveX = this.dragFigure.x;
        this.dragFigure.moveY = this.dragFigure.y;
        this.dragFigure = null;
        this.figures = GpFigure.RandomFigures(this.centerWin.x);
      }
    });

    // перемещаем мышкой
    this.canvasRef.current?.addEventListener(
      'mousemove',
      (event: MouseEvent) => {
        if (this.ctx) {
          this.selectedField = new Array(100).fill(-1);
          if (this.isDrag && this.dragFigure) {
            this.dragFigure.moveX = event.x - this.dragFigure.shiftX;
            this.dragFigure.moveY = event.y - this.dragFigure.shiftY;

            const x = this.dragFigure.moveX + 10;
            const y = this.dragFigure.moveY + 10;
            if (
              x >= this.drawX &&
              x <= this.drawX + this.wField - 3 &&
              y >= this.drawY &&
              y <= this.drawY + this.hField - 3
            ) {
              this.putX = Math.floor((x - this.drawX) / DEFAULT_WIDTH);
              this.putY = Math.floor((y - this.drawY) / DEFAULT_HEIGHT);
              for (let i = 0; i < 9; i++) {
                if (CUBE_DATAS[this.dragFigure.num][i] != 0) {
                  const sx = i % 3;
                  const sy = Math.floor(i / 3);
                  if (this.field[(this.putX + sx) * 10 + (this.putY + sy)] == 0)
                    this.selectedField[
                      (this.putX + sx) * 10 + (this.putY + sy)
                    ] = 1;
                }
              }
            }
          } else {
            if (
              event.x >= this.drawX &&
              event.x <= this.drawX + this.wField - 3 &&
              event.y >= this.drawY &&
              event.y <= this.drawY + this.hField - 3
            ) {
              const indX = Math.floor((event.x - this.drawX) / DEFAULT_WIDTH);
              const indY = Math.floor((event.y - this.drawY) / DEFAULT_HEIGHT);
              if (this.field[indX * 10 + indY] == 0)
                this.selectedField[indX * 10 + indY] = 1;
            }
          }
        }
      }
    );

    window.onresize = () => {
      this.resize();
    };
  }

  private resize() {
    if (this.canvas) {
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight - 5;
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.centerWin = { x: this.canvasWidth / 2, y: this.canvasHeight / 2 };

      this.wField = 10 * DEFAULT_WIDTH + 2;
      this.hField;
      this.hField = 10 * DEFAULT_HEIGHT + 2;

      this.drawX = this.centerWin.x - this.wField / 2 + SHIFT_HORIZONTAL;
      this.drawY = this.centerWin.y - this.hField / 2 + SHIFT_VERTICAL;
    }
  }
}
