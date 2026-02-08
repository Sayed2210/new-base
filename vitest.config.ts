import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/__tests__/setup.ts'],
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html']
        }
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
    server: {
        fs: {
            strict: false
        }
    }
});
