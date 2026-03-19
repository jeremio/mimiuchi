// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'curly': 0,
    'antfu/if-newline': 0,
    // Markdown structure is intentional in README
    'markdown/heading-increment': 'off',
    'markdown/no-multiple-h1': 'off',
    'markdown/require-alt-text': 'off',
    // .vscode config files use escape sequences that are flagged incorrectly
    'jsonc/no-useless-escape': 'off',
    // Too opinionated for this codebase
    'e18e/prefer-static-regex': 'off',
  },
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/block-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],
  },
}, {
  // process global is always available in Node.js/Vite config context
  files: ['electron/**/*.ts', 'electron/**/*.mjs', '.vscode/**/*.mjs', 'vite.config.ts', 'src/helpers/is_electron.ts'],
  rules: {
    'node/prefer-global/process': 'off',
  },
}, {
  // Web Worker: self is the correct global
  files: ['src/workers/**/*.ts'],
  rules: {
    'no-restricted-globals': 'off',
  },
})
