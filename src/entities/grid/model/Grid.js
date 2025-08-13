import { BaseSceneElement } from "@shared/model/BaseSceneElement";
import { subscribe } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { componentTypes } from "../../../shared/model/componentTypes";

export class Grid extends BaseSceneElement {
  constructor({
    id,
    lineWidth = 1,
    cellWidth = 25,
    cellHeight = 25,
    offset = 0,
    fontSize = 8,
    textOffset = 25,
    color = "#000000",
  } = {}) {
    super(componentTypes.GRID, id);

    this.originOptions = { cellWidth, cellHeight };
    this.options = { lineWidth, cellWidth, cellHeight, offset, color };
    this.measureOptions = { fontSize, offset: textOffset };

    subscribe(canvasEvents.ZOOM_IN, this.increaseCellSize.bind(this));
    subscribe(canvasEvents.ZOOM_OUT, this.decreaseCellSize.bind(this));
  }

  increaseCellSize() {
    const { cellWidth, cellHeight } = this.originOptions;
    this.options.cellWidth += cellWidth;
    this.options.cellHeight += cellHeight;
  }

  decreaseCellSize() {
    const { cellWidth, cellHeight } = this.originOptions;

    this.options.cellWidth -= cellWidth;
    this.options.cellHeight -= cellHeight;
  }

  draw(ctx) {
    const { lineWidth, color } = this.options;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    this.drawVerticalLines(ctx);
    this.drawHorizontalLines(ctx);
  }

  drawVerticalLines(ctx) {
    const { cellWidth, offset } = this.options;
    const { offset: measureOffset } = this.measureOptions;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i <= maxWidth; i += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(i, offset);
      ctx.lineTo(i, maxHeight);

      this.drawMeasureText(ctx, i, maxHeight + measureOffset, `${i - offset}`);
      ctx.stroke();
    }
  }

  drawHorizontalLines(ctx) {
    const { cellHeight, offset } = this.options;
    const { offset: measureOffset } = this.measureOptions;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i <= maxHeight; i += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(offset, i);
      ctx.lineTo(maxWidth, i);

      this.drawMeasureText(
        ctx,
        offset - measureOffset,
        i,
        `${maxHeight - i}`,
        true,
      );
      ctx.stroke();
    }
  }

  drawMeasureText(ctx, x, y, text, isHorizontalAlign = false) {
    const { fontSize } = this.measureOptions;

    ctx.font = `${fontSize}px serif`;
    const { width } = ctx.measureText(text);

    const xPosition = isHorizontalAlign ? x : x - width / 2;
    const yPosition = isHorizontalAlign ? y + fontSize / 2 : y;
    ctx.strokeText(text, xPosition, yPosition);
  }
}
