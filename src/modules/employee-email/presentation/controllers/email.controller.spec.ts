import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EmailController from './email.controller';
// import EmailRepository from '../../data/repositories/email.repository';
import { EmailType } from '../../core/constants/emailType.enum';
import EmailTestFactory from '../../__tests__/email.test-factory';
import { DataSuccess, DataFailed } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import EmailParams from '../../core/params/email.params';

describe('EmailController', () => {
    let controller: EmailController;
    let mockRepository: any;

    beforeEach(() => {
        controller = EmailController.getInstance();

        // Create a mock repository
        mockRepository = {
            index: vi.fn(),
            show: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };

        // Spy on the repository getter to return our mock
        vi.spyOn(controller as any, 'repository', 'get').mockReturnValue(mockRepository);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('singleton pattern', () => {
        it('should return the same instance', () => {
            const instance1 = EmailController.getInstance();
            const instance2 = EmailController.getInstance();

            expect(instance1).toBe(instance2);
        });
    });

    describe('configuration', () => {
        it('should have correct controller configuration', () => {
            const config = (controller as any).config;

            expect(config.showLoadingDialog).toBe(false);
            expect(config.showSuccessDialog).toBe(true);
            expect(config.showErrorDialog).toBe(true);
            expect(config.autoRetry).toBe(false);
            expect(config.maxAutoRetries).toBe(2);
        });
    });

    describe('fetchList - fetch all emails', () => {
        it('should call repository.index and return result', async () => {
            const mockEmails = EmailTestFactory.createMockEmailList(3);
            const successState = EmailTestFactory.success(mockEmails);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchList();

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, undefined);
            expect(result).toBe(successState);
        });

        it('should pass params and options to repository', async () => {
            const mockParams = { filter: 'active' };
            const mockOptions = { details: { type: EmailType.WORK } };
            const successState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(successState);

            await controller.fetchList(mockParams as any, mockOptions);

            expect(mockRepository.index).toHaveBeenCalledWith(mockParams, mockOptions);
        });

        it('should handle DataFailed from repository', async () => {
            const failedState = EmailTestFactory.failed('Failed to fetch emails');
            mockRepository.index.mockResolvedValue(failedState);

            const result = await controller.fetchList();

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('fetchOne - fetch single email', () => {
        it('should call repository.show with correct ID', async () => {
            const mockEmail = EmailTestFactory.createMockEmail({ id: 10 });
            const successState = EmailTestFactory.success(mockEmail);
            mockRepository.show.mockResolvedValue(successState);

            const result = await controller.fetchOne(10, new EmailParams('sd', EmailType.EMPLOYEE, 999), { auth: true });

            expect(mockRepository.show).toHaveBeenCalledWith(10, new EmailParams('sd', EmailType.EMPLOYEE, 999), { auth: true });
            expect(result).toBe(successState);
        });

        it('should pass options to repository', async () => {
            const mockOptions = { auth: true };
            const successState = EmailTestFactory.success(EmailTestFactory.createMockEmail());
            mockRepository.show.mockResolvedValue(successState);

            await controller.fetchOne(20, new EmailParams('sd', EmailType.EMPLOYEE, 999), mockOptions);

            expect(mockRepository.show).toHaveBeenCalledWith(20, new EmailParams('sd', EmailType.EMPLOYEE, 999), mockOptions);
        });

        it('should handle DataFailed when item not found', async () => {
            const failedState = EmailTestFactory.failed('Email not found');
            mockRepository.show.mockResolvedValue(failedState);

            const result = await controller.fetchOne(999, new EmailParams('sd', EmailType.EMPLOYEE, 999), { auth: true });

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('create - create new email', () => {
        it('should call repository.create with params', async () => {
            const mockEmail = EmailTestFactory.createMockEmail({
                email: 'newuser@example.com',
                type: EmailType.WORK
            });
            const successState = EmailTestFactory.success(mockEmail);
            const params = { email: 'newuser@example.com', type: EmailType.WORK };
            mockRepository.create.mockResolvedValue(successState);

            const result = await controller.create(params as any);

            expect(mockRepository.create).toHaveBeenCalledWith(params, undefined);
            expect(result).toBe(successState);
        });

        it('should pass options to repository', async () => {
            const params = { email: 'test@example.com' };
            const mockOptions = { showLoadingDialog: true };
            const successState = EmailTestFactory.success(EmailTestFactory.createMockEmail());
            mockRepository.create.mockResolvedValue(successState);

            await controller.create(params as any, mockOptions);

            expect(mockRepository.create).toHaveBeenCalledWith(params, mockOptions);
        });

        it('should handle validation errors from repository', async () => {
            const failedState = EmailTestFactory.failed('Invalid email format');
            const params = { email: 'invalid-email' };
            mockRepository.create.mockResolvedValue(failedState);

            const result = await controller.create(params as any);

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('update - update existing email', () => {
        it('should call repository.update with ID and params', async () => {
            const mockEmail = EmailTestFactory.createMockEmail({
                id: 5,
                email: 'updated@example.com',
                type: EmailType.PERSONAL
            });
            const successState = EmailTestFactory.success(mockEmail);
            const params = { email: 'updated@example.com', type: EmailType.PERSONAL };
            mockRepository.update.mockResolvedValue(successState);

            const result = await controller.update(5, params as any);

            expect(mockRepository.update).toHaveBeenCalledWith(5, params, undefined);
            expect(result).toBe(successState);
        });

        it('should pass options to repository', async () => {
            const params = { email: 'update@example.com' };
            const mockOptions = { usePut: true };
            const successState = EmailTestFactory.success(EmailTestFactory.createMockEmail());
            mockRepository.update.mockResolvedValue(successState);

            await controller.update(15, params as any, mockOptions);

            expect(mockRepository.update).toHaveBeenCalledWith(15, params, mockOptions);
        });

        it('should handle update errors from repository', async () => {
            const failedState = EmailTestFactory.failed('Email not found');
            const params = { email: 'notfound@example.com' };
            mockRepository.update.mockResolvedValue(failedState);

            const result = await controller.update(999, params as any);

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('delete - delete email', () => {
        it('should call repository.delete with correct ID', async () => {
            const successState = new DataSuccess<void>({ message: 'Email deleted successfully' });
            mockRepository.delete.mockResolvedValue(successState);

            const result = await controller.delete(20);

            expect(mockRepository.delete).toHaveBeenCalledWith(20, undefined);
            expect(result).toBe(successState);
        });

        it('should pass options to repository', async () => {
            const mockOptions = { showLoadingDialog: true };
            const successState = new DataSuccess<void>({ message: 'Deleted' });
            mockRepository.delete.mockResolvedValue(successState);

            await controller.delete(30, new EmailParams('sd', EmailType.EMPLOYEE, 999), mockOptions);

            expect(mockRepository.delete).toHaveBeenCalledWith(30, mockOptions);
        });

        it('should handle delete errors from repository', async () => {
            const failedState = EmailTestFactory.failed('Cannot delete email');
            mockRepository.delete.mockResolvedValue(failedState);

            const result = await controller.delete(40);

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('fetchEmployeeEmails - custom method', () => {
        it('should call fetchList with employee_id in details', async () => {
            const mockEmails = EmailTestFactory.createMockEmailList(2);
            const successState = EmailTestFactory.success(mockEmails);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchEmployeeEmails(50);

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, {
                details: { employee_id: 50 }
            });
            expect(result).toBe(successState);
        });

        it('should handle errors when fetching employee emails', async () => {
            const failedState = EmailTestFactory.failed('Failed to fetch employee emails');
            mockRepository.index.mockResolvedValue(failedState);

            const result = await controller.fetchEmployeeEmails(100);

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should work with different employee IDs', async () => {
            const successState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(successState);

            await controller.fetchEmployeeEmails(1);
            expect(mockRepository.index).toHaveBeenLastCalledWith(undefined, {
                details: { employee_id: 1 }
            });

            await controller.fetchEmployeeEmails(999);
            expect(mockRepository.index).toHaveBeenLastCalledWith(undefined, {
                details: { employee_id: 999 }
            });
        });
    });

    describe('fetchEmailsByType - filter by type', () => {
        it('should call fetchList with type in details', async () => {
            const mockEmails = EmailTestFactory.createMockEmailList(2);
            const successState = EmailTestFactory.success(mockEmails);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchEmailsByType(EmailType.WORK);

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, {
                details: { type: EmailType.WORK }
            });
            expect(result).toBe(successState);
        });

        it('should work with all email types', async () => {
            const successState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(successState);

            const types = [EmailType.EMPLOYEE, EmailType.PERSONAL, EmailType.WORK, EmailType.OTHER];

            for (const type of types) {
                await controller.fetchEmailsByType(type);
                expect(mockRepository.index).toHaveBeenLastCalledWith(undefined, {
                    details: { type }
                });
            }
        });

        it('should handle errors when fetching by type', async () => {
            const failedState = EmailTestFactory.failed('Failed to fetch by type');
            mockRepository.index.mockResolvedValue(failedState);

            const result = await controller.fetchEmailsByType(EmailType.PERSONAL);

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('fetchEmployeeWorkEmails - employee work emails', () => {
        it('should fetch work emails for specific employee', async () => {
            const mockEmails = EmailTestFactory.createMockEmailList(1);
            const successState = EmailTestFactory.success(mockEmails);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchEmployeeWorkEmails(25);

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, {
                details: {
                    employee_id: 25,
                    type: EmailType.WORK
                }
            });
            expect(result).toBe(successState);
        });

        it('should handle errors fetching work emails', async () => {
            const failedState = EmailTestFactory.failed('No work emails found');
            mockRepository.index.mockResolvedValue(failedState);

            const result = await controller.fetchEmployeeWorkEmails(99);

            expect(result).toBeInstanceOf(DataFailed);
        });
    });

    describe('fetchEmployeePersonalEmails - employee personal emails', () => {
        it('should fetch personal emails for specific employee', async () => {
            const mockEmails = EmailTestFactory.createMockEmailList(2);
            const successState = EmailTestFactory.success(mockEmails);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchEmployeePersonalEmails(35);

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, {
                details: {
                    employee_id: 35,
                    type: EmailType.PERSONAL
                }
            });
            expect(result).toBe(successState);
        });

        it('should handle errors fetching personal emails', async () => {
            const failedState = EmailTestFactory.failed('No personal emails found');
            mockRepository.index.mockResolvedValue(failedState);

            const result = await controller.fetchEmployeePersonalEmails(99);

            expect(result).toBeInstanceOf(DataFailed);
        });

        it('should handle empty results', async () => {
            const successState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(successState);

            const result = await controller.fetchEmployeePersonalEmails(100);

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toEqual([]);
            }
        });
    });

    describe('edge cases and error scenarios', () => {
        it('should handle repository returning unexpected data', async () => {
            const unexpectedState = { data: null, statusCode: 200 } as any;
            mockRepository.index.mockResolvedValue(unexpectedState);

            const result = await controller.fetchList();

            expect(result).toBeDefined();
        });

        it('should handle concurrent requests', async () => {
            const successState1 = EmailTestFactory.success([EmailTestFactory.createMockEmail({ id: 1 })]);
            const successState2 = EmailTestFactory.success([EmailTestFactory.createMockEmail({ id: 2 })]);

            mockRepository.index
                .mockResolvedValueOnce(successState1)
                .mockResolvedValueOnce(successState2);

            const [result1, result2] = await Promise.all([
                controller.fetchList(),
                controller.fetchList()
            ]);

            expect(result1).toBe(successState1);
            expect(result2).toBe(successState2);
            expect(mockRepository.index).toHaveBeenCalledTimes(2);
        });

        it('should handle large employee IDs', async () => {
            const successState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(successState);

            await controller.fetchEmployeeEmails(999999999);

            expect(mockRepository.index).toHaveBeenCalledWith(undefined, {
                details: { employee_id: 999999999 }
            });
        });

        it('should handle repository throwing exception', async () => {
            mockRepository.index.mockRejectedValue(new Error('Network error'));

            await expect(controller.fetchList()).rejects.toThrow('Network error');
        });

        it('should handle empty email list result', async () => {
            const emptyState = EmailTestFactory.success([]);
            mockRepository.index.mockResolvedValue(emptyState);

            const result = await controller.fetchList();

            expect(result).toBeInstanceOf(DataSuccess);
            if (result instanceof DataSuccess) {
                expect(result.data).toEqual([]);
            }
        });
    });
});
