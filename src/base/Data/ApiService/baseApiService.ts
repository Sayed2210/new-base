import type Params from '@/base/Core/Params/params';
import ServicesInterface, {
    CrudType,
    type ApiResponse,
    type ExtendedCallOptions,
    type ProgressCallback
} from './apiServiceInterface';
import { dialogManager } from '@/base/persention/Dialogs/dialog.manager';
import { env } from '@/base/Core/Config/index';

/**
 * Configuration for API endpoints supporting CRUD operations.
 * Use function for dynamic endpoints (e.g., show, update, delete with ID).
 */
export interface ApiEndpoints {
    /** List/index endpoint */
    index?: string;

    /** Show single item endpoint (can be function for dynamic ID) */
    show?: string | ((id: string | number) => string);

    /** Create endpoint */
    create?: string;

    /** Update endpoint (can be function for dynamic ID) */
    update?: string | ((id: string | number) => string);

    /** Delete endpoint (can be function for dynamic ID) */
    delete?: string | ((id: string | number) => string);
}

/**
 * Custom endpoint configuration
 */
export interface CustomEndpointConfig {
    /** Endpoint URL */
    url: string;

    /** HTTP method */
    method: CrudType;

    /** Request parameters */
    params?: Params;

    /** Query parameters */
    queryParams?: Record<string, any>;

    /** Request headers */
    headers?: Record<string, string>;
}

/**
 * Options for API service method calls.
 */
export interface ApiCallOptions extends ExtendedCallOptions {
    /** Require authentication */
    auth?: boolean;

    /** Show loading dialog */
    showLoadingDialog?: boolean;

    /** Custom headers */
    headers?: Record<string, string>;

    /** Query parameters */
    details?: Record<string, any>;

    /** Use PUT instead of POST/FormData for update */
    usePut?: boolean;

    /** Use JSON instead of FormData for create/update */
    useJson?: boolean;
}

/**
 * Retry configuration
 */
export interface RetryConfig {
    /** Maximum retry attempts */
    maxAttempts: number;

    /** Initial delay in ms */
    initialDelay: number;

    /** Backoff multiplier */
    backoffMultiplier: number;
}

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxAttempts: 3,
    initialDelay: 1000,
    backoffMultiplier: 2,
};

/**
 * Base API Service providing standard CRUD operations.
 * Extend this class and define endpoints for feature-specific services.
 * 
 * @example
 * ```typescript
 * class ProductApiService extends BaseApiService {
 *   protected get endpoints() {
 *     return {
 *       index: '/api/products',
 *       show: (id: string) => `/api/products/${id}`,
 *       create: '/api/products',
 *       update: (id: string) => `/api/products/${id}`,
 *       delete: (id: string) => `/api/products/${id}`,
 *     };
 *   }
 *   
 *   // Add custom methods for non-CRUD operations
 *   async getProductStats(productId: string) {
 *     return this.custom({
 *       url: `/api/products/${productId}/stats`,
 *       method: CrudType.GET,
 *     });
 *   }
 * }
 * ```
 */
export default abstract class BaseApiService extends ServicesInterface {
    /**
     * Define the API endpoints for this service.
     */
    protected abstract get endpoints(): ApiEndpoints;

    /**
     * Default options applied to all requests.
     */
    protected get defaultOptions(): Partial<ApiCallOptions> {
        return {
            auth: true,
            showLoadingDialog: false,
            showErrorDialog: false,
            enableRetry: env.isRetryEnabled,
        };
    }

    /**
     * Resolves an endpoint that can be either a string or a function.
     */
    private resolveEndpoint(
        endpoint: string | ((id: string | number) => string) | undefined,
        id?: string | number
    ): string {
        if (!endpoint) {
            throw new Error('Endpoint not configured');
        }
        if (typeof endpoint === 'function') {
            if (id === undefined) {
                throw new Error('ID required for dynamic endpoint');
            }
            return endpoint(id);
        }
        return endpoint;
    }

    /**
     * Merge options with defaults
     */
    private mergeOptions(options?: ApiCallOptions): ApiCallOptions {
        return {
            ...this.defaultOptions,
            ...options,
        };
    }

    // =========================================================================
    // CRUD Operations
    // =========================================================================

    /**
     * Fetch list of items (GET request).
     */
    async index(params?: Params, options?: ApiCallOptions): Promise<ApiResponse> {
        const url = this.resolveEndpoint(this.endpoints.index);
        const mergedOptions = this.mergeOptions(options);

        return this.call({
            url,
            type: CrudType.GET,
            params,
            ...mergedOptions,
        });
    }

    /**
     * Fetch single item by ID (GET request).
     */
    async show(id: string | number, options?: ApiCallOptions): Promise<ApiResponse> {
        const url = this.resolveEndpoint(this.endpoints.show, id);
        const mergedOptions = this.mergeOptions(options);

        return this.call({
            url,
            type: CrudType.GET,
            ...mergedOptions,
        });
    }

    /**
     * Create new item (POST request with FormData or JSON).
     */
    async create(params: Params, options?: ApiCallOptions): Promise<ApiResponse> {
        const url = this.resolveEndpoint(this.endpoints.create);
        const mergedOptions = this.mergeOptions(options);

        return this.call({
            url,
            type: mergedOptions.useJson ? CrudType.POST : CrudType.FormData,
            params,
            ...mergedOptions,
        });
    }

    /**
     * Update existing item by ID (POST with FormData, PUT, or PATCH).
     */
    async update(
        id: string | number,
        params: Params,
        options?: ApiCallOptions
    ): Promise<ApiResponse> {
        const url = this.resolveEndpoint(this.endpoints.update, id);
        const mergedOptions = this.mergeOptions(options);

        let method: CrudType = CrudType.FormData;
        if (mergedOptions.usePut) {
            method = CrudType.PUT;
        } else if (mergedOptions.useJson) {
            method = CrudType.PATCH;
        }

        return this.call({
            url,
            type: method,
            params,
            ...mergedOptions,
        });
    }

    /**
     * Delete item by ID (DELETE request).
     */
    async delete(id: string | number, options?: ApiCallOptions): Promise<ApiResponse> {
        const url = this.resolveEndpoint(this.endpoints.delete, id);
        const mergedOptions = this.mergeOptions(options);

        return this.call({
            url,
            type: CrudType.DELETE,
            ...mergedOptions,
        });
    }

    // =========================================================================
    // Custom Endpoint Support
    // =========================================================================

    /**
     * Execute a custom API call for non-CRUD operations.
     */
    async custom<T = any>(
        config: CustomEndpointConfig,
        options?: ApiCallOptions
    ): Promise<ApiResponse<T>> {
        const mergedOptions = this.mergeOptions(options);

        return this.call({
            url: config.url,
            type: config.method,
            params: config.params,
            details: config.queryParams,
            headers: config.headers,
            ...mergedOptions,
        }) as Promise<ApiResponse<T>>;
    }

    /**
     * Execute a custom GET request.
     */
    async customGet<T = any>(
        url: string,
        queryParams?: Record<string, any>,
        options?: ApiCallOptions
    ): Promise<ApiResponse<T>> {
        return this.custom<T>(
            { url, method: CrudType.GET, queryParams },
            options
        );
    }

    /**
     * Execute a custom POST request.
     */
    async customPost<T = any>(
        url: string,
        params?: Params,
        options?: ApiCallOptions
    ): Promise<ApiResponse<T>> {
        return this.custom<T>(
            { url, method: CrudType.POST, params },
            options
        );
    }

    // =========================================================================
    // Batch Operations
    // =========================================================================

    /**
     * Execute multiple requests in parallel.
     */
    async batch(
        requests: Array<{ config: CustomEndpointConfig; options?: ApiCallOptions }>
    ): Promise<ApiResponse[]> {
        const promises = requests.map(({ config, options }) =>
            this.custom(config, options)
        );

        return Promise.all(promises);
    }

    /**
     * Execute multiple requests sequentially.
     */
    async batchSequential(
        requests: Array<{ config: CustomEndpointConfig; options?: ApiCallOptions }>
    ): Promise<ApiResponse[]> {
        const results: ApiResponse[] = [];

        for (const { config, options } of requests) {
            const result = await this.custom(config, options);
            results.push(result);
        }

        return results;
    }

    // =========================================================================
    // Retry Operations
    // =========================================================================

    /**
     * Execute request with retry logic.
     */
    async withRetry<T = any>(
        fn: () => Promise<ApiResponse<T>>,
        config?: Partial<RetryConfig>
    ): Promise<ApiResponse<T>> {
        const retryConfig: RetryConfig = {
            ...DEFAULT_RETRY_CONFIG,
            ...config,
        };

        let lastError: Error | undefined;
        let delay = retryConfig.initialDelay;

        for (let attempt = 0; attempt < retryConfig.maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error: any) {
                lastError = error;

                // Don't retry on non-retryable errors
                if (!error.isRetryable) {
                    throw error;
                }

                // Wait before retrying
                if (attempt < retryConfig.maxAttempts - 1) {
                    if (env.isLoggingEnabled) {
                        console.log(`[BaseApiService] Retry attempt ${attempt + 1}/${retryConfig.maxAttempts}`);
                    }
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    delay *= retryConfig.backoffMultiplier;
                }
            }
        }

        throw lastError || new Error('Request failed after retries');
    }

    // =========================================================================
    // Progress Operations
    // =========================================================================

    /**
     * Upload with progress tracking.
     */
    async uploadWithProgress(
        url: string,
        params: Params,
        onProgress: ProgressCallback,
        options?: ApiCallOptions
    ): Promise<ApiResponse> {
        return this.call({
            url,
            type: CrudType.FormData,
            params,
            onUploadProgress: onProgress,
            ...this.mergeOptions(options),
        });
    }

    /**
     * Download with progress tracking.
     */
    async downloadWithProgress(
        url: string,
        onProgress: ProgressCallback,
        options?: ApiCallOptions
    ): Promise<ApiResponse> {
        return this.call({
            url,
            type: CrudType.GET,
            onDownloadProgress: onProgress,
            ...this.mergeOptions(options),
        });
    }

    // =========================================================================
    // Legacy Compatibility
    // =========================================================================

    /**
     * Legacy compatibility: implements abstract method from ServicesInterface.
     * Use specific CRUD methods instead.
     * @deprecated
     */
    async applyService(params: Params): Promise<ApiResponse> {
        return this.index(params);
    }
}

export { type ApiResponse, CrudType };
