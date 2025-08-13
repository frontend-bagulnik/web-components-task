import { polygonOptions } from "@entities/polygon/model/constants";
import { BaseBufferContainer } from "./BaseBufferContainer";
import { createElementDroppedEvent } from "../model/events";

class BufferContainer extends BaseBufferContainer {
  constructor() {
    super();
    this.container = null;
    this.isExpectingElement = false;
    this.expectedElementId = null;
  }

  setIsExpectingElement(id) {
    this.expectedElementId = id;
    this.isExpectingElement = true;
  }

  cancelExpectingElement() {
    this.expectedElementId = null;
    this.isExpectingElement = true;
  }

  onPolygonDropped() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.remove("dropZone");
    this.dispatchEvent(createElementDroppedEvent());
  }

  onPolygonOutBuffer() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.remove("dropZone");
  }

  onPolygonOverBuffer() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.add("dropZone");
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.container = this.querySelector("div");
    this.initListeners();
  }

  initListeners() {
    this.addEventListener("mouseup", this.onPolygonDropped.bind(this));
    this.addEventListener("mouseover", this.onPolygonOverBuffer.bind(this));
    this.addEventListener("mouseout", this.onPolygonOutBuffer.bind(this));
  }

  render() {
    return `
        <style>
            .container {
                background-color: var(--white);
                border-radius: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fill, ${polygonOptions.svgPolygonWidth}px);
                min-height: 150px;
                border: 3px solid transparent;
            }

            .dropZone {
                border: 3px solid var(--gray10);
            }
        </style>
        
        <div class="container"></div>    
    `;
  }
}

customElements.define("buffer-container", BufferContainer);
