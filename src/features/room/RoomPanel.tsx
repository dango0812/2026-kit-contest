import { useState } from 'react';

import type { TopicId } from '@constants/topics';
import { Lobby } from '@features/lobby/Lobby';
import { CreateRoom } from '@features/room/CreateRoom';
import { GradeSelect } from '@features/room/GradeSelect';
import { JoinRoom } from '@features/room/JoinRoom';
import { ScopeSelect } from '@features/room/ScopeSelect';
import { TopicSelect } from '@features/room/TopicSelect';
import { useRoomStore } from '@features/room/useRoomStore';

type Step = 'lobby' | 'topicSelect' | 'gradeSelect' | 'scopeSelect' | 'createRoom' | 'joinRoom';

export function RoomPanel() {
  const [step, setStep] = useState<Step>('lobby');
  const [isParticipant, setIsParticipant] = useState(false);
  const { config, setTopic, setGrade, setScope, createRoom, reset } = useRoomStore();

  const goBack = (to: Step) => () => setStep(to);

  const handleLeave = () => {
    reset();
    setIsParticipant(false);
    setStep('lobby');
  };

  switch (step) {
    case 'topicSelect':
      return (
        <TopicSelect
          onBack={goBack('lobby')}
          onSelect={topicId => {
            setTopic(topicId as TopicId);
            setStep('gradeSelect');
          }}
        />
      );
    case 'gradeSelect':
      return (
        <GradeSelect
          onBack={goBack('topicSelect')}
          onSelect={gradeId => {
            setGrade(gradeId);
            setStep('scopeSelect');
          }}
        />
      );
    case 'scopeSelect':
      return (
        <ScopeSelect
          topicId={config.topicId!}
          gradeId={config.gradeId!}
          onBack={goBack('gradeSelect')}
          onSelect={scopeId => {
            setScope(scopeId);
            setStep('createRoom');
          }}
        />
      );
    case 'createRoom':
      return (
        <CreateRoom
          onBack={goBack(isParticipant ? 'lobby' : 'scopeSelect')}
          onLeave={handleLeave}
          isParticipant={isParticipant}
        />
      );
    case 'joinRoom':
      return (
        <JoinRoom
          onBack={goBack('lobby')}
          onJoin={info => {
            createRoom(info.roomCode, 0, info.firestoreDocId);
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
