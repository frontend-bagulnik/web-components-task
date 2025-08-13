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
    this.isExpectingElement = false;
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
    this.container = this.querySelector(".container");
    this.polygonContainer = this.querySelector(".polygonContainer");
    this.placeholder = this.querySelector("buffer-empty-placeholder");
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
                height: 150px;
                border: 3px solid transparent;
            }

            .dropZone {
                border: 3px solid var(--gray10);
            }
            
            .polygonContainer {
                display: grid;
                grid-template-columns: repeat(auto-fill, ${polygonOptions.svgPolygonWidth}px);
            }
        </style>
        
        <div class="container">
            <div class="polygonContainer"></div>
            <buffer-empty-placeholder visible="true"></buffer-empty-placeholder>
        </div>    
    `;
  }
}

customElements.define("buffer-container", BufferContainer);
