import { EmailType } from "../../Core/enums/emil_type";
import TitleInterface from "@/base/Data/Models/title_interface";

export default class MailModel extends TitleInterface {

  public type: TitleInterface;
  constructor(
    id: number = 0,
    title: string = "",
    type: TitleInterface
  ) {
    super({
      id: id,
      title: title,
    });
    this.type = type;
  }

  static fromMap(data: any): MailModel {
    return new MailModel(
      data["id"] ?? 0,
      data["email"] ?? "",
      this.getType(data["type"]) ?? EmailType.CLIENT
    );
  }

  static getType(type: EmailType): TitleInterface {
    switch (type) {
      case EmailType.CLIENT:
        return new TitleInterface({
          id: EmailType.CLIENT,
          title: "Client Mail",
        });

      case EmailType.EMPLOYEE:
        return new TitleInterface({
          id: EmailType.EMPLOYEE,
          title: "Orbit Mail",
        });
      default:
        return new TitleInterface({
          id: EmailType.CLIENT,
          title: "Client Mail",
        });
    }
  }
}
