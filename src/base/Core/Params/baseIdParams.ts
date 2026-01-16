import type Params from "./params";

export default class BaseIdParams implements Params {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  toMap(): { [key: string]: any } {
    const map: { [key: string]: any } = {};
    map["id"] = this.id;
    return map;
  }
}
