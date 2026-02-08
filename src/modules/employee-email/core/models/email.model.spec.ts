import { describe, it, expect } from 'vitest';
import EmailModel from './email.model';
import { EmailType } from '../constants/emailType.enum';

describe('EmailModel', () => {
    describe('constructor', () => {
        it('should create an instance with all properties', () => {
            const data = {
                id: 1,
                email: 'test@example.com',
                type: EmailType.WORK,
                employeeId: 10,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-02T00:00:00Z',
            };

            const model = new EmailModel(data);

            expect(model.id).toBe(1);
            expect(model.email).toBe('test@example.com');
            expect(model.type).toBe(EmailType.WORK);
            expect(model.employeeId).toBe(10);
            expect(model.createdAt).toBe('2024-01-01T00:00:00Z');
            expect(model.updatedAt).toBe('2024-01-02T00:00:00Z');
        });

        it('should create an instance with minimal properties and defaults', () => {
            const data = {
                email: 'minimal@example.com',
            };

            const model = new EmailModel(data);

            expect(model.email).toBe('minimal@example.com');
            expect(model.type).toBe(EmailType.EMPLOYEE);
            expect(model.id).toBeUndefined();
            expect(model.employeeId).toBeUndefined();
            expect(model.createdAt).toBeUndefined();
            expect(model.updatedAt).toBeUndefined();
        });

        it('should default type to EMPLOYEE when not provided', () => {
            const model = new EmailModel({ email: 'default@example.com' });
            expect(model.type).toBe(EmailType.EMPLOYEE);
        });

        it('should use provided type when specified', () => {
            const model = new EmailModel({
                email: 'personal@example.com',
                type: EmailType.PERSONAL
            });
            expect(model.type).toBe(EmailType.PERSONAL);
        });
    });

    describe('fromJson', () => {
        it('should parse API response with snake_case properties', () => {
            const json = {
                id: 5,
                email: 'api@example.com',
                type: EmailType.WORK,
                employee_id: 20,
                created_at: '2024-02-01T10:30:00Z',
                updated_at: '2024-02-02T11:45:00Z',
            };

            const model = EmailModel.fromJson(json);

            expect(model.id).toBe(5);
            expect(model.email).toBe('api@example.com');
            expect(model.type).toBe(EmailType.WORK);
            expect(model.employeeId).toBe(20);
            expect(model.createdAt).toBe('2024-02-01T10:30:00Z');
            expect(model.updatedAt).toBe('2024-02-02T11:45:00Z');
        });

        it('should default type to EMPLOYEE when not in response', () => {
            const json = {
                id: 10,
                email: 'noTypeProvided@example.com',
                employee_id: 30,
            };

            const model = EmailModel.fromJson(json);

            expect(model.type).toBe(EmailType.EMPLOYEE);
        });

        it('should handle minimal API response', () => {
            const json = {
                email: 'minimal@api.com',
            };

            const model = EmailModel.fromJson(json);

            expect(model.email).toBe('minimal@api.com');
            expect(model.type).toBe(EmailType.EMPLOYEE);
        });
    });

    describe('toJson', () => {
        it('should convert to JSON with snake_case properties', () => {
            const model = new EmailModel({
                id: 15,
                email: 'tojson@example.com',
                type: EmailType.PERSONAL,
                employeeId: 40,
                createdAt: '2024-03-01T00:00:00Z',
                updatedAt: '2024-03-02T00:00:00Z',
            });

            const json = model.toJson();

            expect(json).toEqual({
                id: 15,
                email: 'tojson@example.com',
                type: EmailType.PERSONAL,
                employee_id: 40,
                created_at: '2024-03-01T00:00:00Z',
                updated_at: '2024-03-02T00:00:00Z',
            });
        });

        it('should include undefined values in JSON output', () => {
            const model = new EmailModel({
                email: 'partialdata@example.com',
                type: EmailType.OTHER,
            });

            const json = model.toJson();

            expect(json.email).toBe('partialdata@example.com');
            expect(json.type).toBe(EmailType.OTHER);
            expect(json.id).toBeUndefined();
            expect(json.employee_id).toBeUndefined();
        });
    });

    describe('round-trip conversion', () => {
        it('should maintain data integrity through fromJson and toJson', () => {
            const originalJson = {
                id: 100,
                email: 'roundtrip@example.com',
                type: EmailType.WORK,
                employee_id: 50,
                created_at: '2024-04-01T12:00:00Z',
                updated_at: '2024-04-02T13:00:00Z',
            };

            const model = EmailModel.fromJson(originalJson);
            const resultJson = model.toJson();

            expect(resultJson).toEqual(originalJson);
        });
    });
});
