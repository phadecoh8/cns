import { createRequire } from 'node:module';
import stylistic from '@stylistic/eslint-plugin';

const frontendRequire = createRequire(
  new URL('../frontend/package.json', import.meta.url),
);
const nextConfig = frontendRequire.resolve('eslint-config-next');
const parserPath = frontendRequire.resolve('@typescript-eslint/parser', {
  paths: [nextConfig],
});
const parser = frontendRequire(parserPath);

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@stylistic': stylistic,
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
