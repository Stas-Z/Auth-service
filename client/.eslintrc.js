module.exports = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['vue'],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'vue/multi-word-component-names': 'off',
        'no-undef': 'warn',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                singleQuote: true,
                trailingComma: 'all',
                semi: true,
                bracketSpacing: true,
                bracketSameLine: false,
                arrowParens: 'always',
            },
        ],
    },
};
