import type Params from "@/base/core/Params/params";
import type { EmailType } from "../enums/emil_type";

export default class IndexMailParams implements Params {
  public word: string;
  public withPage: number = 1;
  public perPage: number = 10;
  public pageNumber: number = 10;
  public type?: EmailType

  constructor(
    word: string,
    pageNumber: number = 1,
    perPage: number = 10,
    withPage: number = 1,
    type?: EmailType
  ) {
    this.word = word;
    this.withPage = withPage;
    this.pageNumber = pageNumber;
    this.perPage = perPage;
    this.type = type;
  }

  toMap(): { [p: string]: any } {
    const data: { [p: string]: any } = {};
    data["word"] = this.word;
    data["with_pagination"] = this.withPage;
    data["page"] = this.pageNumber;
    data["per_page"] = this.perPage;
    if (this.type) {
      data["type"] = this.type;
    }
    return data;
  }
}
