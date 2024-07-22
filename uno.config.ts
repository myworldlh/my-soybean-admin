import { defineConfig } from '@unocss/vite';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import presetUno from '@unocss/preset-uno';
import type { Theme } from '@unocss/preset-uno';
import { presetSoybeanAdmin } from '@sa/uno-preset';
import { themeVars } from './src/theme/vars';

type Colors = Theme['colors'];

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem'
    }
  },
  rules: [
    [
      /^my-text-(.*)$/,
      ([, c], { theme }) => {
        // 模拟text-*的样式（部分，只有在@unocss/preset-mini中部分声明的可以生效，具体哪些会生效需要去看源码，这里只作为尝试模拟）
        function getStyle(item: Colors | string) {
          const css: Colors = {};
          if (typeof item === 'string') {
            css.color = item;
          }
          if (typeof item === 'object' && item !== null) {
            for (const key in item) {
              if (key === 'DEFAULT') {
                if (typeof item[key] === 'string') {
                  css.DEFAULT = item[key];
                }
              } else {
                Object.assign(css, getStyle(item[key]));
              }
            }
          }
          return css;
        }
        const style = getStyle(theme.colors?.[c]);
        return style;
      }
    ],
    [
      'animate-ranbow',
      {
        animation: 'rainbow 16s infinite'
      }
    ]
  ],
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm',
    ranbow: 'animate-ranbow border-0.5 border-solid rd-8px'
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: 'class' }), presetSoybeanAdmin()]
});
