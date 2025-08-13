import { v4 as uuidv4 } from "uuid";

export class BaseSceneElement {
  constructor(type, id = uuidv4()) {
    this.id = id;
    this.type = type;
  }

  draw(ctx) {}

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }
}
