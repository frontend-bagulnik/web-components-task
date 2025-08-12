import { polygonOptions } from "@entities/polygon/model/constants";
import { BaseBufferContainer } from "./BaseBufferContainer";

class BufferContainer extends BaseBufferContainer {
  connectedCallback() {
    this.innerHTML = this.render();
    this.container = this.querySelector("div");
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
