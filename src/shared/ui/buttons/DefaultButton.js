import { BaseButton } from "./BaseButton";

class DefaultButton extends BaseButton {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
        .button {
          background-color: var(--accent10);
          border: none;
          font-weight: 600;
          font-family: inherit;
          color: var(--white);
          border-radius: 16px;
          padding: 12px 24px;
          font-size: 16px;
          line-height: 120%;
        
          &:hover {
            cursor: pointer;
            transition: all ease 0.3s;
            background-color: var(--accent20);
          }
        }
        
        </style>
        
        <base-button className="button"/>
    `;
  }
}

customElements.define("default-button", DefaultButton);
