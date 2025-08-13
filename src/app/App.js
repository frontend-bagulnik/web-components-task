import { headerEvents } from "@widgets/AppHeader/model/events";
import { addSceneElement } from "@entities/scene/lib/scene";
import { Grid } from "@entities/grid/model/Grid";
import { createRandomSvgPolygonData } from "../features/polygon/create";
import { onPolygonDropped } from "../features/canvas/dropPolygon";
import { useBufferPolygons } from "./lib/hooks";
import { canvasDomEvents } from "../entities/canvas/model/domEvents";

const { getBufferPolygons, setBufferPolygons, removePolygonFromBuffer } =
  useBufferPolygons();

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
