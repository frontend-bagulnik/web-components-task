import { headerEvents } from "@widgets/AppHeader/model/events";

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
