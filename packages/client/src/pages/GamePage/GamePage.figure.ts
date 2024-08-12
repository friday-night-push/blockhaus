import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  CUBE_SIZES,
  CUBE_DATAS,
} from './GamePage.constants';

import type { TFigure } from './GamePage.types';

export class GpFigure {
  //

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

    f.width = CUBE_SIZES[num].x * DEFAULT_WIDTH;
    f.height = CUBE_SIZES[num].y * DEFAULT_HEIGHT;
    return f;
  }

  public static RandomFigures(centerWinX: number): TFigure[] {
    const tmp: number[] = [];
    const figures: TFigure[] = [];

    let sum = 0;
    for (let i = 0; i < 5; i++) {
      let num = 0;

      do {
        num = Math.floor(Math.random() * CUBE_DATAS.length);
      } while (tmp.includes(num));
      tmp.push(num);

      const figure = this.GenerateFigure(num);
      figure.x = 0;
      figure.y = 600;
      sum = sum + figure.width + 50;

      figures.push(figure);
    }

    function rf(a: number, b: TFigure) {
      return a + b.width + 50;
    }

    let l = 0;
    const figuresShift = (figures.reduce(rf, 0) - 50) / 2;

    figures.forEach((f: TFigure) => {
      f.x = centerWinX + l - figuresShift;
      l += f.width + 50;

      f.moveX = f.x;
      f.moveY = f.y;
    });

    return figures;
  }
}
