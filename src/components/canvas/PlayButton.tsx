import React, { useContext } from 'react';
import { Play } from 'lucide-react';
import { EditEntryContext } from '../../contexts/EditEntryContext';

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

      await playDocument(
        entries,
        setEntries,
        setUpdateUser,
        setUpdateUserMessage
      );

      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 9999,
      }}
    >
      <Play size={40} color="green" />
    </div>
  );
};
