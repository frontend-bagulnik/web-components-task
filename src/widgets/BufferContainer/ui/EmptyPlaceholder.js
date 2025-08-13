class EmptyPlaceholder extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
    this.container = this.querySelector(".placeholderContainer");
    this.setVisibility(this.getAttribute("visible") === "true");
  }

  static get observedAttributes() {
    return ["visible"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "visible" && this.container) {
      this.setVisibility(newValue === "true");
    }
  }

  setVisibility(isVisible) {
    isVisible
      ? this.container.classList.remove("hidden")
      : this.container.classList.add("hidden");
  }

  render() {
    return `
        <style>
            .placeholderContainer {
                display: flex;
                min-height: 150px;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 4px;
             }
             
             .hidden {
                display: none;
             }
     
             .placeholderText {
                color: var(--gray20)
             }
        </style>
        <div class="placeholderContainer hidden">
            <span class="placeholderText">Буферный контейнер пуст</span>
            <span class="placeholderText">Создайте или перенесите полигоны из рабочей зоны</span>
        </div>`;
  }
}

customElements.define("buffer-empty-placeholder", EmptyPlaceholder);
