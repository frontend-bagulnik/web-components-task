import { headerEvents } from "@widgets/AppHeader/model/events";
import { addSceneElement } from "@entities/scene/lib/scene";
import { Grid } from "@entities/grid/model/Grid";

export class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.addEventListener(headerEvents.CREATE_CLICK, (e) => {
      console.log(headerEvents.CREATE_CLICK);
    });
    this.addEventListener(headerEvents.SAVE_CLICK, (e) => {
      console.log(headerEvents.SAVE_CLICK);
    });
    this.addEventListener(headerEvents.CLEAR_CLICK, (e) => {
      console.log(headerEvents.CLEAR_CLICK);
    });

    const grid = new Grid({
      offset: 50,
    });

    addSceneElement(grid);
  }

  render() {
    return `
      <app-header></app-header>
      <default-main-layout>
          <buffer-container></buffer-container>    
          <controlled-canvas></controlled-canvas>    
      </default-main-layout>
    `;
  }
}

customElements.define("app-component", App);
