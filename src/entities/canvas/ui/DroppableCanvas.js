import { ControlledCanvas } from "./ContolledCanvas";
import { mapScreenCoordinatesToCanvas } from "../lib/mappers/coordinates";
import { createDropElementEvent } from "../model/domEvents";

class DroppableCanvas extends ControlledCanvas {
  initListeners() {
    super.initListeners();
    this.canvas.addEventListener("dragover", this.onDragOverElement.bind(this));
    this.canvas.addEventListener("drop", this.onDropElement.bind(this));
  }

  onDragOverElement(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onDropElement(event) {
    event.preventDefault();

    const elementId = event.dataTransfer.getData("text/plain");

    if (!elementId) {
      return;
    }

    const { canvasX, canvasY } = mapScreenCoordinatesToCanvas(
      this.canvas,
      event,
      this.viewportTransform,
    );

    this.dispatchEvent(
      createDropElementEvent({
        elementId,
        x: canvasX,
        y: canvasY,
      }),
    );
  }
}

customElements.define("droppable-canvas", DroppableCanvas);
