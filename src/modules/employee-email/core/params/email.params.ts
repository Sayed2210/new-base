import type Params from "@/base/Core/Params/params";
import { EmailType } from "../constants/emailType.enum";

/**
 * Parameters for creating/updating employee email
 */
export default class EmailParams implements Params {
    public email: string;
    public type: EmailType;
    public employeeId?: number;

    constructor(email: string, type: EmailType = EmailType.EMPLOYEE, employeeId?: number) {
        this.email = email;
        this.type = type;
        this.employeeId = employeeId;
    }

    toMap(): { [p: string]: any } {
        const map: { [key: string]: any } = {
            email: this.email,
            type: this.type,
        };

        if (this.employeeId !== undefined) {
            map["employee_id"] = this.employeeId;
        }

        return map;
    }
}
