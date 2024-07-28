module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project: 'packages/*/tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
        },
        warnOnUnassignedImports: true,
        pathGroups: [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            pattern: './**/*.css',
            group: 'index',
            position: 'after',
          },
          {
            pattern: 'src/components**',
            group: 'internal',
            position: 'before',
          },
        ],
        'newlines-between': 'always-and-inside-groups',
        "pathGroupsExcludedImportTypes": ["react"]
      },
    ],
    'no-multiple-empty-lines': 1,
  },
};
