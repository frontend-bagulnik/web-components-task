import { createPolygonSvgElement } from "@features/polygon/create";

export class BaseBufferContainer extends HTMLElement {
  constructor() {
    super();
    this.polygonContainer = null;
    this.placeholder = null;
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
    if (!this.polygonContainer) {
      return;
    }

    while (this.polygonContainer.firstChild) {
      this.polygonContainer.removeChild(this.polygonContainer.firstChild);
    }
  }

  onPolygonChanged() {
    if (!this.polygons) {
      return;
    }

    this.clearBuffer();
    const parsedPolygons = JSON.parse(this.polygons);

    if (!parsedPolygons) {
      return;
    }

    if (!parsedPolygons.length) {
      this.placeholder.setAttribute("visible", true);
      return;
    }

    parsedPolygons.forEach((polygon) => {
      const svgElement = createPolygonSvgElement(polygon);
      this.polygonContainer.appendChild(svgElement);
    });

    this.placeholder.setAttribute("visible", false);
  }
}
