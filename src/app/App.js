export class App extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return `<main>123</main>`;
  }
}

customElements.define("app-component", App);
