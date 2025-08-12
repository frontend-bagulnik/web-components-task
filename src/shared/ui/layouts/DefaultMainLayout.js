class DefaultMainLayout extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
            main {
                padding: 32px 40px;
                display: flex;
                flex-direction: column;
                gap: 16px;                
            }
        </style>
        
        <main>
            <slot></slot>
        </main>`;
  }
}

customElements.define("default-main-layout", DefaultMainLayout);
