import process from 'node:process';
import path from 'node:path';
import unocss from '@unocss/vite';
import presetIcons from '@unocss/preset-icons';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export function setupUnocss(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return unocss({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block'
        },
        collections: {
          [collectionName]: FileSystemIconLoader(localIconPath, svg =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          )
        },
        warn: true
      })
    ],
    /** 自定义keyframes */
    preflights: [
      {
        getCSS: ({ theme }: { theme: any }) => {
          const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
          const weight = 500;
          const rainbowCircle = [...rainbow];
          rainbowCircle.push(rainbowCircle[0]);
          const per = rainbowCircle.length - 1;
          const process = rainbowCircle.reduce((t, c, i) => {
            const color = theme.colors?.[c]?.[weight];
            let preT = t;
            preT = `${t}${((100 / per) * i).toFixed(1)}% {
                color: ${color ?? `${c}`};
                border-color: ${color ?? `${c}`};
              }`;
            return preT;
          }, '');
          return `@keyframes rainbow {${process}}`;
        }
      }
    ]
  });
}
