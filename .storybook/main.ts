import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  previewHead: (head: string) => `
    ${head}
    <meta name="robots" content="noindex" />
    <meta name="nofollow" content="noindex" />
  `,
};

export default config;
