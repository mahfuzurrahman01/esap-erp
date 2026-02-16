import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import checkFilePlugin from 'eslint-plugin-check-file';
import nPlugin from 'eslint-plugin-n';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: {
                process: true
            }
        }
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                File: 'readonly',
                URLSearchParams: 'readonly',
                document: 'readonly',
                setTimeout: 'readonly',
                React: 'readonly',
                window: 'readonly',
                process: 'readonly'
            }
        },
        plugins: {
            'check-file': checkFilePlugin,
            'jsx-a11y': jsxA11y,
            'n': nPlugin,
            'unused-imports': unusedImportsPlugin,
            '@next/next': nextPlugin,
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            '@typescript-eslint': tseslint
        },
        rules: {
            'no-unused-vars': 'off',
            'no-console': 'warn',
            'jsx-a11y/alt-text': 'error',
            'prefer-arrow-callback': ['error'],
            'prefer-template': ['warn'],
            'n/no-process-env': ['warn'],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-types': 'off',
            'no-empty-pattern': 'off',
            'no-undef': 'off',
            'no-fallthrough': 'off',
            'no-redeclare': 'off',
            'no-constant-binary-expression': 'off',
            'valid-typeof': 'off',
            'no-import-assign': 'off',
            'react-hooks/rules-of-hooks': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'import',
                    next: 'function'
                }
            ],
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{ts,tsx}': 'KEBAB_CASE'
                },
                {
                    ignoreMiddleExtensions: true
                }
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/!^[.*': 'KEBAB_CASE'
                }
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }
]; 