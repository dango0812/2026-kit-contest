import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

type ReturnType = {
  copy: CopyFn;
  copiedText: CopiedValue;
};

/**
 * 클립보드에 텍스트를 복사하는 기능을 제공하는 커스텀 훅입니다.
 *
 * @example
 * const { copy, copiedText } = useCopyToClipboard();
 *
 * const handleCopy = async () => {
 *   const success = await copy('복사할 텍스트');
 *   if (success) {
 *     console.log('텍스트가 클립보드에 복사되었습니다!');
 *   } else {
 *     console.log('복사에 실패했습니다.');
 *   }
 */
export function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}
