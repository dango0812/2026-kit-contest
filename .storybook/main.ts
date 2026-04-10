import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: '@storybook/react-vite',
  previewHead: (head: string | undefined) => `
    ${head}
    <meta name="robots" content="noindex" />
    <meta name="nofollow" content="noindex" />
  `,
  viteFinal: async config => {
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },
};

export default config;
