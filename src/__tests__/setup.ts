import { vi } from 'vitest';

// Mock static assets (images, etc.)
vi.mock('@/assets/images/dialogs/success.png', () => ({
    default: 'mocked-success-image.png'
}));

vi.mock('@/assets/images/dialogs/error.png', () => ({
    default: 'mocked-error-image.png'
}));

vi.mock('@/assets/images/dialogs/warning.png', () => ({
    default: 'mocked-warning-image.png'
}));

vi.mock('@/assets/images/dialogs/info.png', () => ({
    default: 'mocked-info-image.png'
}));
