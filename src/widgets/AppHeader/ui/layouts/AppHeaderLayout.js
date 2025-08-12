class AppHeaderLayout extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
            nav {
                background-color: var(--white);
                padding: 14px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--gray10);
            }
        </style>
        <nav>
            <slot name="left-element"></slot>
            <slot></slot>
            <slot name="right-element"></slot>
        </nav>
    `;
  }
}

customElements.define("app-header-layout", AppHeaderLayout);
