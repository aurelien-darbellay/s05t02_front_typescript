import UserUpdateDialog from './UserUpdateDialog';

interface ActionButtonProps {
  onClick: () => void;
  message?: string;
  value: string;
  color: string;
  open?: boolean;
  onOkay?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  message,
  value,
  color,
  open,
  onOkay,
  disabled,
}) => {
  if (!open) open = false;
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

      <UserUpdateDialog open={open} message={message} onClick={onOkay} />
    </div>
  );
};
