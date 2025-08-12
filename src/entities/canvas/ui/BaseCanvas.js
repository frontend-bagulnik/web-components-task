export class BaseCanvas extends HTMLElement {
  constructor() {
    super();
    this.canvas = null;
    this.ctx = null;
  }

  init() {
    this.canvas = this.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.backgroundColor = "white";
    this.setScale();
  }

  setScale() {
    const ratio = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width * ratio;
    const height = rect.height * ratio;

    this.ctx.scale(ratio, ratio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.init();
  }

  render() {
    const headerHeight = 74;
    const verticalPadding = 64;
    const horizontalPadding = 80;
    const gap = 16;
    const bufferContainerHeight = 150;

    //вынести в отдельный модуль
    const width = window.innerWidth - horizontalPadding;
    const height =
      window.innerHeight -
      verticalPadding -
      gap -
      headerHeight -
      bufferContainerHeight;

    return `
        <style>
            canvas {
                flex: 1
                border-radius: 10px;
                user-select: none;
            }
         </style>
        <canvas width="${width}" height="${height}" draggable="false"></canvas>`;
  }
}
