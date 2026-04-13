import { useState } from 'react';

import type { TopicId } from '@constants/topics';
import { Lobby } from '@features/lobby/Lobby';
import { CaseBriefing } from '@features/room/CaseBriefing';
import { CreateRoom } from '@features/room/CreateRoom';
import { DifficultySelect } from '@features/room/DifficultySelect';
import { GradeSelect } from '@features/room/GradeSelect';
import { Investigation } from '@features/room/Investigation';
import { JoinRoom } from '@features/room/JoinRoom';
import { ScopeSelect } from '@features/room/ScopeSelect';
import { TopicSelect } from '@features/room/TopicSelect';
import { useRoomStore } from '@features/room/useRoomStore';

type Step =
  | 'lobby'
  | 'topicSelect'
  | 'gradeSelect'
  | 'scopeSelect'
  | 'difficultySelect'
  | 'createRoom'
  | 'joinRoom'
  | 'caseBriefing'
  | 'investigation';

export function RoomPanel() {
  const [step, setStep] = useState<Step>('lobby');
  const [isParticipant, setIsParticipant] = useState(false);
  const { config, setTopic, setGrade, setScope, setDifficulty, createRoom, reset } = useRoomStore();

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
            setStep('difficultySelect');
          }}
        />
      );
    case 'difficultySelect':
      return (
        <DifficultySelect
          onBack={goBack('scopeSelect')}
          onSelect={difficulty => {
            setDifficulty(difficulty);
            setStep('createRoom');
          }}
        />
      );
    case 'createRoom':
      return (
        <CreateRoom
          onBack={goBack(isParticipant ? 'lobby' : 'difficultySelect')}
          onLeave={handleLeave}
          onStartInvestigation={() => setStep('caseBriefing')}
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
    case 'caseBriefing':
      return <CaseBriefing isHost={!isParticipant} onStartMission={() => setStep('investigation')} />;
    case 'investigation':
      return <Investigation isHost={!isParticipant} onFinish={handleLeave} />;
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
