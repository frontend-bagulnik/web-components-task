import { BaseCanvas } from "./BaseCanvas";
import { getSceneElements } from "@entities/scene/lib/scene";

class ControlledCanvas extends BaseCanvas {
  constructor() {
    super();
    this.viewportTransform = {
      x: 0,
      y: 0,
      scale: 1,
    };
    this.prevMousePosition = {
      x: 0,
      y: 0,
    };
    this.mouseMoveListener = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initListeners();
    this.renderScene();
  }

  initListeners() {
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvas.addEventListener("mouseout", this.onMouseUp.bind(this));
  }

  onMouseDown({ clientX, clientY }) {
    this.prevMousePosition.y = clientY;
    this.prevMousePosition.x = clientX;

    this.mouseMoveListener = this.onMouseMove.bind(this);
    this.canvas.addEventListener("mousemove", this.mouseMoveListener, false);
  }

  onMouseMove({ clientX, clientY }) {
    this.viewportTransform.x += clientX - this.prevMousePosition.x;
    this.viewportTransform.y += clientY - this.prevMousePosition.y;

    this.prevMousePosition.x = clientX;
    this.prevMousePosition.y = clientY;

    this.renderScene();
  }

  onMouseUp() {
    this.canvas.removeEventListener("mousemove", this.mouseMoveListener, false);
  }

  applyTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const { scale, x, y } = this.viewportTransform;
    this.ctx.setTransform(scale, 0, 0, scale, x, y);
  }

  renderScene() {
    this.applyTransform();
    getSceneElements().forEach((el) => el.draw(this.ctx));
  }
}

customElements.define("controlled-canvas", ControlledCanvas);
