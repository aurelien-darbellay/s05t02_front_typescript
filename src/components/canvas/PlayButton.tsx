import React, { useContext, useState } from 'react';
import { Play, StopCircle } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';
import { PlaybackController } from './PlaybackController';

interface PlayButtonProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ setIsPlaying }) => {
  const {
    entries,
    setEntries,
    playDocument,
    setUpdateUser,
    setUpdateUserMessage,
  } = useContext(EditEntryContext);
  const [controller] = useState<PlaybackController>({
    shouldStop: false,
  });

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (
      playDocument &&
      entries &&
      setEntries &&
      setUpdateUser &&
      setUpdateUserMessage
    ) {
      setIsPlaying(true);

      const playableEntries = entries.filter((e) => e.projected);
      controller.shouldStop = false;
      await playDocument(
        playableEntries,
        setEntries,
        setUpdateUser,
        setUpdateUserMessage,
        controller
      );

      setIsPlaying(false);
    }
  };

  return (
    <div
      className="flex gap-4"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 9999,
      }}
    >
      <div onClick={handleClick}>
        <Play size={40} color="green" />
      </div>
      <div onClick={() => (controller.shouldStop = true)}>
        <StopCircle size={40} color="red" />
      </div>
    </div>
  );
};
