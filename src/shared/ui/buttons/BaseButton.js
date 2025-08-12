export class BaseButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
  }

  get className() {
    return this.getAttribute("className");
  }

  set className(newClassName) {
    return this.setAttribute("className", newClassName);
  }

  render() {
    return `
        <button class="${this.className}">
            <slot></slot>
        </button>`;
  }
}

customElements.define("base-button", BaseButton);
