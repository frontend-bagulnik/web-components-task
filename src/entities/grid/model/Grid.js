import { BaseSceneElement } from "@shared/model/BaseSceneElement";
import { subscribe } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { componentTypes } from "@shared/model/componentTypes";

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

  drawVerticalLine(ctx, startX, startY, endX, endY, text) {
    const { offset: measureOffset } = this.measureOptions;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    if (text) {
      this.drawMeasureText(ctx, startX, endY + measureOffset, text);
    }
    ctx.stroke();
  }

  drawVerticalLines(ctx) {
    const { cellWidth, offset } = this.options;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i <= maxWidth; i += cellWidth) {
      this.drawVerticalLine(ctx, i, offset, i, maxHeight, `${i - offset}`);
    }

    this.drawVerticalLine(ctx, maxWidth, offset, maxWidth, maxHeight);

    this.drawDefaultText(
      ctx,
      `${maxWidth - offset}`,
      maxWidth,
      maxHeight + this.measureOptions.offset,
    );
  }

  drawHorizontalLine(ctx, startX, startY, endX, endY, text) {
    const { offset: measureOffset } = this.measureOptions;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    if (text) {
      this.drawMeasureText(ctx, startX - measureOffset, endY, text, true);
    }

    ctx.stroke();
  }

  drawHorizontalLines(ctx) {
    const { cellHeight, offset } = this.options;
    const { offset: measureOffset } = this.measureOptions;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i < maxHeight; i += cellHeight) {
      this.drawHorizontalLine(ctx, offset, i, maxWidth, i, `${maxHeight - i}`);
    }

    this.drawHorizontalLine(ctx, offset, maxHeight, maxWidth, maxHeight, "0");
  }

  drawMeasureText(ctx, x, y, text, isHorizontalAlign = false) {
    const { fontSize } = this.measureOptions;
    const { width } = ctx.measureText(text);

    const xPosition = isHorizontalAlign ? x : x - width / 2;
    const yPosition = isHorizontalAlign ? y + fontSize / 2 : y;
    this.drawDefaultText(ctx, text, xPosition, yPosition);
  }

  drawDefaultText(ctx, text, x, y) {
    const { fontSize } = this.measureOptions;
    ctx.font = `${fontSize}px serif`;
    ctx.strokeText(text, x, y);
  }
}
