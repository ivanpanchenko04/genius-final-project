import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: { globals: globals.browser },
        root: true,
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
        },
        extends: ['eslint:recommended', 'prettier'],
        env: {
            node: true,
            es2021: true,
        },
        rules: {
            semi: 'error',
        },
    },
    pluginJs.configs.recommended,
]
