import { EmailType } from "../constants/emailType.enum";

/**
 * Email model representing employee email data
 */
export default class EmailModel {
    public id?: number;
    public email: string;
    public type: EmailType;
    public employeeId?: number;
    public createdAt?: string;
    public updatedAt?: string;

    constructor(data: {
        id?: number;
        email: string;
        type?: EmailType;
        employeeId?: number;
        createdAt?: string;
        updatedAt?: string;
    }) {
        this.id = data.id;
        this.email = data.email;
        this.type = data.type || EmailType.EMPLOYEE;
        this.employeeId = data.employeeId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    /**
     * Create EmailModel from API response
     */
    static fromJson(json: any): EmailModel {
        return new EmailModel({
            id: json.id,
            email: json.email,
            type: json.type || EmailType.EMPLOYEE,
            employeeId: json.employee_id,
            createdAt: json.created_at,
            updatedAt: json.updated_at,
        });
    }

    /**
     * Convert to JSON for API requests
     */
    toJson(): any {
        return {
            id: this.id,
            email: this.email,
            type: this.type,
            employee_id: this.employeeId,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }
}
