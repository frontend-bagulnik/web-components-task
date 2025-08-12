class BufferContainer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return `
        <style>
            .container {
                background-color: var(--white);
                border-radius: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fill, ${25}px);
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
