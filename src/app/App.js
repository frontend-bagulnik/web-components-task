import { headerEvents } from "@widgets/AppHeader/model/events";
import { addSceneElement } from "@entities/scene/lib/scene";
import { Grid } from "@entities/grid/model/Grid";
import { createRandomSvgPolygonData } from "../features/polygon/create";

export class App extends HTMLElement {
  constructor() {
    super();

    this.bufferPolygons = [];
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

  updateBuffer() {
    this.bufferContainer.setAttribute(
      "polygons",
      JSON.stringify(this.bufferPolygons),
    );
  }

  initListeners() {
    this.addEventListener(headerEvents.CREATE_CLICK, (e) => {
      this.bufferPolygons = createRandomSvgPolygonData();
      this.updateBuffer();
      console.log(headerEvents.CREATE_CLICK, this.bufferPolygons);
    });
    this.addEventListener(headerEvents.SAVE_CLICK, (e) => {
      console.log(headerEvents.SAVE_CLICK);
    });
    this.addEventListener(headerEvents.CLEAR_CLICK, (e) => {
      console.log(headerEvents.CLEAR_CLICK);
    });
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
