const modules = import.meta.glob<string>('./*.svg', { eager: true, import: 'default' });

export const AVATAR_URLS = Object.values(modules);

export const AVATAR_COUNT = AVATAR_URLS.length;

export function getRandomAvatarUrl(): string {
  return AVATAR_URLS[Math.floor(Math.random() * AVATAR_COUNT)];
}
