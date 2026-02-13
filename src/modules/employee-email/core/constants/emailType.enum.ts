/**
 * Email type enumeration
 */
export const EmailType = {
    EMPLOYEE: "employee",
    PERSONAL: "personal",
    WORK: "work",
    OTHER: "other",
} as const;

export type EmailType = typeof EmailType[keyof typeof EmailType];

/**
 * Get display name for email type
 */
export function getEmailTypeName(type: EmailType): string {
    switch (type) {
        case EmailType.EMPLOYEE:
            return "Employee Email";
        case EmailType.PERSONAL:
            return "Personal Email";
        case EmailType.WORK:
            return "Work Email";
        case EmailType.OTHER:
            return "Other";
        default:
            return "Unknown";
    }
}
