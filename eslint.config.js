import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]']
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/']
        }
      ],
      'unocss/order-attributify': 'off',
      // === 自定义规则开始 ===
      '@typescript-eslint/no-shadow': 'off',
      'no-warning-comments': 'warn',
      'no-continue': 'off',
      'no-control-regex': 'off',
      'no-plusplus': 'off',
      // no-unused-vars 设置
      'no-unused-vars': 'warn',
      'vue/no-unused-vars': 'warn'
      // '@typescript-eselint/no-unused-vars': 'off' // 必须使用 off，否则提示插件找不到
    }
  },
  {
    // 全局禁用 @typescript-eselint/no-unused-vars 后 .d.ts， enum 定义会存在误报，需要重新设置规则
    files: ['**/*.d.ts', '**/enum/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      'vue/no-unused-vars': 'off'
      // '@typescript-eselint/no-unused-vars': 'error'
    }
  }
);
