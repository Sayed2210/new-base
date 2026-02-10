import type Params from "@/base/Core/Params/params";

/**
 * Parameters for creating/updating employee email
 */
export default class DeleteParams implements Params {
  public employeeId?: number;

  constructor(employeeId?: number) {
    this.employeeId = employeeId;
  }

  toMap(): { [p: string]: any } {
    const map: { [key: string]: any } = {};

    if (this.employeeId !== undefined) {
      map["id"] = this.employeeId;
    }

    return map;
  }
}
