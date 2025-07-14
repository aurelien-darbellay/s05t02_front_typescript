interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  color: string;
  disabled?: boolean;
  margin?: number;
  icon?: string;
  text?: string;
  size?: number; // New prop for HTML string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  value,
  color,
  disabled = false,
  margin = 0,
  icon,
  text = 'white',
  size = 1,
}) => {
  return (
    <div
      style={{
        transform: `scale(${size})`,
      }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          target
          ${icon ? 'w-10 h-10 flex items-center justify-center rounded-full' : 'px-4 py-2'} 
          rounded 
          text-${text} 
          text-base 
          transition 
          duration-200 
          ${
            disabled
              ? 'cursor-not-allowed opacity-60'
              : 'hover:shadow-lg active:shadow-none cursor-pointer'
          }
        `}
        style={{
          backgroundColor: disabled ? '#ccc' : color,
          margin: margin,
          whiteSpace: 'nowrap',
        }}
      >
        {icon ? (
          <span
            className={'target'}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        ) : (
          value
        )}
      </button>
    </div>
  );
};
