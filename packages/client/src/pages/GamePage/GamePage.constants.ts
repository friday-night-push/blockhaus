import bar from 'src/assets/bar.png';
import bg from 'src/assets/bg.jpg';
import coin from 'src/assets/coin.png';
import cubes from 'src/assets/cubes.png';
import pause from 'src/assets/pause.png';

import { TPos } from './GamePage.types';

const defaultWidth = 30;
const defaultHeight = 30;
const shiftVertical = -150;
const shiftHorizontal = 0;

export const SPRITES = {
  BAR: bar,
  CUBES: cubes,
  PAUSE: pause,
  COIN: coin,
  BG: bg,
};

class GpConst {
  public static Bar = {
    x: 20,
    y: 20,
    width: 32,
    height: 32,
  };
}

const cubeSizes: TPos[] = [
  // прямая вертикальная
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },

  // прямая горизонтальная
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },

  // квадраты
  { x: 2, y: 2 },
  { x: 3, y: 3 },

  // уголки
  { x: 2, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 2 },

  // подкова
  { x: 2, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 2 },

  // зигзаг
  { x: 3, y: 3 },
  { x: 3, y: 3 },
  { x: 3, y: 3 },
  { x: 3, y: 3 },

  // т-образные
  { x: 2, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 2 },

  // крест
  { x: 3, y: 3 },

  // классический тетрисный зиг-заг
  { x: 2, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 2 },
];

const cubeDatas = [
  // прямая вертикальная
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 2, 0, 0, 0, 0, 0],
  [2, 0, 0, 2, 0, 0, 2, 0, 0],

  // прямая горизонтальная
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 0, 0, 0, 0, 0, 0],

  // квадраты
  [4, 4, 0, 4, 4, 0, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 4, 4],

  // уголки
  [5, 5, 0, 5, 0, 0, 0, 0, 0],
  [5, 5, 0, 0, 5, 0, 0, 0, 0],
  [5, 0, 0, 5, 5, 0, 0, 0, 0],
  [0, 5, 0, 5, 5, 0, 0, 0, 0],

  // подкова
  [6, 6, 0, 6, 0, 0, 6, 6, 0],
  [6, 6, 0, 0, 6, 0, 6, 6, 0],
  [6, 6, 6, 6, 0, 6, 0, 0, 0],
  [6, 0, 6, 6, 6, 6, 0, 0, 0],

  // зигзаг
  [7, 7, 0, 0, 7, 0, 0, 7, 7],
  [0, 7, 7, 0, 7, 0, 7, 7, 0],
  [7, 0, 0, 7, 7, 7, 0, 0, 7],
  [0, 0, 7, 7, 7, 7, 7, 0, 0],

  // т-образные
  [8, 0, 0, 8, 8, 0, 8, 0, 0],
  [0, 8, 0, 8, 8, 0, 0, 8],
  [8, 8, 8, 0, 8, 0, 0, 0, 0],
  [0, 8, 0, 8, 8, 8, 0, 0, 0],

  // крест
  [0, 9, 0, 9, 9, 9, 0, 9, 0],

  // классический тетрисный зиг-заг
  [10, 0, 0, 10, 10, 0, 0, 10, 0],
  [0, 10, 0, 10, 10, 0, 10, 0, 0],
  [10, 10, 0, 0, 10, 10, 0, 0, 0],
  [0, 10, 10, 10, 10, 0, 0, 0, 0],
];

export {
  GpConst,
  defaultWidth,
  defaultHeight,
  shiftVertical,
  shiftHorizontal,
  cubeDatas,
  cubeSizes,
};
