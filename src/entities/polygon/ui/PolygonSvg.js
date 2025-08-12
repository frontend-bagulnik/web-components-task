import { polygonOptions } from "../model/constants";

class PolygonSvg extends HTMLElement {
  get height() {
    return this.getAttribute("height");
  }

  set height(newHeight) {
    this.setAttribute("height", newHeight);
  }

  get width() {
    return this.getAttribute("width");
  }

  set width(newWidth) {
    this.setAttribute("width", newWidth);
  }

  get points() {
    return this.getAttribute("points");
  }

  set points(newPoints) {
    this.setAttribute("points", newPoints);
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    const { color, borderColor, borderWidth } = polygonOptions;

    return `
     <div draggable="true"> 
        <svg height="${this.height}" width="${this.width}"  xmlns="http://www.w3.org/2000/svg">
            <polygon points="${this.points}" style="fill:${color};stroke:${borderColor};stroke-width:${borderWidth}"></polygon>
        </svg>
    </div>
    `;
  }
}

customElements.define("polygon-svg", PolygonSvg);
