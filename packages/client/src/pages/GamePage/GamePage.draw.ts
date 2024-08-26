import {
  PAUSE,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  CUBE_DATAS,
} from './GamePage.constants';

import type { TFigure } from './GamePage.types';

export class GpDraw {
  //

  public static DrawField(
    ctx: CanvasRenderingContext2D,
    cubes: HTMLImageElement,
    drawX: number,
    drawY: number,
    wField: number,
    hField: number,
    field: number[],
    bg = true
  ) {
    if (bg) {
      ctx.fillStyle = 'black';
      ctx.fillRect(drawX - 1, drawY - 1, wField, hField);
    }

    // строка
    for (let i = 0; i < 10; i++) {
      // столбец
      for (let j = 0; j < 10; j++) {
        const x = i * DEFAULT_WIDTH + drawX;
        const y = j * DEFAULT_HEIGHT + drawY;
        if (field[i * 10 + j] != -1)
          GpDraw.DrawCube(ctx, cubes, x, y, field[i * 10 + j]);
      }
    }
  }

  public static DrawBar(ctx: CanvasRenderingContext2D, bar: HTMLImageElement) {
    ctx.drawImage(
      bar,
      0,
      0,
      32,
      32,
      PAUSE.x,
      PAUSE.y,
      PAUSE.width,
      PAUSE.height
    );
  }

  public static DrawCube(
    ctx: CanvasRenderingContext2D,
    cubes: HTMLImageElement,
    x: number,
    y: number,
    num: number
  ) {
    ctx.drawImage(
      cubes,
      num * 60,
      0,
      60,
      60,
      x,
      y,
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT
    );
  }

  public static DrawFigure(
    ctx: CanvasRenderingContext2D,
    cubes: HTMLImageElement,
    x: number,
    y: number,
    count: number
  ) {
    // рисование фигуры
    for (let i = 0; i < 9; i++) {
      if (CUBE_DATAS[count][i] != 0) {
        GpDraw.DrawCube(
          ctx,
          cubes,
          x + (i % 3) * DEFAULT_WIDTH,
          y + Math.floor(i / 3) * DEFAULT_HEIGHT,
          CUBE_DATAS[count][i]
        );
      }
    }
  }

  public static DrawScore(
    ctx: CanvasRenderingContext2D,
    coin: HTMLImageElement,
    score: number,
    centerWidth: number
  ) {
    const shift = -85;
    ctx.drawImage(coin, 0, 0, 32, 32, centerWidth + shift, 20, 32, 32);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(centerWidth + 40 + shift, 20, 130, 32);

    // write score with right align
    ctx.font = '20px serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'black';
    ctx.fillText(String(score), centerWidth + 40 + shift + 120, 43);
  }

  public static DrawFigures(
    ctx: CanvasRenderingContext2D,
    cubes: HTMLImageElement,
    figures: TFigure[]
  ) {
    for (let i = 0; i < figures.length; i++) {
      GpDraw.DrawFigure(
        ctx,
        cubes,
        figures[i].moveX,
        figures[i].moveY,
        figures[i].num
      );
    }
  }
}
