interface ActionButtonProps {
  onClick: () => void;
  value: string;
  color: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  value,
  color,
  disabled = false,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-4 py-2 
          rounded 
          text-white 
          text-base 
          transition 
          duration-200 
          ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed opacity-60'
              : 'hover:shadow-lg active:shadow-none cursor-pointer'
          }
        `}
        style={{
          backgroundColor: disabled ? '#ccc' : color,
        }}
      >
        {value}
      </button>
    </div>
  );
};
