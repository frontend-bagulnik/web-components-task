import { headerEvents } from "@widgets/AppHeader/model/events";
import { addSceneElement } from "@entities/scene/lib/scene";
import { Grid } from "@entities/grid/model/Grid";
import {
  createRandomSvgPolygonData,
  createSvgPolygonData,
} from "@features/polygon/create";
import { onPolygonDropped } from "@features/canvas/dropPolygon";
import { useBufferPolygons } from "./lib/hooks";
import { canvasDomEvents } from "@entities/canvas/model/domEvents";
import { subscribe } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { bufferContainerEvents } from "@widgets/BufferContainer/model/events";
import { getSceneElementById } from "@entities/scene/lib/scene";
import { removeSceneElement } from "@entities/scene/lib/scene";
import { publishEvent } from "@shared/lib/eventBus";

const {
  getBufferPolygons,
  setBufferPolygons,
  addPolygonToBuffer,
  removePolygonFromBuffer,
} = useBufferPolygons();

export class App extends HTMLElement {
  constructor() {
    super();

    this.bufferContainer = null;
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.initListeners();
    this.bufferContainer = this.querySelector("buffer-container");

    const grid = new Grid({
      offset: 50,
    });

    addSceneElement(grid);
  }

  onPolygonDroppedOnCanvas({ detail }) {
    onPolygonDropped(detail, getBufferPolygons());
    removePolygonFromBuffer(detail.elementId);
    this.updateBuffer();
  }

  onPolygonOutOfCanvas({ id }) {
    this.style.cursor = "grab";
    this.bufferContainer.setIsExpectingElement(id);
  }

  onPolygonDroppedToBufferContainer() {
    const element = getSceneElementById(this.bufferContainer.expectedElementId);

    if (!element) {
      console.error("can't find dropped element from canvas to buffer");
      return;
    }

    addPolygonToBuffer(createSvgPolygonData(element));

    this.updateBuffer();
    removeSceneElement(this.bufferContainer.expectedElementId);
    publishEvent(canvasEvents.RENDER_SCENE);
  }

  onMouseUp() {
    if (!this.bufferContainer.isExpectingElement) {
      return;
    }

    this.bufferContainer.cancelExpectingElement();
    this.style.cursor = "default";
  }

  updateBuffer() {
    this.bufferContainer.setAttribute(
      "polygons",
      JSON.stringify(getBufferPolygons()),
    );
  }

  initListeners() {
    this.addEventListener(headerEvents.CREATE_CLICK, (e) => {
      setBufferPolygons(createRandomSvgPolygonData());
      this.updateBuffer();
    });
    this.addEventListener(headerEvents.SAVE_CLICK, (e) => {
      console.log(headerEvents.SAVE_CLICK);
    });
    this.addEventListener(headerEvents.CLEAR_CLICK, (e) => {
      console.log(headerEvents.CLEAR_CLICK);
    });
    this.addEventListener(
      canvasDomEvents.DROP_ELEMENT,
      this.onPolygonDroppedOnCanvas.bind(this),
    );

    this.addEventListener(
      bufferContainerEvents.ELEMENT_DROPPED,
      this.onPolygonDroppedToBufferContainer.bind(this),
    );

    this.addEventListener("mouseup", this.onMouseUp.bind(this));

    subscribe(
      canvasEvents.MOVED_ELEMENT_OUTSIDE,
      this.onPolygonOutOfCanvas.bind(this),
    );
  }

  render() {
    return `
      <app-header></app-header>
      <default-main-layout>
          <buffer-container></buffer-container>    
          <droppable-canvas></droppable-canvas>    
      </default-main-layout>
    `;
  }
}

customElements.define("app-component", App);
