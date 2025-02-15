import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    alias: {
      '@/auth': '__tests__/mocks/auth.ts',
      'next-auth/providers/credentials':
        '__tests__/mocks/next-auth-providers-credentials.ts',
      'next-auth': '__tests__/mocks/next-auth.ts',
    },
    setupFiles: ['dotenv/config'],
    coverage: {
      exclude: [
        'next.config.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'vitest.config.mts',
        'drizzle.config.ts',
        '**/.next/**',
        '**/__tests__/**',
        '**/__e2e-tests__/**',
        './src/app/**',
        './src/components/**',
        '**/src/db/**',
        '**/src/lib/validations/**',
        './src/lib/constants.ts',
        './src/lib/actions/studentActions.ts',
        './src/lib/mail.ts',
        './src/types/**',
        './src/auth.config.ts',
        './src/auth.ts',
        './src/middleware.ts',
        './src/routes.ts',
      ],
    },
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/__e2e-tests__/**',
    ],
  },
});
