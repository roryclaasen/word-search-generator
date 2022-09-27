module.exports = {
    plugins: [require('@trivago/prettier-plugin-sort-imports'), require.resolve('prettier-plugin-astro')],
    endOfLine: 'auto',
    trailingComma: 'none',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 180,
    importOrder: ['<THIRD_PARTY_MODULES>', '^[@]', '^[~]', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro'
            }
        },
        {
            files: ['*.md', '*.mdx', '*.json', '*.yml', '*.yaml', '*.toml'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['.prettierrc', '.htmlhintrc', '.markdownlintrc', '.babelrc'],
            options: {
                parser: 'json',
                tabWidth: 2
            }
        }
    ]
};
