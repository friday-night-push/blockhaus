import {
  defaultWidth,
  defaultHeight,
  cubeDatas,
  GpConst,
  cubeSizes,
} from './GamePage.constants';

import { TFigure } from './GamePage.types';

export class GpUtils {
  //

  public static getContext(
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  ) {
    if (canvasRef === null) throw 'Canvas ref is null';

    const canvas = canvasRef.current;
    if (!canvas) {
      throw 'Canvas is null';
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
      throw 'Canvas context is null';
    }

    return { canvas, ctx };
  }

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
        const x = i * defaultWidth + drawX;
        const y = j * defaultHeight + drawY;
        if (field[i * 10 + j] != -1)
          GpUtils.DrawCube(ctx, cubes, x, y, field[i * 10 + j]);
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
      GpConst.Bar.x,
      GpConst.Bar.y,
      GpConst.Bar.width,
      GpConst.Bar.height
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
      defaultWidth,
      defaultHeight
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
      if (cubeDatas[count][i] != 0) {
        GpUtils.DrawCube(
          ctx,
          cubes,
          x + (i % 3) * defaultWidth,
          y + Math.floor(i / 3) * defaultHeight,
          cubeDatas[count][i]
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
      GpUtils.DrawFigure(
        ctx,
        cubes,
        figures[i].moveX,
        figures[i].moveY,
        figures[i].num
      );
    }
  }

  public static GenerateFigure(num: number): TFigure {
    const f: TFigure = {
      num,
      x: 0,
      y: 0,
      moveX: 0,
      moveY: 0,
      shiftX: 0,
      shiftY: 0,
      width: 0,
      height: 0,
    };

    console.info(cubeSizes[num]);

    f.width = cubeSizes[num].x * defaultWidth;
    f.height = cubeSizes[num].y * defaultHeight;
    return f;
  }
}
