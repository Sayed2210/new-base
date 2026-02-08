import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmailApiService from './email.api-service';
import { ApiNames } from '@/base/Core/NetworkStructure/apiNames';

// Mock the ApiNames
vi.mock('@/base/Core/NetworkStructure/apiNames', () => ({
    ApiNames: {
        instance: {
            IndexMail: '/api/emails',
            ShowMail: '/api/emails',
            AddMail: '/api/emails',
            EditMail: '/api/emails',
            DeleteMail: '/api/emails',
        }
    }
}));

describe('EmailApiService', () => {
    let service: EmailApiService;

    beforeEach(() => {
        service = EmailApiService.getInstance();
    });

    describe('singleton pattern', () => {
        it('should return the same instance', () => {
            const instance1 = EmailApiService.getInstance();
            const instance2 = EmailApiService.getInstance();

            expect(instance1).toBe(instance2);
        });
    });

    describe('endpoints configuration', () => {
        it('should have index endpoint', () => {
            const endpoints = (service as any).endpoints;
            expect(endpoints.index).toBe('/api/emails');
        });

        it('should have show endpoint as function', () => {
            const endpoints = (service as any).endpoints;
            expect(typeof endpoints.show).toBe('function');
            expect(endpoints.show(123)).toBe('/api/emails/123');
            expect(endpoints.show('abc')).toBe('/api/emails/abc');
        });

        it('should have create endpoint', () => {
            const endpoints = (service as any).endpoints;
            expect(endpoints.create).toBe('/api/emails');
        });

        it('should have update endpoint as function', () => {
            const endpoints = (service as any).endpoints;
            expect(typeof endpoints.update).toBe('function');
            expect(endpoints.update(456)).toBe('/api/emails/456');
            expect(endpoints.update('xyz')).toBe('/api/emails/xyz');
        });

        it('should have delete endpoint as function', () => {
            const endpoints = (service as any).endpoints;
            expect(typeof endpoints.delete).toBe('function');
            expect(endpoints.delete(789)).toBe('/api/emails/789');
        });
    });

    describe('executeEmailAction', () => {
        it('should call customPost with correct endpoint and params', async () => {
            const mockParams = { email: 'test@example.com' };
            const mockResponse = {
                data: { data: { id: 1, email: 'test@example.com' }, status: true, message: 'Success' },
                statusCode: 200
            };

            // Spy on customPost method
            const customPostSpy = vi.spyOn(service as any, 'customPost').mockResolvedValue(mockResponse);

            const result = await service.executeEmailAction(mockParams as any);

            expect(customPostSpy).toHaveBeenCalledWith('/api/emails', mockParams);
            expect(result).toEqual(mockResponse);

            customPostSpy.mockRestore();
        });

        it('should use create endpoint for executeEmailAction', async () => {
            const mockParams = { email: 'action@example.com' };
            const mockResponse = {
                data: { data: { id: 2, email: 'action@example.com' }, status: true, message: 'Success' },
                statusCode: 200
            };

            const customPostSpy = vi.spyOn(service as any, 'customPost').mockResolvedValue(mockResponse);

            await service.executeEmailAction(mockParams as any);

            const endpoints = (service as any).endpoints;
            expect(customPostSpy).toHaveBeenCalledWith(endpoints.create, mockParams);

            customPostSpy.mockRestore();
        });
    });

    describe('API endpoint integration', () => {
        it('should use ApiNames instance for endpoint configuration', () => {
            const apiNames = ApiNames.instance;
            const endpoints = (service as any).endpoints;

            expect(endpoints.index).toBe(apiNames.IndexMail);
            expect(endpoints.create).toBe(apiNames.AddMail);
        });

        it('should construct dynamic endpoints with ID correctly', () => {
            const apiNames = ApiNames.instance;
            const endpoints = (service as any).endpoints;

            expect(endpoints.show(100)).toBe(`${apiNames.ShowMail}/100`);
            expect(endpoints.update(200)).toBe(`${apiNames.EditMail}/200`);
            expect(endpoints.delete(300)).toBe(`${apiNames.DeleteMail}/300`);
        });
    });
});
