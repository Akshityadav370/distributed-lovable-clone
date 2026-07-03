import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['src/modules/**/*.{ts,tsx}'],
    ignores: ['src/modules/**/index.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/modules/*/*', '!@/modules/*/index', '!@/modules/*/*.slice'],
              message:
                'Import from another module only via its barrel (index.ts), except UI-only *.slice files which are dependency-free leaves and safe to import directly -- this avoids circular imports between barrels that re-export pages.',
            },
          ],
        },
      ],
    },
  },
];
