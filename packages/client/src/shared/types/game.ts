export type TRectClickHandler = {
  // left-top corner
  x1: number;
  y1: number;

  // right-bottom corner
  x2: number;
  y2: number;

  handler: () => void;
};
