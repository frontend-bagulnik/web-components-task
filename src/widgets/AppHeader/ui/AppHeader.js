import { createDefaultHeaderEvent, headerEvents } from "../model/events";

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
    this.initListeners();
  }

  initListeners() {
    this.querySelector("#createButton")?.addEventListener(
      "click",
      this.onCreate.bind(this),
    );

    this.querySelector("#saveButton")?.addEventListener(
      "click",
      this.onSave.bind(this),
    );

    this.querySelector("#clearButton")?.addEventListener(
      "click",
      this.onClear.bind(this),
    );
  }

  onCreate() {
    this.dispatchEvent(createDefaultHeaderEvent(headerEvents.CREATE_CLICK));
  }

  onClear() {
    this.dispatchEvent(createDefaultHeaderEvent(headerEvents.CLEAR_CLICK));
  }

  onSave() {
    this.dispatchEvent(createDefaultHeaderEvent(headerEvents.SAVE_CLICK));
  }

  render() {
    return `
        <app-header-layout>
            <default-button id="createButton">Создать</default-button>
            <div slot="right-element">
                <default-button id="saveButton">Сохранить</default-button>
                <default-button id="clearButton">Сбросить</default-button>
            </div>
        </app-header-layout>        
    `;
  }
}

customElements.define("app-header", AppHeader);
