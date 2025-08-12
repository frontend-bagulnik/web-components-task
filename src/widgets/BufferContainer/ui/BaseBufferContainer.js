import { createPolygonSvgElement } from "@features/polygon/create";

export class BaseBufferContainer extends HTMLElement {
  constructor() {
    super();
    this.container = null;
  }

  get polygons() {
    return this.getAttribute("polygons");
  }

  set polygons(polygons) {
    this.setAttribute("polygons", polygons);
    this.onPolygonChanged();
  }

  static get observedAttributes() {
    return ["polygons"];
  }

  attributeChangedCallback(prop, prev, next) {
    if (prev === next) {
      return;
    }

    this[prop] = next;
  }

  clearBuffer() {
    if (!this.container) {
      return;
    }

    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  onPolygonChanged() {
    if (!this.polygons) {
      return;
    }

    this.clearBuffer();
    const parsedPolygons = JSON.parse(this.polygons);

    if (!parsedPolygons) {
      console.error("can't parse provided polygon data");
    }

    parsedPolygons.forEach((polygon) => {
      const svgElement = createPolygonSvgElement(polygon);
      this.container.appendChild(svgElement);
    });
  }
}
