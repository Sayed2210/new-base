import type Params from "@/base/core/Params/params";
import { EmailType } from "../enums/emil_type";

export default class EditMailParams implements Params {
  public MailId: number;
  public title: string;
  public type: EmailType = EmailType.EMPLOYEE;

  constructor(MailId: number, title: string, type: EmailType = EmailType.EMPLOYEE) {
    this.MailId = MailId;
    this.title = title;
    this.type = type;
  }

  toMap(): { [p: string]: any } {
    const data: { [p: string]: any } = {};
    data["id"] = this.MailId;
    data["email"] = this.title;
    data["type"] = this.type;
    return data;
  }
}
