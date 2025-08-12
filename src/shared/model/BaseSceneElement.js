import { v4 as uuidv4 } from "uuid";

export class BaseSceneElement {
  constructor(id = uuidv4()) {
    this.id = id;
  }

  draw(ctx) {}

  getId() {
    return this.id;
  }
}
