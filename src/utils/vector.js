import { Vector2D } from "../core/Vector2D";

const getVectorByTwoPoints = (point1, point2) => {
  const dX = point1.x - point2.x;
  const dY = point1.y - point2.y;
  return new Vector2D(dX, dY);
};

export  { getVectorByTwoPoints };
