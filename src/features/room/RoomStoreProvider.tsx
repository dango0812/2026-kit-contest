import { type PropsWithChildren, useRef } from 'react';

import { createRoomStore, type RoomStore, RoomStoreContext } from './useRoomStore';

export function RoomStoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<RoomStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = createRoomStore();
  }

  return <RoomStoreContext.Provider value={storeRef.current}>{children}</RoomStoreContext.Provider>;
}
