import { headerEvents } from "@widgets/AppHeader/model/events";
import { Grid } from "@entities/grid/model/Grid";
import {
  createRandomSvgPolygonData,
  createSvgPolygonData,
} from "@features/polygon/create";
import { onPolygonDropped } from "@features/canvas/dropPolygon";
import { useBufferPolygons } from "./lib/hooks/useBufferPolygons";
import { canvasDomEvents } from "@entities/canvas/model/domEvents";
import { subscribe } from "@shared/lib/eventBus";
import { canvasEvents } from "@shared/model/canvasEvents";
import { bufferContainerEvents } from "@widgets/BufferContainer/model/events";
import {
  getSceneElementById,
  removeSceneElement,
  getSceneElements,
  addSceneElement,
} from "@entities/scene/lib/scene";
import { publishEvent } from "@shared/lib/eventBus";
import { useAppStorage } from "./lib/hooks/useAppStorage";
import { loadSceneComponents } from "./lib/sceneLoader";
import { componentTypes } from "../shared/model/componentTypes";

const {
  getBufferPolygons,
  setBufferPolygons,
  addPolygonToBuffer,
  removePolygonFromBuffer,
} = useBufferPolygons();

const { loadAppData, saveAppData, clearAppData } = useAppStorage();

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
    const { bufferPolygons, scenePolygons } = loadAppData();

    if (bufferPolygons) {
      setBufferPolygons(bufferPolygons);
      this.updateBuffer();
    }

    if (scenePolygons) {
      loadSceneComponents(scenePolygons);
    }
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

    this.addEventListener(headerEvents.SAVE_CLICK, () =>
      saveAppData(
        getBufferPolygons(),
        getSceneElements().filter((el) => el.getType() !== componentTypes.GRID),
      ),
    );

    this.addEventListener(headerEvents.CLEAR_CLICK, clearAppData);

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
