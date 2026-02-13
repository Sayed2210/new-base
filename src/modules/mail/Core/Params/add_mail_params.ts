import type Params from "@/base/core/Params/params";
import { EmailType } from "../enums/emil_type";


export default class AddMailParams implements Params {
  public email: string;
  public type: EmailType = EmailType.EMPLOYEE

  constructor(email: string, type: EmailType = EmailType.EMPLOYEE) {
    this.email = email;
    this.type = type;
  }

  toMap(): { [p: string]: any } {
    return {
      email: this.email,
      type: this.type,
    };
  }
}
