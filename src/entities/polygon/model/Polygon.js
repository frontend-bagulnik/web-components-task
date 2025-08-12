import { BaseSceneElement } from "@shared/model/BaseSceneElement";
import { polygonOptions } from "./constants";

export class Polygon extends BaseSceneElement {
  constructor({
    id,
    position,
    points,
    color = polygonOptions.color,
    borderColor = polygonOptions.borderColor,
    borderWidth = polygonOptions.borderWidth,
  }) {
    super(id);
    this.position = position;
    this.points = points;
    this.options = { color, borderColor, borderWidth };
  }

  draw(ctx) {
    const { x: globalX, y: globalY } = this.position;
    const { color, borderColor, borderWidth } = this.options;

    ctx.fillStyle = color;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.beginPath();

    this.points.forEach(({ x, y }) => {
      ctx.lineTo(globalX + x, globalY + y);
    });

    ctx.fill();
    ctx.stroke();
  }

  translate(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
  }
}
