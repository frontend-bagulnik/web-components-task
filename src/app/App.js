export class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return `
    <main>    </main>`;
  }
}

customElements.define("app-component", App);
