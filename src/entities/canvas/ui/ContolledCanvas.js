import { BaseCanvas } from "./BaseCanvas";
import { getSceneElements } from "@entities/scene/lib/scene";
import { publishEvent } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { subscribe } from "@shared/lib/eventBus";
import { mapScreenCoordinatesToCanvas } from "../lib/mappers/coordinates";
import { sceneEvents } from "@entities/scene/model/events";

export class ControlledCanvas extends BaseCanvas {
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
    this.controls = {
      panning: true,
      elementMovement: false,
    };
    this.mouseMoveListener = null;
    this.movingElementId = null;
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
    this.canvas.addEventListener("wheel", this.onMouseWheel.bind(this));
    subscribe(canvasEvents.RENDER_SCENE, this.renderScene.bind(this));
    subscribe(
      sceneEvents.SELECTED_ELEMENT,
      this.onSceneElementSelected.bind(this),
    );
  }

  onMouseDown({ clientX, clientY }) {
    this.prevMousePosition.y = clientY;
    this.prevMousePosition.x = clientX;

    const { canvasX, canvasY } = mapScreenCoordinatesToCanvas(
      this.canvas,
      { clientX, clientY },
      this.viewportTransform,
    );

    publishEvent(canvasEvents.MOUSE_DOWN, { x: canvasX, y: canvasY });

    this.mouseMoveListener = this.onMouseMove.bind(this);
    this.canvas.addEventListener("mousemove", this.mouseMoveListener, false);
  }

  onMouseMove({ clientX, clientY }) {
    if (this.controls.panning) {
      this.viewportTransform.x += clientX - this.prevMousePosition.x;
      this.viewportTransform.y += clientY - this.prevMousePosition.y;
    }

    if (this.movingElementId && this.controls.elementMovement) {
      publishEvent(canvasEvents.MOVE_ELEMENT, {
        id: this.movingElementId,
        dx: clientX - this.prevMousePosition.x,
        dy: clientY - this.prevMousePosition.y,
      });
    }

    this.prevMousePosition.x = clientX;
    this.prevMousePosition.y = clientY;

    this.renderScene();
  }

  onMouseUp() {
    this.canvas.removeEventListener("mousemove", this.mouseMoveListener, false);
    this.resetControls();
  }

  onMouseWheel(event) {
    event.preventDefault();
    const { clientX, clientY, deltaY } = event;
    const { x: oldX, y: oldY, scale: oldScale } = this.viewportTransform;

    const invertedDelta = deltaY * -0.01;
    const newScale = oldScale + invertedDelta;

    if (newScale <= 0) {
      return;
    }

    const updatePosition = (oldValue, newValue) =>
      newValue - (newValue - oldValue) * (newScale / oldScale);

    this.viewportTransform.x = updatePosition(oldX, clientX);
    this.viewportTransform.y = updatePosition(oldY, clientY);
    this.viewportTransform.scale = newScale;

    publishEvent(
      invertedDelta > 0 ? canvasEvents.ZOOM_IN : canvasEvents.ZOOM_OUT,
    );

    this.renderScene();
  }

  onSceneElementSelected(elementId) {
    this.controls.panning = false;
    this.controls.elementMovement = true;
    this.movingElementId = elementId;
  }

  resetControls() {
    this.controls.panning = true;
    this.controls.elementMovement = false;
    this.movingElementId = null;
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
