import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EmailRepository from './email.repository';
import EmailModel from '../../core/models/email.model';
import { EmailType } from '../../core/constants/emailType.enum';
import EmailTestFactory from '../../__tests__/email.test-factory';
import { DataSuccess, DataFailed, DataEmpty } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';

describe('EmailRepository', () => {
    let repository: EmailRepository;
    let mockApiService: any;

    beforeEach(() => {
        repository = EmailRepository.getInstance();

        // Create a mock API service
        mockApiService = {
            index: vi.fn(),
            show: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            executeEmailAction: vi.fn(),
        };

        // Spy on the apiService getter to return our mock
        vi.spyOn(repository as any, 'apiService', 'get').mockReturnValue(mockApiService);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('singleton pattern', () => {
        it('should return the same instance', () => {
            const instance1 = EmailRepository.getInstance();
            const instance2 = EmailRepository.getInstance();

            expect(instance1).toBe(instance2);
        });
    });

    describe('index - fetch list', () => {
        it('should return DataSuccess with parsed email list', async () => {
            const mockEmails = EmailTestFactory.createMockEmailJsonList(3);
            const mockResponse = EmailTestFactory.createEmailListApiResponse(mockEmails);
            mockApiService.index.mockResolvedValue(mockResponse);

            const result = await repository.index();

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(Array.isArray(result.data)).toBe(true);
                expect(result.data).toHaveLength(3);
                expect(result.data[0]).toBeInstanceOf(EmailModel);
                expect(result.data[0].email).toBe(mockEmails[0].email);
            }
        });

        it('should return DataEmpty when response contains no data', async () => {
            const mockResponse = {
                data: { data: null, status: true, message: 'No emails found' },
                statusCode: 200
            };
            mockApiService.index.mockResolvedValue(mockResponse);

            const result = await repository.index();

            expect(result).toBeInstanceOf(DataEmpty);
        });

        it('should return DataFailed on API error', async () => {
            const errorResponse = EmailTestFactory.errorApiResponse('Failed to fetch emails', 500);
            mockApiService.index.mockResolvedValue(errorResponse);

            const result = await repository.index();

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should call apiService.index with correct parameters', async () => {
            const mockParams = { page: 1 };
            const mockOptions = { auth: true };
            const mockResponse = EmailTestFactory.createEmailListApiResponse([]);
            mockApiService.index.mockResolvedValue(mockResponse);

            await repository.index(mockParams as any, mockOptions);

            expect(mockApiService.index).toHaveBeenCalledWith(mockParams, mockOptions);
        });
    });

    describe('show - fetch single item', () => {
        it('should return DataSuccess with parsed email', async () => {
            const mockEmail = EmailTestFactory.createMockEmailJson({ id: 10 });
            const mockResponse = EmailTestFactory.createEmailApiResponse(mockEmail);
            mockApiService.show.mockResolvedValue(mockResponse);

            const result = await repository.show(10);

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toBeInstanceOf(EmailModel);
                expect(result.data.id).toBe(10);
                expect(result.data.email).toBe(mockEmail.email);
            }
        });

        it('should return DataFailed when item not found', async () => {
            const errorResponse = EmailTestFactory.errorApiResponse('Email not found', 404);
            mockApiService.show.mockResolvedValue(errorResponse);

            const result = await repository.show(999);

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should call apiService.show with correct ID', async () => {
            const mockResponse = EmailTestFactory.createEmailApiResponse();
            mockApiService.show.mockResolvedValue(mockResponse);

            await repository.show(42);

            expect(mockApiService.show).toHaveBeenCalledWith(42, undefined);
        });
    });

    describe('create - create new item', () => {
        it('should return DataSuccess with created email', async () => {
            const mockEmail = EmailTestFactory.createMockEmailJson({
                email: 'newuser@example.com',
                type: EmailType.WORK
            });
            const mockResponse = EmailTestFactory.createEmailApiResponse(mockEmail);
            mockApiService.create.mockResolvedValue(mockResponse);

            const params = { email: 'newuser@example.com', type: EmailType.WORK };
            const result = await repository.create(params as any);

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toBeInstanceOf(EmailModel);
                expect(result.data.email).toBe('newuser@example.com');
                expect(result.data.type).toBe(EmailType.WORK);
            }
        });

        it('should return DataFailed on validation error', async () => {
            const errorResponse = EmailTestFactory.errorApiResponse('Invalid email format', 422);
            mockApiService.create.mockResolvedValue(errorResponse);

            const params = { email: 'invalid-email' };
            const result = await repository.create(params as any);

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should call apiService.create with correct params', async () => {
            const mockResponse = EmailTestFactory.createEmailApiResponse();
            mockApiService.create.mockResolvedValue(mockResponse);

            const params = { email: 'test@example.com' };
            await repository.create(params as any);

            expect(mockApiService.create).toHaveBeenCalledWith(params, undefined);
        });
    });

    describe('update - update existing item', () => {
        it('should return DataSuccess with updated email', async () => {
            const mockEmail = EmailTestFactory.createMockEmailJson({
                id: 5,
                email: 'updated@example.com',
                type: EmailType.PERSONAL
            });
            const mockResponse = EmailTestFactory.createEmailApiResponse(mockEmail);
            mockApiService.update.mockResolvedValue(mockResponse);

            const params = { email: 'updated@example.com', type: EmailType.PERSONAL };
            const result = await repository.update(5, params as any);

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toBeInstanceOf(EmailModel);
                expect(result.data.email).toBe('updated@example.com');
                expect(result.data.type).toBe(EmailType.PERSONAL);
            }
        });

        it('should call apiService.update with correct ID and params', async () => {
            const mockResponse = EmailTestFactory.createEmailApiResponse();
            mockApiService.update.mockResolvedValue(mockResponse);

            const params = { email: 'update@example.com' };
            await repository.update(15, params as any);

            expect(mockApiService.update).toHaveBeenCalledWith(15, params, undefined);
        });
    });

    describe('delete - delete item', () => {
        it('should return DataSuccess void on successful delete', async () => {
            const mockResponse = {
                data: { status: true, message: 'Email deleted successfully' },
                statusCode: 200
            };
            mockApiService.delete.mockResolvedValue(mockResponse);

            const result = await repository.delete(20);

            expect(result).toBeInstanceOf(DataSuccess);
        });

        it('should return DataFailed when delete fails', async () => {
            const errorResponse = EmailTestFactory.errorApiResponse('Cannot delete email', 403);
            mockApiService.delete.mockResolvedValue(errorResponse);

            const result = await repository.delete(25);

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should call apiService.delete with correct ID', async () => {
            const mockResponse = { data: { status: true }, statusCode: 200 };
            mockApiService.delete.mockResolvedValue(mockResponse);

            await repository.delete(30);

            expect(mockApiService.delete).toHaveBeenCalledWith(30, undefined);
        });
    });

    describe('executeEmailAction - custom method', () => {
        it('should return DataSuccess with email data', async () => {
            const mockEmail = EmailTestFactory.createMockEmailJson({ email: 'action@example.com' });
            const mockResponse = EmailTestFactory.createEmailApiResponse(mockEmail);
            mockApiService.executeEmailAction.mockResolvedValue(mockResponse);

            const params = { action: 'verify' };
            const result = await repository.executeEmailAction(params as any);

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toBeInstanceOf(EmailModel);
                expect(result.data.email).toBe('action@example.com');
            }
        });

        it('should call apiService.executeEmailAction with params', async () => {
            const mockResponse = EmailTestFactory.createEmailApiResponse();
            mockApiService.executeEmailAction.mockResolvedValue(mockResponse);

            const params = { action: 'test' };
            await repository.executeEmailAction(params as any);

            expect(mockApiService.executeEmailAction).toHaveBeenCalledWith(params);
        });
    });

    describe('parseItem', () => {
        it('should correctly parse email JSON to EmailModel', () => {
            const json = {
                id: 100,
                email: 'parse@example.com',
                type: EmailType.WORK,
                employee_id: 50,
                created_at: '2024-01-15T00:00:00Z',
                updated_at: '2024-01-16T00:00:00Z',
            };

            const parsed = (repository as any).parseItem(json);

            expect(parsed).toBeInstanceOf(EmailModel);
            expect(parsed.id).toBe(100);
            expect(parsed.email).toBe('parse@example.com');
            expect(parsed.type).toBe(EmailType.WORK);
            expect(parsed.employeeId).toBe(50);
        });
    });

    describe('parseList', () => {
        it('should correctly parse array of email JSON to EmailModel array', () => {
            const jsonList = [
                { id: 1, email: 'list1@example.com', type: EmailType.EMPLOYEE, employee_id: 10 },
                { id: 2, email: 'list2@example.com', type: EmailType.PERSONAL, employee_id: 20 },
            ];

            const parsed = (repository as any).parseList(jsonList);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed).toHaveLength(2);
            expect(parsed[0]).toBeInstanceOf(EmailModel);
            expect(parsed[0].email).toBe('list1@example.com');
            expect(parsed[1].email).toBe('list2@example.com');
        });

        it('should return empty array when data is not an array', () => {
            const parsed = (repository as any).parseList(null);

            expect(parsed).toEqual([]);
        });
    });
});
