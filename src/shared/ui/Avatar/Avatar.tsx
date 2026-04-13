import clsx from 'clsx';
import type { ComponentType, HTMLAttributes, SVGProps } from 'react';

import type { Size } from '../types';

import * as styles from './styles.css';
import defaultAvatarUrl from '@assets/avatars/avatar-1.svg';

type AvatarVariant = 'filled' | 'empty';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 아바타의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 아바타의 스타일 변형을 지정합니다.
   * @default 'filled'
   */
  variant?: AvatarVariant;
  /**
   * 이미지 URL을 지정합니다.
   */
  src?: string;
  /**
   * 이미지의 대체 텍스트를 지정합니다.
   */
  alt?: string;
  /**
   * SVG 아이콘 컴포넌트를 지정합니다.
   */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /**
   * 대체 텍스트(이니셜 등)를 지정합니다.
   */
  fallback?: string;
}

const ICON_SIZE: Record<Size, number> = {
  large: 24,
  medium: 16,
  small: 12,
};

export function Avatar({
  size = 'medium',
  variant = 'filled',
  src,
  alt = '',
  icon: Icon,
  fallback,
  className,
  ...rest
}: AvatarProps) {
  const content = (() => {
    switch (true) {
      case Boolean(src):
        return <img src={src} alt={alt} className={styles.image} width="100%" height="100%" />;
      case Icon != null: {
        const iconSize = ICON_SIZE[size];
        return (
          <span className={styles.icon}>
            <Icon width={iconSize} height={iconSize} />
          </span>
        );
      }
      case Boolean(fallback):
        return fallback;
      case variant === 'empty':
        return null;
      default:
        return <img src={defaultAvatarUrl} alt="" className={styles.image} width="100%" height="100%" />;
    }
  })();

  return (
    <div className={clsx(styles.avatarRecipe({ size, variant }), className)} aria-hidden="true" {...rest}>
      {content}
    </div>
  );
}

Avatar.displayName = 'Avatar';
