import { createRequire } from 'node:module';
import stylistic from '@stylistic/eslint-plugin';

const require = createRequire(import.meta.url);
const nextConfig = require.resolve('eslint-config-next');
const parserPath = require.resolve('@typescript-eslint/parser', {
  paths: [nextConfig],
});
const parser = require(parserPath);
const nextPluginPath = require.resolve('@next/eslint-plugin-next', {
  paths: [nextConfig],
});
const nextPlugin = require(nextPluginPath);

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      '@next/next': nextPlugin,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-len': ['error', { code: 80 }],
      '@stylistic/function-paren-newline': [
        'error',
        'multiline-arguments',
      ],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: { minProperties: 2 },
          ObjectPattern: { minProperties: 2 },
          ImportDeclaration: { minProperties: 2 },
          ExportDeclaration: { minProperties: 2 },
        },
      ],
      '@stylistic/object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: false },
      ],
      '@stylistic/newline-per-chained-call': ['error'],
    },
  },
];
