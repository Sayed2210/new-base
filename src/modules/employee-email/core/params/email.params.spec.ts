import { describe, it, expect } from 'vitest';
import EmailParams from './email.params';
import { EmailType } from '../constants/emailType.enum';

describe('EmailParams', () => {
    describe('constructor', () => {
        it('should create valid params', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK, 10);

            expect(params.email).toBe('test@example.com');
            expect(params.type).toBe(EmailType.WORK);
            expect(params.employeeId).toBe(10);
        });

        it('should normalize email to lowercase', () => {
            const params = new EmailParams('Test@Example.COM');

            expect(params.email).toBe('test@example.com');
        });

        it('should use default type when not provided', () => {
            const params = new EmailParams('test@example.com');

            expect(params.type).toBe(EmailType.EMPLOYEE);
        });

        it('should create params without employeeId', () => {
            const params = new EmailParams('test@example.com', EmailType.PERSONAL);

            expect(params.email).toBe('test@example.com');
            expect(params.type).toBe(EmailType.PERSONAL);
            expect(params.employeeId).toBeUndefined();
        });

        it('should throw error for invalid email', () => {
            expect(() => new EmailParams('invalid-email')).toThrow('Invalid email format');
        });

        it('should throw error for empty email', () => {
            expect(() => new EmailParams('')).toThrow('Invalid email format');
        });

        it('should throw error for null email', () => {
            expect(() => new EmailParams(null as any)).toThrow();
        });

        it('should throw error for undefined email', () => {
            expect(() => new EmailParams(undefined as any)).toThrow();
        });
    });

    describe('validate', () => {
        it('should pass validation for valid params', () => {
            const params = new EmailParams('valid@example.com', EmailType.WORK, 5);

            expect(() => params.validate()).not.toThrow();
        });

        it('should throw error for invalid email type', () => {
            const params = new EmailParams('test@example.com');
            params.type = 'invalid-type' as any;

            expect(() => params.validate()).toThrow('Invalid email type');
        });

        it('should throw error for negative employeeId', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK, -1);

            expect(() => params.validate()).toThrow('Employee ID must be a positive number');
        });

        it('should throw error for zero employeeId', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK, 0);

            expect(() => params.validate()).toThrow('Employee ID must be a positive number');
        });

        it('should throw error for non-number employeeId', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK);
            params.employeeId = 'not a number' as any;

            expect(() => params.validate()).toThrow('Employee ID must be a positive number');
        });

        it('should pass validation when employeeId is undefined', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK);

            expect(() => params.validate()).not.toThrow();
        });
    });

    describe('toMap', () => {
        it('should convert to map with all fields', () => {
            const params = new EmailParams('map@example.com', EmailType.PERSONAL, 20);
            const map = params.toMap();

            expect(map).toEqual({
                email: 'map@example.com',
                type: EmailType.PERSONAL,
                employee_id: 20,
            });
        });

        it('should convert to map without employeeId', () => {
            const params = new EmailParams('map@example.com', EmailType.WORK);
            const map = params.toMap();

            expect(map).toEqual({
                email: 'map@example.com',
                type: EmailType.WORK,
            });
            expect(map.employee_id).toBeUndefined();
        });

        it('should use snake_case for employee_id', () => {
            const params = new EmailParams('snake@example.com', EmailType.WORK, 15);
            const map = params.toMap();

            expect(map.employee_id).toBe(15);
            expect(map['employeeId']).toBeUndefined();
        });

        it('should not include employeeId when null', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK);
            params.employeeId = null as any;
            const map = params.toMap();

            expect(map.employee_id).toBeUndefined();
            expect('employee_id' in map).toBe(false);
        });
    });

    describe('fromObject', () => {
        it('should create params from object with all fields', () => {
            const params = EmailParams.fromObject({
                email: 'object@example.com',
                type: EmailType.OTHER,
                employeeId: 30,
            });

            expect(params.email).toBe('object@example.com');
            expect(params.type).toBe(EmailType.OTHER);
            expect(params.employeeId).toBe(30);
        });

        it('should create params from object with minimal fields', () => {
            const params = EmailParams.fromObject({
                email: 'minimal@example.com',
            });

            expect(params.email).toBe('minimal@example.com');
            expect(params.type).toBe(EmailType.EMPLOYEE);
            expect(params.employeeId).toBeUndefined();
        });

        it('should validate email in factory method', () => {
            expect(() => EmailParams.fromObject({
                email: 'invalid',
            })).toThrow('Invalid email format');
        });
    });

    describe('edge cases', () => {
        it('should handle email with special characters', () => {
            const params = new EmailParams('test+tag@sub.example.com', EmailType.WORK);

            expect(params.email).toBe('test+tag@sub.example.com');
        });

        it('should handle all email types', () => {
            const types = [
                EmailType.EMPLOYEE,
                EmailType.PERSONAL,
                EmailType.WORK,
                EmailType.OTHER,
            ];

            types.forEach(type => {
                const params = new EmailParams('test@example.com', type);
                expect(params.type).toBe(type);
                expect(() => params.validate()).not.toThrow();
            });
        });

        it('should trim whitespace from email', () => {
            const params = new EmailParams('  spaced@example.com  ');

            expect(params.email).toBe('spaced@example.com');
        });

        it('should handle large employee IDs', () => {
            const params = new EmailParams('test@example.com', EmailType.WORK, 999999999);

            expect(params.employeeId).toBe(999999999);
            expect(() => params.validate()).not.toThrow();
        });
    });

    describe('immutability after validation', () => {
        it('should maintain email after validation', () => {
            const params = new EmailParams('immutable@example.com', EmailType.WORK, 5);
            const originalEmail = params.email;

            params.validate();

            expect(params.email).toBe(originalEmail);
        });

        it('should maintain type after validation', () => {
            const params = new EmailParams('immutable@example.com', EmailType.PERSONAL, 5);
            const originalType = params.type;

            params.validate();

            expect(params.type).toBe(originalType);
        });
    });
});
