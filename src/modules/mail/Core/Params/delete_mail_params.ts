import type Params from "@/base/core/Params/params";

export default class DeleteMailParams implements Params {
  public MailId: number;

  constructor(MailId: number) {
    this.MailId = MailId;
  }

  toMap(): { [p: string]: any } {
    const data: { [p: string]: any } = {};
    data["id"] = this.MailId;
    return data;
  }
}
