import { useState } from 'react';

import { Lobby } from '@features/lobby/Lobby';
import { CreateRoom } from '@features/room/CreateRoom';
import { JoinRoom } from '@features/room/JoinRoom';
import { TopicSelect } from '@features/room/TopicSelect';
import { useRoomStore } from '@features/room/useRoomStore';

type Step = 'lobby' | 'topicSelect' | 'createRoom' | 'joinRoom';

export function RoomPanel() {
  const [step, setStep] = useState<Step>('lobby');
  const [isParticipant, setIsParticipant] = useState(false);
  const { joinRoom } = useRoomStore();

  const goBack = (to: Step) => () => setStep(to);

  switch (step) {
    case 'topicSelect':
      return <TopicSelect onBack={goBack('lobby')} onSelect={() => setStep('createRoom')} />;
    case 'createRoom':
      return <CreateRoom onBack={goBack(isParticipant ? 'lobby' : 'topicSelect')} isParticipant={isParticipant} />;
    case 'joinRoom':
      return (
        <JoinRoom
          onBack={goBack('lobby')}
          onJoin={info => {
            joinRoom(info.nickname);
            setIsParticipant(true);
            setStep('createRoom');
          }}
        />
      );
    default:
      return (
        <Lobby
          onCreateRoom={() => {
            setIsParticipant(false);
            setStep('topicSelect');
          }}
          onJoinRoom={() => setStep('joinRoom')}
        />
      );
  }
}

RoomPanel.displayName = 'RoomPanel';
