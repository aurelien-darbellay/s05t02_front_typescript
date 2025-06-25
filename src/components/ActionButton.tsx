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
  disabled,
}) => {
  if (!disabled) disabled = false;
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          padding: '0.5rem 1.2rem',
          backgroundColor: disabled ? '#ccc' : color,
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {value}
      </button>
    </div>
  );
};
